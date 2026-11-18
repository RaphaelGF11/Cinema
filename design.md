# Ciné Lumière — Liquid Glass

Ciné Lumière est un multiplexe de 12 salles. Son interface doit permettre de trouver deux places côte à côte et de comprendre le prix total avant de confirmer. La direction visuelle associe le papier ivoire et l’encre noire d’une affiche sérigraphiée, un rouge signal et des commandes flottantes.

La [planche interactive](design.html) présente les fondations et une réservation fictive. Les prix, horaires et disponibilités sont des données de démonstration.

## Mise en scène du film

L’ouverture occupe toute la largeur et présente *Les Heures bleues* avec un photogramme fictif, le genre, la durée, un synopsis bref et l’action « Voir les séances ». La navigation vitrée occupe le premier plan. Le photogramme est un visuel d’ambiance et le texte porte les informations du film.

Le cadrage conserve la projectionniste sur la droite sur grand écran. Sur mobile, le photogramme couvre toute la hauteur visible, jusque derrière les deux barres flottantes. Le cadrage se resserre autour du sujet. Le titre et l’action restent au-dessus de la navigation, avec un espace qui tient compte de la zone sûre de l’écran. Un dégradé sombre protège la lecture du titre ivoire dans les deux thèmes. Le bouton reprend la couleur d’action du thème actif. La réservation suit directement le photogramme. Le choix de siège évoque une salle avec un écran lumineux qui reprend le photogramme, des murs dans l’ombre et des fauteuils délimités. Ce décor reste sombre dans les deux thèmes, tandis que la sélection reprend la couleur d’action du thème actif. Les comparatifs de matière et les nuanciers apparaissent sous la réservation.

## Matière et hiérarchie

Le fond et les panneaux de contenu sont opaques. Les films apportent la couleur et la profondeur. Le verre forme la couche des commandes flottantes, comme la barre de navigation ou le récapitulatif. Utiliser une seule surface vitrée par groupe de commandes, avec un contour de 0,75 px qui suit son rayon. Le reflet part du coin supérieur gauche, s’atténue vers le bas et reste cantonné au bord. Une ombre courte détache la commande du fond. Le contour uni sert de repli si le masque CSS est indisponible. En mode de couleurs forcées, le contour prend la couleur du texte système.

Le verre standard est le réglage courant. La variante claire augmente la transparence au-dessus d’un visuel et applique un voile de 20 % adapté au thème. La variante opaque sert de repli et de mode de comparaison. Vérifier le contraste sur chaque image. Cette adaptation web utilise le flou d’arrière-plan et une teinte CSS. [Apple Human Interface Guidelines — Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

## Thèmes et variables

**Affiche sérigraphiée** associe papier ivoire, rouge signal et encre noire. **Sérigraphie de nuit** reprend le même rouge signal sur un fond noir d’encre, avec des textes ivoire. Sur le thème clair, le bouton utilise un rouge plus foncé pour assurer le contraste avec le texte blanc. La planche suit la préférence claire ou sombre du navigateur à l’ouverture et permet de changer de thème sans interrompre la réservation. La section « Nuanciers » affiche les deux palettes côte à côte sur grand écran, avec un aplat, un rôle et un code hexadécimal par couleur.

| Variable CSS | Affiche sérigraphiée | Sérigraphie de nuit | Rôle |
| --- | --- | --- | --- |
| `--canvas` | `#fff9eb` | `#171412` | Fond général |
| `--surface` | `#f5ebd7` | `#292320` | Cartes et repli opaque |
| `--decor` | `#e63929` | `#703029` | Décor |
| `--signal` | `#e63929` | `#e63929` | Rouge de marque |
| `--accent` | `#b51c18` | `#e63929` | Action principale et sélection |
| `--on-accent` | `#ffffff` | `#120c09` | Texte sur l’accent |
| `--ink` | `#241714` | `#fff9eb` | Texte principal et focus |
| `--muted` | `#65483d` | `#d8c9b6` | Métadonnées |
| `--danger` | `#9f1524` | `#ffabb9` | Erreur et annulation |
| `--success` | `#215a3a` | `#a4e5be` | Confirmation |
| `--line` | `#8d695c` | `#a18d7c` | Contours des commandes et de l’onglet actif |
| `--panel-line` | `#c9ad96` | `#56473c` | Contours des panneaux et des nuanciers |
| `--glass` | `rgb(245 235 215 / 42%)` | `rgb(41 35 32 / 34%)` | Verre standard |
| `--glass-clear` | `rgb(245 235 215 / 26%)` | `rgb(41 35 32 / 22%)` | Verre plus transparent |
| `--veil` | `rgb(255 249 235 / 20%)` | `rgb(0 0 0 / 20%)` | Voile du visuel sous le verre clair |
| `--rim` | `rgb(101 72 61 / 17%)` | `rgb(255 249 235 / 15%)` | Contour intermédiaire et repli uni |
| `--rim-light` | `rgb(255 255 255 / 46%)` | `rgb(255 249 235 / 28%)` | Reflet en haut à gauche |
| `--rim-shade` | `rgb(101 72 61 / 9%)` | `rgb(255 249 235 / 7%)` | Partie basse du contour |
| `--glass-shadow` | `rgb(56 34 22 / 10%)` | `rgb(9 6 4 / 14%)` | Ombre sous le verre |

Les deux thèmes partagent un flou de 12 px (`--blur`), un rayon de 24 px pour les panneaux (`--radius`) et une transition de 180 ms (`--motion`).

Instrument Serif porte les grands titres. DM Sans sert aux commandes et au texte courant, à 16 px. Les métadonnées restent à 14 px minimum. Espacements de référence de 4, 8, 16, 24, 32 et 48 px. Les commandes ont une zone active d’au moins 44 × 44 px et une forme de capsule.

## Affiches sur smartphone

Sur téléphone et écran tactile, la maquette occupe toute la largeur du navigateur. Sur grand écran avec souris, elle reste centrée dans un cadre de 480 px. La maquette mobile présente dix films de 2026, chacun avec un extrait MP4 local. L’extrait du film actif se lance en muet. La vidéo nette est décalée vers le haut et son image floutée prolonge le cadre en haut et en bas. Le dégradé Liquid Glass couvre les 86 % inférieurs de la carte. Il démarre transparent sur la vidéo, puis devient plus dense derrière les métadonnées, le titre et le synopsis. Il reprend l’encre noire en thème sombre et l’ivoire en thème clair. L’affiche du film est encadrée au-dessus du titre et reprise dans les résultats de recherche. Les affiches proviennent des fiches Rotten Tomatoes. Les photogrammes servent de repli au lecteur et au visuel de la fiche. Le cadre et le dégradé disparaissent en mode immersif. Chaque extrait repart à zéro quand on revient sur son film. L’extrait tourne en boucle sur son film. À la première fin, un rappel invite à glisser vers le haut. En mode interface masquée, une barre fine avec un curseur permet de changer la position de lecture. Un toucher met en pause ou relance la vidéo avec un pictogramme animé. Un double toucher masque les commandes et anime le recadrage vers un carré aussi large que l’écran. Les zones libres affichent la même image en flou, synchronisée avec la lecture. Un second double toucher réaffiche les commandes et rétablit le recadrage plein écran. L’interface réapparaît à chaque changement de film, manuel ou automatique. Le réglage de réduction des mouvements désactive le démarrage automatique. « Voir plus » reste l’unique action sur chaque carte. La fiche garde l’affiche officielle et continue la lecture de l’extrait à la même position. La durée figure dans le bandeau. La réalisation et les interprètes ou voix originales sont indiqués sous le synopsis, avec un lien vers les crédits de Rotten Tomatoes. Le glissement vertical suit le doigt, même s’il commence sur l’affiche. Chaque glissement déplace au maximum une carte et la vidéo change au calage. Sur téléphone, les cartes gardent une hauteur stable quand les barres du navigateur bougent. Le retour à l’accueil recale le dernier film affiché. Le zoom à deux doigts reste disponible. Le zoom suspend les changements de film et laisse le navigateur gérer le déplacement dans l’image agrandie. Le carrousel revient au film actif à l’échelle normale. Sur écran court, le résumé de l’accueil se limite à deux lignes et le texte complet reste accessible dans la fiche. Sur ordinateur, le clic-glissé et la molette complètent le geste tactile. Le bouton « Rechercher » ouvre un écran Liquid Glass qui floute le photogramme sur toute sa hauteur avec un champ de recherche et des résultats illustrés, filtrés par titre ou genre. À l’ouverture, la commande de l’affiche se transforme en champ de recherche. Une flèche à gauche du titre permet de revenir à l’affiche. Les barres de titre et de navigation de l’application sont masquées pendant la recherche. La liste remonte sous le champ et le focus de saisie suit l’animation. Le retour à l’affiche inverse le déplacement. Pendant la saisie, les résultats qui apparaissent ou disparaissent utilisent un fondu de 130 ms. Les résultats conservés glissent vers leur nouvelle position en 210 ms lorsque la liste se réorganise. Avec la réduction des mouvements, ils se mettent à jour immédiatement. Le retour depuis une fiche ouverte par la recherche conserve la saisie. Toucher un résultat ouvre directement la fiche du film. La lecture des extraits est suspendue pendant la recherche. La dernière affiche mène à la première en glissant vers le haut. Depuis la première, un glissement vers le bas ramène à la dernière. Une seule barre vitrée regroupe la recherche, le compteur de position et la commande de lecture ou de pause. Le fond translucide laisse apparaître le photogramme et le contour s’éclaire sur le bord supérieur. Le démarrage automatique des extraits suit le réglage de lecture et la préférence de réduction des mouvements. Sur chaque affiche, le bouton « Voir plus » ouvre une fiche avec le visuel, les informations du film et un synopsis développé. À l’ouverture, le photogramme se redimensionne jusqu’au bandeau de la fiche et son cadrage évolue jusqu’au bandeau de la fiche. Le retour joue le mouvement inverse. Depuis la recherche, le résultat sélectionné se transforme en titre de la fiche. Le déplacement du photogramme utilise les animations web. Les transitions partagées de recherche utilisent View Transitions. La réduction des mouvements désactive ces animations. Sous le titre de chaque film, le bloc Séances regroupe deux rangées horizontales. Le jour actif est mis en évidence et sa date est répétée près des horaires. Les rangées défilent au doigt et affichent des flèches superposées aux extrémités où des options restent hors écran. La grille simulée propose cinq séances disponibles et une séance complète par jour. Choisir un horaire ouvre directement le plan de salle. Dans « Mes billets », l’affiche et le statut précèdent les informations de séance, avec le jour, l’heure, la salle et les sièges. L’état vide permet de revenir à l’affiche. Un billet annulé reste visible avec son statut. La navigation basse est masquée sur les fiches. Un balayage horizontal au doigt, un glisser à la souris ou un défilement horizontal au pavé tactile relie À l’affiche, Billets et Compte. Pendant le balayage horizontal, le contenu suit le doigt et l’onglet voisin apparaît progressivement. Le geste peut partir d’un bouton ou d’un lien, et un appui simple active la commande. Un geste court revient à l’onglet courant. Le glissement vertical parcourt les films. Les horaires et le paiement sont simulés.

## Barre de titre sur smartphone

Dans la [maquette smartphone](mobile.html), la barre de titre se superpose au photogramme sur l’affiche. Son dégradé sombre protège le nom du cinéma et s’efface vers l’image. Sur les autres écrans, le dégradé reprend les teintes du thème actif. La barre devient opaque avec la préférence de transparence réduite.

Sur la fiche film, le plan de salle et les paramètres, la commande de retour remplace le nom du cinéma dans la barre supérieure. La barre supérieure se superpose au photogramme. Le titre et les métadonnées reposent sur un dégradé Liquid Glass qui couvre toute la largeur au bas de l’affiche. Le titre remonte dans le photogramme et s’affiche en Instrument Serif. Le synopsis et les séances reprennent cette typographie dans leurs en-têtes. L’horaire disponible reprend la couleur d’action et la séance complète reste identifiable par son libellé et son contour en pointillés. Le photogramme se prolonge sous le titre. Le flou s’atténue vers le haut et la teinte s’intensifie sous le texte jusqu’au bord du synopsis.

Le soleil propose d’activer le thème clair et la lune propose d’activer le thème sombre. Le bouton conserve une cible de 44 × 44 px et son libellé accessible annonce le thème à activer. La bascule anime les couleurs en 300 ms et suit la préférence de réduction des mouvements.

## Composants et états

| Composant | Règle |
| --- | --- |
| Navigation flottante | À l’affiche, Billets, Compte. Afficher les libellés et marquer la destination active avec un contour intérieur de 1 px. |
| Carte film | Image, titre, genre et durée sur une surface opaque bordée de 1 px. |
| Séance | Heure, version et disponibilité. Afficher « Complet » sur les séances indisponibles et garder les autres séances à portée. |
| Siège | Identifiant visible et annoncé. Différencier libre, sélectionné et occupé par le libellé accessible et par la forme ou le symbole. |
| Récapitulatif | Nombre de places, total et action. Actualiser le prix à chaque sélection et afficher le total avant confirmation. |
| Paiement et billet | En cas de refus, conserver les sièges et permettre de réessayer. Après succès, afficher film, séance, salle et sièges. Une annulation garde le billet identifiable avec le statut « Annulé ». |
| Compte | Accès à la carte d’abonné et à l’historique depuis la même destination. |

## Adaptation et accessibilité

- Sous 768 px, dérouler le contenu en une colonne. Dans le produit, placer les destinations près du pouce et réserver un espace pour la barre flottante. À partir de 768 px, la fiche film et les séances peuvent se lire côte à côte.
- Viser 4,5:1 pour le texte courant et 3:1 pour les indicateurs de focus et les contours nécessaires à l’identification des contrôles. Vérifier le verre sur les zones les plus claires et les plus sombres des affiches.
- Garder un focus visible, des commandes utilisables au clavier et des annonces pour le total et les changements d’état. Prévoir un mode opaque, un repli sans flou et une version à mouvement réduit.

## Scénario de la planche

Choisir la séance de 20 h 30, sélectionner A2 et A3, puis vérifier le total de 24 €. Le premier paiement simulé est refusé. Réessayer avec les mêmes sièges pour afficher le billet, puis tester son annulation. La planche présente un extrait du parcours et les composants réutilisables.

## Paramètres sur smartphone

Les onglets principaux et les sous-écrans de réservation et de paramètres utilisent un glissement horizontal dans le sens de la navigation. La barre de navigation reste au premier plan pendant le glissement entre onglets. La réduction des mouvements désactive cette animation. L’écran Mon compte affiche une carte d’abonné de démonstration, le statut du billet et le thème choisi. Depuis Compte, l’écran Paramètres permet de suivre l’apparence du système ou de choisir le thème clair ou sombre. La commande de thème de la barre supérieure met à jour le même réglage. La lecture automatique des extraits peut être désactivée. Les préférences restent enregistrées dans le navigateur.

## Fiche film et salle 3D sur smartphone

L’affiche officielle et le titre se superposent à l’extrait en cours de lecture. Les séances suivent immédiatement le titre. Le jour et l’horaire disposent chacun d’un rail horizontal avec des flèches superposées aux bords. Le synopsis et les crédits prolongent la fiche.

Le choix d’un horaire ouvre la salle et affiche le film, le jour, l’heure et le numéro de salle. La vue d’ensemble permet de sélectionner un fauteuil directement dans la scène 3D. La caméra se place alors à hauteur des yeux du spectateur, face à l’écran depuis la place choisie. La commande Vue d’ensemble ramène au plan en conservant la sélection. La préférence de mouvement réduit supprime le trajet de caméra.

Le plan HTML offre les mêmes sièges au clavier et lorsque WebGL est indisponible. Il indique les places prises et sélectionnées, et se synchronise avec la 3D. La maquette simule 40 fauteuils en cinq rangées, un tarif de 12 € par place libre et un premier paiement refusé. Le nombre de places est limité par les sièges libres. La sélection est conservée pour la même séance et réinitialisée lorsque l’horaire, le jour ou le film change.

Depuis un siège, maintenir le bouton principal de la souris dans la scène pour verrouiller le curseur et orienter la caméra. Le relâchement ou la touche Échap libère le curseur. Le glissement fonctionne au doigt et sert aussi de repli à la souris si le navigateur refuse le verrouillage. La vue accepte les flèches du clavier. L’écran de la salle projette l’extrait du film sélectionné, en boucle et sans son, avec une commande de pause. Des silhouettes sans traits occupent les fauteuils indisponibles.

Un glissement horizontal vers la droite révèle l’écran parent ou l’onglet précédent. L’écran suit le geste, puis termine le déplacement au-delà du seuil ou reprend sa position. Le geste reste disponible en mode de mouvement réduit. Les rails de séances et de sièges gardent leur défilement propre, et la scène 3D garde le contrôle de la caméra.

## Notes et avis par film

Chaque fiche propose une note de une à cinq étoiles et un commentaire facultatif de 1 500 caractères maximum. Un avis par film et par navigateur peut être publié, modifié ou supprimé. Les étoiles sont accessibles au clavier et les résultats des actions sont annoncés. Les brouillons sont conservés pendant la navigation entre fiches. Les avis publiés sont enregistrés sur l’appareil et retrouvés après rechargement. Cette maquette présente les contributions locales de la personne qui utilise le navigateur.

La moyenne sur cinq et le nombre d’avis apparaissent sur les affiches de l’accueil et dans les résultats de recherche. Le bloc de notation et de commentaires termine la fiche après le synopsis et les crédits. Chaque film comporte trois avis fictifs, identifiés comme démonstration. La moyenne combine ces exemples et l’avis local, avec mise à jour sur les trois écrans après publication, modification ou suppression.

Le double-clic à la souris utilise par défaut l’événement natif du navigateur, qui reconnaît le geste selon les réglages de la plateforme. Paramètres propose aussi un délai personnalisé de 200 à 1 000 ms, enregistré dans le navigateur. Le double appui tactile utilise 500 ms par défaut, le seuil tactile du système étant inaccessible à la page. Le délai personnalisé s’applique aux deux modes de saisie.

## Confirmation et choix de séance

L’annulation ouvre une boîte de dialogue rappelant le film, le jour et l’heure. Conserver mon billet et Échap ferment la confirmation. Confirmer l’annulation applique le changement de statut.

Choisir un horaire sélectionne la séance et révèle une barre fixée en bas de la fiche, avec le jour, l’heure, la salle et le bouton Réserver. Une courte entrée animée et une flèche animée invitent à poursuivre vers les sièges. Un changement de jour efface l’horaire sélectionné. La réduction des mouvements désactive ces animations.

Le score Tomatometer figure à côté de la note locale sur l’accueil, dans la recherche et sous le titre de la fiche. Les scores critiques Rotten Tomatoes ont été relevés le 18 novembre 2026 et sont statiques dans cette maquette. La fiche donne accès à la source propre au film. Ces pourcentages restent indépendants des avis fictifs de démonstration et des avis locaux.

La salle 3D remplit l’écran du choix des sièges. Le plan et le récapitulatif flottent au-dessus dans des panneaux en verre translucide. Les rangées restent accessibles par défilement dans le plan. Pendant l’orientation de la caméra, les panneaux et les commandes s’effacent en 180 ms. Ils reviennent au relâchement, à la perte de focus ou à la sortie de la capture du curseur. Le choix des sièges est conservé. Le rendu sans WebGL conserve le plan classique.

## Paiement Apple Pay simulé

Continuer depuis les sièges ouvre une page Paiement dédiée avec l’affiche, la séance, les places choisies et le total. Apple Pay ouvre une feuille claire inspirée de l’interface iOS, avec son marquage, une carte de démonstration, le titulaire, le récapitulatif et la zone Face ID. Le texte Simulation et l’absence de débit réel restent visibles.

La feuille entre depuis le bas avec un arrière-plan flouté. La confirmation tactile ou clavier lance un scan Face ID simulé, puis un indicateur de traitement. Le premier refus simulé conserve les sièges et permet une nouvelle tentative. Le succès dessine une coche, affiche Terminé, puis ferme la feuille avant d’ouvrir le billet. Fermer ou appuyer sur Échap interrompt la simulation et conserve la sélection. La réduction des mouvements supprime les animations.

Mon compte présente la carte d’abonné, Gérer mon compte et Paramètres. Les billets sont accessibles depuis l’onglet Billets. La gestion du compte permet de modifier le nom affiché et une adresse e-mail facultative, conservés localement pour la démonstration. Le nom est repris sur la carte d’abonné et dans la simulation Apple Pay. Le résumé des paramètres présente leur portée, « Apparence, vidéo et gestes ».

L’entrée Mes avis de Mon compte regroupe les contributions locales par film, avec affiche, date, note et commentaire. Modifier ouvre un formulaire permettant d’ajuster les étoiles et le texte. Supprimer retire l’avis et actualise les moyennes affichées dans le catalogue et les fiches. Les avis fictifs de démonstration restent dans les fiches. Un état vide permet de revenir à la découverte des films.

Les billets confirmés affichent un QR code de démonstration généré localement et une référence unique. Le code encode cette référence et disparaît du billet après son annulation. Le rendu conserve une marge blanche pour permettre la lecture dans les deux thèmes.

Sur ordinateur, dès 1 000 px, les destinations À l’affiche, Billets et Compte sont intégrées à la barre de titre. Sous ce seuil, la navigation revient en bas de l’écran.


### Accessibilité de la salle et réservations multiples

Le plan comporte deux emplacements PMR, A1 et A8, repérés par un pictogramme de fauteuil et un contour bleu. La salle 3D représente des espaces libres sans fauteuil de cinéma, avec un fauteuil roulant et une silhouette anonyme lorsque l’emplacement est occupé. La mention PMR accompagne le siège dans le récapitulatif, le paiement et le billet.

Depuis un siège, le regard reste autour de l’écran : environ ±25° horizontalement et ±12° verticalement. Le point de vue ne se déplace pas dans la salle. Choisir un autre siège recentre le regard.

Si un billet confirmé existe déjà, une confirmation propose d’ajouter une réservation. Refuser conserve la fiche et les billets existants. Accepter ouvre le choix des sièges, puis le paiement habituel. Chaque réservation conserve son billet et son QR code, et peut être annulée indépendamment après confirmation. Un siège déjà réservé pour la même séance reste indisponible dans le plan et en 3D.


### Apple Pay et Google Pay selon le format

Les deux moyens de paiement sont proposés au même niveau sur la page de paiement. Les parcours restent entièrement simulés : aucune carte ni connexion de portefeuille réelle n’est demandée.

Sur téléphone, Apple Pay présente une feuille depuis le bas, avec confirmation Face ID simulée. Google Pay utilise sa propre feuille, son identité visuelle et un choix entre deux cartes fictives. Le total et l’action de paiement restent accessibles en bas, même lorsque le contenu défile.

À partir de 700 px, les portefeuilles deviennent des fenêtres centrées, avec apparition et fermeture par fondu et légère transformation. Apple Pay propose une confirmation simulée sur un appareil Apple, sans Face ID ni bouton latéral de téléphone. Google Pay présente le total et la validation côte à côte. Les styles et les indications de confirmation Apple Pay s’adaptent également au redimensionnement.

Les états de traitement, refus, nouvelle tentative et succès possèdent leurs animations. Fermer une fenêtre pendant le traitement annule le paiement simulé, conserve les sièges et empêche la création d’un billet. Un paiement réussi rejoint le même parcours de création du billet et de son QR code, quel que soit le portefeuille choisi. La préférence de réduction des animations est respectée.

Références visuelles : [Apple Pay — Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay/) et [Google Pay — Brand guidelines](https://developers.google.com/pay/api/web/guides/brand-guidelines).


### Barre de réservation sur la fiche

Le bouton fixe conserve une marge avec les bords de l’écran et repose dans un panneau de verre arrondi. Sur tablette, le panneau suit la largeur du contenu de la fiche ; en bureau à deux colonnes, il reste dans la colonne des séances. La hauteur du panneau est mesurée pour réserver l’espace nécessaire à la fin du contenu, y compris si le récapitulatif passe sur plusieurs lignes. Les éléments interactifs ont une marge de défilement qui tient compte de l’en-tête et du panneau fixe.

Sur téléphone, Apple Pay et Google Pay sont affichés côte à côte, avec leurs marques et des libellés accessibles complets. Le récapitulatif mobile est compact pour éviter de repousser le second portefeuille hors de l’écran.


### Verre allégé

Les commandes flottantes utilisent des bordures décoratives de 0,75 px : 15 % d’opacité en sombre, 17 % en clair. Le reflet supérieur reste discret, à 28 % en sombre et 46 % en clair. La teinte du verre standard passe à 34 % en sombre et 42 % en clair. Les ombres sont plus courtes et moins denses, et l’onglet actif n’empile plus un fond opaque et un reflet intérieur. Les panneaux du plan 3D et le récapitulatif de réservation partagent cette matière plus légère. Les contours fonctionnels, les états sélectionnés, les indicateurs de focus et les surfaces opaques de repli restent distincts des bordures décoratives.


### Insertion du panneau de détails et survol

Depuis l’accueil, le panneau des séances et des informations entre horizontalement depuis la droite, depuis le bord de l’écran sur toute sa largeur en 440 ms, à opacité constante. Au retour, le panneau se retire vers la droite en 360 ms, pendant la transformation existante du visuel. Le panneau réel et ses champs sont conservés et remis à leur place après la sortie, sans dupliquer le contenu. Le geste de retour continue de suivre le doigt. La réduction des animations désactive cette insertion.

Sur les appareils avec souris et survol, les boutons s’éclaircissent légèrement et se soulèvent de 1 px. La navigation et les commandes sur verre reçoivent un voile discret ; les horaires libres et les options du compte reçoivent une légère teinte rouge. Les boutons désactivés sont exclus. En mode de réduction des animations, le déplacement et les transitions sont supprimés.

Les effets de survol apparaissent et disparaissent par un fondu de 220 ms. La couleur de fond, le contour, le texte, la luminosité et le léger déplacement partagent le même rythme. Ces transitions sont définies sur l’état de repos, y compris pour les boutons de navigation et le bouton « Voir plus », afin que le retrait de la souris soit également fluide.


### Commande du son

La barre de recherche contient un pictogramme de haut-parleur qui active ou coupe le son. Le son est coupé au chargement. Le choix est conservé entre les films et pendant la consultation de leurs détails. La commande ne modifie pas la pause ni la position de lecture ; le clic sur la vidéo reste la commande de lecture/pause.

En mode immersif, le même bouton quitte la barre masquée et apparaît en bas à droite, au-dessus de la barre de lecture, avec une cible tactile de 44 px. Son état, son pictogramme et son libellé accessible restent synchronisés. En quittant ce mode, il revient dans la barre de recherche. Si le navigateur refuse une lecture automatique sonore, le lecteur reprend en muet et actualise la commande.
