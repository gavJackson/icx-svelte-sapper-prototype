<script context="module">
	import {viewDefinition, dataComponents} from './../../stores'
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import DCRenderer from './../../components/DCRenderer.svelte'


	// loading the url from the slug (route param)
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte


		const res = await this.fetch(`${params.slug.replace(/[|-]/g, '/')}`);
		const data = await res.json();

		if (res.status === 200) {
			viewDefinition.populate(data);
		} else {
			this.error(res.status, data.message);
		}
	}



let start;
let end;

let useVirtualList = viewDefinition.UseVirtualList;

</script>



<svelte:head>
	<title>View</title>
</svelte:head>

<form autocomplete="off">
	<header>
		<h1>{$viewDefinition.ScreenName}</h1>

		<p>{$viewDefinition.ScreenHelpDescription}</p>
	</header>

	<fieldset>
		<legend>{$viewDefinition.ScreenName}</legend>
			{#if $viewDefinition.UseVirtualList}
				<div class="view-container">
					<VirtualList items={$dataComponents} let:item bind:start bind:end>
						<DCRenderer {...item}/>
					</VirtualList>
				</div>

				<p>showing items {start}-{end}</p>
			{:else}
				{#each $dataComponents as item}

					<DCRenderer {...item}/>

				{/each}
			{/if}

	</fieldset>
</form>


<style>

.view-container{
	/*border-top: 1px solid #333;*/
	/*border-bottom: 1px solid #333;*/
	min-height: 200px;
	height: calc(100vh - 15em);
}

fieldset{
	border: none;
	padding: 0px;
	margin: 0px;
}

legend{
	display: none;
}
</style>

