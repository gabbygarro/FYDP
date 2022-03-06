<script>
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
</script>

<div style="
    width: 90%; 
    height: 100%; 
    background: #5F32A9; 
    border-radius: 10px 0px 0px 10px;" 
    id="station">

    <button on:click={() => toggleView("stationview","mapview")} class="close" style="background:rgba(0,0,0,0); border-radius: 10px 0px 0px 0px; border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;">
            <span class="material-icons" style="color: white;">
                keyboard_arrow_left
            </span>
        </button>
    <hr class="solid" style="margin: 0rem 0.5rem;">
    <div class="grid-container">
        <!-- Figure out how to for loop based on number of items for station -->
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>*insert data info n plot here*</div>
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>*insert data info n plot here*</div>
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>*insert data info n plot here*</div>
        <div class="grid-item" on:click={() => toggleView("stationview","dataview")}>*insert data info n plot here*</div>
    </div>
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto auto;
        column-gap: 1rem;
        row-gap: 1rem;
        padding: 1rem;
    }

    .grid-item {
        background: #512886;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;

        padding: 20px;
        height: 8rem;
        font-size: 30px;
        text-align: center;
        color: white;
    }
</style>