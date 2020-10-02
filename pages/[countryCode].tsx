import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../src/components/Chrome';
import { GetCountryCodeProps } from '../types/GetCountryCodeProps';
import OrganizationList from '../src/components/OrganizationList';
import Footer from '../src/components/Footer';
import { GetCountryCodePaths } from '../types/GetCountryCodePaths';

interface Props extends GetCountryCodeProps {
    key: string | string[];
}

const CountryCodePage = ({ country, organizations, categories, humanSupportTypes, topics }: Props): ReactElement => {
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
            </Head>
            <Chrome country={country}>
                <OrganizationList
                    organizations={organizations.nodes}
                    country={country}
                    preselectedTopics={preselectedTopics}
                    categories={categories}
                    humanSupportTypes={humanSupportTypes}
                    topics={topics}
                />
                <Footer />
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
            }
            organizations(countryCode: $countryCode, subdivisionCodes: []) {
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
    `;
    const { country, organizations, categories, humanSupportTypes, topics } = await request<GetCountryCodeProps>(
        'https://api.findahelpline.com',
        print(query),
        {
            countryCode: context.params.countryCode,
        },
    );
    return {
        props: {
            country,
            organizations,
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
