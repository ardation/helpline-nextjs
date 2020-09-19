import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SideBar from '.';

describe('SideBar', () => {
    it('should show sidebar when clicking on menuButton', () => {
        const { getByTestId, getByText } = render(<SideBar />);
        expect(() => getByText('About')).toThrow();
        fireEvent.click(getByTestId('menuButton'));
        expect(getByText('About')).toBeTruthy();
    });

    it('should contain home link', () => {
        const { getByText, getByTestId } = render(<SideBar />);
        fireEvent.click(getByTestId('menuButton'));
        expect(getByText('Home').parentElement.parentElement).toHaveAttribute('href', '/');
    });

    it('should contain about link', () => {
        const { getByText, getByTestId } = render(<SideBar />);
        fireEvent.click(getByTestId('menuButton'));
        expect(getByText('About').parentElement.parentElement).toHaveAttribute('href', '/about');
    });

    it('should contain contact link', () => {
        const { getByText, getByTestId } = render(<SideBar />);
        fireEvent.click(getByTestId('menuButton'));
        expect(getByText('Contact').parentElement.parentElement).toHaveAttribute('href', '/contact');
    });

    it('should contain privacy link', () => {
        const { getByText, getByTestId } = render(<SideBar />);
        fireEvent.click(getByTestId('menuButton'));
        expect(getByText('Privacy').parentElement.parentElement).toHaveAttribute('href', '/privacy');
    });

    it('should contain terms link', () => {
        const { getByText, getByTestId } = render(<SideBar />);
        fireEvent.click(getByTestId('menuButton'));
        expect(getByText('Terms of Service').parentElement.parentElement).toHaveAttribute('href', '/terms');
    });
});
