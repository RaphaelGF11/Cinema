# Revue UX de la maquette Ciné Lumière

[Ouvrir la maquette](mobile.html) · [Système de design](design.md) · [Skill du projet](SKILL.md)

## Résultats vérifiés

| Parcours | Résultat observé |
| --- | --- |
| À l’affiche | Les flèches du clavier passent de 1 à 10, puis de 10 à 1 et de 1 à 2. Une seule carte reste interactive. Après deux appuis rapides sur Billets puis Compte, le retour à l’accueil retrouve le film 2. |
| Recherche | Une recherche sans correspondance affiche « Aucun film trouvé ». La recherche « science-fiction » ouvre la fiche de *Project Hail Mary*. Le retour conserve la saisie. |
| Séances et places | L’horaire 22 h 15 est désactivé et marqué « Complet ». Choisir demain à 13 h 45 ouvre le plan de la salle 4. Au clavier, A2 et A3 produisent un total de 24 €. |
| Paiement et billet | Le premier paiement simulé est refusé et conserve A2 et A3. Le second confirme un billet avec le jour, l’heure, la salle et les sièges choisis. L’annulation laisse le billet visible avec le statut « Billet annulé ». |
| Paramètres | Le focus se place sur le titre à l’ouverture. L’écran affiche le thème système et l’état de lecture automatique. |
| Mise en page | Aucune largeur excédentaire observée sur l’accueil et le billet à 320 px. À 768 px avec souris, la maquette reste centrée sur 480 px. |
| Contraste sur aplats | Les paires de texte testées passent 4,5:1 dans les deux thèmes. La paire la plus proche du seuil est le texte du bouton rouge en thème sombre à 4,60:1. |
| Vérifications statiques | La syntaxe des scripts a été contrôlée. Les identifiants, cibles ARIA et liens locaux de la maquette et de la planche de design ont été vérifiés. |

Deux appuis rapides se perdaient pendant les transitions de la recherche et de la fiche. Les commandes restent désormais accessibles pendant l’animation et une demande reçue pendant une transition est jouée à sa fin. Le scénario ouverture de la recherche, sélection puis retour a été rejoué après correction.

## Points à valider

- Sur téléphone réel, tester le balayage sur un bouton, le suivi du doigt, la boucle verticale et le pincement. Le navigateur de vérification n’a pas servi de test tactile physique.
- Vérifier le contraste du Liquid Glass sur les scènes les plus claires et les plus sombres et parcourir la maquette au lecteur d’écran et avec la réduction des animations activée.
- Pour l’exercice complet, il reste une disposition dédiée à la tablette et un historique de plusieurs billets. Le prototype conserve un seul billet durant la session. Le paiement et la carte d’abonné sont simulés.
- Le fichier `references/ateliers-et-demonstrations.md` cité par le skill est absent du dossier. La revue s’appuie sur la grille de finition du fichier [SKILL.md](SKILL.md).

## Protocole sur téléphone

Faire jouer le scénario à trois personnes, sans indiquer les boutons. Demander de trouver deux places côte à côte pour *Project Hail Mary* à 20 h 30 le samedi, d’annoncer le prix avant de payer, puis de retrouver le billet. Prévoir le refus simulé pour observer la reprise. Demander ensuite de revenir à l’affiche et de passer au film suivant depuis l’image. Faire noter à part les hésitations, les retours et toute aide donnée.

| Participant et appareil | Étape | Action observée | Résultat et aide donnée | Gravité |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |
