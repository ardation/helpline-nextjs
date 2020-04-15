import Head from 'next/head';
import React, { Fragment, Component, ReactElement } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../src/components/Chrome';
import Widget from '../src/components/Widget';
import { GetCountriesAndTopics } from '../types/GetCountriesAndTopics';

declare global {
    interface Window {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        xprops: any;
    }
}
type Xprops = {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    xprops: any;
};

class WidgetPage extends Component<GetCountriesAndTopics, Xprops> {
    constructor(props) {
        super(props);
        this.state = {
            xprops: null,
        };
    }
    componentDidMount(): void {
        if (window.xprops) {
            this.setState({ xprops: window.xprops });
        }
    }

    render(): ReactElement {
        const { topics, countries } = this.props;
        const { xprops } = this.state;
        return (
            <Fragment>
                <Head>
                    <title>Find A Helpline</title>
                    <script src="http://localhost:3000/zoid.min.js"></script>
                    <script src="http://localhost:3000/widget.js"></script>
                </Head>
                <Chrome topbar={false} footer={false}>
                    <Widget countries={countries} topics={topics} xprops={xprops} />
                </Chrome>
            </Fragment>
        );
    }
}

export const getStaticProps = async (): Promise<{ props: GetCountriesAndTopics }> => {
    const query = gql`
        query GetCountriesAndTopics {
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
        }
    `;
    const { countries, topics } = await request('https://api.findahelpline.com', print(query));
    return {
        props: {
            countries,
            topics,
        },
    };
};

export default WidgetPage;
