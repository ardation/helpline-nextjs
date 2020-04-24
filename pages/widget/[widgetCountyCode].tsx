import React, { ReactElement, Fragment } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { GetWidgetCountryCodeProps } from '../../types/GetWidgetCountryCodeProps';
import OrganizationList from '../../src/components/OrganizationList';
import Footer from '../../src/components/Footer';

const WidgetCountryCodePage = ({
    country,
    organizations,
    categories,
    humanSupportTypes,
    topics,
    countries,
}: GetWidgetCountryCodeProps): ReactElement => {
    const router = useRouter();
    const query = router.query;
    const preselectedTopics: { name: string }[] = [];

    return (
        <Fragment>
            <Head>
                <title>Find A Helpline | {country.name}</title>
                <script src="/widget.min.js"></script>
            </Head>
            <div className="widget">
                <div className="search">
                    countries count: {countries.length} - selected country: {country.name} - query:{' '}
                    {query.widgetCountyCode}
                </div>

                <OrganizationList
                    organizations={organizations.nodes}
                    country={country}
                    preselectedTopics={preselectedTopics}
                    categories={categories}
                    humanSupportTypes={humanSupportTypes}
                    topics={topics}
                />
                <Footer />
            </div>
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: GetWidgetCountryCodeProps }> => {
    const query = gql`
        query GetWidgetCountryCodeProps($countryCode: String!) {
            country(code: $countryCode) {
                code
                name
                emergencyNumber
            }
            organizations(countryCode: $countryCode) {
                nodes {
                    slug
                    name
                    alwaysOpen
                    smsNumber
                    phoneNumber
                    url
                    chatUrl
                    timezone
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
            categories {
                name
            }
            humanSupportTypes {
                name
            }
            topics {
                name
            }
            countries {
                code
                name
                subdivisions {
                    code
                    name
                }
            }
        }
    `;
    const { country, organizations, categories, humanSupportTypes, topics, countries } = await request(
        'https://api.findahelpline.com',
        print(query),
        {
            countryCode: context.params.widgetCountyCode,
        },
    );
    return {
        props: {
            country,
            organizations,
            categories,
            humanSupportTypes,
            topics,
            countries,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetCountries {
            countries {
                code
            }
        }
    `;
    const { countries } = await request('https://api.findahelpline.com', print(query));

    return {
        paths: countries.map((country) => {
            return {
                params: {
                    widgetCountyCode: country.code.toLowerCase(),
                },
            };
        }),
        fallback: false,
    };
};

export default WidgetCountryCodePage;
