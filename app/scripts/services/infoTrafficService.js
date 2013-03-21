'use strict';

angular.module('taninfotraffic2App')
  .factory('infoTrafficService', function ($resource, TANInfoTrafficAdapter) {
  // Service logic

  var localSvc = $resource('fixtures/getInfoTraficTANTempsReel.json');

  //private properties
  var _infoTraffics = [];

  // Public API here
  return {
    get: function() {
        return _infoTraffics;
    },

    //service methods
    // This method retrieves all info traffic data from the service and stores it in _infoTraffics
    prepareInfoTraffics : function(callback){
        var self = this;
        localSvc.get(function (data) {
            //TOOD check response status code, and set rawData only if its ok
            var rawData = data.opendata.answer.data.ROOT.LISTE_INFOTRAFICS.INFOTRAFIC;
            angular.forEach(rawData,function(item){
                var translatedItem = TANInfoTrafficAdapter.translateInfoTraffic(item);
                _infoTraffics.push(translatedItem);
            });
            //pour les tests dump(_infoTraffics);
            if (angular.isFunction(callback)) callback(_infoTraffics);
        });
    }
  };
});

/*
 * Json adapter.
*/
angular.module('taninfotraffic2App').factory('TANInfoTrafficAdapter',function() {
    var TANInfoTrafficAdapter = {
        translateInfoTraffic : function(rawInfoTraffic) {
            var infoTraffic = {};
            infoTraffic.title = rawInfoTraffic.INTITULE;
            infoTraffic.description = rawInfoTraffic.RESUME;
            infoTraffic.startingDate = rawInfoTraffic.DATE_DEBUT + " " + rawInfoTraffic.HEURE_DEBUT;
            infoTraffic.endingDate = rawInfoTraffic.DATE_FIN + " " + rawInfoTraffic.HEURE_FIN;
            infoTraffic.routes = getRoutes(rawInfoTraffic.TRONCONS);
            infoTraffic.isFinished = rawInfoTraffic.PERTURBATION_TERMINEE !== "0";

            return infoTraffic;
        }
    };

    var getRoutes = function(rawRoutes) {
        var routes = [];
        if(angular.isString(rawRoutes)) {
            //rawRoutes = "[27/1/-/-];[28/1/-/-]";
            var tmpRoutes = rawRoutes.split(";") || [""];
            //tmpRoutes = ["[27/1/-/-]", "[28/1/-/-]"];
            for (var i=0,len=tmpRoutes.length; i<len; i++) {
                var tmp = tmpRoutes[i].split("/");
                //tmp = ["[27", "1", "-", "-"];
                if(angular.isArray(tmp) && tmp.length > 0) {
                    tmp = tmp[0];
                    //tmp = "[27";
                    tmp = tmp.substring(1, tmp.length);
                    //tmp = "27";
                    if(routes.indexOf(tmp) === -1)
                        routes.push(tmp);
                }
            }
        }

        return routes.sort();
    };

    return TANInfoTrafficAdapter;
});
