import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { useRouter } from 'next/router';
import { GetWidgetCountryCodeProps } from '../../types/GetWidgetCountryCodeProps';
import Widget from '../../src/components/Widget';
import { GetWidgetCountryCodePaths } from '../../types/GetWidgetCountryCodePaths';

interface Props extends GetWidgetCountryCodeProps {
    key: string | string[];
}

const WidgetCountryCodePage = ({
    country,
    organizations,
    organizationsWhenEmpty,
    categories,
    humanSupportTypes,
    topics,
    countries,
}: Props): ReactElement => {
    const router = useRouter();
    const queryTopics = router.query.topics;
    let preselectedTopics: { name: string }[] = [];

    if (queryTopics) {
        preselectedTopics = [queryTopics].flat().map((topic) => {
            return { name: topic };
        });
    }

    return (
        <>
            <Head>
                <title>Find A Helpline | {country.name}</title>
                <script src="/widget.min.js"></script>
            </Head>
            <Widget
                countries={countries}
                preselectedCountry={country}
                organizations={organizations.nodes}
                organizationsWhenEmpty={organizationsWhenEmpty.nodes}
                preselectedTopics={preselectedTopics}
                topics={topics}
                categories={categories}
                humanSupportTypes={humanSupportTypes}
            />
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
                locality
                subdivisions {
                    code
                    name
                }
            }
            organizations(countryCode: $countryCode, subdivisionCodes: []) {
                ...organizationConnectionFields
            }
            organizationsWhenEmpty: organizations(countryCode: $countryCode, subdivisionCodes: [], featured: true) {
                ...organizationConnectionFields
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
                locality
                subdivisions {
                    code
                    name
                }
            }
        }
        fragment organizationConnectionFields on OrganizationConnection {
            nodes {
                id
                slug
                name
                alwaysOpen
                smsNumber
                phoneNumber
                url
                chatUrl
                timezone
                featured
                verified
                rating
                reviewCount
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
    `;
    const {
        country,
        organizations,
        organizationsWhenEmpty,
        categories,
        humanSupportTypes,
        topics,
        countries,
    } = await request<GetWidgetCountryCodeProps>('https://api.findahelpline.com', print(query), {
        countryCode: context.params.countryCode,
    });

    return {
        props: {
            country,
            organizations,
            organizationsWhenEmpty,
            categories,
            humanSupportTypes,
            topics,
            countries,
            key: context.params.countryCode, // https://github.com/zeit/next.js/issues/9992
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
    const { countries } = await request<GetWidgetCountryCodePaths>('https://api.findahelpline.com', print(query));

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
