import React, { ReactElement } from 'react';
import { request, gql } from 'graphql-request';
import Embed from '../src/components/Embed';
import Chrome from '../src/components/Chrome';
import { GetEmbedProps } from '../types/GetEmbedProps';

const EmbedPage = ({ countries, topics }: GetEmbedProps): ReactElement => {
    return (
        <Chrome footer>
            <Embed countries={countries} topics={topics} />
        </Chrome>
    );
};

export const getStaticProps = async (): Promise<{ props: GetEmbedProps }> => {
    const query = gql`
        query GetEmbedProps {
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
    const { countries, topics } = await request<GetEmbedProps>('https://api.findahelpline.com', query);
    return {
        props: {
            countries,
            topics,
        },
    };
};

export default EmbedPage;
