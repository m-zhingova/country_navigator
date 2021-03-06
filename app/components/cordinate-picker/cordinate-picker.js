(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('cordinatePicker', directive);

    function directive() {
        var directive = {
            templateUrl: './components/cordinate-picker/cordinate-picker.html',
            restrict: 'E',
            controller: controller,
            scope: {country: '='
          }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'conf'];
    function controller($scope, conf) {
        initialize();
      function initialize() {

        var markers = [];
        var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom:6
        });

        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-33.8902, 151.1759),
            new google.maps.LatLng(-33.8474, 151.2631));
        map.fitBounds(defaultBounds);


        // Create the search box and link it to the UI element.
        var input = (document.getElementById('pac-input'));
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var searchBox = new google.maps.places.SearchBox(input);

        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching places for that item.
        google.maps.event.addListener(searchBox, 'places_changed', function() {
            var places = searchBox.getPlaces();
            
            var lat = places[0].geometry.location.lat();
            var lng = places[0].geometry.location.lng();
            $scope.country.lat = lat;
            $scope.country.lan = lng;

            if (places.length == 0) {
                return;
            }
            for (var i = 0, marker; marker = markers[i]; i++) {
                marker.setMap(null);
            }

          // For each place, get the icon, place name, and location.
          markers = [];
          var bounds = new google.maps.LatLngBounds();
          for (var i = 0, place; place = places[i]; i++) {
            var image = {
              url: place.icon,
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
              map: map,
              icon: image,
              title: place.name,
              position: place.geometry.location,
            });

            markers.push(marker);
            bounds.extend(place.geometry.location);
          }

          map.fitBounds(bounds);
          map.setZoom(8);
          $scope.$apply();
        });
        
      }
    }


  
}(angular));