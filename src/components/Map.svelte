<script>
  import { onMount } from 'svelte'
  import mapboxgl from "mapbox-gl";

  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxob3VjayIsImEiOiJja3oxcng5c2cweGx4Mm5vNmQ2NW4yaDNtIn0._1AeE9ZA69C78qto9n7WOw'

  let stationData = {};
  let name = '';

  let locName ='';
  let satOn = true;
  let situOn = true;
  
  //I have made this a global which is wildly improper but does work
  let map;

    function toggleSidebar() {
        var elements = document.getElementsByClassName("expandedview");
        for(var i=0, len=elements.length; i<len; i++)
        {
            elements[i].classList.toggle("collapsed");
        }

        elements = document.getElementsByClassName("collapsedview");
        for(var i=0, len=elements.length; i<len; i++)
        {
            elements[i].classList.toggle("collapsed");
        }
    }

    function filterButton(x, locName) {
        
        var elements = document.getElementsByClassName(x);
        for(var i=0, len=elements.length; i<len; i++)
        {
            elements[i].classList.toggle("unclicked");
        }
        
        generalFilter(x,locName);

    }
    function FilterLoc(locName){
    //alert(map.getFilter('stationdata')); //==,downcase,get,name,downcase,mentor wet well
        generalFilter("location",locName);

    }

    function generalFilter(x,locName){
        
        if(x == "filterSatData")
            satOn = !satOn;
        else if(x == "filterSituData")
            situOn = !situOn;

        if(satOn && situOn){
            if(locName !== ""){ 
                map.setFilter('stationdata', ['==', ['downcase',['get', 'name']], ['downcase',locName]]);
            }
            else{
                map.setFilter('stationdata',null);
            }
        }
        else if(!satOn && !situOn){
            map.setFilter('stationdata', ['==', ['get', 'stationType'], "None"]);
        }
        else if(satOn){
            if(locName !== ""){ 
                map.setFilter('stationdata', ['all', ['==', ['downcase',['get', 'name']], ['downcase',locName]], ['==', ['get', 'stationType'], "Satellite"]]);
            }
            else {
                map.setFilter('stationdata', ['==', ['get', 'stationType'], "Satellite"]);
            }
        }
        else{
            if(locName !== ""){ 
                map.setFilter('stationdata', ['all', ['==', ['downcase',['get', 'name']], ['downcase',locName]], ['==', ['get', 'stationType'], "InSitu"]]);
            }
            else {
                map.setFilter('stationdata', ['==', ['get', 'stationType'], "InSitu"]);
            }
           
        }
    }

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
    map = new mapboxgl.Map({
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

<div class="expandedview" style="display: initial; width: 223px; height:100%; background: #5F32A9; border-radius: 10px 0px 0px 10px; filter: drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.25));">
  <div class="filterHeader">    
      <span class="material-icons" style="color: white; padding: 0.5rem;">
      tune
      </span>
      <h3 style="width: 90%;">
          Filters
      </h3>
      <button on:click={() => toggleSidebar()} class="close" style="background:rgba(0,0,0,0); border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;">
          <span class="material-icons" style="color: white;">
          keyboard_double_arrow_left
          </span>
      </button>
  </div>
  <hr class="solid">
  <h4>Location</h4>
  <p>
  Search for a station or coordinate to center the viewer on.
  </p>
  <div class="container">
      <div class="sw" style="padding:0rem 1rem;">
          
              <div class="outerBorder" style="display:flex; flex-direction: row;">
                  <input type="search" bind:value={locName} placeholder="Search..." style="height: 1.5rem; width: 90%;" />
                  <button on:click={() => FilterLoc(locName)} style="margin: 0; align:right; padding: 0rem; height: 1.5rem; width: 1.5rem;">
                      <span class="material-icons">
                          search
                      </span>
                  </button>
              </div>
          
      </div>
  </div>
  

  <h4>Sensor</h4>
  <p>
  Filter out data sources, sensor types and sensor statuses.
  </p>
  <h5 style="margin: 2rem 0rem 1rem 0rem;" >Data Sources</h5>
  <button class="filterSatData" on:click={() => filterButton("filterSatData",locName)} style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
      <span class="mdc-button__ripple"></span>
      <span>Satellite Data</span>
  </button>
  <button class="filterSituData"
      on:click={() => filterButton("filterSituData",locName)}
      style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%"
  >
      <span class="mdc-button__ripple"></span>
      <span>In-Situ Data</span>
  </button>
  <!--
  <h5>Station Status</h5>
  <button class="filterActiveStat" on:click={() => filterButton("filterActiveStat")} style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
      <span class="mdc-button__ripple"></span>
      <span>Active</span>
  </button>
  <button class="filterInactiveStat" on:click={() => filterButton("filterInactiveStat")} style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
      <span class="mdc-button__ripple"></span>
      <span>Inactive</span>
  </button>
    -->
</div>

<div class="collapsedview collapsed" style="width: 4.5rem; height:100%; background: #5F32A9; border-radius: 10px 0px 0px 10px; filter: drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.25));">
  <div class="filterHeader">    
      <span class="material-icons" style="color: white; padding: 0.5rem;">
      tune
      </span>
      <button on:click={() => toggleSidebar()} class="close" style="background:rgba(0,0,0,0); border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;">
          <span class="material-icons" style="color: white;">
          keyboard_double_arrow_right
          </span>
      </button>
  </div>
  <hr class="solid">
</div>    
<div style="margin-right: 2rem; width: 90%; height: 100%;" id="map">
</div>

<style>
  p {
        color: white;
        padding: 0 1rem;
    }

    hr.solid {
        border-top: 1px solid #FFFFFF;
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }

    div.filterHeader {
        display: flex;
    }
</style>