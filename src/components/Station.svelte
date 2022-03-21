<script>
    import FusionCharts from 'fusioncharts';
    import Timeseries from 'fusioncharts/fusioncharts.timeseries';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

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

    let type = '';

    async function doPostType (measType) {
        type = measType;
        console.log("setDataView: ", type);
        let res = await fetch(`./station_measurement?type=${type}`)
        if (res.ok) {
            console.log(name, type);
        }
    }

    let datasetLength = 0;

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

    function strDictToArrays(dictData) {
        //str to Dict
        //console.log(dictData);
        if (dictData != "Not loaded measurements yet"){
            console.log("running...");
            
            let dictionary ="";
            let strTimestamps=[];
            let values = [];
            let strMeasTypes =[];
            let datasets = [];
            //console.log("dictionary: ", dictData);
            dictData = dictData.slice(1,-12);
            dictionary = dictData.split("    }\n  }, ");
            for(var i=0, len=dictionary.length; i<len; i++)
            {
                let dataset = [];
                dictionary[i] = dictionary[i].slice(4);
                dictionary[i] = dictionary[i].split("\": {\n    \"");
                strMeasTypes.push(dictionary[i][0]);
                //console.log(strMeasTypes[i]);

                dictionary[i]= dictionary[i][1];
                dictionary[i] = dictionary[i].split("    }, \n    \"value\": {");
                strTimestamps.push(dictionary[i][0]);
                strTimestamps[i] = strTimestamps[i].slice(25, -6);
                strTimestamps[i] = strTimestamps[i].split("\": ");

                values.push(dictionary[i][1]);
                
                values[i] = values[i].slice(1,-1);
                values[i] = values[i].split("\": ");
                values[i].shift()
                

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
                datasets.push([dataset, strMeasTypes[i]]);
                //console.log(datasets[i])
            }
            //console.log("dictionary: ",dictionary);
            //console.log("Meas Types: ",strMeasTypes);
            //console.log("timestamps: ",strTimestamps);
            //console.log("Values: ",values);            
            
            //console.log(datasets);
            return datasets
        }
    }

    async function getData(){
        let data = await fetch("./station_measurements").then(response => response.text()).then(data => strDictToArrays(data));
        datasetLength = data.length;
        return data
    }

    let promise,
        dataFetch = getData();

	promise = Promise.all([dataFetch]);

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
                    suffix: " unit"
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

<div style="
    width: 100%; 
    height: 100%; 
    background: #5F32A9; 
    border-radius: 10px;" 
    id="station">

    <button on:click={() => toggleView("stationview","mapview")} class="close" style="background:rgba(0,0,0,0); border-radius: 10px 0px 0px 0px; border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;">
            <span class="material-icons" style="color: white;">
                keyboard_arrow_left
            </span>
        </button>
    <hr class="solid" style="margin: 0rem 0.5rem;">
    <div class="grid-container" style="position: relative;">
        <!-- Figure out how to for loop based on number of items for station -->
        {#await promise}
            <h3>Fetching data and schema...</h3>
        {:then datasets}
            {#each Array(datasetLength) as _, i}
                <div class="grid-item" 
                    on:click={() => toggleView("stationview","dataview")}
                    on:click={() => doPostType(datasets[0][i][1])}
                >
                    <div id="chart-container" >
                        <SvelteFC
                            {...chartSetup([datasets[0][i],schema])}
                        />
                    </div>
                </div>
            {/each}
        {:catch error}
        <h3>Something went wrong: {error.message}</h3>
        {/await}
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
</style>