// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiamVsbGkxMCIsImEiOiJjanVkOXE0b3IwdDM4NDRxcmw3ZzJuc201In0.YpaZ6sRzl9kVVJwJpcK9lA';

var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-73.98, 40.70],
  zoom: 10,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

var popup = new mapboxgl.Popup({ offset: 40 })
  .setText('Hi Web Mapping 2019 Class!');


  var markerHeight = 50, markerRadius = 10, linearOffset = 25;
  var popupOffsets = {
   'top': [0, 0],
   'top-left': [0,0],
   'top-right': [0,0],
   'bottom': [0, -markerHeight],
   'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
   'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
   'left': [markerRadius, (markerHeight - markerRadius) * -1],
   'right': [-markerRadius, (markerHeight - markerRadius) * -1]
   };

swcafes.forEach(function(cafedata) {

  var type = 'yellow';
  if (swcafes.SWC_TYPE === 'Small Unenclosed') type = 'orange';
  if (swcafes.SWC_TYPE === 'Unenclosed') type = 'purple';
  if (swcafes.SWC_TYPE === 'Enclosed') type = 'green';

  new mapboxgl.Marker({
    color: type,
  })
    .setLngLat([swcafes.LONGITUDE, swcafes.LATITUDE])
    .setPopup(new mapboxgl.Popup({ offset: 40 })
      .setText(`${swcafes.BUSINESS_NAME2} is the new sidewalk cafe, owned by ${swcafes.BUSINESS_NAME}`))
    .addTo(map);
})
