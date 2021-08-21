import React, { ReactElement } from 'react';
import { request, gql } from 'graphql-request';
import Search from '../src/components/Search';
import Chrome from '../src/components/Chrome';
import { GetSearchProps } from '../types/GetSearchProps';

const IndexPage = ({ topics, countries }: GetSearchProps): ReactElement => {
    return (
        <Chrome footer>
            <Search countries={countries} topics={topics} />
        </Chrome>
    );
};

export const getStaticProps = async (): Promise<{ props: GetSearchProps }> => {
    const query = gql`
        query GetSearchProps {
            countries {
                code
                name
                locality
                subregion
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
    };
};

export default IndexPage;
