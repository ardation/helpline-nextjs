const Widget = zoid.create({
    // The html tag used to render my component
    tag: 'my-widget',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page
    url: 'http://localhost:3000/widget',

    // The size of the component on their page. Only px and % strings are supported
    dimensions: {
        width: '100%',
        height: '700px',
    },

    // The properties they can (or must) pass down to my component. This is optional.
    props: {
        countryCode: {
            type: 'string',
            required: false,
        },
    },
});
