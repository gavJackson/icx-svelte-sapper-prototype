<script>
	export let DisplayTypeShortCode;
	export let ShortCode;
	export let HelpDescription;
	export let Label;
</script>


<div class="data-component-container" data-short-code="{ShortCode}">
	<label for="{ShortCode}">{Label}</label>

	<div class="input-container">
		<input id="{ShortCode}" type="text" autocomplete="off"  />

		{#if HelpDescription}
			<div class="help-description">{HelpDescription}</div>
		{/if}
	</div>

</div>


<br />