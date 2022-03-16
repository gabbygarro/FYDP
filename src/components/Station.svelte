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
    ]

    let datapoints = []

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
        //{ "timestamp": { "0": "Thu, 26 Aug 2021 00:00:00 GMT", "1": "Thu, 26 Aug 2021 00:10:00 GMT",
        let dictionary ="";
        let strTimestamp="";
        let value = "";
        datapoints = [];
        //console.log("dictionary: ", dictData);
        dictionary = dictData.split(" \n  \"value\": {\n    ");

        strTimestamp = dictionary[0];
        strTimestamp = strTimestamp.slice(24, -3);
        strTimestamp = strTimestamp.split("\": ");
        //console.log("===TIMESTAMP===");
        //console.log(strTimestamp);

        value = dictionary[1];
        value = value.slice(1,-7);
        value = value.split("\": ");
        //console.log("===VALUE===");
        //console.log(value);
        
        for (let j = 1; j < value.length; j++){
            var timestamp = strTimestamp[j];
            timestamp = timestamp.slice(6);
            if ( j!= value.length -1){
                timestamp = timestamp.split(" GMT\", \n    \"");
            }
            else {
                timestamp = timestamp.split(" GMT\"\n ");
            }
            var numValue = value[j];
            numValue = numValue.split(", \n    \"");
            numValue = Number(numValue[0]);
            datapoints.push([timestamp[0], numValue]);
        }
        
        //console.log(datapoints);

        return datapoints
    }

    let promise,
        dataFetch = fetch("./station_measurements").then(response => response.text()).then(data => strDictToArrays(data)),
        schemaFetch = schema;
    
    promise = Promise.all([dataFetch, schemaFetch]);

    const getChartConfig = ([data, schema]) => {
        const fusionDataStore = new FusionCharts.DataStore(),
        fusionTable = fusionDataStore.createDataTable(data, schema);
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
                text: "Chlorophyll Fluorescence"
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
    };
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
    <div class="grid-container">
        <!-- Figure out how to for loop based on number of items for station -->
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>
            <div id="chart-container" >
                {#await promise}
                    <h3>Fetching data and schema...</h3>
                {:then value}
                <SvelteFC
                    {...getChartConfig(value)}
                />
                {:catch error}
                    <h3>Something went wrong: {error.message}</h3>
                {/await}
            </div>
        </div>
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>
            <div id="chart-container" >
                {#await promise}
                    <h3>Fetching data and schema...</h3>
                {:then value}
                <SvelteFC
                    {...getChartConfig(value)}
                />
                {:catch error}
                    <h3>Something went wrong: {error.message}</h3>
                {/await}
            </div>
        </div>
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>
            <div id="chart-container" >
                {#await promise}
                    <h3>Fetching data and schema...</h3>
                {:then value}
                <SvelteFC
                    {...getChartConfig(value)}
                />
                {:catch error}
                    <h3>Something went wrong: {error.message}</h3>
                {/await}
            </div>
        </div>
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>
            <div id="chart-container" >
                {#await promise}
                    <h3>Fetching data and schema...</h3>
                {:then value}
                <SvelteFC
                    {...getChartConfig(value)}
                />
                {:catch error}
                    <h3>Something went wrong: {error.message}</h3>
                {/await}
            </div>
        </div>
    </div>
</div>


<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        column-gap: 1rem;
        row-gap: 1rem;
        padding: 1rem;
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