import Head from 'next/head';
import React, { Fragment, Component } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../src/components/Chrome';
import { GetCountriesAndSubdivisions } from '../types/GetCountriesAndSubdivisions';

declare global {
    interface Window {
        xprops: Record<string, string>;
    }
}
type Xprops = {
    xprops: Record<string, string>;
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
            console.log(window.xprops);
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
                <Chrome footer={false}>
                    {xprops ? <p>widget default country: {xprops.countryCode}</p> : null}
                    <ul>
                        {countries.map((country, key) => {
                            return (
                                <li key={key}>
                                    {country.code}
                                    <div>
                                        {country.subdivisions.map((subdivision, index) => {
                                            return <span key={index}>{subdivision.code}, </span>;
                                        })}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </Chrome>
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

export default WidgetPage;
