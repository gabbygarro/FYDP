<script>
	import Map from './components/Map.svelte'
    import Station from './components/Station.svelte'
    import Data from './components/Data.svelte'
	import { view } from './store.js'

    const options = [
		{ component: Map },
		{ component: Station },
		{ component: Data  },
	];

    let currView;

    view.subscribe(value => {
		currView = options[value];
	});

	function toggleView(){
        view.set(0);
		stationView.set([]);
        stationName.set("Station View");
	}
</script>

<svelte:head>
	<title>HABitat: Harmful Algae Bloom Data Aggregator</title>
	<html lang="en"/>
</svelte:head>
<header style="display:flex;">
	<h1 on:click={() => toggleView()}>
		<img src="favicon.png" alt="HABitat plankton logo" height="48" width="48">
		HABitat
		
	</h1>
	<h2 style="margin-left:67rem; padding: 0.25rem 0.25rem; text-align: right;">
		<a style="color: white; text-decoration: none !important;" href="https://pypi.org/project/habitat-fydp-package/">
			SDK
		</a>
	</h2>
	
	<header class="top-nav">
	</header>
</header>
<main>
	<svelte:component this={currView.component}/>
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>