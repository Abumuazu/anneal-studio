import { act, fireEvent, render, screen } from '@testing-library/react';

import { AutoStepButton, AutoSteps, firstStageOf, stepDurations, useAutoSteps } from './AutoSteps';

/** A controllable IntersectionObserver: `show()` reports every observed element as on screen. */
class FakeObserver {
  static all: FakeObserver[] = [];
  readonly els = new Set<Element>();
  constructor(private readonly cb: IntersectionObserverCallback) {
    FakeObserver.all.push(this);
  }
  observe(el: Element) {
    this.els.add(el);
  }
  unobserve(el: Element) {
    this.els.delete(el);
  }
  disconnect() {
    this.els.clear();
  }
  static show(visible = true) {
    for (const o of FakeObserver.all) {
      const entries = [...o.els].map(
        (target) => ({ target, isIntersecting: visible }) as IntersectionObserverEntry,
      );
      o.cb(entries, o as unknown as IntersectionObserver);
    }
  }
}

function Probe() {
  const { stage, autoplay } = useAutoSteps();
  return <output data-testid="probe">{`${String(stage)} ${autoplay}`}</output>;
}

function Demo() {
  return (
    <AutoSteps durations={[100, 200, 300]} stepOf={[0, 0, 1]}>
      <AutoStepButton index={0}>Capture</AutoStepButton>
      <AutoStepButton index={1}>Lock</AutoStepButton>
      <Probe />
    </AutoSteps>
  );
}

const probe = () => screen.getByTestId('probe').textContent;

/** Runs `fn` inside act and lets React flush, like the other kit tests. */
const step = (fn: () => void) =>
  act(async () => {
    fn();
    await Promise.resolve();
  });

describe('AutoSteps helpers', () => {
  it('finds the first stage of a step', () => {
    expect(firstStageOf([0, 0, 1, 2, 3, 4, 4], 0)).toBe(0);
    expect(firstStageOf([0, 0, 1, 2, 3, 4, 4], 1)).toBe(2);
    expect(firstStageOf([0, 0, 1, 2, 3, 4, 4], 4)).toBe(5);
    expect(firstStageOf([0, 1], 9)).toBe(0);
  });

  it('sums stage durations per step', () => {
    expect(
      stepDurations([2400, 2800, 3200, 3000, 3800, 2800, 3600], [0, 0, 1, 2, 3, 4, 4]),
    ).toEqual([5200, 3200, 3000, 3800, 6400]);
  });
});

describe('AutoSteps', () => {
  beforeEach(() => {
    // performance.now too: playback keeps the time left in a stage across pauses.
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date', 'performance'] });
    // Observers are shared per margin for the page's life, so keep the fakes across tests.
    vi.stubGlobal('IntersectionObserver', FakeObserver);
    sessionStorage.clear();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('waits until on screen, then plays through and loops', async () => {
    render(<Demo />);
    expect(probe()).toBe('0 paused');
    await step(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(probe()).toBe('0 paused');

    await step(() => {
      FakeObserver.show();
    });
    expect(probe()).toBe('0 playing');
    await step(() => {
      vi.advanceTimersByTime(100);
    });
    expect(probe()).toBe('1 playing');
    expect(screen.getByRole('button', { name: 'Capture' })).toHaveAttribute('aria-pressed', 'true');
    await step(() => {
      vi.advanceTimersByTime(200);
    });
    expect(probe()).toBe('2 playing');
    expect(screen.getByRole('button', { name: 'Lock' })).toHaveAttribute('aria-pressed', 'true');
    await step(() => {
      vi.advanceTimersByTime(300);
    });
    expect(probe()).toBe('0 playing');
  });

  it('pauses while focus is inside and resumes with the time left', async () => {
    render(<Demo />);
    await step(() => {
      FakeObserver.show();
    });
    await step(() => {
      vi.advanceTimersByTime(60);
    });
    await step(() => {
      screen.getByRole('button', { name: 'Capture' }).focus();
    });
    expect(probe()).toBe('0 paused');
    await step(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(probe()).toBe('0 paused');
    await step(() => {
      screen.getByRole('button', { name: 'Capture' }).blur();
    });
    await step(() => {
      vi.advanceTimersByTime(39);
    });
    expect(probe()).toBe('0 playing');
    await step(() => {
      vi.advanceTimersByTime(1);
    });
    expect(probe()).toBe('1 playing');
  });

  it('jumps to a picked step and stops playing', async () => {
    render(<Demo />);
    await step(() => {
      FakeObserver.show();
    });
    fireEvent.click(screen.getByRole('button', { name: 'Lock' }));
    expect(probe()).toBe('2 stopped');
    await step(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(probe()).toBe('2 stopped');
  });

  it('pauses CSS animations inside while off screen', async () => {
    const { container } = render(<Demo />);
    const root = container.firstElementChild;
    await step(() => {
      FakeObserver.show(false);
    });
    expect(root).toHaveAttribute('data-paused');
    await step(() => {
      FakeObserver.show(true);
    });
    expect(root).not.toHaveAttribute('data-paused');
  });
});
