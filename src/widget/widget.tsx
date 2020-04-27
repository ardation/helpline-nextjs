/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import * as React from 'jsx-dom';
import zoid from 'zoid/dist/zoid.frame';

// declare const DOMAIN_URL: string;

const Widget = zoid.create({
    tag: 'helpline-widget',
    url: 'http://localhost:3000/widget/us',
    dimensions: {
        width: '100%',
        height: '100%',
    },
    defaultLogLevel: 'error',
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
                            .scales {
                                background-color: rgb(7, 131, 142);
                                width: 4px;
                                height: 35px;
                                margin: 2px;
                                border-radius: 2px;
                                display: inline-block;
                                animation: scale 1s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
                                animation-fill-mode: both;
                            }
                            .scales-1 {
                                animation-delay: 0.1s;
                            }
                            .scales-2 {
                                animation-delay: 0.2s;
                            }
                            .scales-3 {
                                animation-delay: 0.3s;
                            }
                            .scales-4 {
                                animation-delay: 0.4s;
                            }
                            .scales-5 {
                                animation-delay: 0.5s;
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
                        <div className="scales scales-1"></div>
                        <div className="scales scales-2"></div>
                        <div className="scales scales-3"></div>
                        <div className="scales scales-4"></div>
                        <div className="scales scales-5"></div>
                    </div>
                </body>
            </html>
        );
    },
    props: {
        countryCode: {
            type: 'string',
            required: false,
            def: (): string => 'US',
        },
    },
});

export default Widget;
