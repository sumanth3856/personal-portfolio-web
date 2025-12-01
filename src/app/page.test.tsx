import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
    it('renders the main heading', () => {
        render(<Home />);
        const heading = screen.getByText(/Crafting/i);
        expect(heading).toBeDefined();
    });

    it('renders the portfolio link', () => {
        render(<Home />);
        const link = screen.getByRole('link', { name: /View Portfolio/i });
        expect(link).toBeDefined();
    });
});
