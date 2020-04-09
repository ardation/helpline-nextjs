import React from 'react';
import { render } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel', () => {
    it('should render children', () => {
        const { getByText } = render(
            <Carousel>
                <p>hello world</p>
                <p>test</p>
            </Carousel>,
        );
        expect(getByText('test')).toBeTruthy();
    });
});
