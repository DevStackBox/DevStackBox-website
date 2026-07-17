import defaultMdxComponents from "fumadocs-ui/mdx";
import { Callout } from "@/components/mdx/callout";
import { Mermaid } from "@/components/mdx/mermaid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMDXComponents(components?: Record<string, any>) {
  return {
    ...defaultMdxComponents,
    Callout,
    Mermaid,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
