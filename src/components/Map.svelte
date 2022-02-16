<script>
    import { onMount } from 'svelte'
    import mapboxgl from "mapbox-gl";
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxob3VjayIsImEiOiJja3oxcng5c2cweGx4Mm5vNmQ2NW4yaDNtIn0._1AeE9ZA69C78qto9n7WOw'

    onMount(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/elhouck/ckz1rzqck006e14pg9ub32fha",
      center: [-82, 42.3],
      zoom: 7,
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
    
    //Listener for hover
    map.on('mouseenter', 'stationdata', (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';
      
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.name;
      
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //Find SDK info
      //get_most_recent_measurement(name, "Chlorophyll Fluorescence");
      
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(
        `<p>${name}</p>
        <p>${coordinates[0].toFixed(2)}</p>
        <p>${coordinates[1].toFixed(2)}</p>`
      ).addTo(map);
    });
    
    // listener for marker select (click)
    map.on('click', 'stationdata', () => {
      
    });
    
    //Listener for hover away
    map.on('mouseleave', 'stationdata', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });
</script>

<div style="margin: 0rem 0rem 2rem 0rem; width: 80%; height: 100%;" id="map">
</div>



<style>

</style>