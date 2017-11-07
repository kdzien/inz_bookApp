angular.module('betApp').config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise("/main/descriptionbets")
                 
                $stateProvider
                        .state('main', {
                            url: "/main",
                            templateUrl: "./views/main.html",
                            controller: "mainCtrl"
                        })
                        .state('main.descBets', {
                            url: "/descriptionbets",
                            templateUrl: "./views/descbets.html",
                            controller: "descBetsCtrl"
                        })
                        .state('main.lightBets', {
                            url: "/lightbets",
                            templateUrl: "./views/lightbets.html",
                            controller: "lightBetsCtrl"
                        })
                        .state('main.addBet', {
                            url: "/addbet",
                            templateUrl: "./views/addbet.html",
                            controller: "addBetCtrl"
                        }); 
            }]);