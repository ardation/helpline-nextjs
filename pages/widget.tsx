import Head from 'next/head';
import React, { Fragment, useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Theme } from '@material-ui/core';
import { GetWidgetCountriesAndSubdivisions } from '../types/GetWidgetCountriesAndSubdivisions';
import { OrganizationProvider } from '../src/context/organizationContext';
import Widget from '../src/components/Widget';
import LoadingSpinner from '../src/components/LoadingSpinner';

declare global {
    interface Window {
        xprops: {
            countryCode: string;
        };
    }
}
type Xprops = {
    xprops: {
        countryCode: string;
    };
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative',
            backgroundColor: '#FFFFFF',
            padding: theme.spacing(6),
        },
    }),
);

const WidgetPage = ({
    countries,
    topics,
    categories,
    humanSupportTypes,
}: GetWidgetCountriesAndSubdivisions): ReactElement => {
    const classes = useStyles();
    const router = useRouter();
    const [xprops, setXprops] = useState(null);

    useEffect(() => {
        if (window.xprops) {
            setXprops(window.xprops);
            router.push(`/widget/[widgetCountryCode]`, `/widget/${window.xprops.countryCode.toLowerCase()}`);
        }
    });

    return (
        <Fragment>
            <Head>
                <title>Find A Helpline</title>
                <script src="/widget.min.js"></script>
            </Head>
            <Fragment>
                {xprops ? (
                    <Container className={classes.container}>
                        <LoadingSpinner />
                    </Container>
                ) : (
                    <OrganizationProvider
                        countries={countries}
                        allOrganizations={[]}
                        filterOptions={{
                            topics: topics,
                            categories: categories,
                            humanSupportTypes: humanSupportTypes,
                        }}
                    >
                        <Widget />
                    </OrganizationProvider>
                )}
            </Fragment>
        </Fragment>
    );
};

export const getStaticProps = async (): Promise<{ props: GetWidgetCountriesAndSubdivisions }> => {
    const query = gql`
        query GetWidgetCountriesAndSubdivisions {
            countries {
                code
                name
                emergencyNumber
                subdivisions {
                    code
                    name
                }
            }
            topics {
                name
            }
            categories {
                name
            }
            humanSupportTypes {
                name
            }
        }
    `;
    const { countries, topics, categories, humanSupportTypes } = await request(
        'https://api.findahelpline.com',
        print(query),
    );
    return {
        props: {
            countries,
            topics,
            categories,
            humanSupportTypes,
        },
    };
};

export default WidgetPage;
