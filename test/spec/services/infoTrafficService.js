'use strict';

describe('Service: infoTrafficService', function () {

  // load the service's module
  beforeEach(module('taninfotraffic2App'));

/*  // instantiate service
  var infoTrafficService;
  beforeEach(inject(function (_infoTrafficService_) {
    infoTrafficService = _infoTrafficService_;
  }));

  it('should do something', function () {
    expect(!!infoTrafficService).toBe(true);
  });
*/

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  // instantiate service
  var infoTrafficService, $httpBackend;
  beforeEach(inject(function($injector) {
    infoTrafficService = $injector.get("infoTrafficService");
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', 'fixtures/getInfoTraficTANTempsReel.json').respond(
                            {"opendata" :{
                               "request" : "http://data.nantes.fr/api/getInfoTraficTANTempsReel/1.0/39W9VSNCSASEOGV/?output=json",
                               "answer" :
                                  {
                                     "status" :
                                        {
                                           "@attributes" :
                                              {
                                                 "code" : "0",
                                                 "message" : "OK"
                                              }
                                        },
                                     "data" :
                                        {
                                           "ROOT" :
                                              {
                                                 "LISTE_INFOTRAFICS" :
                                                    {
                                                       "INFOTRAFIC" :
                                                          [
                                                             {
                                                                "CODE" : "9",
                                                                "LANGUE" : "0",
                                                                "INTITULE" : "Travaux rue Esnoult des Châtelets à Nantes",
                                                                "RESUME" : "En raison de travaux rue Esnoult des Châtelets à Nantes, le couloir de bus est neutralisé entre les rues Goudy et St Jacques, uniquement en direction de Greneraie, pour une durée de 15 mois.",
                                                                "TEXTE_VOCAL" : "Travo rue ainou des chatelai a nante, larai sain jake est reporté a larai pirmile                .",
                                                                "DATE_DEBUT" : "09/03/2012",
                                                                "DATE_FIN" : "31/03/2013",
                                                                "HEURE_DEBUT" : "13:36",
                                                                "HEURE_FIN" : "21:30",
                                                                "PERTURBATION_TERMINEE" : "0",
                                                                "TRONCONS" : "[27/1/-/-];[27/2/-/-];[28/1/-/-];[29/1/-/-];[36/1/-/-];[39/1/-/-];[94/2/-/-];[98/2/-/-];[68/1/-/-]"
                                                             }
                                                          ]
                                                    }
                                              }
                                        }
                                  }
                            }
                            }
     );
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all info traffic', function () {
    $httpBackend.expectGET('fixtures/getInfoTraficTANTempsReel.json');
    //$httpBackend.flush();

    infoTrafficService.prepareInfoTraffics(function (data) {
        //on doit placer le test dans la callback sinon il sera vérifier avant la fin de la méthode
        //(asynchronisme du module $resource)
        expect(infoTrafficService.get()).toEqualData([{"title" : "Travaux rue Esnoult des Châtelets à Nantes",
                                                      "description" : "En raison de travaux rue Esnoult des Châtelets à Nantes, le couloir de bus est neutralisé entre les rues Goudy et St Jacques, uniquement en direction de Greneraie, pour une durée de 15 mois.",
                                                      "startingDate" : "09/03/2012 13:36",
                                                      "endingDate" : "31/03/2013 21:30",
                                                      "isFinished" : false,
                                                      "routes" : ["27","28","29","36","39","68","94","98"]
                                                   }]);
    });

    $httpBackend.flush();
  });
});
