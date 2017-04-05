# Madjoh Trad
### Application/Jeu de traduction français/anglais

*Projet réalisé pour évaluer mes connaissances en javascript (node.js), html, css, utilisation d'api, et ma manière de coder en général*
Temps éstimé au développement: 28 heures (du 01-04 au 05-04)
Technologie utilisé:
- Vue.js
- JQuery
- Express.js
- Mongoose

## Installation / Lancement

#### Prérequis

l'installation de cette application requière node.js ainsi que webpack.
Si vous n'avez pas __nodeJS__ vous pouvez le télécharger [ici](https://nodejs.org/en/ "nodeJS")
Si vous n'avez pas __webpack__ vous pouvez l'installer via __nodeJS__

```bash

npm install webpack -g
# le -g permet de l'installer de manière global

```

#### Lancer l'aplication

A la racine du dossier

```bash

npm install
# instale toute les dépendances

npm run dev
# lance le serveur et génère le bundle

```
Puis accédez à l'URL http://localhost:8020/

## Fonctionnement

Une base de donné mongoDB est peuplé préalablement depuis un fichier .txt. Ce fichier est lu grâce à *cvs*. La traduction de chaque mot est vérifiée avant leur ajout à la BDD: Si l'API (*Yandex translate*) renvois un mot qui est exactement le même, on considère la traduction comme étant fausse. Si non, le mot s'ajoute à la BDD avec un ID qui s'incrémente. 500 mots sont ajoutés de cette manière.

Au lancement de l'application, on lance les méthode init() des objets `nav` et `game`

`nav` s'occupe de n'afficher que la section "home" grâce à *JQuery*
`game` génère les évenements *JQuery* utiles au fonctionnement du jeu et récupère un mot aléatoire de la BDD de cette manière:
On génère un nombre aléatoire entre 0 et 500, pour envoyer une requête et récupérer un mot de la BDD en fonction de son ID. Celui-ci est traduit par l'API *Yandex translate*. Les informations suivantes sont enregistrées dans l'objet game:
- mot français
- traduction
- nombre de caractère de la traduction

Pendant le jeu, on vérifie la longueur de la réponse à chaque fois que le contenu de l'input change. Ainsi, si sa longueur est différente de celle de la traduction attendue, l'utilisateur ne peut pas valider sa réponse.
A chaque validations:
- si la traduction est fausse, le joueur perd 2 points. un message s'affiche en *JQuery* avec la traduction attendue. Si la traduction est bonne, le joueur gagne 2 points
- `game` vérifi que l'utilisateur n'a pas atteind 20 ou 0 point (condition de fin de jeu)
- un nouveau mot est récupéré par `game` et s'affiche à l'écran grâce à des instances de *Vue.js*

Si la condition de fin de jeu est vérifié, `game` demande à `nav` de passer à l'écran de "game over" et repasse le score à 10 pour la prochaine partie.

## Améliorations

- Pour une meilleure traduction: Changer l'API de traduction: L'API *Yandex translate* propose parfois des traductions peu cohérentes. ("allonger" est traduit par "lie")
- Pour une meilleure experience utilisateur:
	- Coder un objet toast pour facilement afficher des feedBack plus divers. Celui-ci permettrait d'afficher une div en position absolute avec un message et une couleur souhaitée. (changement du message via Vue.js et animation du toast via JQuery)
	- Récupérer plusieurs mots de la BDD en une requête pour garder un tableau d'une dizaine mots en local. Si l'utilisateur perd la connexion, il peut continuer à jouer
	- Aténuer la perte de point: si la réponse du joueur n'a qu'une seule lettre de différence avec 
- Pour dynamiser le jeu:
	- ajout d'un timer: plus le joueur atteind rapidement les 20 points et plus son score est élevé
	- ajout d'un visuel de statistique en fin de parti: en stoquant dans une collection "statistic" à chaque fin de partie, le temps mis à atteindre les 20 points. Un message à l'écran de game over pourait être le suivant "Bravo, vous faites parti des XX% à avoir gagné en moins de XX:XX min"
	- ajout de combo: plus le joueur trouve des traductions conscecutive, plus il gagne de point par traduction
