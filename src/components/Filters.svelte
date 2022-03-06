<script>
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

    function filterButton(x) {
        var elements = document.getElementsByClassName(x);
        for(var i=0, len=elements.length; i<len; i++)
        {
            elements[i].classList.toggle("unclicked");
        }
    }
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
            <form>
                <div class="outerBorder" style="display:flex; flex-direction: row;">
                    <input type="search" class="search" placeholder="Search..." style="height: 1.5rem; width: 90%;" />
                    <button class="go" style="margin: 0; align:right; padding: 0rem; height: 1.5rem; width: 1.5rem;">
                        <span class="material-icons">
                            search
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    

    <h4>Sensor</h4>
    <p>
    Filter out data sources, sensor types and sensor statuses.
    </p>
    <h5>Data Sources</h5>
    <button class="filterSatData" on:click={() => filterButton("filterSatData")} style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>Satellite Data</span>
    </button>
    <button class="filterSituData"
        on:click={() => filterButton("filterSituData")}
        style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%"
    >
        <span class="mdc-button__ripple"></span>
        <span>In-Situ Data</span>
    </button>
    <h5>Station Status</h5>
    <button class="filterActiveStat" on:click={() => filterButton("filterActiveStat")} style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>Active</span>
    </button>
    <button class="filterInactiveStat" on:click={() => filterButton("filterInactiveStat")} style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>Inactive</span>
    </button>
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