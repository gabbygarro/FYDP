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
    background: #512886;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px 0px 0px 10px;" 
    id="station">

    <button on:click={() => toggleView("dataview","stationview")} class="close" style="background:rgba(0,0,0,0); border-radius: 10px 0px 0px 0px; border:0; margin: 0; padding: 0.5rem 0rem 0rem 0.5rem;">
            <span class="material-icons" style="color: white;">
                keyboard_arrow_left
            </span>
        </button>
    <hr class="solid" style="margin: 0rem 0.5rem;">
    
</div>

<style>
</style>