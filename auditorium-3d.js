(() => {
  'use strict';

  const vertexSource = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec3 aColor;
    attribute vec2 aDecoration;
    attribute vec2 aUv;
    uniform mediump vec3 uEye;
    uniform vec3 uRight, uUp, uForward;
    uniform vec2 uLens;
    uniform float uFrameShift;
    varying mediump vec3 vPosition, vNormal, vColor;
    varying mediump vec2 vDecoration, vUv;

    void main() {
      vec3 relative = aPosition - uEye;
      float depth = dot(relative, uForward);
      gl_Position = vec4(dot(relative, uRight) * uLens.x,
                         dot(relative, uUp) * uLens.y,
                         1.0034 * depth - 0.1703, depth);
      gl_Position.y += uFrameShift * depth;
      vPosition = aPosition;
      vNormal = aNormal;
      vColor = aColor;
      vDecoration = aDecoration;
      vUv = aUv;
    }
  `;

  const fragmentSource = `
    precision mediump float;
    uniform sampler2D uStates, uLabels, uScreen;
    uniform vec2 uScreenFit;
    uniform bool uInside, uHasVideo;
    uniform vec3 uEye;
    varying mediump vec3 vPosition, vNormal, vColor;
    varying mediump vec2 vDecoration, vUv;

    void main() {
      vec3 n = normalize(vNormal);
      vec3 color = vColor;
      if (vDecoration.y > -0.5) {
        float selected = texture2D(uStates, vec2((vDecoration.y + 0.5) / 64.0, 0.5)).r;
        color = mix(color, color * 0.31 + vec3(0.64, 0.37, 0.12), selected);
      }
      float material = vDecoration.x;
      if (material > 3.5) {
        if (!uInside) discard;
        material = 0.0;
      }
      if (material > 2.5) {
        gl_FragColor = texture2D(uLabels, vUv);
        return;
      }
      if (material > 1.5) {
        vec2 uv = vUv;
        if (uHasVideo) {
          uv = (uv - 0.5) / uScreenFit + 0.5;
          vec3 projected = vec3(0.012);
          if (all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))) {
            projected = texture2D(uScreen, vec2(uv.x, 1.0 - uv.y)).rgb;
          }
          gl_FragColor = vec4(projected, 1.0);
          return;
        }
        float cloud = exp(-15.0 * pow(uv.y - 0.47 - 0.10 * uv.x, 2.0));
        float horizon = exp(-1200.0 * pow(uv.y - 0.39 - 0.026 * uv.x, 2.0));
        float vignette = max(0.50, 1.0 - 0.63 * length(uv - vec2(0.5)));
        vec3 frame = mix(vec3(0.09,0.105,0.14), vec3(0.8,0.39,0.24), cloud);
        gl_FragColor = vec4((frame + horizon * vec3(0.31,0.25,0.16)) * vignette, 1.0);
        return;
      }

      vec3 front = normalize(vec3(0.0, 0.57, -0.82));
      vec3 rear = normalize(vec3(0.21, 0.82, 0.54));
      vec3 sheen = normalize(normalize(uEye - vPosition) + rear);
      float fresnel = pow(1.0 - max(0.0, dot(normalize(uEye - vPosition), n)), 3.0);
      float diffuse = 0.51 + 0.46 * max(0.0, dot(n, rear)) +
                      0.19 * max(0.0, dot(n, front));
      float screenLight = 0.15 * exp(-0.19 * max(0.0, vPosition.z + 7.0));
      float band = 0.98 + 0.025 * sin(vPosition.x * 170.0 + vPosition.y * 145.0 + vPosition.z * 107.0);
      color = color * (diffuse + screenLight) * band +
        vec3(0.08,0.036,0.025) * pow(max(0.0, dot(n, sheen)), 10.0) +
        vec3(0.024,0.016,0.011) * fresnel;
      color = mix(color, vec3(0.085,0.055,0.063), smoothstep(12.0,34.0,length(uEye-vPosition)) * 0.56);
      color = mix(color, vColor, min(material, 1.0));
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const overview = {eye:[0, 8.75, 12.5], target:[0, 0.95, -1.5], lens:.49};
  const frameShift = .24;
  const subtract = (a,b) => a.map((value,index) => value - b[index]);
  const add = (a,b) => a.map((value,index) => value + b[index]);
  const scale = (a,k) => a.map(value => value * k);
  const dot = (a,b) => a.reduce((value, coordinate, index) => value + coordinate * b[index], 0);
  const unit = vector => scale(vector, 1 / Math.max(.0001, Math.hypot(...vector)));
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const rgb = hex => hex.match(/../g).map(value => parseInt(value,16) / 255);

  function seatPosition(seat) {
    const number = seat.number - 1;
    return [
      (number - 3.5) * .96 + (number < 4 ? -.36 : .36),
      seat.row * .29,
      -2.45 + seat.row * 1.49
    ];
  }

  function buildRoom(seats, atlas) {
    const vertices = [];
    function vertex(point, normal, color, material, index, uv) {
      vertices.push(...point, ...normal, ...color, material, index, ...uv);
    }
    function quad(points, normals, color, material = 0, index = -1, uvs = [[0,0],[1,0],[1,1],[0,1]]) {
      for (const corner of [0,1,2,0,2,3]) vertex(points[corner], normals[corner], color, material, index, uvs[corner]);
    }
    function box(center, dimensions, hex, radius = 0, material = 0, index = -1, lean = 0) {
      const color = rgb(hex);
      const half = dimensions.map(value => value/2);
      const core = half.map(value => value-radius);
      const grid = half.map((value, axis) => radius ? [-value,-core[axis],core[axis],value] : [-value,value]);
      for (let axis = 0; axis < 3; axis++) {
        const u = (axis + 1) % 3;
        const v = (axis + 2) % 3;
        for (const sign of [-1,1]) {
          for (let i=0; i<grid[u].length-1; i++) {
            for (let j=0; j<grid[v].length-1; j++) {
              const points = [];
              const normals = [];
              for (const [m,n] of [[i,j],[i+1,j],[i+1,j+1],[i,j+1]]) {
                const point = [0,0,0];
                point[axis] = sign * half[axis];
                point[u] = grid[u][m];
                point[v] = grid[v][n];
                const clamped = point.map((value,k) => Math.max(-core[k],Math.min(core[k],value)));
                const normal = radius ? unit(subtract(point,clamped)) : [0,0,0];
                if (!radius) normal[axis] = sign;
                const edge = radius ? add(clamped,scale(normal,radius)) : point;
                edge[2] += edge[1] * lean;
                points.push(add(edge,center));
                normal[1] -= lean * normal[2];
                normals.push(unit(normal));
              }
              quad(points,normals,color,material,index);
            }
          }
        }
      }
    }
    function panel(left,right,bottom,top,z,color,material,uvs) {
      quad([[left,bottom,z],[right,bottom,z],[right,top,z],[left,top,z]],
        Array.from({length:4},() => [0,0,1]),rgb(color),material,-1,uvs);
    }
    function personPart(center, radii, hex) {
      const color = rgb(hex);
      function direction(latitude, longitude) {
        const pitch = (latitude / 8 - .5) * Math.PI;
        const angle = longitude / 12 * Math.PI * 2;
        return [Math.cos(pitch) * Math.cos(angle), Math.sin(pitch), Math.cos(pitch) * Math.sin(angle)];
      }
      for (let latitude = 0; latitude < 8; latitude++) {
        for (let longitude = 0; longitude < 12; longitude++) {
          const samples = [direction(latitude,longitude), direction(latitude,longitude+1),
            direction(latitude+1,longitude+1), direction(latitude+1,longitude)];
          const points = samples.map(sample => sample.map((value, axis) => center[axis] + value * radii[axis]));
          const normals = samples.map(sample => unit(sample.map((value, axis) => value / radii[axis])));
          quad(points, normals, color);
        }
      }
    }
    box([0,-.22,0],[12,.38,15.2],'251619');
    box([0,3.0,-7.27],[12,6,.3],'291719');
    box([0,.13,-5.94],[10.6,.3,2.35],'36251f');
    box([0,.3,-4.78],[10.6,.055,.055],'b2744c',0,.48);
    box([0,2.91,-7.04],[9.7,4.04,.19],'09090d',.045);
    box([0,2.91,-6.92],[9.35,3.76,.12],'7b4742',.03, .27);
    panel(-4.59,4.59,1.08,4.74,-6.847,'ffffff',2);
    box([0,2.83,7.35],[11.15,5.66,.3],'342127',0,4);
    box([0,2.6,7.17],[1.9,2.72,.12],'19151a',0,4);
    box([0,5.64,0],[11.15,.2,14.7],'23171d',0,4);
    for (const side of [-1,1]) {
      box([side*5.56,2.82,-3.35],[.34,5.64,7.8],'281519');
      box([side*5.56,2.82,3.9],[.34,5.64,6.7],'302026',0,4);
      box([side*4.98,2.82,-6.72],[.87,5.64,.46],'621d21');
      for (let i=0;i<7;i++) {
        box([side*(4.61+i*.122),2.8,-6.595],[.115,5.6,.23],i%2 ? '53191b' : '742329',.035);
      }
      for (let i=0;i<4;i++) {
        const z=-5.98+i*1.72;
        box([side*5.36,2.31,z],[.16,3.18,1.28],'4a2227',.022);
        box([side*5.259,2.88,z],[.045,.74,.14],'e7a271',.013,1);
        box([side*5.278,2.88,z],[.05,1.08,.24],'815232',.02,.38);
      }
    }
    for (let row=0;row<5;row++) {
      const y = row*.29;
      const z = -2.45 + row*1.49;
      box([0,(y-.13)/2,z+.14],[10.98,y+.13,1.49],row%2 ? '332021' : '2f1c1f');
      box([0,y-.025,z-.61],[10.98,.075,.055],'564038');
      for (const x of [-4.68,-.55,.55,4.68]) {
        box([x,y+.017,z-.59],[.19,.035,.067],'e09a64',.008,.85);
      }
    }
    for (const [index, seat] of seats.entries()) {
      const [x,y,z] = seatPosition(seat);
      const upholstery = seat.occupied ? ['413538','504247','382c30'] : ['84212b','a32a37','681822'];
      box([x,y+.233,z+.077],[.67,.46,.58],'20191b',.035);
      box([x,y+.48,z-.074],[.79,.23,.65],upholstery[0],.07,0,index);
      box([x,y+.83,z+.285],[.85,.94,.24],upholstery[0],.082,0,index,.16);
      box([x,y+.86,z+.398],[.70,.73,.055],upholstery[2],.018,0,index,.16);
      box([x,y+1.18,z+.344],[.77,.24,.27],upholstery[1],.06,0,index,.16);
      for (const sign of [-1,1]) {
        box([x+sign*.423,y+.55,z+.04],[.105,.44,.64],'272122',.024);
        box([x+sign*.423,y+.78,z+.015],[.143,.105,.72],'4e3b3b',.038);
      }
      const column = index % 8;
      const line = Math.floor(index / 8);
      const u=column/8;
      const v=line/atlas.rows;
      panel(x-.115,x+.115,y+.912,y+1.033,z+.464,'fff4e0',3,
        [[u,v+1/atlas.rows],[u+1/8,v+1/atlas.rows],[u+1/8,v],[u,v]]);
      if (seat.occupied) {
        const offset = index % 3 * .045;
        const coat = ['30384a','4d363d','383d37'][index % 3];
        personPart([x,y+.97,z-.025],[.29,.38,.175],coat);
        personPart([x,y+1.29+offset,z-.035],[.071,.115,.074],'473736');
        personPart([x,y+1.47+offset,z-.06],[.125,.158,.124],index % 2 ? '30282b' : '504041');
        for (const sign of [-1,1]) {
          personPart([x+sign*.13,y+.62,z-.29],[.123,.115,.25],coat);
        }
      }
    }
    return new Float32Array(vertices);
  }

  function buildAtlas(seats) {
    const bitmap = document.createElement('canvas');
    const rows = Math.max(1, Math.ceil(seats.length/8));
    bitmap.width = 512;
    bitmap.height = rows*32;
    const context = bitmap.getContext('2d');
    context.font = '700 19px system-ui, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    for (const [index,seat] of seats.entries()) {
      const x = index % 8 * 64;
      const y = Math.floor(index / 8)*32;
      context.fillStyle = '#2c1e21';
      context.fillRect(x,y,64,32);
      context.fillStyle = seat.occupied ? '#bcaaa5' : '#ffe6ce';
      context.fillText(seat.id,x+32,y+16);
    }
    return {bitmap,rows};
  }

  function create(canvas, seats, onSeat) {
    const gl = canvas.getContext('webgl', {alpha:false, antialias:true, powerPreference:'low-power'});
    if (!gl || typeof ResizeObserver === 'undefined' || seats.length > 64) return null;
    const atlas = buildAtlas(seats);
    const room = buildRoom(seats,atlas);
    const states = new Uint8Array(64*4);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let active = false;
    let camera = overview;
    let destination = overview;
    let animation = 0;
    let frame;
    let graphics;
    let projection;
    let projectionBlocked = false;
    let videoFrame;
    let screenFit;
    let lastVideoTime = -1;
    let drag;
    let lockRequest;
    let looking = false;

    function setLooking(value) {
      if (looking === value) return;
      looking = value;
      canvas.dispatchEvent(new CustomEvent('auditoriumlookchange', {detail:value}));
    }

    function updateLockStatus(status) {
      canvas.dataset.pointerLock = status;
    }

    function stopLooking() {
      setLooking(false);
      const pointer = drag?.id;
      drag = undefined;
      if (pointer !== undefined && canvas.hasPointerCapture(pointer)) canvas.releasePointerCapture(pointer);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
    }

    function shader(type, source) {
      const result = gl.createShader(type);
      gl.shaderSource(result, source);
      gl.compileShader(result);
      if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(result));
      }
      return result;
    }

    function setup() {
      const program = gl.createProgram();
      const vertex = shader(gl.VERTEX_SHADER, vertexSource);
      const fragment = shader(gl.FRAGMENT_SHADER, fragmentSource);
      gl.attachShader(program,vertex);
      gl.attachShader(program,fragment);
      gl.linkProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      gl.enable(gl.DEPTH_TEST);
      gl.clearColor(.071,.044,.053,1);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,room,gl.STATIC_DRAW);
      let offset=0;
      for (const [name,size] of [['aPosition',3],['aNormal',3],['aColor',3],['aDecoration',2],['aUv',2]]) {
        const location = gl.getAttribLocation(program,name);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location,size,gl.FLOAT,false,52,offset*4);
        offset+=size;
      }
      const uniforms = Object.fromEntries(
        ['uEye','uRight','uUp','uForward','uLens','uFrameShift','uStates','uLabels','uScreen','uScreenFit','uInside','uHasVideo']
          .map(name => [name,gl.getUniformLocation(program,name)])
      );
      function texture(slot,uniform) {
        const result = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0+slot);
        gl.bindTexture(gl.TEXTURE_2D,result);
        for (const axis of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D,axis,gl.CLAMP_TO_EDGE);
        for (const filter of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER]) gl.texParameteri(gl.TEXTURE_2D,filter,slot ? gl.LINEAR : gl.NEAREST);
        gl.uniform1i(uniform,slot);
        return result;
      }
      const palette = texture(0,uniforms.uStates);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,64,1,0,gl.RGBA,gl.UNSIGNED_BYTE,states);
      texture(1,uniforms.uLabels);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,atlas.bitmap);
      const screen = texture(2,uniforms.uScreen);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));
      graphics = {uniforms,palette,screen};
      lastVideoTime = -1;
      screenFit = undefined;
    }

    function stopProjectionFrames() {
      if (videoFrame === undefined) return;
      if (projection.cancelVideoFrameCallback) projection.cancelVideoFrameCallback(videoFrame);
      else cancelAnimationFrame(videoFrame);
      videoFrame = undefined;
    }

    function showVideoFrame() {
      if (!graphics || !projection || projectionBlocked || projection.readyState < 2 || !projection.videoWidth) return;
      if (lastVideoTime === projection.currentTime) return;
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D,graphics.screen);
      try {
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,projection);
      } catch (error) {
        projectionBlocked = true;
        screenFit = undefined;
        canvas.dispatchEvent(new CustomEvent('auditoriumprojectionerror', {detail:error.name}));
        return;
      }
      const aspect = projection.videoWidth / projection.videoHeight;
      const screenAspect = 9.18 / 3.66;
      screenFit = [Math.min(1,aspect/screenAspect), Math.min(1,screenAspect/aspect)];
      lastVideoTime = projection.currentTime;
    }

    function scheduleProjectionFrame() {
      if (!active || !graphics || !projection || projectionBlocked || videoFrame !== undefined) return;
      function drawFrame() {
        videoFrame = undefined;
        render();
        scheduleProjectionFrame();
      }
      if (projection.requestVideoFrameCallback) videoFrame = projection.requestVideoFrameCallback(drawFrame);
      else if (!projection.paused) videoFrame = requestAnimationFrame(drawFrame);
    }

    function updateProjection() {
      render();
      scheduleProjectionFrame();
    }

    const projectionEvents = ['playing','loadeddata','seeked'];
    function setVideo(video) {
      if (video === projection) return;
      stopProjectionFrames();
      for (const event of projectionEvents) projection?.removeEventListener(event, updateProjection);
      projection = video;
      projectionBlocked = false;
      screenFit = undefined;
      lastVideoTime = -1;
      for (const event of projectionEvents) projection?.addEventListener(event, updateProjection);
      updateProjection();
    }

    function basis(view, aspect) {
      const forward = unit(subtract(view.target,view.eye));
      const right = unit(cross(forward,[0,1,0]));
      const up = cross(right,forward);
      const lens = Math.max(view.lens, .44/aspect);
      return {forward,right,up,fx:1/(lens*aspect),fy:1/lens};
    }

    function render() {
      if (!active || !graphics) return;
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1,1.65);
      const width = Math.round(bounds.width*dpr);
      const height = Math.round(bounds.height*dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const {forward,right,up,fx,fy} = basis(camera,width/height);
      const {uniforms} = graphics;
      showVideoFrame();
      gl.viewport(0,0,width,height);
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      for (const [name,value] of [['uEye',camera.eye],['uForward',forward],['uRight',right],['uUp',up]]) {
        gl.uniform3fv(uniforms[name],value);
      }
      gl.uniform2f(uniforms.uLens,fx,fy);
      gl.uniform1f(uniforms.uFrameShift,frameShift);
      gl.uniform1i(uniforms.uInside, camera.eye[2] < 7);
      gl.uniform1i(uniforms.uHasVideo, Boolean(screenFit));
      gl.uniform2fv(uniforms.uScreenFit, screenFit || [1,1]);
      gl.drawArrays(gl.TRIANGLES,0,room.length/13);
    }

    function go(view) {
      destination = view;
      cancelAnimationFrame(frame);
      animation += 1;
      if (!active || media.matches) {
        camera = view;
        render();
        return;
      }
      const start = camera;
      const token = animation;
      const begin = performance.now();
      function tick(now) {
        if (!active || token !== animation) return;
        const progress = Math.min(1,(now-begin)/540);
        const t = 1-(1-progress)**3;
        const lerp = (a,b) => a+(b-a)*t;
        camera = {
          eye:start.eye.map((value,index) => lerp(value,view.eye[index])),
          target:start.target.map((value,index) => lerp(value,view.target[index])),
          lens:lerp(start.lens,view.lens)
        };
        render();
        if (progress < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }

    function showSeat(id) {
      const seat = seats.find(item => item.id === id);
      if (!seat) return;
      const [x,y,z] = seatPosition(seat);
      canvas.style.cursor = '';
      go({eye:[x,y+1.25,z+.08],target:[0,2.79,-6.9],lens:.8});
    }

    function look(horizontal, vertical) {
      if (!active || destination === overview) return;
      cancelAnimationFrame(frame);
      const forward = unit(subtract(destination.target,destination.eye));
      const yaw = Math.atan2(forward[0],-forward[2]) + horizontal;
      const pitch = Math.max(-1.25,Math.min(1.25,Math.asin(forward[1]) + vertical));
      const direction = [Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];
      camera = {...destination,target:add(destination.eye,direction)};
      destination = camera;
      render();
    }

    function seatAt(event) {
      if (!active || destination !== overview || camera !== overview && Math.hypot(...subtract(camera.eye,overview.eye)) > .035) return;
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const {forward,right,up,fx,fy} = basis(camera,bounds.width/bounds.height);
      const x = ((event.clientX-bounds.left)/bounds.width*2-1)/fx;
      const y = (1-(event.clientY-bounds.top)/bounds.height*2-frameShift)/fy;
      const ray = add(forward,add(scale(right,x),scale(up,y)));
      let selected;
      let nearest = Infinity;
      for (const seat of seats) {
        const p = seatPosition(seat);
        const minimum = add(p,[-.45,.31,-.47]);
        const maximum = add(p,[.45,1.31,.50]);
        let near = 0;
        let far = Infinity;
        for (let axis=0;axis<3;axis++) {
          if (Math.abs(ray[axis]) < .000001) {
            if (camera.eye[axis] < minimum[axis] || camera.eye[axis] > maximum[axis]) far = -1;
            continue;
          }
          const distances = [minimum[axis],maximum[axis]].map(value => (value-camera.eye[axis])/ray[axis]);
          near = Math.max(near,Math.min(...distances));
          far = Math.min(far,Math.max(...distances));
        }
        if (near <= far && near < nearest) {
          nearest = near;
          selected = seat;
        }
      }
      return selected;
    }

    try {
      setup();
    } catch (error) {
      console.warn('Impossible d’initialiser le rendu 3D de la salle.', error);
      return null;
    }
    let start;
    canvas.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      if (destination === overview) {
        start = {x:event.clientX, y:event.clientY, moved:false};
      } else {
        start = undefined;
        drag = {id:event.pointerId, x:event.clientX, y:event.clientY, mouse:event.pointerType === 'mouse'};
        canvas.setPointerCapture(event.pointerId);
      }
    });
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === canvas) {
        const requestingDrag = lockRequest;
        lockRequest = undefined;
        if (!drag || requestingDrag !== drag || !active || destination === overview) {
          document.exitPointerLock();
          return;
        }
        updateLockStatus('locked');
      } else if (canvas.dataset.pointerLock === 'locked') {
        updateLockStatus('idle');
        stopLooking();
      }
    });
    function lockFailed(error) {
      if (error?.message) {
        console.warn('Verrouillage du curseur refusé.', error.name, error.message);
        canvas.dataset.pointerLockError = error.name;
      }
      if (!lockRequest) return;
      lockRequest = undefined;
      updateLockStatus('unavailable');
    }
    canvas.addEventListener('mousedown', event => {
      if (event.button !== 0 || !active || destination === overview || !drag?.mouse || lockRequest ||
          document.pointerLockElement === canvas) return;
      lockRequest = drag;
      delete canvas.dataset.pointerLockError;
      try {
        if (canvas.requestPointerLock) canvas.requestPointerLock()?.catch(lockFailed);
        else lockFailed();
      } catch (error) {
        lockFailed(error);
      }
    });
    document.addEventListener('pointerlockerror', lockFailed);
    document.addEventListener('mouseup', event => {
      if (event.button === 0 && drag?.mouse) stopLooking();
    });
    window.addEventListener('blur', stopLooking);
    canvas.addEventListener('mousemove', event => {
      if (drag?.mouse && document.pointerLockElement === canvas) {
        if (!(event.buttons & 1)) {
          stopLooking();
          return;
        }
        if (event.movementX || event.movementY) setLooking(true);
        look(event.movementX*.006,-event.movementY*.006);
      }
    });
    for (const type of ['pointerup','pointercancel','lostpointercapture']) {
      canvas.addEventListener(type, event => {
        if (type === 'pointercancel') start = undefined;
        if (drag?.id !== event.pointerId) return;
        if (type === 'lostpointercapture' && drag.mouse && (lockRequest === drag || document.pointerLockElement === canvas)) return;
        stopLooking();
      });
    }
    canvas.addEventListener('pointermove', event => {
      if (start && Math.hypot(event.clientX-start.x,event.clientY-start.y) >= 10) start.moved = true;
      if (drag?.id === event.pointerId) {
        if (document.pointerLockElement === canvas) return;
        const sensitivity = drag.mouse ? .006 : -.006;
        if (event.clientX !== drag.x || event.clientY !== drag.y) setLooking(true);
        look((event.clientX-drag.x)*sensitivity,(drag.y-event.clientY)*sensitivity);
        drag.x = event.clientX;
        drag.y = event.clientY;
        return;
      }
      if (destination !== overview) return;
      if (event.pointerType === 'mouse') {
        const seat = seatAt(event);
        canvas.style.cursor = seat && !seat.occupied ? 'pointer' : '';
      }
    });
    canvas.addEventListener('keydown', event => {
      if (destination === overview) return;
      const offset = {ArrowLeft:[-.13,0],ArrowRight:[.13,0],ArrowUp:[0,.13],ArrowDown:[0,-.13]}[event.key];
      if (!offset) return;
      event.preventDefault();
      setLooking(true);
      look(...offset);
    });
    canvas.addEventListener('keyup', event => {
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) setLooking(false);
    });
    canvas.addEventListener('blur', stopLooking);
    canvas.addEventListener('click', event => {
      const press = start;
      start = undefined;
      if (!active || !press || press.moved || Math.hypot(event.clientX-press.x,event.clientY-press.y) >= 10) return;
      if (destination === overview) {
        const seat = seatAt(event);
        if (seat && !seat.occupied) onSeat(seat.id);
      }
    });
    new ResizeObserver(render).observe(canvas);
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      stopLooking();
      stopProjectionFrames();
      graphics = undefined;
      cancelAnimationFrame(frame);
    });
    canvas.addEventListener('webglcontextrestored', () => {
      try { setup(); camera = destination; updateProjection(); } catch { graphics = undefined; }
    });

    return {
      showSeat,
      setVideo,
      showOverview() { stopLooking(); go(overview); },
      setSelection(ids) {
        const selection = new Set(ids);
        for (const [index,seat] of seats.entries()) states[index*4] = selection.has(seat.id) ? 255 : 0;
        if (!graphics) return;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,graphics.palette);
        gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,64,1,gl.RGBA,gl.UNSIGNED_BYTE,states);
        render();
      },
      activate() { active = true; updateProjection(); },
      deactivate() {
        active = false;
        cancelAnimationFrame(frame);
        stopProjectionFrames();
        stopLooking();
        camera = destination;
      }
    };
  }

  window.CinemaAuditorium = {create};
})();
