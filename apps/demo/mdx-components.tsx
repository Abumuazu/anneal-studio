import type { MDXComponents } from 'mdx/types';

/** Required by @next/mdx. Case files import the kit sections they use. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
