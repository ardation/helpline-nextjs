import React, { ReactElement } from 'react';
import { request, gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { find } from 'lodash/fp';
import { NextSeo } from 'next-seo';
import Chrome from '../../../../src/components/Chrome';
import OrganizationList from '../../../../src/components/OrganizationList';
import {
    GetCountryCodeSubdivisonCodeTopicSlugProps,
    GetCountryCodeSubdivisonCodeTopicSlugProps_country_subdivisions as Subdivision,
} from '../../../../types/GetCountryCodeSubdivisonCodeTopicSlugProps';
import { GetCountryCodeSubdivisionCodeTopicSlugPaths } from '../../../../types/GetCountryCodeSubdivisionCodeTopicSlugPaths';

interface Props extends GetCountryCodeSubdivisonCodeTopicSlugProps {
    subdivision: Subdivision;
    key: string | string[];
}

const SubdivisionCodeTopicSlugPage = ({
    country,
    subdivision,
    topic,
    organizations,
    organizationsWhenEmpty,
    categories,
    humanSupportTypes,
    topics,
}: Props): ReactElement => {
    return (
        <>
            <NextSeo
                title={`${topic.name} in ${subdivision.name}, ${country.name}`}
                description={`Need to talk? Get free, confidential support with ${topic.name} from a real human. Web chat, text and phone helplines. No sign up or personal info required.`}
            />
            <Chrome country={country} footer>
                <OrganizationList
                    organizations={organizations.nodes}
                    organizationsWhenEmpty={organizationsWhenEmpty.nodes}
                    country={country}
                    subdivision={subdivision}
                    preselectedTopics={[topic]}
                    categories={categories}
                    humanSupportTypes={humanSupportTypes}
                    topics={topics}
                />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const query = gql`
        query GetCountryCodeSubdivisonCodeTopicSlugProps(
            $countryCode: String!
            $subdivisionCode: String!
            $topicSlug: String!
        ) {
            country(code: $countryCode) {
                code
                name
                emergencyNumber
                subdivisions {
                    code
                    name
                }
            }
            topic(slug: $topicSlug) {
                name
                slug
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
    const { country, topic, organizations, organizationsWhenEmpty, categories, humanSupportTypes, topics } =
        await request<GetCountryCodeSubdivisonCodeTopicSlugProps>('https://api.findahelpline.com', query, {
            countryCode: context.params.countryCode,
            subdivisionCode: context.params.subdivisionCode,
            topicSlug: context.params.topicSlug,
        });
    const subdivision = find({ code: context.params.subdivisionCode.toString().toUpperCase() }, country.subdivisions);
    return {
        props: {
            country,
            topic,
            subdivision,
            organizations,
            organizationsWhenEmpty,
            categories,
            humanSupportTypes,
            topics,
            key: `${context.params.countryCode}-${context.params.subdivisionCode}-${context.params.topicSlug}`,
            // https://github.com/zeit/next.js/issues/9992
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetCountryCodeSubdivisionCodeTopicSlugPaths {
            countries {
                code
                locality
                subdivisions {
                    code
                }
            }
            topics {
                slug
            }
        }
    `;
    const { countries, topics } = await request<GetCountryCodeSubdivisionCodeTopicSlugPaths>(
        'https://api.findahelpline.com',
        query,
    );
    const paths: { params: { countryCode: string; subdivisionCode: string; topicSlug: string } }[] = [];

    countries.slice(0, 20).forEach((country) => {
        return country.subdivisions.slice(0, 20).forEach((subdivision) => {
            return topics.slice(0, 20).forEach(({ slug }) => {
                paths.push({
                    params: {
                        countryCode: country.code.toLowerCase(),
                        subdivisionCode: subdivision.code.toLowerCase(),
                        topicSlug: slug,
                    },
                });
            });
        });
    });

    return {
        paths,
        fallback: 'blocking',
    };
};

export default SubdivisionCodeTopicSlugPage;
