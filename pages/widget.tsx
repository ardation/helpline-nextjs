import Head from 'next/head';
import React, { Fragment, Component } from 'react';
import router from 'next/router';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { GetWidgetCountriesAndSubdivisions } from '../types/GetWidgetCountriesAndSubdivisions';
import { OrganizationProvider } from '../src/context/organizationContext';
import Widget from '../src/components/Widget';
import LoadingSpinner from '../src/components/LoadingSpinner';

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
            router.push(`/widget/${window.xprops.countryCode.toLowerCase()}`);
        }
    }

    render(): JSX.Element {
        const { countries, topics, categories, humanSupportTypes } = this.props;
        const { xprops } = this.state;
        return (
            <Fragment>
                <Head>
                    <title>Find A Helpline</title>
                    <script src="/widget.min.js"></script>
                </Head>
                <Fragment>
                    {xprops ? (
                        <LoadingSpinner />
                    ) : (
                        <OrganizationProvider
                            countries={countries}
                            allOrganizations={[]}
                            filterOptions={{
                                topics: topics,
                                categories: categories,
                                humanSupportTypes: humanSupportTypes,
                            }}
                        >
                            <Widget />
                        </OrganizationProvider>
                    )}
                </Fragment>
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
                emergencyNumber
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
