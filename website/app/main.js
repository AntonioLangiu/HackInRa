var angular = require ('angular');
var app = angular.module('hackinra',[]);
var leaflet = require('leaflet');

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

  $scope.show_modal_id = function (item, suffix) {
    var _id = item._id;
    if (suffix !== undefined) {
        _id += "_" + suffix;
    }
    console.log(item.geometry.coordinates);
    $('#' + _id).openModal();

    /* XXX This is very ghetto to load the map when the DOM is settled. A
           better solution would be welcome, but perhaps not now. */
    setTimeout(function () {
        var latitude = item.geometry.coordinates[0];
        var longitude = item.geometry.coordinates[1];
        var mymap = leaflet.map('mapid' + _id).setView(
            [longitude, latitude], 15);

        leaflet.tileLayer(
             'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw',
             {
               maxZoom : 18,
               id : 'mapbox.streets'
             })
            .addTo(mymap);

        leaflet.marker(
            [longitude, latitude]
        ).addTo(mymap);

    }, 100.0);
  };

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

  $http.get('http://scoprira.eu-gb.mybluemix.net/api/all/Chiesa').then(function(res) {
    $scope.chiese = res.data;
  });
  $http.get('http://scoprira.eu-gb.mybluemix.net/api/all/Natura').then(function(res) {
    $scope.natura = res.data;
  });
  $http.get('http://scoprira.eu-gb.mybluemix.net/api/all/Museo').then(function(res) {
    $scope.musei = res.data;
  });
  $http.get('http://scoprira.eu-gb.mybluemix.net/api/all/Monumento').then(function(res) {
    $scope.monumenti = res.data;
  });
  $http.get('http://scoprira.eu-gb.mybluemix.net/api/all/Mosaici').then(function(res) {
    $scope.mosaici = res.data;
  });


}]);
