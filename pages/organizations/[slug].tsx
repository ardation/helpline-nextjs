import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../../src/components/Chrome';
import { GetOrganizationsSlugProps } from '../../types/GetOrganizationsSlugProps';
import OrganizationItem from '../../src/components/OrganizationItem';
import Footer from '../../src/components/Footer';
import { GetOrganizationsSlugPaths } from '../../types/GetOrganizationsSlugPaths';

const OrganizationPage = ({ organization }: GetOrganizationsSlugProps): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | {organization.name}</title>
            </Head>
            <Chrome country={organization.country}>
                <OrganizationItem organization={organization} />
                <Footer />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: GetOrganizationsSlugProps }> => {
    const query = gql`
        query GetOrganizationsSlugProps($slug: String!) {
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
        query GetOrganizationsSlugPaths {
            organizations {
                nodes {
                    slug
                }
            }
        }
    `;
    const { organizations } = (await request(
        'https://api.findahelpline.com',
        print(query),
    )) as GetOrganizationsSlugPaths;

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
