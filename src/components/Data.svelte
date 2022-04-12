<script>
    import FusionCharts from 'fusioncharts';
    import Timeseries from 'fusioncharts/fusioncharts.timeseries';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    import { view } from '../store.js'
    import { dataView } from '../store.js'
    import { onMount } from 'svelte';
    import { stationName } from '../store.js'

    function toggleView(){
        view.update(n => n - 1);
	}

    fcRoot(FusionCharts, Timeseries);

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

    let dataset = [];
    let station_name = "";
    let dataset_type = "Data View";
    let dataset_desc = "Loading dataset description..."

    onMount(async () => {
        let data = await getDataset()
        console.log("Mount?? ", dataset);
        stationName.subscribe(value => {
            station_name = value;
            });
	});

    async function getDataset(){
        let i = 0;
        while (i<1) {
            dataView.subscribe(value => {
		    dataset = value;
	        });
            if (dataset != []) {
                i++;
                return dataset
            }  
        }
    }

    function chartSetup([data, schema]){
        console.log("Chart",data, schema);
        dataset_type = data[1];
        dataset_desc = data[3];
        const fusionDataStore = new FusionCharts.DataStore(),
        fusionTable = fusionDataStore.createDataTable(data[0], schema);

        return {
            type: "timeseries",
            width: "95%",
            height: "90%",
            renderAt: "data-chart-container",
            dataSource: {
            styleDefinition: {
                "txt-white": {
                    fill: "#ffffff"
                },
                "txt-lgrey": {
                    fill: "#bbb"
                },
                "txt-dgrey": {
                    color: "#666"
                },
                "txt-green": {
                    fill: "#146C5F"
                },
                "background-dpurple": {
                    fill: "#512886"
                },
                "background-clear": {
                    opacity: "0"
                },
                "background-lpurple": {
                    background: "#5F32A9"
                }
            },
            extensions: {
                customRangeSelector: {
                    style: {
                        "title-text": "txt-white",
                        "title-icon": "txt-white",
                        "cal-body": "txt-dgrey",
                        "cal-header": "background-lpurple",
                        "cal-selecteddate": "background-lpurple",
                        "button-apply": {
                            "background-color": "#5F32A9",
                            "color": "#ffffff",
                            "border": "#5F32A9"
                        }
                    }
                },
                standardRangeSelector: {
                style: {
                    "button-text": "txt-dgrey",
                    "button-text:active": "txt-white",
                    "button-text:hover": "txt-lgrey"
                }
            }
            },      
            data: fusionTable,
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
                    "label": "txt-white",
                    title: "txt-white"
                },
                title: "Time"
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
            ]
            }
        };
    }
</script>

<div style="padding: 0rem 2rem;">
    <h2 role="heading">{station_name}: {dataset_type}</h2>
    <p>{dataset_desc} To go back to the {station_name} page, click on the left facing arrow in the upper left corner of the viewer. To return to the map, click on the HABitat logo at the top left of the page.</p>
</div>
<div class="container"
    style=" width: 100%-4rem; height: 28rem;
    border-radius: 10px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin: 0rem 2rem;"
>
    <div style="
    width: 100%; 
    height: 100%; 
    background: #512886;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;"
    id="station">
    <button on:click={() => toggleView("dataview","stationview")} class="close" style="background:rgba(0,0,0,0); border-radius: 10px 0px 0px 0px; border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;" alt="go back">
            <span class="material-icons" style="color: white;">
                keyboard_arrow_left
            </span>
        </button>
    <hr class="solid" style="margin: 0rem 0.5rem;">
    <div class="data-item">
        <div>
            {#if (dataset.length !=0)}
                <div class="grid-item">
                    <div id="data-chart-container" >
                        <SvelteFC
                            {...chartSetup([dataset,schema])}
                        />
                    </div>
                </div>
            {:else}
                <!-- this block renders when photos.length === 0 -->
                <h3>Fetching data...</h3>
            {/if}
        </div>
    </div>
    </div>
</div>

<style>
    .data-item {
        background: #512886;
        border-radius: 10px;

        padding: 0rem 1rem;
        height: 8rem;
        font-size: 30px;
        text-align: center;
        color: white;
    }

    div.container {
        display: flex;
    }
</style>