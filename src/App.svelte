<script>
	import ContentViewer from './components/ContentViewer.svelte'
	import Textfield from '@smui/textfield';

	let rand = -1;
  	function getRand() {
    	fetch("./rand")
      		.then(d => d.text())
      		.then(d => (rand = d));
  }
	function getStations() {
    	fetch("./stations")
      		.then(x => x.text())
      		.then(x => (stations = x));
		console.log(stations);
  }
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
	<h2>Map View</h2>
	<p>Here you can see the map view of the available data, and filter what data is being viewed.</p>
	<ContentViewer/>
	
	<!--This bit is just to help figure out the flask connection pls ignore-->
	<!--<p>Your number is {rand}!</p>-->
	<!--<button on:click={getRand}>Get a random number</button>-->
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