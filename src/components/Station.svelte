<script>
    import FusionCharts from 'fusioncharts';
    import Timeseries from 'fusioncharts/fusioncharts.timeseries';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    import { onMount } from 'svelte'; 
    import { view } from '../store.js'
    import { dataView } from '../store.js'
    import { stationView } from '../store.js'
    import { stationName } from '../store.js'

    fcRoot(FusionCharts, Timeseries);

    // FusionCharts schema functioning properly
    let schema = [
        { 
            "name": "Time",
            "type": "date",
            "format": "%-d %b %Y %-I:%-M:%-S" // "26 Aug 2021 00:00:00"
        }, {
            "name": "Value",
            "type": "number"
        }
    ];

    let loadText = "Fetching data..."

    async function doPost (data) {
        let dataset = data;
        console.log("setDataView: ", dataset);
        dataView.set(dataset);
    }

    let station_name = "Station View";
    let datasets = [];
    let datasetLength = 0;

    function toggleView(newView){
		if (newView=="mapview"){
            stationView.set([]);
            stationName.set("Station View");
            view.update(n => n - 1);
        }
        else {
            view.update(n => n + 1);
            
        }
	}

    function strDictToArrays(dictData) {
        //str to Dict
        //console.log(dictData);
        if (dictData != "Not loaded measurements yet"){
            console.log("Test");
            console.log(dictData);
            console.log("running...");
            console.log(dictData);
            let dictionary ="";
            let strTimestamps=[];
            let values = [];
            let strMeasTypes = [];
            let units = [];
            let descriptions = [];
            let datasets = [];
            //console.log("dictionary: ", dictData);
            dictData = dictData.slice(1,-12);
            console.log(dictData);
            dictionary = dictData.split("    }\n  }, ");
            console.log(dictionary);
            if (dictionary == ""){
                console.log("We be here??");
                loadText = "No data to load";
            }
            else{
                for(var i=0, len=dictionary.length; i<len; i++)
                {
                    let dataset = [];
                    dictionary[i] = dictionary[i].slice(4);
                    dictionary[i] = dictionary[i].split("\": {\n    \"");
                    strMeasTypes.push(dictionary[i][0]);
                    //console.log(strMeasTypes[i]);

                    dictionary[i] = dictionary[i][1];
                    dictionary[i] = dictionary[i].split("\", \n    \"value\": {");
                    values.push(dictionary[i][1]);

                    dictionary[i] = dictionary[i][0];
                    dictionary[i] = dictionary[i].split("    }, \n    \"unit\": \"");
                    units.push(dictionary[i][1]);
                    //console.log("units: ", units[i]);

                    dictionary[i] = dictionary[i][0];
                    dictionary[i] = dictionary[i].split(", \n    \"");

                    descriptions.push(dictionary[i][0]);
                    descriptions[i] = descriptions[i].slice(15,-1);
                //console.log("Desc: ", descriptions[i]);

                    dictionary[i] = dictionary[i][1];
                    //console.log("TEST: ", dictionary[i]);
                    strTimestamps.push(dictionary[i]);
                    strTimestamps[i] = strTimestamps[i].slice(25, -6);
                    strTimestamps[i] = strTimestamps[i].split("\": ");
                    //console.log("time: ", strTimestamps[i]);

                    values[i] = values[i].slice(1,-1);
                    values[i] = values[i].split("\": ");
                    values[i].shift()
                    //console.log("values: ", values[i]);

                    for (let j = 0; j < values[i].length; j++){ //values list starts at index 1
                        var timestamp = strTimestamps[i][j]; //values list starts at index 1
                        timestamp = timestamp.slice(6);
                        if ( j!= values[i].length -1){
                            timestamp = timestamp.split(" GMT\", \n      \"");
                        }
                        else {
                            timestamp = timestamp.split(" GMT\"\n ");
                        }
                        
                        var numValue = values[i][j];
                        numValue = numValue.split(", \n      \"");
                        //console.log(numValue)
                        
                        numValue = Number(numValue[0]);    
                        
                        dataset.push([timestamp[0], numValue]);
                    }
                    datasets.push([dataset, strMeasTypes[i], units[i], descriptions[i]]);
                    //console.log(datasets[i])
                }
            }
            //console.log("dictionary: ",dictionary);
            //console.log("Meas Types: ",strMeasTypes);
            //console.log("timestamps: ",strTimestamps);
            //console.log("Values: ",values);            
            
            //console.log(datasets);
            return datasets
        }
    }

    onMount(async () => {
        stationView.subscribe(value => {
		    datasets = value;
	        });

        stationName.subscribe(value => {
            station_name = value;
            });

        if (datasets.length == 0){
            let res = await fetch("./station_measurements");
            const text = await res.text();
            let data = strDictToArrays(text);
            if (res.ok) {
                datasets = data;
                datasetLength = data.length;
                console.log("Mount?? ", datasets);
                stationView.set(datasets);
                console.log("GET: ", {$stationView});
            } else {
                datasets = new Error(text);
                console.log("Mount :( ", datasets);
            }
        }
        else {
            console.log("Is it unneccessrily updating??", datasets);
        }    
	});


    function chartSetup([data, schema]){
        console.log(data, schema);
        var fusionDataStore = new FusionCharts.DataStore(),
        fusionTable = fusionDataStore.createDataTable(data[0], schema);
        //console.log("===data===");
        //console.log(data);
        //console.log("===schema===");
        //console.log(schema);

        return {
        type: "timeseries",
        width: 500,
        height: 190,
        renderAt: "chart-container",
        dataSource: {
            styleDefinition: {
                "txt-white": {
                    fill: "#ffffff"
                },
                "background-clear": {
                    opacity: "0"
                },
                "background-lpurple": {
                    background: "#5F32A9"
                }
            },
            legend: {
                style: {
                    text: "txt-white",
                }
            },
            chart: {
                theme: "fusion",
                palettecolors: "#146C5F",
                style: {
                    background: "background-clear"
                }
            },
            caption: {
                style: {
                    text: "txt-white"
                },
                text: data[1]
            },
            xAxis: {
                style: {
                    "tick-mark": "txt-white",
                    "label": "txt-white"
                },
            },
            yAxis: [{
                style: {
                    "tick-mark": "txt-white",
                    label: "txt-white",
                    title: "txt-white",
                    "grid-line": "txt-white"
                },
                plot: {
                    value: "Value",
                    type: "line"
                },
                format: {
                    suffix: data[2]
                },
                title: "Value"
                }
            ],
            navigator: {enabled: 0},
            data: fusionTable,
            legend: {
                enabled: 0
            },
            crossline:{
                enabled: 0
            },
            extensions: {
                standardRangeSelector: {
                    enabled: 0
                },
                customRangeSelector: {
                enabled: 0
                }
            }
        }
        };
    }
</script>

<div style="padding: 0rem 2rem; position: fixed; z-index: 1; background-color: white; width: 100%;">
    <h2 role="heading">{station_name}</h2>
    <p style="margin-right: 4rem;">Reading all collected datasets from this station. For a more detailed view of a dataset, click on the graph within the viewer to be navigated to its dedicated page. To go back to the map view, click on the left facing arrow in the upper left corner of the viewer or click on the HABitat logo at the top left of the page.</p>
</div>
<div class="container"
    style=" width: 100%-4rem;
    border-radius: 10px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin-top: 5.15rem; margin-right: 2rem; margin-bottom: 1.35rem; margin-left: 2rem;"
>
   <div style="
    width: 100%; 
    height: 100%; 
    background: #5F32A9; 
    border-radius: 10px;" 
    id="station">

    <button on:click={() => toggleView("mapview")} class="close" style="background:rgba(0,0,0,0); border-radius: 10px 0px 0px 0px; border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;" alt="go back">
            <span class="material-icons" style="color: white;">
                keyboard_arrow_left
            </span>
        </button>
    <hr class="solid" style="margin: 0rem 0.5rem;">
    <div class="grid-container" style="position: relative;">
        <!-- Figure out how to for loop based on number of items for station -->
        {#each datasets as dataset, i}
            <div class="grid-item" 
                on:click={() => doPost(dataset)}
                on:click={() => toggleView("dataview")}
            >
                <div id="chart-container" >
                    <SvelteFC
                        {...chartSetup([dataset,schema])}
                    />
                </div>
            </div>
        {:else}
		<!-- this block renders when photos.length === 0 -->
		<h3>{loadText}</h3>
        {/each}
    </div>
</div> 
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto auto;
        column-gap: 1rem;
        row-gap: 1rem;
        padding: 1rem;
        min-height: 23.625rem;
    }

    .grid-item {
        background: #512886;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        padding: 0rem 0.5rem;
        height: 11.4rem;
        font-size: 30px;
        text-align: center;
        color: white;
    }

    div.container {
        display: flex;
    }
</style>