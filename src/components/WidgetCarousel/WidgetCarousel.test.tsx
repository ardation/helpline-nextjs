import React from 'react';
import { render } from '@testing-library/react';
import WidgetCarousel from './WidgetCarousel';

describe('WidgetCarousel', () => {
    it('should render children', () => {
        const { getByText } = render(
            <WidgetCarousel>
                <p>hello world</p>
                <p>test</p>
            </WidgetCarousel>,
        );
        expect(getByText('test')).toBeTruthy();
    });
});
