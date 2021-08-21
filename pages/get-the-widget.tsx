import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticProps } from 'next';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { NextSeo } from 'next-seo';
import WidgetPartners from '../src/components/WidgetPartners';
import { WidgetProps } from '../src/components/Widget/Widget';
import { GetTheWidgetProps } from '../types/GetTheWidgetProps';
import Chrome from '../src/components/Chrome';

const GetTheWidgetPage = (widgetProps: WidgetProps): ReactElement => {
    return (
        <>
            <NextSeo title="Get the Widget" />
            <Chrome navBar footer>
                <WidgetPartners widgetProps={widgetProps} />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps<WidgetProps> = async () => {
    const query = gql`
        query GetTheWidgetProps($countryCode: String!) {
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
            organizations(countryCode: $countryCode, subdivisionCodes: []) {
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
    const { country, organizations, organizationsWhenEmpty, categories, humanSupportTypes, topics, countries } =
        await request<GetTheWidgetProps>('https://api.findahelpline.com', print(query), {
            countryCode: 'us',
        });

    return {
        props: {
            preselectedCountry: country,
            preselectedTopics: [],
            organizations: organizations.nodes,
            organizationsWhenEmpty: organizationsWhenEmpty.nodes,
            categories,
            humanSupportTypes,
            topics,
            countries,
        },
    };
};

export default GetTheWidgetPage;
