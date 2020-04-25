import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { find, flatten } from 'lodash/fp';
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
    categories,
    humanSupportTypes,
    topics,
    countries,
}: Props): ReactElement => {
    return (
        <>
            <Head>
                <title>
                    Find A Helpline | {subdivision.name}, {country.name}
                </title>
            </Head>
            <Widget
                countries={countries}
                preselectedCountry={country}
                preselectedSubdivision={subdivision}
                organizations={organizations.nodes}
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
                subdivisions {
                    code
                    name
                }
            }
            organizations(countryCode: $countryCode, subdivisionCodes: [$subdivisionCode]) {
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
            subdivisionCode: context.params.subdivisionCode,
        },
    );
    const subdivision = find({ code: context.params.subdivisionCode.toString().toUpperCase() }, country.subdivisions);
    return {
        props: {
            country,
            subdivision,
            organizations,
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
    const { countries } = (await request(
        'https://api.findahelpline.com',
        print(query),
    )) as GetWidgetCountryCodeSubdivisionCodePaths;

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
