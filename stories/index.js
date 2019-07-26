import { storiesOf } from '@storybook/svelte';
// import DCRenderer from '../src/components/DCRenderer.svelte';
import TEXTBOX from '../src/components/dataComponents/TEXTBOX.svelte';
import DROPDOWN from '../src/components/dataComponents/DROPDOWN.svelte';
// import DATEPICKER from '../src/components/dataComponents/DATEPICKER.svelte';

// storiesOf('DCRenderer', module)
//     .add('with TEXTBOX', () => ({
//         Component: DCRenderer,
//         props: {
//             Label: 'This is the label',
//             DisplayTypeShortCode: 'TEXTBOX',
//         },
//     }))
//

storiesOf('TEXTBOX', module)
    .add('with text', () => ({
        Component: TEXTBOX,
        props: {
            Label: 'This is the label',
        },
    }))
    .add('with help description', () => ({
        Component: TEXTBOX,

        props: {
            Label: 'This is the label',
            HelpDescription: 'Help description renders as micro copy',
        },
    }));

//
// storiesOf('DATEPICKER', module)
//     .add('with text', () => ({
//         Component: DATEPICKER,
//         props: {
//             Label: 'This is the label',
//         },
//     }))
//     .add('with help description', () => ({
//         Component: DATEPICKER,
//
//         props: {
//             Label: 'This is the label',
//             HelpDescription: 'Help description renders as micro copy',
//         },
//     }));


storiesOf('DROPDOWN', module)
    .add('with text', () => ({
        Component: DROPDOWN,
        props: {
            Label: 'This is the label',
        },
    }))
    .add('with help description', () => ({
        Component: DROPDOWN,

        props: {
            Label: 'This is the label',
            HelpDescription: 'Help description renders as micro copy',
        },
    }));