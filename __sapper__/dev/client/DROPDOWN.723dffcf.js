import { S as SvelteComponentDev, i as init, s as safe_not_equal, e as element, t as text, c as claim_element, b as children, d as claim_text, f as detach, g as attr, h as add_location, j as insert, k as append, w as set_data, a as space, n as noop } from './chunk.6be85367.js';

/* src/components/dataComponents/DROPDOWN.svelte generated by Svelte v3.6.7 */

const file = "src/components/dataComponents/DROPDOWN.svelte";

// (17:2) {#if HelpDescription}
function create_if_block(ctx) {
	var div, t;

	return {
		c: function create() {
			div = element("div");
			t = text(ctx.HelpDescription);
			this.h();
		},

		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			t = claim_text(div_nodes, ctx.HelpDescription);
			div_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(div, "class", "help-description");
			add_location(div, file, 17, 3, 390);
		},

		m: function mount(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},

		p: function update(changed, ctx) {
			if (changed.HelpDescription) {
				set_data(t, ctx.HelpDescription);
			}
		},

		d: function destroy(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

function create_fragment(ctx) {
	var div1, label, t0, t1, div0, select, option, t2, t3, t4, br;

	var if_block = (ctx.HelpDescription) && create_if_block(ctx);

	return {
		c: function create() {
			div1 = element("div");
			label = element("label");
			t0 = text(ctx.Label);
			t1 = space();
			div0 = element("div");
			select = element("select");
			option = element("option");
			t2 = text("TODO populate from AllowedValues");
			t3 = space();
			if (if_block) if_block.c();
			t4 = space();
			br = element("br");
			this.h();
		},

		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true, "data-short-code": true }, false);
			var div1_nodes = children(div1);

			label = claim_element(div1_nodes, "LABEL", { for: true }, false);
			var label_nodes = children(label);

			t0 = claim_text(label_nodes, ctx.Label);
			label_nodes.forEach(detach);
			t1 = claim_text(div1_nodes, "\n\n\t");

			div0 = claim_element(div1_nodes, "DIV", { class: true }, false);
			var div0_nodes = children(div0);

			select = claim_element(div0_nodes, "SELECT", { id: true }, false);
			var select_nodes = children(select);

			option = claim_element(select_nodes, "OPTION", { value: true }, false);
			var option_nodes = children(option);

			t2 = claim_text(option_nodes, "TODO populate from AllowedValues");
			option_nodes.forEach(detach);
			select_nodes.forEach(detach);
			t3 = claim_text(div0_nodes, "\n\n\t\t");
			if (if_block) if_block.l(div0_nodes);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			t4 = claim_text(nodes, "\n\n\n");

			br = claim_element(nodes, "BR", {}, false);
			var br_nodes = children(br);

			br_nodes.forEach(detach);
			this.h();
		},

		h: function hydrate() {
			attr(label, "for", ctx.ShortCode);
			add_location(label, file, 9, 1, 196);
			option.__value = "TODO populate from AllowedValues";
			option.value = option.__value;
			add_location(option, file, 13, 3, 300);
			attr(select, "id", ctx.ShortCode);
			add_location(select, file, 12, 2, 271);
			attr(div0, "class", "input-container");
			add_location(div0, file, 11, 1, 239);
			attr(div1, "class", "data-component-container");
			div1.dataset.shortCode = ctx.ShortCode;
			add_location(div1, file, 8, 0, 126);
			add_location(br, file, 24, 0, 470);
		},

		m: function mount(target, anchor) {
			insert(target, div1, anchor);
			append(div1, label);
			append(label, t0);
			append(div1, t1);
			append(div1, div0);
			append(div0, select);
			append(select, option);
			append(option, t2);
			append(div0, t3);
			if (if_block) if_block.m(div0, null);
			insert(target, t4, anchor);
			insert(target, br, anchor);
		},

		p: function update(changed, ctx) {
			if (changed.Label) {
				set_data(t0, ctx.Label);
			}

			if (changed.ShortCode) {
				attr(label, "for", ctx.ShortCode);
				attr(select, "id", ctx.ShortCode);
			}

			if (ctx.HelpDescription) {
				if (if_block) {
					if_block.p(changed, ctx);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div0, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (changed.ShortCode) {
				div1.dataset.shortCode = ctx.ShortCode;
			}
		},

		i: noop,
		o: noop,

		d: function destroy(detaching) {
			if (detaching) {
				detach(div1);
			}

			if (if_block) if_block.d();

			if (detaching) {
				detach(t4);
				detach(br);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { DisplayTypeShortCode, ShortCode, HelpDescription, Label } = $$props;

	const writable_props = ['DisplayTypeShortCode', 'ShortCode', 'HelpDescription', 'Label'];
	Object.keys($$props).forEach(key => {
		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<DROPDOWN> was created with unknown prop '${key}'`);
	});

	$$self.$set = $$props => {
		if ('DisplayTypeShortCode' in $$props) $$invalidate('DisplayTypeShortCode', DisplayTypeShortCode = $$props.DisplayTypeShortCode);
		if ('ShortCode' in $$props) $$invalidate('ShortCode', ShortCode = $$props.ShortCode);
		if ('HelpDescription' in $$props) $$invalidate('HelpDescription', HelpDescription = $$props.HelpDescription);
		if ('Label' in $$props) $$invalidate('Label', Label = $$props.Label);
	};

	return {
		DisplayTypeShortCode,
		ShortCode,
		HelpDescription,
		Label
	};
}

class DROPDOWN extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, ["DisplayTypeShortCode", "ShortCode", "HelpDescription", "Label"]);

		const { ctx } = this.$$;
		const props = options.props || {};
		if (ctx.DisplayTypeShortCode === undefined && !('DisplayTypeShortCode' in props)) {
			console.warn("<DROPDOWN> was created without expected prop 'DisplayTypeShortCode'");
		}
		if (ctx.ShortCode === undefined && !('ShortCode' in props)) {
			console.warn("<DROPDOWN> was created without expected prop 'ShortCode'");
		}
		if (ctx.HelpDescription === undefined && !('HelpDescription' in props)) {
			console.warn("<DROPDOWN> was created without expected prop 'HelpDescription'");
		}
		if (ctx.Label === undefined && !('Label' in props)) {
			console.warn("<DROPDOWN> was created without expected prop 'Label'");
		}
	}

	get DisplayTypeShortCode() {
		throw new Error("<DROPDOWN>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set DisplayTypeShortCode(value) {
		throw new Error("<DROPDOWN>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ShortCode() {
		throw new Error("<DROPDOWN>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ShortCode(value) {
		throw new Error("<DROPDOWN>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get HelpDescription() {
		throw new Error("<DROPDOWN>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set HelpDescription(value) {
		throw new Error("<DROPDOWN>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get Label() {
		throw new Error("<DROPDOWN>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set Label(value) {
		throw new Error("<DROPDOWN>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default DROPDOWN;
