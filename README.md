TANInfoTraffic
==============

Utilisation conjointe d’AngularJS avec Yeoman, Tiwtter Bootsrap et Compass.

Installation
==============
    $ sudo npm install -g testacular
    $ mkdir TANInfoTraffic2 && cd TANInfoTraffic2
    $ npm install generator-angular generator-testacular
    $ yo angular
    Would you like to include Twitter Bootstrap? (Y/n)
    If so, would you like to use Twitter Bootstrap for Compass (as opposed to vanilla CSS)? (Y/n)
    Would you like to include angular-resource.js? (Y/n)
    Would you like to include angular-cookies.js? (Y/n)
    Would you like to include angular-sanitize.js? (Y/n)
    $ npm install && bower install


Lancement des tests unitaires automatisés
==========================================
Configuration de “testacular.conf.js” avec le browser et l’autowatch voulut.

Puis lancement de testacular :
    $ grunt testacular

Ou pour les garder en autowatch
    $testacular start



Construction du service de base
================================

Intsallation de “angular-resource” :
    $ bower install angular-resource

Utilisation de la librairie dans le projet :
dans “app.js” :
    angular.module('taninfotraffic2App', ['ngResource'])

Vérfication d’inclusion d’angular-resource dans index.html et testacular.conf.js


    $ yo angular:service infoTrafficService
        create app/scripts/services/infoTrafficService.js
        create test/spec/services/infoTrafficService.js

Implémentation du contrôleur
============================


Voir fichier "main.js" pour les tests. Il faut penser à créer un mock pour le service.


Liens
======
* [yeoman](http://yeoman.io)
* [Getting Started](http://briantford.com/blog/angular-yeoman.html)
* [Meetup AngularJS + Yeoman](http://www.youtube.com/watch?v=XOmwZopzcTA)
* [Meetup AngularJS Best practices](http://www.meetup.com/AngularJS-MTV/events/93943412/)
* [Exemple](https://github.com/ericterpstra/jsCats)