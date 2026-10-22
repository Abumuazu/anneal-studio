export { MotionProvider } from './MotionProvider';
export { useMotionEffect, useReducedMotion } from './hooks';
export {
  getMotionOverride,
  isReduced,
  setMotionOverride,
  subscribeMotion,
  type MotionMode,
} from './preference';
export {
  DESKTOP_QUERY,
  EASE_MORPH,
  EASE_REVEAL,
  PIN_QUERY,
  ScrollTrigger,
  addTick,
  ensureGsap,
  getLenis,
  getScrollVelocity,
  gsap,
  holdReveals,
  subscribeScroll,
  trackScrollVelocity,
} from './engine';
export { observeViewport, useInViewport } from './viewport';

export { InView } from './InView';
export { LineMask, Reveal } from './Reveal';
export { WordLight } from './WordLight';
export { ClipIn, Parallax, Zoom } from './Scrub';
export { StackCard, StackCards } from './Stack';
export {
  HorizontalTrack,
  PinnedSteps,
  ScrollSteps,
  StepItem,
  TrackCounter,
  TrackItem,
  useSteps,
} from './Track';
export {
  AutoStepButton,
  AutoSteps,
  firstStageOf,
  stepDurations,
  useAutoSteps,
  type AutoplayState,
} from './AutoSteps';
export { HoverPreviewList } from './HoverPreview';
export { FINE_POINTER, useFinePointer } from './pointer';
export { Marquee } from './Marquee';
export { CursorLabel, FollowRegion } from './Follow';
export { MorphTile, Pausable } from './Pausable';
export { TypingLine, type TypingItem } from './TypingLine';
export { PhysicsTiles, type TileDef } from './PhysicsTiles';
export { StretchWordmark } from './StretchWordmark';
export { ExpandGroup, ExpandItem, ExpandPanel, ExpandTrigger } from './Expand';
export { FlexTile, FlexTiles } from './FlexTiles';
export { cubicBezier, easeMorph, easeReveal } from './bezier';
