import { render, screen } from '@testing-library/react';

import App from '.';

describe('App', () => {
  it('should render a title', () => {
    render(<App />);

    const titleElement = screen.getByText('Shifumi');

    expect(titleElement).toBeInTheDocument();
  });
});
