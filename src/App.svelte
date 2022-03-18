<script>
	import ContentViewer from './components/ContentViewer.svelte'
</script>

<header>
	<h1>
		<img src="favicon.png" alt="HABitat plankton logo" height="48" width="48">
		HABitat
	</h1>
	<header class="top-nav">
	</header>
</header>
<main>
	<div class="mapview">
		<h2>Map View</h2>
		<p>Here you can see the map view of the available data, and filter what data is being viewed.</p>
	</div>
	<div class="stationview notcurrentview" 
	style="position: fixed; top: 5.5rem; z-index: 1; background-color: white; width: 100%; padding-left:0;">
		<h2 style="padding-left:2rem;">Station View</h2>
		<p style="padding-left:2rem;">Insert text about station here. Reading data from station.</p>
	</div>
	<div class="dataview notcurrentview">
		<h2>Data View</h2>
		<p>Insert text about station here. Reading specific dataset from station.</p>
	</div>
	<ContentViewer/>
</main>
<footer></footer>

<style>
	main {
		text-align: left;
		padding: 5.5rem 0rem 0.5rem;
		max-width: 100%;
		margin: 0 auto;
		background: #FFFFFF;
	}

	div {
		padding: 0rem 2rem;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>