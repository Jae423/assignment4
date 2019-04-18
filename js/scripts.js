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

var marker = new mapboxgl.Marker()
  .setLngLat([-73.969145,40.669116])
  .setPopup(popup)
  .addTo(map);

swcafes.forEach(function(cafedata) {

  var type = 'yellow';
  if (cafedata.SWC_TYPE === 'Small Unenclosed') type = 'orange';
  if (cafedata.SWC_TYPE === 'Unenclosed') type = 'purple';
  if (cafedata.SWC_TYPE === 'Enclosed') type = 'green';

  new mapboxgl.Marker({
    color: type,
  })
    .setLngLat([cafedata.LONGITUDE, cafedata.LATITUDE])
    .setPopup(new mapboxgl.Popup({ offset: 40 })
    if (cafedata.SWC_TYPE === '') .setText(`${cafedata.BUSINESS_NAME} 'is the new sidewalk cafe`))
    if (cafedata.SWC_TYPE != '') .setText(`${cafedata.BUSINESS_NAME2} is the new sidewalk cafe, owned by ${cafedata.BUSINESS_NAME}`))
    .addTo(map);
})
