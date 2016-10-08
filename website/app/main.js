var angular = require ('angular');
var app = angular.module('hackinra',[]);

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

  $http.get('').then(function(res) {
    $scope.chiese = res.data;
    console.log($scope.chiese);
  });


  $scope.modalTrigger = function () { $('#modal1').openModal() }
}]);
