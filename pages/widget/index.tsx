import Head from 'next/head';
import React, { Fragment, Component } from 'react';
import { Container } from '@material-ui/core';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { GetWidgetCountriesAndSubdivisions } from '../../types/GetWidgetCountriesAndSubdivisions';

declare global {
    interface Window {
        xprops: {
            countryCode: string;
        };
    }
}
type Xprops = {
    xprops: {
        countryCode: string;
    };
};

class WidgetPage extends Component<GetWidgetCountriesAndSubdivisions, Xprops> {
    constructor(props) {
        super(props);
        this.state = {
            xprops: null,
        };
    }
    componentDidMount(): void {
        if (window.xprops) {
            this.setState({ xprops: window.xprops });
            document.location.href = `/widget/${window.xprops.countryCode.toLowerCase()}`;
        }
    }

    render(): JSX.Element {
        const { countries } = this.props;
        const { xprops } = this.state;
        return (
            <Fragment>
                <Head>
                    <title>Find A Helpline</title>
                    <script src="/widget.min.js"></script>
                </Head>
                <Container>
                    {xprops ? (
                        <div>loading widget for selected default country of {xprops.countryCode}...</div>
                    ) : (
                        <ul>
                            {countries.map((country, key) => {
                                return (
                                    <li key={key}>
                                        {country.code}
                                        <ul>
                                            {country.subdivisions.map((subdivision, index) => {
                                                return <li key={index}>{subdivision.code} </li>;
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </Container>
            </Fragment>
        );
    }
}

export const getStaticProps = async (): Promise<{ props: GetWidgetCountriesAndSubdivisions }> => {
    const query = gql`
        query GetWidgetCountriesAndSubdivisions {
            countries {
                code
                name
                subdivisions {
                    code
                    name
                }
            }
            topics {
                name
            }
            categories {
                name
            }
            humanSupportTypes {
                name
            }
        }
    `;
    const { countries, topics, categories, humanSupportTypes } = await request(
        'https://api.findahelpline.com',
        print(query),
    );
    return {
        props: {
            countries,
            topics,
            categories,
            humanSupportTypes,
        },
    };
};

export default WidgetPage;
