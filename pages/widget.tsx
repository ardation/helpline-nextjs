import Head from 'next/head';
import React, { Fragment, Component } from 'react';
import { Container } from '@material-ui/core';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { withRouter } from 'next/router';
import { GetCountriesAndSubdivisions } from '../types/GetCountriesAndSubdivisions';

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

class WidgetPage extends Component<GetCountriesAndSubdivisions, Xprops> {
    constructor(props) {
        super(props);
        this.state = {
            xprops: null,
        };
    }
    componentDidMount(): void {
        if (window.xprops) {
            this.setState({ xprops: window.xprops });
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
                    {xprops ? <div>widget default country: {xprops.countryCode}</div> : null}
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
                </Container>
            </Fragment>
        );
    }
}

export const getStaticProps = async (): Promise<{ props: GetCountriesAndSubdivisions }> => {
    const query = gql`
        query GetCountries {
            countries {
                code
                subdivisions {
                    code
                    name
                }
            }
        }
    `;
    const { countries } = await request('https://api.findahelpline.com', print(query));
    return {
        props: {
            countries,
        },
    };
};

export default withRouter(WidgetPage);
