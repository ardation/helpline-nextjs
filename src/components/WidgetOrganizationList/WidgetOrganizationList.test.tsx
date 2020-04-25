import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WidgetOrganizationList from '.';

const organizations = Array(2).fill({
    slug: 'youthline',
    name: 'Youthline',
    alwaysOpen: true,
    openingHours: [],
    humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
    categories: [{ name: 'For youth' }, { name: 'All issues' }],
    smsNumber: '234',
    phoneNumber: '0800 376 633',
    url: 'https://youthline.co.nz/website',
    chatUrl: 'https://youthline.co.nz/chat',
    timezone: 'Auckland',
    topics: [],
});

describe('WidgetOrganizationList', () => {
    it('should toggle previousButton disabled state', () => {
        const { getByTestId } = render(<WidgetOrganizationList organizations={organizations} />);
        const previousButton = getByTestId('previousButton');
        const nextButton = getByTestId('nextButton');
        expect(previousButton).toBeDisabled();
        fireEvent.click(nextButton);
        expect(previousButton).not.toBeDisabled();
        fireEvent.click(previousButton);
        expect(previousButton).toBeDisabled();
    });

    it('should toggle nextButton disabled state', () => {
        const { getByTestId } = render(<WidgetOrganizationList organizations={organizations} />);
        const previousButton = getByTestId('previousButton');
        const nextButton = getByTestId('nextButton');
        expect(nextButton).not.toBeDisabled();
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        expect(nextButton).toBeDisabled();
        fireEvent.click(previousButton);
        expect(nextButton).not.toBeDisabled();
    });
});
