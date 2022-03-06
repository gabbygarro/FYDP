<script>
  import { onMount } from 'svelte'
  import mapboxgl from "mapbox-gl";

  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxob3VjayIsImEiOiJja3oxcng5c2cweGx4Mm5vNmQ2NW4yaDNtIn0._1AeE9ZA69C78qto9n7WOw'

  let stationData = {};
  let name = '';

  function toggleView(currentView, newView){
		var elements = document.getElementsByClassName(currentView);
        for(var i=0, len=elements.length; i<len; i++)
        {
            elements[i].classList.toggle("notcurrentview");
        }

        elements = document.getElementsByClassName(newView);
        for(var i=0, len=elements.length; i<len; i++)
        {
            elements[i].classList.toggle("notcurrentview");
        }
	}

  async function getSDKData() {
    let thisName = name;
    let res = await fetch(`./stationTest?station=${name}`);
    let message_received = await res.text();
    if (res.ok && thisName == name) {
      console.log(name);
      stationData = message_received;
      const obj = JSON.parse(stationData);
      console.log(obj.name[0]);
    }
    /*fetch(`./stationTest?station=${name}`)
      .then(x => x.text())
      .then(x => (stationData = x));
    */
  }
    
  onMount(() => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/elhouck/ckz1rzqck006e14pg9ub32fha",
    center: [-82, 42.3],
    zoom: 7,
  });

  const popup = new mapboxgl.Popup({
    className: "popup",
    closeButton: false,
    closeOnClick: false
  });
    
  //Listener for hover
  map.on('mouseenter', 'stationdata', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    name = e.features[0].properties.name;
    
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    //Find SDK info
    getSDKData();
      
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(
      `<strong style="color:white;font-size: 14px;">${name}</strong>
      <p style="margin:0; color:white;font-style: italic;font-size: 12px";>${coordinates[0].toFixed(2)}, ${coordinates[1].toFixed(2)}</p>`
    ).addTo(map);
    });
    
  // listener for marker select (click)
  map.on('click', 'stationdata', () => toggleView("mapview","stationview"));
    
  //Listener for hover away
    map.on('mouseleave', 'stationdata', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
    name = '';
    stationData = -1;
    });
  });
</script>

<div style="margin-right: 2rem; width: 90%; height: 100%;" id="map">
</div>

<style>
</style>