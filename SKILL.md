---
name: prototypage-ux
description: "Cadre, conçoit, teste et améliore un prototype d’interface web ou mobile. À utiliser pour explorer un parcours UX, créer un wireframe ou une maquette Figma cliquable, coder une interaction à valider, ou évaluer un prototype existant."
---

# Prototypage UX

Méthode adaptée de *Prototyper en 2026 — Ergonomie, UX, maquettage*, de Loïc Le Lay. Pour une demande ciblée, utilise les sections qui éclairent la décision à prendre. Pour un prototype complet, pars du problème, trace le parcours, choisis la fidélité, compose, vérifie et itère. Les tests peuvent conduire à revoir le parcours ou le problème lui-même.

Consulte [Ateliers et démonstrations](references/ateliers-et-demonstrations.md) pour rejouer les comparaisons du cours, utiliser ses grilles de benchmark et de test, retrouver son exemple de prompt Ciné Lumière et appliquer les 22 critères de la grille de finition.

## 1. Comprendre l’usage

Commence par le modèle mental. Avant l’action, que pense la personne qu’il va se passer ? Après l’action, comment sait-elle ce qui s’est passé ? Dans une interface conversationnelle, reformule ce que le système a compris et rends visibles les actions effectuées ou à confirmer.

| Principe du cours | Décision à prendre ou vérification à faire |
| --- | --- |
| Charge cognitive | Compte les décisions demandées au même moment. Regroupe les champs liés, diffère les choix secondaires et propose une valeur initiale quand elle aide et reste modifiable. Compare le formulaire d’un seul bloc au même formulaire par étapes. |
| Pareto et Occam | Plisse les yeux ou floute légèrement l’écran. Le titre, l’information clé et l’action doivent émerger. Entre deux parcours équivalents, garde celui qui demande le moins d’étapes ou d’explications. |
| Miller et position sérielle | Regroupe les options en unités lisibles et rends l’essentiel facile à retrouver, notamment aux extrémités des listes. Évite de traiter un nombre d’éléments comme une limite universelle. |
| Gestalt | Utilise la proximité pour lier un titre à son contenu, la similarité pour unifier des contrôles, la continuité pour guider le regard, la clôture pour suggérer la suite et une région commune pour regrouper les éléments d’une carte. |
| Tâche inachevée | Montre le travail restant et donne un point de reprise direct. Exemple du cours : un profil à quatre étapes sur cinq avec l’étape précise à terminer. |
| Gradient de but | Rends la fin perceptible et reconnais les étapes déjà accomplies. Affiche une progression qui correspond à de vraies actions. |
| Hick-Hyman | Réduis le nombre de décisions simultanées. Si plusieurs options restent utiles, hiérarchise-les ou explique une recommandation. |
| Fitts | Agrandis les cibles prioritaires, espace-les et place-les près du geste suivant. Sur mobile, vérifie la portée du pouce et prends les 44 points du cours comme repère de conception pour les cibles tactiles, à adapter à la plateforme. |
| Postel et Parkinson | Accepte les formulations et formats courants, normalise l’entrée puis rends la réponse précise. Exemple : « 2 places pour Dune demain soir » donne une proposition de séance à confirmer. Repère les demandes de reformulation évitables. |
| Doherty | Donne un retour rapide au geste. Le cours utilise environ 400 ms comme repère de perception. Pour une action réversible adaptée à une mise à jour optimiste, montre le résultat immédiatement et rétablis un état cohérent si le serveur refuse. |
| Jakob | Reprends un motif connu des utilisateurs et applique les composants, libellés et règles propres au produit. |
| Pic et fin | Identifie le moment le plus stressant et la dernière impression. Exemple : prévenir d’un retard, puis indiquer clairement la résolution. |
| Esthétique et utilisabilité | Évalue la réussite réelle de la tâche en plus de la simplicité perçue. Deux habillages d’un même parcours peuvent donner des impressions différentes. |
| Fogg | Examine motivation, capacité et déclencheur ensemble. Si la tâche bloque, essaie d’abord de réduire l’effort nécessaire, puis mesure l’effet du rappel. |
| Nudge et dark patterns | Vérifie que les prix et les conditions sont visibles, que les recommandations reposent sur des faits et que refuser reste simple. Repère les faux comptes à rebours, options payantes précochées, refus culpabilisants et résiliations difficiles à trouver. |

## 2. Cadrer

### Observer et comparer

- Fais un benchmark en quatre temps. Identifie des produits pertinents et lis leurs avis négatifs. Évalue-les sur la même grille, avec ergonomie, navigation, réactivité, accessibilité et esthétique. Rejoue la même tâche en conditions proches de l’usage. Synthétise à partir des captures et observations vérifiables.
- Utilise les entretiens pour faire raconter un épisode concret, les enquêtes pour comparer des réponses à plus grande échelle, l’observation pour voir les comportements dans leur contexte et le shadowing pour suivre la personne tout au long de la tâche. L’IA peut transcrire et proposer un premier regroupement des verbatims. Vérifie les formulations et les constats dans les originaux. Les utilisateurs simulés peuvent servir à préparer le guide d’entretien. La validation repose sur les personnes concernées.
- Pour reprendre l’atelier du cours, fais chercher deux places de cinéma côte à côte pour samedi soir dans une vraie app, jusqu’à l’étape qui précède le paiement. Une personne verbalise, l’autre note hésitations, retours en arrière et mots ambigus. Relève trois réussites, trois difficultés et une idée à explorer.

### Passer des observations au brief

- **Persona.** Décris le contexte, le besoin, les habitudes et les obstacles qui changent le design. Relie chaque constat à sa source, par exemple un entretien, un sondage ou des données d’usage. Identifie les suppositions à vérifier.
- **Carte d’expérience.** Mets les étapes en colonnes. Pour chacune, note les actions, points de contact, attentes, émotions, difficultés et pistes. Une carte d’empathie peut préciser ce que la personne dit, pense, fait et ressent, en distinguant observation et interprétation.
- **Brief.** Écris une question « Comment pourrions-nous… ? », un besoin sous la forme « Quand…, je veux…, afin de… », un critère observable et les contraintes. Exemple : la personne trouve deux sièges contigus et comprend le prix total avant de confirmer, sans aide.
- **Inclusion.** Définis les contextes à couvrir dès le brief. Pense aux limitations visuelles, motrices, auditives ou cognitives, permanentes, temporaires ou situationnelles, ainsi qu’à la langue, au sens de lecture et à l’appareil.
- **Idéation.** Explore plusieurs réponses par brainstorming, carte mentale, croquis rapides comme le Crazy 8 ou scénarios d’usage. L’IA peut élargir l’exploration. Compare les pistes sur le même scénario et conserve celles qui répondent le mieux aux contraintes et au critère de succès.
- **Inspiration.** Cherche des parcours complets dans des produits réels pour résoudre un problème de navigation. Utilise les concepts et moodboards pour explorer la direction visuelle. Le cours donne Mobbin, Page Flows et Refero comme exemples de références de parcours.
- **User flow.** Trace l’entrée, les actions, les décisions et la fin observable. Ajoute les branches significatives, comme réserver sans compte, changer de séance ou reprendre après un paiement refusé. Distingue les nouveaux écrans des états d’un même écran.

## 3. Prototyper

### Régler la fidélité et la navigation

| Question à vérifier | Support |
| --- | --- |
| Quelles zones et informations doivent apparaître ? | Zoning ou croquis. |
| Dans quel ordre lire et agir ? | Wireframe avec contenu représentatif et parcours annoté. |
| Le contenu, la hiérarchie et le style sont-ils compréhensibles ? | Maquette visuelle avec textes, formats et variantes réalistes. |
| Les choix, états et enchaînements sont-ils compréhensibles ? | Prototype cliquable avec branches et retours. |
| Le geste, la latence, le responsive, l’haptique ou les données influencent-ils le résultat ? | Prototype codé sur le support cible. |

Respecte le format demandé. Sinon, choisis la fidélité minimale qui permet d’observer le résultat. Adapte la navigation au nombre de destinations et à la largeur. Le cours propose une barre d’onglets pour trois à cinq destinations principales sur mobile, un rail sur écran large, un drawer si de nombreuses sections doivent être rangées, et une feuille inférieure pour le détail d’un objet. Donne un équivalent visible aux gestes de fermeture, de retour ou de glissement.

### Construire sur un design system

- Pars des principes du produit, de ses tokens, de ses composants et de ses motifs. Consulte les conventions de la plateforme lorsqu’elles éclairent le parcours. Le cours cite les Human Interface Guidelines, Material et Carbon.
- Dans Figma, utilise des frames nommées, puis l’auto layout pour la direction, l’espacement et les marges. Choisis un dimensionnement fixe, Hug ou Fill selon la relation au contenu et au parent. Redimensionne le composant pour contrôler son comportement.
- Sépare les valeurs de base des variables sémantiques. Associe par exemple la couleur de l’action principale à un rôle, puis règle sa valeur par mode clair, sombre ou marque. Lie les composants aux rôles et conserve des noms correspondants dans le code lorsque le système le permet.
- Modélise les propriétés utiles du composant, par exemple taille, type, icône, libellé et état. Examine les variants requis par le parcours, dont sélection, focus, indisponibilité ou chargement.
- Dans le prototype Figma, utilise Smart Animate pour la continuité des calques, les overlays pour les modales et les menus, et les variables, conditions et composants interactifs pour les états de panier, de connexion ou de formulaire.
- Pour passer au code, réutilise les composants existants. Essaie des données représentatives, dont textes longs, grandes valeurs et listes vides. Reproduis les délais, le hors-ligne ou les gestes utiles au test. Documente ce qui est simulé et indique l’usage prévu du prototype. Toute reprise en production demande une évaluation de la qualité du code, de la sécurité, des performances et de la maintenance.

### Générer avec un brief exploitable

Le cours distingue les canevas de design, les générateurs d’écrans et d’apps et les assistants de code. Choisis d’après le livrable et le phénomène à observer. Les exemples du cours incluent Figma et Figma Make, Stitch, v0, Lovable, Bolt, Claude et Cursor.

Pour une génération, prépare le brief, le persona et le parcours. Spécifie un écran ou une décision à la fois pour faciliter la comparaison et les corrections.

```text
Écran et rôle dans le parcours
Personne et contexte
Tâche et critère de réussite
Contenu exact ou représentatif
Plateforme, formats d’écran et contraintes
Système à suivre, composants et variables
États à montrer et comportement des actions
```

Explore plusieurs variantes quand le choix est ouvert, par exemple trois. Compare-les sur le même scénario, puis corrige par demandes précises. Pour documenter le système, réutilise le `DESIGN.md` du projet ou transmets les mêmes éléments dans le brief. Décris les tokens, la typographie, les espacements, la forme, les composants, les motifs et les règles écrites qui dictent leur usage. Quand le projet les utilise, MCP donne accès au contexte de design et Code Connect relie les composants Figma à leurs équivalents dans le code. Note les prompts et décisions quand le livrable exige un journal.

## 4. Composer

- **Hiérarchie.** Commence par la taille, le contraste et l’espace blanc. Utilise proximité et répétition pour grouper. Vérifie l’ordre de lecture selon la langue et le support. Les schémas en F ou en Z et la règle des tiers sont des repères de composition, à choisir selon le contenu.
- **Couleur.** Essaie une harmonie analogue, complémentaire, triadique, complémentaire divisée ou tétradique. Choisis une dominante et réserve les autres couleurs aux accents et aux rôles. Décline une teinte par sa saturation et sa luminosité avant d’ajouter une couleur.
- **Typographie.** Établis une échelle pour texte, titres et niveaux intermédiaires. Le cours compare un ratio discret de 1,125 pour une interface dense à 1,333 ou plus pour une hiérarchie éditoriale. Vérifie le résultat sur du contenu représentatif.
- **Grilles.** Les grilles de 4, 8 et 12 colonnes du cours servent à explorer les compositions étroites, intermédiaires et larges. Réorganise les blocs avec la largeur. Vérifie l’ordre de lecture, les alignements, le zoom et les débordements.
- **Hero.** Quand une page en a besoin, formule une promesse propre au produit, appuie-la par un élément concret et fais émerger l’action principale. Vérifie qu’on comprend le produit au premier regard.
- **Matériaux.** Le cours compare Liquid Glass, qui laisse le contenu passer sous la navigation, à Material 3 Expressive, qui emploie des formes et mouvements de transition. Évalue ces traitements sur le contenu réel, le contraste et la lisibilité.
- **Accessibilité.** Mesure le contraste. Les repères du cours sont 4,5:1 pour le texte courant et 3:1 pour le grand texte et les parties pertinentes des composants. Teste les statuts sans couleur, le zoom avec redistribution du contenu, le clavier et son focus, les libellés pour lecteur d’écran et la réduction des animations. Pour un audit formel, utilise le référentiel demandé par le projet.

## 5. Peaufiner

| Point à examiner | Geste de conception et exemple |
| --- | --- |
| Contenu et choix visuels | Remplace les promesses génériques, les chiffres non vérifiés et les décorations sans fonction. Une carte peut dire « Ce soir, 20 h 30 » et « Réserver une place », avec les conditions utiles avant l’action. |
| Mouvement | Fais répondre, guider ou attirer l’attention au bon moment. Essaie une indication ponctuelle après une hésitation et vérifie la version à animations réduites. |
| Haptique | Distingue sélection, validation et résultat. Associe la vibration à un changement visible et vérifie sur l’appareil cible si le geste compte pour le test. |
| Geste direct | Pour un swipe, fais suivre le doigt, rends le seuil perceptible et ramène l’objet si le geste est interrompu. Vérifie aussi la commande équivalente. |
| Continuité | Fais évoluer le même objet quand cela aide à suivre le changement. Exemple : « Ajouter au panier » devient un sélecteur de quantité, ou un mini-lecteur s’agrandit. |
| Illustration et icônes | Choisis une image liée au sujet ou à l’usage. Accorde le trait, les terminaisons et la graisse des icônes à la typographie. |
| Trois réponses | Pour une action importante, montre qu’elle a été prise en compte, donne le résultat et indique la suite. Après l’archivage, la ligne part, « Archivé » s’affiche avec « Annuler » et la sélection passe au message suivant. |
| Une intention par écran | Hiérarchise selon la tâche. Une feuille à crans peut montrer un lieu et ses détails tout en gardant la carte visible. |
| États du système | Prévois les états initial, vide, chargement, succès, erreur ou hors ligne selon le flux. Pour une synchronisation, indique le travail en cours, puis le résultat, et laisse le contenu précédent lisible si elle échoue. |
| Récupération | Conserve les saisies. Indique ce qui a échoué, propose de réessayer et rends les suppressions réversibles lorsque le parcours le permet. |
| Densité | Essaie peu et beaucoup de contenu. Ajuste la densité par paliers tout en conservant un alignement stable. |
| Visuel et texte | Utilise le visuel pour transmettre l’information d’un coup d’œil et un libellé bref pour lever l’ambiguïté. |

Utilise cette grille en revue de prototype. Pour chaque point pertinent, repère l’écran et l’état, décris le défaut observable, puis rejoue l’action après correction.

## 6. Tester, transmettre et livrer

1. **Préparer.** Choisis un objectif, des participants représentatifs, un scénario réaliste et le support cible. Le cours propose des séries courtes, par exemple cinq personnes par itération, avec correction entre les séries. Adapte le format à la question. Un test modéré aide à comprendre les hésitations. Un test non modéré demande des consignes autonomes. Le laboratoire facilite l’observation contrôlée et le test à distance montre l’usage dans son contexte. Pour les gestes et les délais, essaie le prototype codé sur l’appareil cible.
2. **Introduire.** Rassure la personne sur le fait que le prototype est évalué. Donne un objectif tel que « Trouvez deux places côte à côte pour samedi soir ». Laisse le participant découvrir les commandes.
3. **Observer.** Invite la personne à penser à voix haute. Consigne la tâche, l’étape, le comportement observé, le résultat et l’aide éventuellement donnée. Observe les hésitations, les retours en arrière, les erreurs et la réussite avant d’intervenir. Rejoue aussi les branches et les tailles d’écran prévues.
4. **Débriefer.** Demande ce que la personne attendait à un moment précis et comment elle a compris le résultat. Rapproche ses explications des comportements observés.
5. **Synthétiser et retester.** Classe les difficultés par gravité et fréquence. Corrige en priorité les blocages et les erreurs difficiles à réparer. Rejoue le scénario, puis reteste si possible. Si aucun test utilisateur n’a eu lieu, livre le protocole et une grille vierge. Identifie les vérifications techniques déjà réalisées.
6. **Transmettre.** Fournis un point d’entrée, les scénarios rejouables, les choix et les simulations. Rends identifiables les variables, composants, variants, ressources et règles responsive. Dans un projet Figma, Dev Mode facilite l’inspection, les annotations et l’export. Selon le projet, complète avec Code Connect, MCP, commentaires et liens vers les versions. Réinjecte les corrections réutilisables dans le système.

## Exercice Ciné Lumière

Applique cette section aux demandes portant sur l’exercice du cours. Ciné Lumière est un multiplexe de 12 salles. Conçois le parcours mobile d’abord, puis une mise en page adaptée aux grands téléphones et aux tablettes. Couvre les films à l’affiche, la fiche, les séances, le plan de salle, le paiement, le billet sur téléphone, le compte, la carte d’abonné et l’historique. Prévois une séance complète, une annulation et un paiement refusé. Le parcours détermine le nombre d’écrans. Pour explorer le grand écran, le cours donne l’exemple d’une fiche film et de ses séances affichées côte à côte.

Regroupe les six livrables derrière un lien unique.

1. Brief et persona sur une page.
2. Parcours utilisateur.
3. Prototype cliquable sur mobile et grand écran.
4. Variables et composants.
5. Test avec trois personnes et version améliorée.
6. Journal des outils, prompts et choix.

| Critère du cours | Points |
| --- | ---: |
| Brief et persona | 2 |
| Parcours utilisateur | 2 |
| Prototype mobile | 4 |
| Grand écran | 2 |
| Soin visuel | 3 |
| Lois de l’usage et accessibilité | 2 |
| Variables et composants | 2 |
| Test et version améliorée | 1 |
| Journal | 1 |
| Total du travail | 19 |
| Vote du public après les présentations, chacun vote pour un autre projet | +1 |

Pour une autoévaluation, documente la preuve observable par critère. Réserve le point du public au résultat du vote réel.
