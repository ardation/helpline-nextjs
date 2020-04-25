import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { GetWidgetCountryCodeProps } from '../../types/GetWidgetCountryCodeProps';
import { OrganizationProvider } from '../../src/context/organizationContext';
import Widget from '../../src/components/Widget';
import { GetWidgetCountryCodePaths } from '../../types/GetWidgetCountryCodePaths';

interface Props extends GetWidgetCountryCodeProps {
    key: string | string[];
}
const WidgetCountryCodePage = ({
    country,
    organizations,
    categories,
    humanSupportTypes,
    topics,
    countries,
}: Props): ReactElement => {
    const activeCountry = countries.find((_country) => {
        return _country.code === country.code;
    });

    return (
        <>
            <Head>
                <title>Find A Helpline | {country.name}</title>
            </Head>

            <OrganizationProvider
                activeCountry={activeCountry}
                countries={countries}
                allOrganizations={organizations.nodes}
                filterOptions={{
                    topics: topics,
                    categories: categories,
                    humanSupportTypes: humanSupportTypes,
                }}
            >
                <Widget />
            </OrganizationProvider>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Props }> => {
    const query = gql`
        query GetWidgetCountryCodeProps($countryCode: String!) {
            country(code: $countryCode) {
                code
                name
                emergencyNumber
            }
            organizations(countryCode: $countryCode, subdivisionCodes: []) {
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
                emergencyNumber
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
            countryCode: context.params.countryCode,
        },
    );

    // key is needed here for link router to work - https://github.com/zeit/next.js/issues/9992
    return {
        props: {
            country,
            organizations,
            categories,
            humanSupportTypes,
            topics,
            countries,
            key: context.params.countryCode,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetWidgetCountryCodePaths {
            countries {
                code
            }
        }
    `;
    const { countries } = (await request('https://api.findahelpline.com', print(query))) as GetWidgetCountryCodePaths;

    return {
        paths: countries.map((country) => {
            return {
                params: {
                    countryCode: country.code.toLowerCase(),
                },
            };
        }),
        fallback: false,
    };
};

export default WidgetCountryCodePage;
