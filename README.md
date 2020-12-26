# Super Ciné Marbre

Le marbre du [Super Cine Battle](https://www.supercinebattle.fr), en version interactive.

<a href="https://supercinemarbre.github.io"><img src="https://raw.githubusercontent.com/supercinemarbre/supercinemarbre.github.io/master/docs/img/card.png" width="400" /></a>

## Sommaire

* [Application web](#application-web) (`webapp/`)
* [Importeur de listes](#importeur-de-listes) (`importer/`)
* [Serveur de programme TV](#serveur-de-programme-tv) (`importer/tv-schedule-server.ts`)
* [Procédures](#procédures)
  * [Mettre à jour les listes](#mettre-à-jour-les-listes)
  * [Corriger un film](#corriger-un-film)
* [Licence](#licence)

## Application web

**Premier lancement**

```
cd webapp
npm install
npm start
```

**Commandes disponibles**

* `npm start` : Lancement de la version développeur
* `npm run build` : Build JS (= met à jour la version déployée)
* `npm run lint` : S'assurer que le code est de toute beauté

## Importeur de listes

**Premier lancement**

```
cd importer
npm install
npm start
```

Par défaut, l'importeur ne fait que passer en revue les films déjà connus pour télécharger les éventuelles données manquantes. Vu qu'il sont sûrement tous déjà synchronisés, ça ne devrait pas faire grand-chose.

**A savoir**

1. Pour que l'import OMDB fonctionne (couvertures de films etc.), il faudra obtenir une clef d'API (gratuite) à http://www.omdbapi.com et la mettre dans un fichier `importer/data/omdbapikey`.
2. Pour que l'import des timestamps fonctionne, il faudra obtenir une clef d'API (gratuite) à https://console.developers.google.com/apis et la mettre dans un fichier `importer/data/googlesheetsapikey`.
3. La détection automatique des films n'est pas toujours fiable, voir plus bas la procédure en cas d'erreur.

**Commandes**

* `SCB_INIT=true npm start` : Mettre à jour les épisodes disponibles sur supercinebattle.fr
* `GSHEETS_INIT=true npm start` : Mettre à jour les classements et timestamps depuis [ce document](https://docs.google.com/spreadsheets/d/1_h4Yh9xU72iqH3gZI6OquYG-jfBYPP4d1k-T9jwxEq8/edit) Google Sheets
* `[IMDB_ONLY=true] [OMDB_ONLY=true] [ALL=true] npm run invalidate -- [nom(s) de film(s) SCB]` : Invalider des données de films. `IMDB_ONLY` et `OMDB_ONLY` permettent d'annuler seulement les données issues de IMDB et OMDB respectivement. `ALL` annule les données sur TOUS les films (à éviter).

## Serveur de programme TV

Afin d'être capable de se mettre à jour quotidiennement, le programme TV est géré par un [serveur à part](https://supercinemarbre.komwan.net/).

```
cd importer
npm install
npm start:tv
```

## Procédures

### Mettre à jour les listes

Lorsqu'un épisode est publié sur supercinebattle.fr, on les importe avec l'option `SCB_INIT`. Lorsque des nouveaux classements/timestamps sont disponibles sur Google Sheets, on les importe avec `GSHEETS_INIT`. A la sortie d'un épisode et une fois les timestamps en ligne, il faut donc faire :

```bash
cd importer
GSHEETS_INIT=true SCB_INIT=true npm start
```

Pour vérifier le résultat de l'import (en particulier la bonne correspondance des films), lancer la webapp en local :

```bash
cd webapp
npm start
```

### Corriger un film

1. Retrouver le film en erreur dans `webapp/public/scb_movies.json`, et en particulier sa clef `"id"`.

2. Modifier `scb_patch.json`, en ajoutant un objet avec l'ID du film. Compléter alors l'objet avec les valeurs à écraser. Généralement on souhaite juste réparer une correspondance de film : pour ça aller sur le bon film dans IMDB, retrouver son "tconst" en regardant l'URL (qui est au format `https://www.imdb.com/title/[TCONST]/`), puis ajouter au patch une clef `"tconst"`.

3. Si les données du film (jaquette, note IMDB etc.) avaient déjà été importées dans `scb_movies.json`, il faut les invalider, de préférence avec l'outil dédié :

```bash
cd importer
npm run invalidate "Nom exact issu de l'ID" "On peut en mettre plusieurs"
```

4.  Et enfin relancer l'import :

```bash
npm start
```

## Licence

Copyright (C) 2020 Marwane Kalam-Alami

Distribué sous licence [ISC/OpenBSD](https://fr.wikipedia.org/wiki/Licence_ISC).