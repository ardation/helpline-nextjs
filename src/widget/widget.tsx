import { create } from 'zoid/dist/zoid.frame';

const Widget = create({
    tag: 'helpline-widget',
    url: ({ props }) => `${process.env.NOW_URL}/widget/${props.countryCode}`,
    dimensions: {
        width: '100%',
        height: '100%',
    },
    autoResize: {
        width: false,
        height: true,
    },
    props: {
        countryCode: {
            type: 'string',
            required: false,
            default: (): string => 'us',
        },
    },
});

export default Widget;
