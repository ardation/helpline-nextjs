import React, { ReactElement, Fragment } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Typography, Container, Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import formatArrayIntoSentence from '../src/util/formatArrayIntoSentence';
import Chrome from '../src/components/Chrome';
import { GetCountryAndOrganizations } from '../types/GetCountryAndOrganizations';
import OrganizationCard from '../src/components/OrganizationCard';

const CountryPage = ({ country, organizations }: GetCountryAndOrganizations): ReactElement => {
    const router = useRouter();
    let { topics } = router.query;

    if (topics) {
        topics = [topics].flat();
    }

    return (
        <Fragment>
            <Head>
                <title>Find A Helpline | {country.name}</title>
            </Head>
            <Chrome topbar={true} country={country}>
                <Container maxWidth="xs">
                    <Box my={2}>
                        <Typography variant="h6">
                            Best helplines in {country.name}
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

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: GetCountryAndOrganizations }> => {
    const query = gql`
        query GetCountryAndOrganizations($countryCode: String!) {
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
        }
    `;
    const { country, organizations } = await request('https://api.findahelpline.com', print(query), {
        countryCode: context.params.countryCode,
    });
    return {
        props: {
            country,
            organizations,
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
                    countryCode: country.code.toLowerCase(),
                },
            };
        }),
        fallback: false,
    };
};

export default CountryPage;
