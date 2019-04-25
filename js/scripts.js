// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiamVsbGkxMCIsImEiOiJjanVkOXE0b3IwdDM4NDRxcmw3ZzJuc201In0.YpaZ6sRzl9kVVJwJpcK9lA';

// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-73.951,40.728],
  zoom: 10,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

  // this sets up the geojson as a source in the map, which I can use to add visual layers
  map.addSource('histdist2', {
    type: 'geojson',
    data: './data/histdist2.geojson',
  });

  // add a custom-styled layer for tax lots
  map.addLayer({
    id: 'histdist2',
    type: 'fill',
    source: 'histdist2',
    paint: {
      'fill-opacity': 0.7,
      'fill-color': {
        type: 'categorical',
        property: 'histdist',
  })

  // add an outline to the tax lots which is only visible after zoom level 14.8
  map.addLayer({
    id: 'histdist2',
    type: 'line',
    source: 'histdist2',
    paint: {
      'line-opacity': 0.7,
      'line-color': 'gray',
      'line-opacity': {
        stops: [[14, 0], [14.8, 1]], // zoom-dependent opacity, the lines will fade in between zoom level 14 and 14.8
      }
    }
  });

  // add an empty data source, which we will use to highlight the lot the user is hovering over
  map.addSource('highlight-feature', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  // add a layer for the highlighted lot
  map.addLayer({
    id: 'highlight-line',
    type: 'line',
    source: 'highlight-feature',
    paint: {
      'line-width': 3,
      'line-opacity': 0.9,
      'line-color': 'black',
    }
  });

  // when the mouse moves, do stuff!
  map.on('mousemove', function (e) {
    // query for the features under the mouse, but only in the lots layer
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['histdist2'],
    });

    // get the first feature from the array of returned features.
    var lot = features[0]

    if (lot) {  // if there's a lot under the mouse, do stuff
      map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer

      // lookup the corresponding description for the land use code
      var landuseDescription = LandUseLookup(parseInt(lot.properties.landuse)).description;

      // use jquery to display the address and land use description to the sidebar
      $('#address').text(lot.properties.address);
      $('#histdist').text(histdistrict);

      // set this lot's polygon feature as the data for the highlight source
      map.getSource('highlight-feature').setData(lot.geometry);
    } else {
      map.getCanvas().style.cursor = 'default'; // make the cursor default

      // reset the highlight source to an empty featurecollection
      map.getSource('highlight-feature').setData({
        type: 'FeatureCollection',
        features: []
      });
    }
  })
})
