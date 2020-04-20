import * as zoid from 'zoid/dist/zoid';

declare const DOMAIN_URL: string;

const Widget = zoid.create({
    // The html tag used to render my component
    tag: 'my-widget',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page
    url: `${DOMAIN_URL}/widget`,

    // The size of the component on their page. Only px and % strings are supported
    dimensions: {
        width: '100%',
        height: '720px',
    },

    defaultLogLevel: 'info',

    autoResize: {
        width: true,
        height: true,
    },

    contexts: {
        iframe: true,
        popup: false,
    },

    defaultContext: 'iframe',

    // The properties they can (or must) pass down to my component. This is optional.
    props: {
        countryCode: {
            type: 'string',
            required: false,
            def: (): string => {
                return 'US';
            },
        },
        triggerResize: {
            type: 'function',
            required: false,
        },
    },
});

export default Widget;
