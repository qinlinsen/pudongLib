(function () {
    'use strict';
    angular.module("myApp",['ngMaterial']).controller("DemoCtrl",DemoCtrl);
    function DemoCtrl($log,$timeout,$q) {
        //fields
        var self=this;
        self.isDisabled=false;
        self.noCache=true;
        self.simulateQuery=false;
        self.states=loadAll();
        self.searchTextChange=searchTextChange;
        self.selectedItemChange=selectedItemChange;
        self.querySearch=querySearch;
        self.newState=function (state) {
            alert("please crate a new state :"+state);
        }
        //functions
        function searchTextChange(text) {
            $log.info("the search text change to :"+text);
        }
        function selectedItemChange(item) {
            $log.info("selected item change to :"+JSON.stringify(item));
        }
        function querySearch(query) {
            var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        function loadAll() {
            var states="AbrahamLincoln,MaryClinton,GeorgeBush";
          return  states.split(/,+/g).map(function (state) { return{
                value:state.toLowerCase(),
                display:state
            } } );
        }
        function createFilterFor(query) {
            var lowercase=angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercase) === 0);
            }
        }
    }
})();