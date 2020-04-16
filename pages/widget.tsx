import Head from 'next/head';
import React, { Fragment, Component, ReactElement } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../src/components/Chrome';
import Widget from '../src/components/Widget';
import { GetCountriesAndTags } from '../types/GetCountriesAndTags';
import { OrganizationProvider } from '../src/context/organizationContext';

declare global {
    interface Window {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        xprops: any;
    }
}
type Xprops = {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    xprops: any;
};

class WidgetPage extends Component<GetCountriesAndTags, Xprops> {
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

    render() {
        const { topics, categories, humanSupportTypes, countries } = this.props;
        const { xprops } = this.state;
        const contactMethods = [{ name: 'Phone' }, { name: 'Text' }, { name: 'Webchat' }];
        return (
            <Fragment>
                <Head>
                    <title>Find A Helpline</title>
                    <script src="http://localhost:3000/zoid.min.js"></script>
                    <script src="http://localhost:3000/widget.js"></script>
                </Head>
                <Chrome topbar={false} footer={false}>
                    <OrganizationProvider>
                        <Widget
                            countries={countries}
                            filterOptions={{ topics, categories, humanSupportTypes, contactMethods }}
                            xprops={xprops}
                        />
                    </OrganizationProvider>
                </Chrome>
            </Fragment>
        );
    }
}

export const getStaticProps = async (): Promise<{ props: GetCountriesAndTags }> => {
    const query = gql`
        query GetCountriesAndTags {
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
            humanSupportTypes {
                name
            }
            categories {
                name
            }
        }
    `;
    const { countries, topics, humanSupportTypes, categories } = await request(
        'https://api.findahelpline.com',
        print(query),
    );
    return {
        props: {
            countries,
            topics,
            humanSupportTypes,
            categories,
        },
    };
};

export default WidgetPage;
