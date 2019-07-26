import { readable, derived, writable } from 'svelte/store';


let groupedDataComponentShortCodes = [];


function createViewDefinition(){
	const {subscribe, set, update} = writable(null);

	return {
		subscribe,
		set,

		// Parses the current view definition data components, constructing a nested array of grouped data components and
		// their children and then adding all the ungrouped data components to the top
		populate: (payload) => {
			viewDefinition.set(payload);

			let dataComponentsToRender, dataComponent, isGroupedItself, allDataComponents;
			dataComponentsToRender = [];

			allDataComponents = payload.DataComponents;

			for(let i=0; i< allDataComponents.length; i++){
				dataComponent = allDataComponents[i];

				if(dataComponent.DisplayTypeShortCode === 'GROUP'){

					[dataComponent, isGroupedItself] = parseGroupDataComponent(dataComponent, allDataComponents);

					if(isGroupedItself == true){
						dataComponentsToRender.push(dataComponent);
					}
						groupedDataComponentShortCodes.push(dataComponent.ShortCode)
				}
			}

			let ungroupedDataComponents = []

			// now populate ungrouped
			for(let i=0; i< allDataComponents.length; i++) {
				dataComponent = allDataComponents[i];

				if(groupedDataComponentShortCodes.indexOf(dataComponent.ShortCode) == -1){
					ungroupedDataComponents.push(dataComponent);
				}
			}

			dataComponentsToRender = ungroupedDataComponents.concat(dataComponentsToRender)

			dataComponents.set(dataComponentsToRender);
		}
	}
}





///////////////////////////////
// helpers
///////////////////////////////


function parseGroupDataComponent(groupDataComponent, allDataComponents){
	let setting = groupDataComponent.Settings.reduce(function(a,b){
		if(a.Id === 'DATA_COMPONENTS'){
			return a;
		}
	});

	let dataComponent, groupedChildren, isGroupedItself, dontCare;
	groupedChildren = [];
	isGroupedItself = false;

	for(let i=0; i< allDataComponents.length; i++){
		dataComponent = allDataComponents[i];

		if(setting.Text.indexOf(dataComponent.ShortCode) !== -1){

			if(dataComponent.DisplayTypeShortCode === 'GROUP') {
				isGroupedItself = true;
				[dataComponent, dontCare] = parseGroupDataComponent(dataComponent, allDataComponents);
			}
			else{
				groupedDataComponentShortCodes.push(dataComponent.ShortCode);
			}

			groupedChildren.push(dataComponent)
		}
	}

	groupDataComponent.children = groupedChildren;

	return [groupDataComponent, isGroupedItself];
}

///////////////////////////////////////////////////////////
//
// exports
//
///////////////////////////////////////////////////////////


export const dataComponents = writable([]);
export const viewDefinition = createViewDefinition();
