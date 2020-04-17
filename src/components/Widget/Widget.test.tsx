import React from 'react';
import { render } from '@testing-library/react';
import Widget from '.';

describe('Widget', () => {
    it('should contain correct text', () => {
        const { findByText } = render(<Widget />);
        expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
    });
});
