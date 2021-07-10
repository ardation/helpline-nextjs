import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { noop } from 'lodash';
import request from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { GetServerSitemap } from '../../types/GetServerSitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const query = gql`
        query GetServerSitemap {
            countries {
                code
                subdivisions {
                    code
                }
            }
            topics {
                name
            }
        }
    `;
    const { countries, topics } = await request<GetServerSitemap>('https://api.findahelpline.com', print(query));
    const baseUrl = process.env.SITE_URL || 'https://findahelpline.com';

    const fields: ISitemapField[] = [
        ...countries.flatMap((country) => {
            const countryCode = country.code.toLocaleLowerCase();
            return [
                ...country.subdivisions.flatMap((subdivision) => {
                    const subdivisionCode = subdivision.code.toLocaleLowerCase();
                    return [
                        ...topics.map((topic) => {
                            const param = encodeURIComponent(topic.name).replace(/%20/g, '+');
                            return {
                                loc: `${baseUrl}/${countryCode}/${subdivisionCode}?topics=${param}`,
                                changefreq: 'daily',
                                priority: '0.7',
                                lastmod: new Date().toISOString(),
                            };
                        }),
                    ];
                }),
                ...topics.map((topic) => {
                    const param = encodeURIComponent(topic.name).replace(/%20/g, '+');
                    return {
                        loc: `${baseUrl}/${countryCode}?topics=${param}`,
                        changefreq: 'daily',
                        priority: '0.7',
                        lastmod: new Date().toISOString(),
                    };
                }),
            ];
        }),
    ];

    return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default noop;
