<script>
  import { onMount } from 'svelte'
  import mapboxgl from "mapbox-gl";
  import { view } from '../store.js'
  import { stationView } from '../store.js'
  import { stationName} from '../store.js'

  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxob3VjayIsImEiOiJja3oxcng5c2cweGx4Mm5vNmQ2NW4yaDNtIn0._1AeE9ZA69C78qto9n7WOw'

  let stationData = {};
  let name = '';

  let locName ='';
  let satOn = true;
  let situOn = true;

  async function doPost () {
    let i=0;
    let res = await fetch(`./station_measurements?station=${name}`)
    while (i<1){
        if ({$stationView}.length == 0){
            console.log($stationView);
        }
        else if (res.ok) {
            i++;
            stationName.set(name);
            console.log(name);
        }  
    }
  }
  
  //I have made this a global which is wildly improper but does work
  let map;
  let features;

  function normalize(string) {
    return string.trim().toLowerCase();
}

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

        let typeFilter = "";

        //filter location and station type
        
        const filtered = [];
        for (const feature of features) {
            const name = normalize(feature.properties.name);
            const stationType = normalize(feature.properties.stationType);
            
            if(satOn && situOn){}
            else if(!satOn && !situOn)
                typeFilter = "none";
            else if(satOn)
                typeFilter = "satellite";
            else
                typeFilter = "insitu";
            
            console.log("type: ", typeFilter);
            if (name.includes(locName) && (typeFilter === ""|| stationType === typeFilter)) {
                console.log("Huh?", stationType);
                filtered.push(feature);
            }
        }   

        if(filtered.length !=0){
        map.setFilter('stationdata', [
            'match',
            ['get', 'name'],
            filtered.map((feature) => {
            return feature.properties.name;
            }),
            true,
            false
        ]);
        }
        else{
            map.setFilter('stationdata', ['==', ['get', 'stationType'], "None"]);
        }
       
    }

  function toggleView(){
        view.update(n => n + 1);
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
    console.log("Mounting map");
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
    //getSDKData();
    doPost();
      
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(
      `<strong style="color:white;font-size: 14px;">${name}</strong>
      <p style="margin:0; color:white;font-style: italic;font-size: 12px;">${coordinates[0].toFixed(2)}, ${coordinates[1].toFixed(2)}</p>`
    ).addTo(map);
    });
    
  // listener for marker select (click)
    map.on('click', 'stationdata', (e) => {
        //console.log(name);
        toggleView();
    });
    
  //Listener for hover away
    map.on('mouseleave', 'stationdata', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
    //name = '';
    stationData = -1;
    });

    //Get all locations
    //map.setFilter('stationdata',null);

    map.on('load', () => {
        features = map.queryRenderedFeatures({ layers: ['stationdata'] });
    });
    
    /*map.on('render', afterChangeComplete);
    
    function afterChangeComplete () {
        if (!map.loaded()) { return } 

        features = map.queryRenderedFeatures({ layers: ['stationdata'] });
        map.off('render', afterChangeComplete);
    }
    */

  });
</script>

<div style="padding: 0rem 2rem;">
    <h2 role="heading">Map View</h2>
    <p>Here you can see the map view of the available data, and filter what data is being viewed. Click on a station as indicated with a green circle on the map to view the most recent data collected at that station. You can return to this map at anytime by clicking on the HABitat logo at the top left of the page. For more information on how this site works, take a look at our documentation by clicking on the link labelled 'SDK' in the top right of the page. </p>
</div>
<div class="container" style=" width: 100%-4rem; height: 28rem; background: #FAFAFA;
border-radius: 10px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
margin: 0rem 2rem;">
  <div class="expandedview" style="display: initial; width: 223px; height:100%; background: #5F32A9; border-radius: 10px 0px 0px 10px; filter: drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.25));">
    <div class="filterHeader">    
        <span class="material-icons" style="color: white; padding: 0.5rem;">
        tune
        </span>
        <h3 style="width: 90%;">
            Filters
        </h3>
        <button on:click={() => toggleSidebar()} class="close" style="background:rgba(0,0,0,0); border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;" alt="collapse">
            <span class="material-icons" style="color: white;">
            keyboard_double_arrow_left
            </span>
        </button>
    </div>
    <hr class="solid">
    <h4>Location</h4>
    <p class="filter">
    Search for a station by name to center the map viewer on.
    </p>
    <div class="container">
        <div class="sw" style="padding:0rem 1rem;">
                <div class="outerBorder" style="display:flex; flex-direction: row;">
                    <input type="search" bind:value={locName} placeholder="Search..." style="height: 1.5rem; width: 90%;" />
                    <button on:click={() => FilterLoc(locName)} style="margin: 0; align:right; padding: 0rem; height: 1.5rem; width: 1.5rem;" alt="search">
                        <span class="material-icons">
                            search
                        </span>
                    </button>
                </div>
            
        </div>
    </div>
    
  
    <h5 style="margin: 2rem 0rem 1rem 0rem;" >Data Sources</h5>
    <p class="filter">
        Filter stations by data sources.
    </p>
    <button class="filterSatData" on:click={() => filterButton("filterSatData",locName)} style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>Remote Data</span>
    </button>
    <button class="filterSituData"
        on:click={() => filterButton("filterSituData",locName)}
        style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%"
    >
        <span class="mdc-button__ripple"></span>
        <span>In-Situ Data</span>
    </button>
  </div>
  <div class="collapsedview collapsed" style="width: 4.5rem; height:100%; background: #5F32A9; border-radius: 10px 0px 0px 10px; filter: drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.25));">
    <div class="filterHeader">    
        <span class="material-icons" style="color: white; padding: 0.5rem;">
        tune
        </span>
        <button on:click={() => toggleSidebar()} class="close" style="background:rgba(0,0,0,0); border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;" alt="expand">
            <span class="material-icons" style="color: white;">
            keyboard_double_arrow_right
            </span>
        </button>
    </div>
    <hr class="solid">
  </div>    
  <div style="margin-right: 2rem; width: 90%; height: 100%;" id="map">
  </div>
</div>

<style>
  p.filter {
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

    div.container {
        display: flex;
    }
</style>