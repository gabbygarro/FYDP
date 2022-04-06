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