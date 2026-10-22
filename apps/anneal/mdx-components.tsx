import type { MDXComponents } from 'mdx/types';

/**
 * Required by @next/mdx in the App Router. Case files import the components
 * they use explicitly, so there is nothing to map globally.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
