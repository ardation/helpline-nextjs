import Head from 'next/head';
import React, { Fragment, Component } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../src/components/Chrome';
import Widget from '../src/components/Widget';
import { GetCountriesOrgsAndTags } from '../types/GetCountriesOrgsAndTags';
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

class WidgetPage extends Component<GetCountriesOrgsAndTags, Xprops> {
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
        const { countries, organizations, topics, categories, humanSupportTypes } = this.props;
        const { xprops } = this.state;
        const contactMethods = [
            { name: 'Phone', key: 'phoneNumber' },
            { name: 'Text', key: 'smsNumber' },
            { name: 'Webchat', key: 'chatUrl' },
        ];
        return (
            <Fragment>
                <Head>
                    <title>Find A Helpline</title>
                    <script src="/widget.min.js"></script>
                </Head>
                <Chrome topbar={false} footer={false}>
                    <OrganizationProvider
                        countries={countries}
                        allOrganizations={organizations.nodes}
                        filterOptions={{ topics, categories, humanSupportTypes, contactMethods }}
                        xprops={xprops}
                    >
                        <Widget xprops={xprops} />
                    </OrganizationProvider>
                </Chrome>
            </Fragment>
        );
    }
}

export const getStaticProps = async (): Promise<{ props: GetCountriesOrgsAndTags }> => {
    const query = gql`
        query GetCountriesOrgsAndTags {
            countries {
                code
                name
                emergencyNumber
                subdivisions {
                    code
                    name
                }
            }
            organizations {
                nodes {
                    slug
                    name
                    alwaysOpen
                    smsNumber
                    phoneNumber
                    url
                    chatUrl
                    timezone
                    country {
                        name
                        code
                        subdivisions {
                            name
                            code
                        }
                    }
                    humanSupportTypes {
                        name
                    }
                    categories {
                        name
                    }
                    topics {
                        name
                    }
                    openingHours {
                        day
                        open
                        close
                    }
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
    const { countries, organizations, topics, humanSupportTypes, categories } = await request(
        'https://api.findahelpline.com',
        print(query),
    );
    return {
        props: {
            countries,
            organizations,
            topics,
            humanSupportTypes,
            categories,
        },
    };
};

export default WidgetPage;
