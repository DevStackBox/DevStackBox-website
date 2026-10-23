import defaultMdxComponents from "fumadocs-ui/mdx";
import { Callout } from "@/components/mdx/callout";
import { Mermaid } from "@/components/mdx/mermaid";
import { Screenshot } from "@/components/mdx/screenshot";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMDXComponents(components?: Record<string, any>) {
  return {
    ...defaultMdxComponents,
    Callout,
    Mermaid,
    Screenshot,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
