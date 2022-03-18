<script>
	import Map from './Map.svelte'
    import Station from './Station.svelte'
    import Data from './Data.svelte'
    import Filters from './Filters.svelte'
</script>

<div class="container mapview"
    style=" width: 100%-4rem; height: 28rem; background: #FAFAFA; 
    border-radius: 10px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin: 0rem 2rem;"
>
    <Map/>
</div>

<div class="container stationview notcurrentview"
    style=" width: 100%-4rem;  background: #FAFAFA; 
    border-radius: 10px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin-top: 4.25rem; margin-right: 2rem; margin-bottom: 2.25rem; margin-left: 2rem;"
>
    <Station/>
    <Filters/>
</div>

<div class="container dataview notcurrentview"
    style=" width: 100%-4rem; height: 28rem; background: #FAFAFA; 
    border-radius: 10px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin: 0rem 2rem;"
>
    <Data/>
    <Filters/>
</div>

<style>
    div {
        display: flex;
    }
</style>