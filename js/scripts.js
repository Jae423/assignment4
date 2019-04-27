// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiamVsbGkxMCIsImEiOiJjanVkOXE0b3IwdDM4NDRxcmw3ZzJuc201In0.YpaZ6sRzl9kVVJwJpcK9lA'
// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-73.9795357,40.773105],
  zoom: 11,
});
