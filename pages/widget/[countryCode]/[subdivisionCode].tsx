import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { find, flatten } from 'lodash/fp';
import { useRouter } from 'next/router';
import {
    GetWidgetSubdivisionCodeProps,
    GetWidgetSubdivisionCodeProps_country_subdivisions as Subdivision,
} from '../../../types/GetWidgetSubdivisionCodeProps';
import Widget from '../../../src/components/Widget';
import { GetWidgetCountryCodeSubdivisionCodePaths } from '../../../types/GetWidgetCountryCodeSubdivisionCodePaths';

interface Props extends GetWidgetSubdivisionCodeProps {
    subdivision: Subdivision;
    key: string | string[];
}

const WidgetSubdivisionCodePage = ({
    country,
    subdivision,
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
                <title>
                    Find A Helpline | {subdivision.name}, {country.name}
                </title>
                <script src="/widget.min.js"></script>
            </Head>
            <Widget
                countries={countries}
                preselectedCountry={country}
                preselectedSubdivision={subdivision}
                preselectedTopics={preselectedTopics}
                organizations={organizations.nodes}
                organizationsWhenEmpty={organizationsWhenEmpty.nodes}
                topics={topics}
                categories={categories}
                humanSupportTypes={humanSupportTypes}
            />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Props }> => {
    const query = gql`
        query GetWidgetSubdivisionCodeProps($countryCode: String!, $subdivisionCode: String!) {
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
            organizations(countryCode: $countryCode, subdivisionCodes: [$subdivisionCode]) {
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
    } = await request<GetWidgetSubdivisionCodeProps>('https://api.findahelpline.com', print(query), {
        countryCode: context.params.countryCode,
        subdivisionCode: context.params.subdivisionCode,
    });
    const subdivision = find({ code: context.params.subdivisionCode.toString().toUpperCase() }, country.subdivisions);
    return {
        props: {
            country,
            subdivision,
            organizations,
            organizationsWhenEmpty,
            categories,
            humanSupportTypes,
            topics,
            countries,
            key: context.params.subdivisionCode, // https://github.com/zeit/next.js/issues/9992
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetWidgetCountryCodeSubdivisionCodePaths {
            countries {
                code
                subdivisions {
                    code
                }
            }
        }
    `;
    const { countries } = await request<GetWidgetCountryCodeSubdivisionCodePaths>(
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

export default WidgetSubdivisionCodePage;
