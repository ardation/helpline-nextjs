import React, { ReactElement, useEffect } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { NextSeo } from 'next-seo';
import Chrome from '../src/components/Chrome';
import { GetCountryCodeProps } from '../types/GetCountryCodeProps';
import OrganizationList from '../src/components/OrganizationList';
import { GetCountryCodePaths } from '../types/GetCountryCodePaths';
import { CountryCodePageView } from '../types/CountryCodePageView';

interface Props extends GetCountryCodeProps {
    key: string | string[];
}

const CountryCodePage = ({
    country,
    organizations,
    organizationsWhenEmpty,
    categories,
    humanSupportTypes,
    topics,
}: Props): ReactElement => {
    const router = useRouter();
    const queryTopics = router.query.topics;
    let preselectedTopics: { name: string }[] = [];

    if (queryTopics) {
        preselectedTopics = [queryTopics].flat().map((topic) => {
            return { name: topic };
        });
    }

    useEffect(() => {
        const mutation = gql`
            mutation CountryCodePageView($input: CountryIncrementCountMutationInput!) {
                countryIncrementCount(input: $input) {
                    country {
                        id
                    }
                }
            }
        `;
        request<CountryCodePageView>('https://api.findahelpline.com', print(mutation), {
            input: {
                code: country.code,
            },
        });
    }, []);

    return (
        <>
            <NextSeo title={country.name} />
            <Chrome country={country} footer>
                <OrganizationList
                    organizations={organizations.nodes}
                    organizationsWhenEmpty={organizationsWhenEmpty.nodes}
                    country={country}
                    preselectedTopics={preselectedTopics}
                    categories={categories}
                    humanSupportTypes={humanSupportTypes}
                    topics={topics}
                />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Props }> => {
    const query = gql`
        query GetCountryCodeProps($countryCode: String!) {
            country(code: $countryCode) {
                code
                name
                emergencyNumber
                locality
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
    } = await request<GetCountryCodeProps>('https://api.findahelpline.com', print(query), {
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
            key: context.params.countryCode, // https://github.com/zeit/next.js/issues/9992
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetCountryCodePaths {
            countries {
                code
            }
        }
    `;
    const { countries } = await request<GetCountryCodePaths>('https://api.findahelpline.com', print(query));

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

export default CountryCodePage;
