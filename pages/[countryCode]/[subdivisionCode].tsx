import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { find, flatten } from 'lodash/fp';
import Chrome from '../../src/components/Chrome';
import OrganizationList from '../../src/components/OrganizationList';
import Footer from '../../src/components/Footer';
import {
    GetCountryCodeSubdivisonCodeProps,
    GetCountryCodeSubdivisonCodeProps_country_subdivisions as Subdivision,
} from '../../types/GetCountryCodeSubdivisonCodeProps';
import { GetCountryCodeSubdivisionCodePaths } from '../../types/GetCountryCodeSubdivisionCodePaths';

interface Props extends GetCountryCodeSubdivisonCodeProps {
    subdivision: Subdivision;
    key: string | string[];
}

const SubdivisionCodePage = ({
    country,
    subdivision,
    organizations,
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

    return (
        <>
            <Head>
                <title>
                    Find A Helpline | {subdivision.name}, {country.name}
                </title>
            </Head>
            <Chrome country={country}>
                <OrganizationList
                    organizations={organizations.nodes}
                    country={country}
                    subdivision={subdivision}
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
        query GetCountryCodeSubdivisonCodeProps($countryCode: String!, $subdivisionCode: String!) {
            country(code: $countryCode) {
                code
                name
                emergencyNumber
                subdivisions {
                    code
                    name
                }
            }
            organizations(countryCode: $countryCode, subdivisionCodes: [$subdivisionCode]) {
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
    const { country, organizations, categories, humanSupportTypes, topics } = await request<
        GetCountryCodeSubdivisonCodeProps
    >('https://api.findahelpline.com', print(query), {
        countryCode: context.params.countryCode,
        subdivisionCode: context.params.subdivisionCode,
    });
    const subdivision = find({ code: context.params.subdivisionCode.toString().toUpperCase() }, country.subdivisions);
    return {
        props: {
            country,
            subdivision,
            organizations,
            categories,
            humanSupportTypes,
            topics,
            key: context.params.subdivisionCode, // https://github.com/zeit/next.js/issues/9992
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetCountryCodeSubdivisionCodePaths {
            countries {
                code
                subdivisions {
                    code
                }
            }
        }
    `;
    const { countries } = await request<GetCountryCodeSubdivisionCodePaths>(
        'https://api.findahelpline.com',
        print(query),
    );

    return {
        paths: flatten(
            countries.map((country) => {
                return country.subdivisions.map((subdivision) => {
                    return {
                        params: {
                            countryCode: country.code.toLowerCase(),
                            subdivisionCode: subdivision.code.toLowerCase(),
                        },
                    };
                });
            }),
        ),
        fallback: false,
    };
};

export default SubdivisionCodePage;
