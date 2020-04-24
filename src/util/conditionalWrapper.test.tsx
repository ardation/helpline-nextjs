import React from 'react';
import { render } from '@testing-library/react';
import ConditionalWrapper from './conditionalWrapper';

describe('ConditionalWrapper', () => {
    it('Should wrap when true', () => {
        const { getByRole } = render(
            <ConditionalWrapper
                condition={true}
                wrapper={(children): JSX.Element => (
                    <a href="/" aria-labelledby="conditional-wrapper">
                        {children}
                    </a>
                )}
            >
                <p>Content</p>
            </ConditionalWrapper>,
        );
        expect(getByRole('link')).toBeInTheDocument();
    });
    it('Should not wrap when false', () => {
        const { queryByRole } = render(
            <ConditionalWrapper
                condition={false}
                wrapper={(children): JSX.Element => (
                    <a href="/" aria-labelledby="conditional-wrapper">
                        {children}
                    </a>
                )}
            >
                <p>Content</p>
            </ConditionalWrapper>,
        );
        expect(queryByRole('link')).not.toBeInTheDocument();
    });
    it('Should not wrap when undefined', () => {
        const { queryByRole } = render(
            <ConditionalWrapper
                condition={undefined}
                wrapper={(children): JSX.Element => (
                    <a href="/" aria-labelledby="conditional-wrapper">
                        {children}
                    </a>
                )}
            >
                <p>Content</p>
            </ConditionalWrapper>,
        );
        expect(queryByRole('link')).not.toBeInTheDocument();
    });
});
