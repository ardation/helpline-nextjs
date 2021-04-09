import React from 'react';
import { render } from '@testing-library/react';
import TopBar from '.';

describe('TopBar', () => {
    it('should contain correct text', () => {
        const { getByText } = render(<TopBar />);
        expect(getByText('Need to leave quickly?')).toBeInTheDocument();
        expect(getByText('Click to immediately exit this site.')).toBeInTheDocument();
    });

    it('should contain weather link', () => {
        const { getByTestId } = render(<TopBar />);
        const element = getByTestId('leaveQuicklyButton');
        expect(element.parentElement).toHaveAttribute('href', 'https://accuweather.com');
    });

    describe('country', () => {
        const country = { emergencyNumber: '111' };

        it('should contain correct text', () => {
            const { getByText } = render(<TopBar country={country} />);
            expect(getByText('Are you or someone else in immediate danger?')).toBeInTheDocument();
        });

        it('should contain emergency link', () => {
            const { getByTestId } = render(<TopBar country={country} />);
            const element = getByTestId('emergencyServicesButton');
            expect(element.parentElement).toHaveAttribute('href', 'tel:111');
        });

        it('should contain weather link', () => {
            const { getByTestId } = render(<TopBar country={country} />);
            const element = getByTestId('leaveQuicklyButton');
            expect(element.parentElement).toHaveAttribute('href', 'https://accuweather.com');
        });

        describe('variant is widget', () => {
            it('should not contain weather link', () => {
                const { queryByTestId } = render(<TopBar country={country} variant="widget" />);
                expect(queryByTestId('leaveQuicklyButton')).not.toBeInTheDocument();
                expect(queryByTestId('emergencyServicesButton')).toBeInTheDocument();
            });
        });
    });

    describe('country without emergency number', () => {
        const country = { emergencyNumber: null };

        it('should contain correct text', () => {
            const { getByText } = render(<TopBar country={country} />);
            expect(getByText('Need to leave quickly?')).toBeInTheDocument();
            expect(getByText('Click to immediately exit this site.')).toBeInTheDocument();
        });

        it('should not contain emergency link', () => {
            const { queryByTestId } = render(<TopBar country={country} />);
            expect(queryByTestId('emergencyServicesButton')).not.toBeInTheDocument();
        });

        it('should contain weather link', () => {
            const { getByTestId } = render(<TopBar country={country} />);
            const element = getByTestId('leaveQuicklyButton');
            expect(element.parentElement).toHaveAttribute('href', 'https://accuweather.com');
        });

        describe('variant is widget', () => {
            it('should not contain weather or emergency link', () => {
                const { queryByTestId } = render(<TopBar country={country} variant="widget" />);
                expect(queryByTestId('leaveQuicklyButton')).not.toBeInTheDocument();
                expect(queryByTestId('emergencyServicesButton')).not.toBeInTheDocument();
            });
        });
    });
});
