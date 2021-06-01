import React, { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import type { Form } from '@formium/types';
import Head from 'next/head';
import formium from '../../src/util/formium';
import HelplineForm from '../../src/components/HelplineForm';
import Chrome from '../../src/components/Chrome';

interface Props {
    form?: Form;
}

const FormPage = ({ form }: Props): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | {form?.name}</title>
            </Head>
            <Chrome footer navBar>
                {form && <HelplineForm form={form} />}
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    if (params?.slug) {
        try {
            const form = await formium.getFormBySlug(params.slug.toString());
            return {
                props: {
                    form,
                },
            };
        } catch (e) {
            console.log(e);
        }
    }

    return {
        props: {},
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: forms } = await formium.findForms();
        return {
            paths: forms.map(({ slug }) => ({
                params: { slug },
            })),
            fallback: false,
        };
    } catch (error) {
        console.log(error);
    }
};

export default FormPage;
