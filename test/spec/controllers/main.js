'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('taninfotraffic2App'));

  var MainCtrl,
    scope,
    service;

  describe('Initial call', function () {
      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller) {
        scope = {};
        //we mock the service
        service = {
            get : function() {return []},

            prepareInfoTraffics : function(callback) {
                callback([{"title" : "Travaux rue Esnoult des Châtelets à Nantes",
                       "description" : "En raison de travaux rue Esnoult des Châtelets à Nantes, le couloir de bus est neutralisé entre les rues Goudy et St Jacques, uniquement en direction de Greneraie, pour une durée de 15 mois.",
                       "startingDate" : "09/03/2012 13:36",
                       "endingDate" : "31/03/2013 21:30",
                       "isFinished" : false
                }]);
            }
        }

        MainCtrl = $controller('MainCtrl', {
          $scope: scope,
          infoTrafficService: service
        });
      }));

      it('should attach a list info traffic to the scope', function () {
        expect(scope.infoTrafficList.length).toBe(1);
      });
  });

  describe('Service call with in memory data', function () {
      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller) {
        scope = {};
        //we mock the service
        service = {
            get : function() {
                return [{
                    "title" : "Travaux rue Esnoult des Châtelets à Nantes",
                    "description" : "En raison de travaux rue Esnoult des Châtelets à Nantes, le couloir de bus est neutralisé entre les rues Goudy et St Jacques, uniquement en direction de Greneraie, pour une durée de 15 mois.",
                    "startingDate" : "09/03/2012 13:36",
                    "endingDate" : "31/03/2013 21:30",
                    "isFinished" : false
            }]}
        }

        MainCtrl = $controller('MainCtrl', {
          $scope: scope,
          infoTrafficService: service
        });
      }));

      it('should attach a list info traffic to the scope', function () {
        expect(scope.infoTrafficList.length).toBe(1);
      });
  });
});
