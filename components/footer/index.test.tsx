import { render, screen } from '@testing-library/react';
import { Footer } from './index';

test('Expect the Footer to render.', () => {
  render(<Footer />);
  expect(screen.getByText('Daniel Dupont | Graph Algos © 2020'));
});
