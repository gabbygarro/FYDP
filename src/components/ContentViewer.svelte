<script>
	import Map from './Map.svelte'
    import Filters from './Filters.svelte'
</script>

<div class="container"
    style=" width: 100%; height: 28rem; background: #FAFAFA; 
    border-radius: 10px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));"
>
    <Filters/>
    <Map/>
</div>

<style>
    div {
        display: flex;
    }
</style>