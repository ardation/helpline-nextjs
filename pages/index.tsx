import React, { ReactElement } from 'react';
import { request, gql } from 'graphql-request';
import { GetStaticProps } from 'next';
import Search from '../src/components/Search';
import Chrome from '../src/components/Chrome';
import { GetSearchProps } from '../types/GetSearchProps';

const IndexPage = ({ topics, countries }: GetSearchProps): ReactElement => {
    return (
        <Chrome footer>
            <Search countries={countries} topics={topics} showAbout />
        </Chrome>
    );
};

export const getStaticProps: GetStaticProps<GetSearchProps> = async () => {
    const query = gql`
        query GetSearchProps {
            countries {
                code
                name
                locality
                region
                subdivisions {
                    code
                    name
                }
            }
            topics {
                name
            }
        }
    `;
    const { countries, topics } = await request<GetSearchProps>('https://api.findahelpline.com', query);
    return {
        props: {
            countries,
            topics,
        },
        revalidate: 60,
    };
};

export default IndexPage;
