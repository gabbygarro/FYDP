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
	<div class="stationview notcurrentview">
		<h2>Station View</h2>
		<p>Insert text about station here. Reading data from station.</p>
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
		padding: 6rem 2rem 0.5rem;
		max-width: 240px;
		margin: 0 auto;
		background: #FFFFFF;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>