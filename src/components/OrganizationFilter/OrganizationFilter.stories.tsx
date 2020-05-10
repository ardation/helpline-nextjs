import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import OrganizationFilter from '.';

const topics = [{ name: 'Anxiety' }, { name: 'Bullying' }, { name: 'Depression' }, { name: 'School' }];
const preselectedTopics = [{ name: 'Anxiety' }, { name: 'Depression' }];
const humanSupportTypes = [{ name: 'Volunteers' }, { name: 'Counsellors' }, { name: 'Peers' }];
const categories = [
    { name: 'LGBTQ+ Friendly' },
    { name: 'All ages' },
    { name: 'All issues' },
    { name: 'For youth' },
    { name: 'For men' },
    { name: 'For women' },
    { name: 'For parents' },
];

export default {
    title: 'OrganizationFilter',
};

export const Default = (): ReactElement => (
    <OrganizationFilter
        onChange={action('onChange')}
        topics={topics}
        preselectedTopics={[]}
        humanSupportTypes={humanSupportTypes}
        categories={categories}
    />
);

export const WithTopics = (): ReactElement => (
    <OrganizationFilter
        topics={[
            ...topics,
            { name: 'Eating' },
            { name: 'Body Image' },
            { name: 'Abuse' },
            { name: 'Domestic Violence' },
            { name: 'Dementia' },
        ]}
        preselectedTopics={preselectedTopics}
        onChange={action('onChange')}
    />
);

export const withHumanSupportTypes = (): ReactElement => (
    <OrganizationFilter
        humanSupportTypes={[
            ...humanSupportTypes,
            { name: 'Peer' },
            { name: 'Verified' },
            { name: 'Volunteer' },
            { name: 'Staff' },
            { name: 'Employees' },
        ]}
        onChange={action('onChange')}
    />
);

export const withCategories = (): ReactElement => (
    <OrganizationFilter categories={[...categories, { name: 'For Deaf' }]} onChange={action('onChange')} />
);
