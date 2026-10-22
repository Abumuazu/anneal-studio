import { act, fireEvent, render, screen } from '@testing-library/react';

import { MotionToggle } from './MotionToggle';

describe('MotionToggle', () => {
  beforeEach(() => sessionStorage.clear());

  it('forces reduced motion for the session and back', async () => {
    render(<MotionToggle label="Reduced motion" />);
    const sw = screen.getByRole('switch', { name: 'Reduced motion' });
    expect(sw).toHaveAttribute('aria-checked', 'false');

    await act(async () => {
      fireEvent.click(sw);
      await Promise.resolve();
    });
    expect(sw).toHaveAttribute('aria-checked', 'true');
    expect(document.documentElement.dataset.motion).toBe('reduce');
    expect(sessionStorage.getItem('kit-motion')).toBe('reduce');

    await act(async () => {
      fireEvent.click(sw);
      await Promise.resolve();
    });
    expect(sw).toHaveAttribute('aria-checked', 'false');
    expect(document.documentElement.dataset.motion).toBe('full');
  });
});
