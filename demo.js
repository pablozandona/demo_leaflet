function init() {

    var lat = -27.596910;
    var lng = -48.549580;
    var zoomLevel = 13;

    var map = L.map('map').setView([lat, lng], zoomLevel);

    // Cria a layer para inserir no mapa
    var mainLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        // Créditos da layer 
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        minZoom: 1,
        id: 'mapbox.streets',
        // Token necessário para acesso a layer - algumas não necessitam
        accessToken: 'pk.eyJ1IjoibHVpemhzYWxhYXIiLCJhIjoiY2syNjhuNXE2MXBubDNjbjB1MDdpa2p1aCJ9.Xo1g0NzO6lxnkww5lo14-Q'
    });

    // Layer sem token de acesso
    var openstreet_map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Layer de topografia
    var openstreet_map_topografia = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Layer de transporte
    var openstreet_map_transporte = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="http://www.openptmap.org">OpenPtMap</a> contributors'
    });

    // Extensão do leaflet com várias layers gratuitas
    // github: https://github.com/leaflet-extras/leaflet-providers
    // demo: https://leaflet-extras.github.io/leaflet-providers/preview/
 
    // Adiciona a layer no mapa
    mainLayer.addTo(map);

    var latUnivali = -27.598023;
    var lngUnivali = -48.619444;

    var univaliMarker = L.marker(
        [latUnivali, lngUnivali],
        {
            title: 'Campus Univali Kobrasol'
        }
    ).bindPopup('Hello, friends!');

    univaliMarker.addTo(map);

    L.control.layers(
        {
            "Principal": mainLayer,            
            "Topografia": openstreet_map_topografia,
            "Street Map": openstreet_map
        },
        // Overlay na layer principal
        {
            "Transporte": openstreet_map_transporte
        }
    ).addTo(map);

}