var angular = require ('angular');
var angularRoute = require ('angular-route')

var app = angular.module('hackinra', ["ngRoute"]);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/dove_andare", {
          templateUrl : "modules/dove_andare.html"
        })
        .when("/cosa_fare", {
          templateUrl: "modules/cosa_fare.html"
        })
        .when("/cibo", {
          templateUrl: "modules/cibo.html"
        })
}])

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
  $scope.appName = 'ScopriRa';
  $scope.appLogo = ''


  $scope.title = "ScopriRa: scopri Ravenna con noi"
  $scope.menu = [
    {text: 'Mappa', link: '#'},
    {text: 'Vicino a te', link: '#'},
    {text: 'Trasporti pubblici', link: '#'},
    {text: 'Top Attrazioni', link: '#'}
  ];

  $scope.lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              +  " sed do eiusmod tempor incididunt ut labore et dolore magna"
              +  " aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
              +  " ullamco laboris nisi ut aliquip ex ea commodo consequat. "
              +  "Duis aute irure dolor in reprehenderit in voluptate velit "
              +  "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint "
              +  "occaecat cupidatat non proident, sunt in culpa qui officia "
              +  "deserunt mollit anim id est laborum.";

  $scope.footer_text = $scope.lorem;

  $scope.footer_links = [
    {text: 'Comune di ravenna', link: '#'},
    {text: 'Regione Emilia Romagna', link: '#'},
    {text: 'Contatti utili', link: '#'},
    {text: 'Emergenze', link: '#'}
  ];

  $http.get('data/eventi.json').then(function(res) {
    $scope.events = res.data;
    console.log($scope.events);
  });

}]);
