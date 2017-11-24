angular.module('betApp').config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise("/landing")
                 
                $stateProvider
                        .state('landingpage',{
                            url: "/landing",
                            templateUrl: "./views/landing.html",
                            controller: "landingCtrl",
                            onEnter: ['$state', 'auth', function($state, auth){
                                if(auth.isLoggedIn()){
                                  $state.go('main.descBets');
                                }
                            }]
                        })
                        .state('main', {
                            url: "/main",
                            templateUrl: "./views/main.html",
                            controller: "mainCtrl",
                            onEnter: ['$state', 'auth', function($state, auth){
                                if(!auth.isLoggedIn()){
                                  $state.go('landingpage');
                                }
                            }]
                        })
                        .state('main.descBets', {
                            url: "/descriptionbets",
                            templateUrl: "./views/descbets.html",
                            controller: "descBetsCtrl",
                            onEnter: ['$state', 'auth', function($state, auth){
                                if(!auth.isLoggedIn()){
                                  $state.go('landingpage');
                                }
                            }]
                        })
                        .state('main.lightBets', {
                            url: "/lightbets",
                            templateUrl: "./views/lightbets.html",
                            controller: "lightBetsCtrl",
                            onEnter: ['$state', 'auth', function($state, auth){
                                if(!auth.isLoggedIn()){
                                  $state.go('landingpage');
                                }
                            }]
                        })
                        .state('main.addBet', {
                            url: "/addbet",
                            templateUrl: "./views/addbet.html",
                            controller: "addBetCtrl",
                            onEnter: ['$state', 'auth', function($state, auth){
                                if(!auth.isLoggedIn()){
                                  $state.go('landingpage');
                                }
                            }]
                        })
                        .state('main.ranking', {
                            url: "/ranking",
                            templateUrl: "./views/ranking.html",
                            controller: "rankingCtrl",
                            onEnter: ['$state', 'auth', function($state, auth){
                                if(!auth.isLoggedIn()){
                                  $state.go('landingpage');
                                }
                            }]
                        });
            }]);