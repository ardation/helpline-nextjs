/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import * as React from 'jsx-dom';
import zoid from 'zoid/dist/zoid.frame';

declare const DOMAIN_URL: string;

const Widget = zoid.create({
    // The html tag used to render my component
    tag: 'helpline-widget',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page
    url: `${DOMAIN_URL}/widget`,

    // The size of the component on their page. Only px and % strings are supported
    dimensions: {
        width: '100%',
        height: '720px',
    },

    defaultLogLevel: 'error', // info, error

    autoResize: {
        width: false,
        height: true,
    },

    contexts: {
        iframe: true,
        popup: false,
    },

    defaultContext: 'iframe',

    containerTemplate: ({ id, tag, context, CLASS, outlet, dimensions: { width, height } }) => {
        return (
            <div id={id} className={`${CLASS.ZOID} ${CLASS.ZOID}-tag-${tag} ${CLASS.ZOID}-context-${context}`}>
                <style>
                    {`
                        #${id}, #${id} > .${CLASS.OUTLET} {
                            width: ${width};
                            height: ${height};
                        }

                        #${id} > .${CLASS.OUTLET} {
                            display: inline-block;
                            position: relative;
                        }

                        #${id} > .${CLASS.OUTLET} > iframe {
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            transition: opacity .2s ease-in-out;
                        }

                        #${id} > .${CLASS.OUTLET} > iframe.${CLASS.VISIBLE} {
                            opacity: 1;
                        }

                        #${id} > .${CLASS.OUTLET} > iframe.${CLASS.INVISIBLE} {
                            opacity: 0;
                        }
                    `}
                </style>

                {outlet}
            </div>
        );
    },

    prerenderTemplate: () => {
        return (
            <html>
                <head>
                    <style>
                        {`
                            html, body {
                                width: 100%;
                                height: 100%;
                                overflow: hidden;
                                top: 0;
                                left: 0;
                                margin: 0;
                                text-align: center;
                            }
    
                            .spinner {
                                position: absolute;
                                max-height: 60vmin;
                                max-width: 60vmin;
                                height: 40px;
                                width: 40px;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-50%);
                                z-index: 10;
                            }
    
                            .spinner .loader {
                                height: 100%;
                                width: 100%;
                                box-sizing: border-box;
                                border: 3px solid rgba(0, 0, 0, .2);
                                border-top-color: rgba(33, 128, 192, 0.8);
                                border-radius: 100%;
                            }

                            .scales-1 {
                                background-color: rgb(7, 131, 142);
                                width: 4px;
                                height: 35px;
                                margin: 2px;
                                border-radius: 2px;
                                display: inline-block;
                                animation: scale 1s ${1 * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
                                animation-fill-mode: both;
                            }
                            .scales-2 {
                                background-color: rgb(7, 131, 142);
                                width: 4px;
                                height: 35px;
                                margin: 2px;
                                border-radius: 2px;
                                display: inline-block;
                                animation: scale 1s ${2 * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
                                animation-fill-mode: both;
                            }
                            .scales-3 {
                                background-color: rgb(7, 131, 142);
                                width: 4px;
                                height: 35px;
                                margin: 2px;
                                border-radius: 2px;
                                display: inline-block;
                                animation: scale 1s ${3 * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
                                animation-fill-mode: both;
                            }
                            .scales-4 {
                                background-color: rgb(7, 131, 142);
                                width: 4px;
                                height: 35px;
                                margin: 2px;
                                border-radius: 2px;
                                display: inline-block;
                                animation: scale 1s ${4 * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
                                animation-fill-mode: both;
                            }
                            .scales-5 {
                                background-color: rgb(7, 131, 142);
                                width: 4px;
                                height: 35px;
                                margin: 2px;
                                border-radius: 2px;
                                display: inline-block;
                                animation: scale 1s ${5 * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
                                animation-fill-mode: both;
                            }

                            @keyframes scale {
                                0% {transform: scaley(1.0)}
                                50% {transform: scaley(0.4)}
                                100% {transform: scaley(1.0)}
                            }
                        `}
                    </style>
                </head>
                <body>
                    <div className="spinner">
                        <div className="scales-1"></div>
                        <div className="scales-2"></div>
                        <div className="scales-3"></div>
                        <div className="scales-4"></div>
                        <div className="scales-5"></div>
                    </div>
                </body>
            </html>
        );
    },

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
