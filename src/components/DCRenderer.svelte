<script>
	export let DisplayTypeShortCode;
	export let ShortCode;
	export let Label;
	export let children;

	// this lazy loads the data components, annoyingly i cannot construct the import string dynamically because i
	// think the compiler needs to know it so not sure if this is scalable, i do like the async promise markup tho..
	async function getComponent(DisplayTypeShortCode){
		// let component = await import(`./dataComponents/${DisplayTypeShortCode}.svelte`);
		// return component.default;

		let component;
		switch (DisplayTypeShortCode) {
			case 'GROUP':
				component = await import('./dataComponents/GROUP.svelte');
				return component.default;

			case 'TEXTBOX':
				component = await import('./dataComponents/TEXTBOX.svelte');
				return component.default;

			case 'DATEPICKER':
				component = await import('./dataComponents/DATEPICKER.svelte');
				return component.default;

			case 'DROPDOWN':
				component = await import('./dataComponents/DROPDOWN.svelte');
				return component.default;

			default:
				throw new Error(`Unknown component ${DisplayTypeShortCode}`)
		}
	}

	let promise = getComponent(DisplayTypeShortCode);

</script>


{#await promise}
	<p>...loading component</p>
{:then component}
	<svelte:component this={component} {...$$props} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
