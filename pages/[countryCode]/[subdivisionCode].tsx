import React, { ReactElement, Fragment } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Typography, Container, Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { find, flatten } from 'lodash/fp';
import formatArrayIntoSentence from '../../src/util/formatArrayIntoSentence';
import Chrome from '../../src/components/Chrome';
import { GetCountriesAndSubdivisions } from '../../types/GetCountriesAndSubdivisions';
import OrganizationCard from '../../src/components/OrganizationCard';
import {
    GetCountrySubdivisionsAndOrganizations,
    GetCountrySubdivisionsAndOrganizations_country_subdivisions as Subdivision,
    GetCountrySubdivisionsAndOrganizations_country as Country,
    GetCountrySubdivisionsAndOrganizations_organizations as OrganizationsConnection,
} from '../../types/GetCountrySubdivisionsAndOrganizations';

type Props = {
    country: Country;
    subdivision: Subdivision;
    organizations: OrganizationsConnection;
};

const CountryPage = ({ country, subdivision, organizations }: Props): ReactElement => {
    const router = useRouter();
    let { topics } = router.query;

    if (topics) {
        topics = [topics].flat();
    }

    return (
        <Fragment>
            <Head>
                <title>
                    Find A Helpline | {subdivision.name}, {country.name}
                </title>
            </Head>
            <Chrome topbar={true} country={country}>
                <Container maxWidth="xs">
                    <Box my={2}>
                        <Typography variant="h6">
                            Best helplines in {subdivision.name}, {country.name}
                            {topics && <Fragment> for {formatArrayIntoSentence(topics).toLowerCase()}</Fragment>}.
                        </Typography>
                    </Box>
                    {organizations.nodes.map((organization) => (
                        <Box key={organization.slug} my={2}>
                            <OrganizationCard organization={organization} />
                        </Box>
                    ))}
                </Container>
            </Chrome>
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Props }> => {
    const query = gql`
        query GetCountrySubdivisionsAndOrganizations($countryCode: String!, $subdivisionCode: String!) {
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
        }
    `;
    const { country, organizations } = (await request('https://api.findahelpline.com', print(query), {
        countryCode: context.params.countryCode,
        subdivisionCode: context.params.subdivisionCode,
    })) as GetCountrySubdivisionsAndOrganizations;
    const subdivision = find({ code: context.params.subdivisionCode.toString().toUpperCase() }, country.subdivisions);
    return {
        props: {
            country,
            subdivision,
            organizations,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetCountriesAndSubdivisions {
            countries {
                code
                subdivisions {
                    code
                }
            }
        }
    `;
    const { countries } = (await request('https://api.findahelpline.com', print(query))) as GetCountriesAndSubdivisions;

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

export default CountryPage;
