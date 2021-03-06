import { S as SvelteComponentDev, i as init, s as safe_not_equal, v as globals, T as handle_promise, x as empty, j as insert, y as assign, q as transition_in, r as transition_out, f as detach, U as exclude_internal_props, e as element, t as text, c as claim_element, b as children, d as claim_text, F as set_style, h as add_location, k as append, n as noop, m as mount_component, z as get_spread_update, B as group_outros, u as destroy_component, C as check_outros } from './chunk.6be85367.js';

/* src/components/DCRenderer.svelte generated by Svelte v3.6.7 */
const { Error: Error_1 } = globals;

const file = "src/components/DCRenderer.svelte";

// (45:0) {:catch error}
function create_catch_block(ctx) {
	var p, t_value = ctx.error.message, t;

	return {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},

		l: function claim(nodes) {
			p = claim_element(nodes, "P", { style: true }, false);
			var p_nodes = children(p);

			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			set_style(p, "color", "red");
			add_location(p, file, 45, 1, 1299);
		},

		m: function mount(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},

		p: noop,
		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (43:0) {:then component}
function create_then_block(ctx) {
	var switch_instance_anchor, current;

	var switch_instance_spread_levels = [
		ctx.$$props
	];

	var switch_value = ctx.component;

	function switch_props(ctx) {
		let switch_instance_props = {};
		for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}
		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		var switch_instance = new switch_value(switch_props());
	}

	return {
		c: function create() {
			if (switch_instance) switch_instance.$$.fragment.c();
			switch_instance_anchor = empty();
		},

		l: function claim(nodes) {
			if (switch_instance) switch_instance.$$.fragment.l(nodes);
			switch_instance_anchor = empty();
		},

		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},

		p: function update(changed, ctx) {
			var switch_instance_changes = changed.$$props ? get_spread_update(switch_instance_spread_levels, [
				ctx.$$props
			]) : {};

			if (switch_value !== (switch_value = ctx.component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;
					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});
					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());

					switch_instance.$$.fragment.c();
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}

			else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},

		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

			current = true;
		},

		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(switch_instance_anchor);
			}

			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (41:16)   <p>...loading component</p> {:then component}
function create_pending_block(ctx) {
	var p, t;

	return {
		c: function create() {
			p = element("p");
			t = text("...loading component");
			this.h();
		},

		l: function claim(nodes) {
			p = claim_element(nodes, "P", {}, false);
			var p_nodes = children(p);

			t = claim_text(p_nodes, "...loading component");
			p_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			add_location(p, file, 41, 1, 1185);
		},

		m: function mount(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},

		p: noop,
		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

function create_fragment(ctx) {
	var await_block_anchor, promise_1, current;

	let info = {
		ctx,
		current: null,
		token: null,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 'component',
		error: 'error',
		blocks: [,,,]
	};

	handle_promise(promise_1 = ctx.promise, info);

	return {
		c: function create() {
			await_block_anchor = empty();

			info.block.c();
		},

		l: function claim(nodes) {
			await_block_anchor = empty();

			info.block.l(nodes);
		},

		m: function mount(target, anchor) {
			insert(target, await_block_anchor, anchor);

			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;

			current = true;
		},

		p: function update(changed, new_ctx) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (promise_1 !== (promise_1 = ctx.promise) && handle_promise(promise_1, info)) ; else {
				info.block.p(changed, assign(assign({}, ctx), info.resolved));
			}
		},

		i: function intro(local) {
			if (current) return;
			transition_in(info.block);
			current = true;
		},

		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			current = false;
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(await_block_anchor);
			}

			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};
}

async function getComponent(DisplayTypeShortCode){
	// let component = await import(`./dataComponents/${DisplayTypeShortCode}.svelte`);
	// return component.default;

	let component;
	switch (DisplayTypeShortCode) {
		case 'GROUP':
			component = await import('./GROUP.e0d469eb.js');
			return component.default;

		case 'TEXTBOX':
			component = await import('./TEXTBOX.6d9a86c3.js');
			return component.default;

		case 'DATEPICKER':
			component = await import('./DATEPICKER.e66b9cde.js');
			return component.default;

		case 'DROPDOWN':
			component = await import('./DROPDOWN.723dffcf.js');
			return component.default;

		default:
			throw new Error(`Unknown component ${DisplayTypeShortCode}`)
	}
}

function instance($$self, $$props, $$invalidate) {
	let { DisplayTypeShortCode, ShortCode, Label, children } = $$props;

	let promise = getComponent(DisplayTypeShortCode);

	$$self.$set = $$new_props => {
		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
		if ('DisplayTypeShortCode' in $$new_props) $$invalidate('DisplayTypeShortCode', DisplayTypeShortCode = $$new_props.DisplayTypeShortCode);
		if ('ShortCode' in $$new_props) $$invalidate('ShortCode', ShortCode = $$new_props.ShortCode);
		if ('Label' in $$new_props) $$invalidate('Label', Label = $$new_props.Label);
		if ('children' in $$new_props) $$invalidate('children', children = $$new_props.children);
	};

	return {
		DisplayTypeShortCode,
		ShortCode,
		Label,
		children,
		promise,
		$$props,
		$$props: $$props = exclude_internal_props($$props)
	};
}

class DCRenderer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, ["DisplayTypeShortCode", "ShortCode", "Label", "children"]);

		const { ctx } = this.$$;
		const props = options.props || {};
		if (ctx.DisplayTypeShortCode === undefined && !('DisplayTypeShortCode' in props)) {
			console.warn("<DCRenderer> was created without expected prop 'DisplayTypeShortCode'");
		}
		if (ctx.ShortCode === undefined && !('ShortCode' in props)) {
			console.warn("<DCRenderer> was created without expected prop 'ShortCode'");
		}
		if (ctx.Label === undefined && !('Label' in props)) {
			console.warn("<DCRenderer> was created without expected prop 'Label'");
		}
		if (ctx.children === undefined && !('children' in props)) {
			console.warn("<DCRenderer> was created without expected prop 'children'");
		}
	}

	get DisplayTypeShortCode() {
		throw new Error_1("<DCRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set DisplayTypeShortCode(value) {
		throw new Error_1("<DCRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ShortCode() {
		throw new Error_1("<DCRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ShortCode(value) {
		throw new Error_1("<DCRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get Label() {
		throw new Error_1("<DCRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set Label(value) {
		throw new Error_1("<DCRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get children() {
		throw new Error_1("<DCRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set children(value) {
		throw new Error_1("<DCRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { DCRenderer as D };
