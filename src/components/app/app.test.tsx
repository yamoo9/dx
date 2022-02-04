import { render, screen } from '@testing-library/react';
import App from './app';

describe('App', () => {
  test('render', () => {
    render(<App />);
    const app: HTMLDivElement = screen.getByTestId('app');
    expect(app).toHaveClass('app');
  });
});
