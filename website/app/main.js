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

  $scope.show_modal_id = function (item) {
    // Fill the fields that have textual values
    var keys = ["titolo", "descrizione", "indirizzo"];
    for (var i = 0; i < keys.length; i += 1) {
      $("#item-modal-" + keys[i]).text(item.properties[keys[i]]);
    }

    // Then fill the fields that have href
    keys = ["wikipedia", "urlScheda"];
    for (var i = 0; i < keys.length; i += 1) {
      $("#item-modal-" + keys[i]).attr("href", item.properties[keys[i]]);
    }
    $("#item-modal-gmaps").attr("href", "http://www.google.com/maps/place/"+item.geometry.coordinates[0]+","+item.geometry.coordinates[1]);
    $("#item-modal-guidami").attr("href", "http://www.google.com/maps/place/"+item.geometry.coordinates[0]+","+item.geometry.coordinates[1]);


    // Then fill the image
    $("#item-modal-foto").attr("src", item.properties.foto);

    // Draw the map. Note that we need to reset the container to be sure.
    if ($scope.map !== undefined) {
        $scope.map.remove();
        $scope.map = undefined;
        $("#item-modal-mappa").html("");
    }
    var latitude = item.geometry.coordinates[0];
    var longitude = item.geometry.coordinates[1];

    // Note: leaflet does not like it when we pass it undefined values
    // and it goes wild, so protect against this unlucky event
    if (latitude !== undefined && longitude !== undefined) {

        $scope.map = leaflet.map("item-modal-mappa").setView(
            [longitude, latitude], 15);

        leaflet.tileLayer(
            'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw',
                {
                    maxZoom : 18,
                    id : 'mapbox.streets'
                })
            .addTo($scope.map);

        leaflet.marker([longitude, latitude]).addTo($scope.map);

    } else {
        console.log("At leat one of 'latitude' or 'longiture' is undefined");
    }

    // Open the modal window
    $('#item-modal-view').openModal();
  };

  $scope.show_modal_event = function (item) {
    // Fill the fields that have textual values
    var keys = ["titolo", "startDate", "endDate"];
    for (var i = 0; i < keys.length; i += 1) {
      $("#item-modal-" + keys[i]).text(item[keys[i]]);
    }

    $("#item-modal-testoHtml").html(item["testoHtml"]);

    // Then fill the fields that have href
    $("#item-modal-scheda").attr("href", item["link"]);

    // Then fill the image
    $("#item-modal-immagine").attr("src", item["immagine"]);

    // Open the modal window
    $('#item-modal-view').openModal();
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

  $http.get('data/chiesa.json').then(function(res) {
     $scope.chiese = res.data;
  });
  $http.get('data/eventi.json').then(function(res) {
     $scope.eventi = res.data;
  });
  $http.get('data/natura.json').then(function(res) {
     $scope.natura = res.data;
  });
  $http.get('data/museo.json').then(function(res) {
     $scope.musei = res.data;
  });
  $http.get('data/monumento.json').then(function(res) {
     $scope.monumenti = res.data;
  });
  $http.get('data/mosaici.json').then(function(res) {
     $scope.mosaici = res.data;
  });
  $http.get('data/ristorante.json').then(function(res) {
    $scope.ristoranti = res.data;
  });
  $http.get('data/imperdibili.json').then(function(res) {
    $scope.imperdibili = res.data;
  });
  $http.get('data/piatto.json').then(function(res) {
    $scope.piatti = res.data;
  });
  $http.get('data/introvabili.json').then(function(res) {
    $scope.introvabili = res.data;
  });

}]);
