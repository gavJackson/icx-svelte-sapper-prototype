<script>
	// import * as moment from 'moment';
	//import * as Pikaday from 'https://cdn.jsdelivr.net/npm/pikaday/pikaday.js';
	// import { onMount } from 'svelte';

	// could not use Pikaday due to a weird moment dependency https://github.com/Pikaday/Pikaday/issues/852

	//import Datepicker from 'svelte-calendar';


	export let DisplayTypeShortCode;
	export let ShortCode;
	export let Label;

	//
	// let start = new Date()
	// let dateFormat = "#{l}, #{F} #{j}, #{Y}"
	// let noWeekendsSelectableCallback = function (date) {
	// 	return date.getDay() != 0 && date.getDay() != 6
	// }
	// let formattedSelected = undefined
	// let dateChosen = false
	// let exampleFormatted = false
	// let exampleChosen = false

</script>


<h1>Sample Views</h1>

<p>
	I have created a custom route containing the path to the json file to load which contains the view with its data components.

</p>

<ul>
	<li><a rel=prefetch href='view/assets-views-testForm1.json'>testForm1.json</a> - APv2 Prototype Stage 1</li>
	<li><a rel=prefetch href='view/assets-views-testForm2.json'>testForm2.json</a> - Virtual List Rendering</li>
</ul>
<!--
<Datepicker format={dateFormat} bind:formattedSelected bind:dateChosen>
			<button class="custom-button">
				{#if dateChosen} Chosen: {formattedSelected} {:else} Pick a date {/if}
			</button>
		</Datepicker>
-->
