<script>
    import { onMount } from 'svelte'
    import mapboxgl from "mapbox-gl";
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2ZnYXJybyIsImEiOiJja3lydnRubmwweGk4Mm9waG9rbG1qNDlhIn0.tl6qKkV5WgfmaT2iDQ5Oeg'

    onMount(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-81.339941, 42.066885],
      zoom: 8,
    });     
  })
    
</script>

<p style="height: 0px; margin:0; padding: 3rem 16rem;">* insert map here * :) p.s. u r a qt ;) </p>
<div style="width: 400px; height: 400px;" id="map">
</div>



<style>

</style>