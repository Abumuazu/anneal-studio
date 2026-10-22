import { fireEvent, render, screen } from '@testing-library/react';

import { FilterChips, FilterGroup, FilterItem } from './Filter';

function Demo() {
  return (
    <FilterGroup>
      <h2 id="list">Everything</h2>
      <FilterChips
        labelledBy="list"
        options={[
          { id: 'all', label: 'All', count: '03' },
          { id: 'projects', label: 'Projects', count: '02' },
          { id: 'ventures', label: 'Ventures', count: '01' },
        ]}
      />
      <FilterItem group="projects">Alpha</FilterItem>
      <FilterItem group="projects">Beta</FilterItem>
      <FilterItem group="ventures">Gamma</FilterItem>
    </FilterGroup>
  );
}

describe('FilterChips', () => {
  it('shows every item until a group is picked', () => {
    render(<Demo />);
    expect(screen.getByRole('group', { name: 'Everything' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All 03' })).toHaveAttribute('aria-pressed', 'true');
    for (const name of ['Alpha', 'Beta', 'Gamma']) expect(screen.getByText(name)).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Ventures 01' }));
    expect(screen.getByRole('button', { name: 'Ventures 01' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'All 03' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Gamma')).toBeVisible();
    expect(screen.getByText('Alpha')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'All 03' }));
    expect(screen.getByText('Alpha')).toBeVisible();
  });
});
