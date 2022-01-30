<script>
    let valueA = '';
</script>

<div style="width: 223px; height:100%; background: #5F32A9; border-radius: 10px 0px 0px 10px; filter: drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.25));">
    <div class="filterHeader">    
        <span class="material-icons" style="color: white; padding: 0.5rem;">
        tune
        </span>
        <h3>
            Filters
        </h3>
        <span class="material-icons" style="color: white; padding: 0.5rem 5rem;">
        keyboard_double_arrow_left
        </span>
    </div>
    <hr class="solid">
    <h4>Location</h4>
    <p>
    Search for a station or coordinate to center the viewer.
    </p>
    <span class="material-icons" style="color: white; padding: 0.5rem;">
    search
    </span>

    <h4>Sensor</h4>
    <p>
    Filter out data sources, sensor types and sensor statuses.
    </p>
    
    <h4>Date and Time</h4>
    <p>
    View data only from a set date, time or range of dates or times.
    </p>
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