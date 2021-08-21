import React, { ReactElement } from 'react';
import Sitemap from '.';

export default {
    title: 'Sitemap',
};

export const Default = (): ReactElement => (
    <Sitemap
        countries={[{ code: 'NZ', name: 'New Zealand', subdivisions: [{ code: 'AUK', name: 'Auckland' }] }]}
        topics={[{ slug: 'depression', name: 'Depression' }]}
        organizations={[{ slug: 'youthline', name: 'Youthline' }]}
    />
);
