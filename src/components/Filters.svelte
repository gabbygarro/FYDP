<script>
</script>

<div style="width: 223px; height:100%; background: #5F32A9; border-radius: 10px 0px 0px 10px; filter: drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.25));">
    <div class="filterHeader">    
        <span class="material-icons" style="color: white; padding: 0.5rem;">
        tune
        </span>
        <h3>
            Filters
        </h3>
        <button class="close" style="background:rgba(0,0,0,0); border:0; margin: 0; padding: 0.5rem 0rem 0rem 4.5rem;">
            <span class="material-icons" style="color: white;">
            keyboard_double_arrow_left
            </span>
        </button>
    </div>
    <hr class="solid">
    <h4>Location</h4>
    <p>
    Search for a station or coordinate to center the viewer.
    </p>
    <div class="container">
        <div class="sw" style="padding:0rem 1rem;">
            <form style="display:flex; flex-direction: row;">
                <input type="search" class="search" placeholder="Search..." style="height: 1.5rem; width: 80%;" />
                <button class="go" style="margin: 0rem 1rem; align:right; padding: 0rem; height: 1.5rem; width: 1.5rem;">
                    <span class="material-icons">
                        search
                    </span>
                </button>
            </form>
        </div>
    </div>
    

    <h4>Sensor</h4>
    <p>
    Filter out data sources, sensor types and sensor statuses.
    </p>
    <h5>Data Sources</h5>
    <button style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>Satellite Data</span>
    </button>
    <button style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>In-Situ Data</span>
    </button>
    <h5>Station Status</h5>
    <button style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>Active</span>
    </button>
    <button style="margin: 0.25rem 2rem; padding: 0.1rem; width: 80%">
        <span class="mdc-button__ripple"></span>
        <span>Inactive</span>
    </button>
</div>

<style>
    button.active {
        background-color: green;
    }
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