import React, { ReactElement, Fragment } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../../src/components/Chrome';
import { GetOrganizationSlugProps } from '../../types/GetOrganizationSlugProps';
import OrganizationItem from '../../src/components/OrganizationItem';
import Footer from '../../src/components/Footer';
import NavBar from '../../src/components/NavBar';

const OrganizationPage = ({ organization }: GetOrganizationSlugProps): ReactElement => {
    return (
        <Fragment>
            <Head>
                <title>Find A Helpline | {organization.name}</title>
            </Head>
            <Chrome country={organization.country}>
                <OrganizationItem organization={organization} />
                <Footer />
            </Chrome>
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: GetOrganizationSlugProps }> => {
    const query = gql`
        query GetOrganizationSlugProps($slug: String!) {
            organization(slug: $slug) {
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
                country {
                    code
                    name
                    emergencyNumber
                }
            }
        }
    `;
    const { organization } = await request('https://api.findahelpline.com', print(query), {
        slug: context.params.slug,
    });
    return {
        props: {
            organization,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetOrganizations {
            organizations {
                nodes {
                    slug
                }
            }
        }
    `;
    const { organizations } = await request('https://api.findahelpline.com', print(query));

    return {
        paths: organizations.nodes.map((organization) => {
            return {
                params: {
                    slug: organization.slug.toLowerCase(),
                },
            };
        }),
        fallback: false,
    };
};

export default OrganizationPage;
