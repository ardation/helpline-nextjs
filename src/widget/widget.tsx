import { create } from 'zoid/dist/zoid.frame';

interface Props {
    props: {
        countryCode: string;
        subdivisionCode?: string;
        topics?: string[];
    };
}

const Widget = create({
    tag: 'helpline-widget',
    url: ({ props }: Props) => {
        const url = new URL(
            `${process.env.WIDGET_URL}/widget/${props.countryCode}${
                props.subdivisionCode ? `/${props.subdivisionCode}` : ''
            }`,
        );
        (props.topics || []).forEach((topic) => {
            url.searchParams.append('topics', topic);
        });
        return url.href;
    },
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
        subdivisionCode: {
            type: 'string',
            required: false,
        },
        topics: {
            type: 'array',
            required: false,
        },
    },
});

export default Widget;
