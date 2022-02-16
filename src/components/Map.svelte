<script>
    import { onMount } from 'svelte'
    import mapboxgl from "mapbox-gl";
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxob3VjayIsImEiOiJja3oxcng5c2cweGx4Mm5vNmQ2NW4yaDNtIn0._1AeE9ZA69C78qto9n7WOw'
    //mapboxgl.accessToken = 'pk.eyJ1IjoiZ2ZnYXJybyIsImEiOiJja3lydnRubmwweGk4Mm9waG9rbG1qNDlhIn0.tl6qKkV5WgfmaT2iDQ5Oeg'

    onMount(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/elhouck/ckz1rzqck006e14pg9ub32fha",
      center: [-82, 42.3],
      zoom: 7,
    });
    
    // listener for marker select (hover)
    map.on('mousemove', (event) => {
      
      const features = map.queryRenderedFeatures(event.point, {
        layers: ['stationdata']
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];
      
      const popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
        `<p>${feature.properties.name}</p>`
        //In the actual implementation, we use name field to get SDK data for station
      )
      .addTo(map);

    });

    // listener for marker select (click)

    // listener for hover away
    // map.on('mouseleave', (event) )

  })
    /*
    
    */
    
</script>

<div style="margin-right: 2rem; width: 100%; height: 100%;" id="map">
</div>



<style>

</style>