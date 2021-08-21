import React, { ReactElement, useEffect } from 'react';
import { request, gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Chrome from '../../src/components/Chrome';
import { GetOrganizationsSlugProps } from '../../types/GetOrganizationsSlugProps';
import OrganizationItem from '../../src/components/OrganizationItem';
import { GetOrganizationsSlugPaths } from '../../types/GetOrganizationsSlugPaths';
import { CountEnum } from '../../types/globalTypes';
import { OrganizationPageView } from '../../types/OrganizationPageView';

interface Props extends GetOrganizationsSlugProps {
    key: string | string[];
}

const OrganizationPage = ({ organization }: Props): ReactElement => {
    useEffect(() => {
        const mutation = gql`
            mutation OrganizationPageView($input: OrganizationIncrementCountMutationInput!) {
                organizationIncrementCount(input: $input) {
                    organization {
                        id
                    }
                }
            }
        `;
        request<OrganizationPageView>('https://api.findahelpline.com', mutation, {
            input: {
                slug: organization.slug,
                count: CountEnum.VIEW,
            },
        });
    }, []);
    return (
        <>
            <NextSeo title={`${organization.name} in ${organization.country.name}`} />
            <Chrome country={organization.country} navBar footer>
                <OrganizationItem organization={organization} />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const query = gql`
        query GetOrganizationsSlugProps($slug: String!) {
            organization(slug: $slug) {
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
                notes
                reviews {
                    rating
                    content
                    createdAt
                }
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
                subdivisions {
                    name
                }
                country {
                    code
                    name
                    emergencyNumber
                }
            }
        }
    `;
    const { organization } = await request<GetOrganizationsSlugProps>('https://api.findahelpline.com', query, {
        slug: context.params.slug,
    });
    return {
        props: {
            organization,
            key: context.params.slug, // https://github.com/zeit/next.js/issues/9992
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetOrganizationsSlugPaths {
            organizations(first: 20) {
                nodes {
                    slug
                }
            }
        }
    `;
    const { organizations } = await request<GetOrganizationsSlugPaths>('https://api.findahelpline.com', query);

    return {
        paths: organizations.nodes.map((organization) => {
            return {
                params: {
                    slug: organization.slug.toLowerCase(),
                },
            };
        }),
        fallback: 'blocking',
    };
};

export default OrganizationPage;
