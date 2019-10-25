async function init() {

    const latLangUnivali = [-27.598023, -48.619444];

    const map = L.map('map').setView(latLangUnivali, 16);

    // Layer do OpenStreetMaps
    const openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    openstreetmap.addTo(map);

    // Popup
    const univaliPopup = '<img width="100" src="https://www.univali.br/Style%20Library/Univali/custom/marca/imgs/logo.png" />';

    // Maker
    const univaliMarker = L.marker(latLangUnivali)
        .bindPopup(univaliPopup);

    univaliMarker.addTo(map);

    // Layer do MapBox
    const stamen = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
    });

    // Layer do MapBox
    const mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        // Créditos da layer
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        minZoom: 1,
        id: 'mapbox.streets',
        // Token necessário para acesso a layer - algumas não necessitam
        accessToken: 'pk.eyJ1IjoibHVpemhzYWxhYXIiLCJhIjoiY2syNjhuNXE2MXBubDNjbjB1MDdpa2p1aCJ9.Xo1g0NzO6lxnkww5lo14-Q'
    });

    // Layer de topografia
    const openstreetmap_topografia = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Layer de transporte
    const openstreetmap_transporte = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="http://www.openptmap.org">OpenPtMap</a> contributors'
    });

    // Layer com GeoJson - Municípios de SC
    const request = await fetch( 'municipios_sc.json');
    const geoJson = await request.json();

    const geojson_layer = L.geoJSON(geoJson , {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    });

    // Extensão do leaflet com várias layers gratuitas
    // github: https://github.com/leaflet-extras/leaflet-providers
    // demo: https://leaflet-extras.github.io/leaflet-providers/preview/

    L.control.layers(
        {
            "OpenStreetMaps": openstreetmap,
            "Topografia": openstreetmap_topografia,
            "MapBox": mapbox,
            "Stamen Watercolor": stamen,
        },
        // Overlay na layer principal
        {
            "Transporte": openstreetmap_transporte,
            "GeoJson": geojson_layer
        }
    ).addTo(map);

}
