import type { RichText as SanityRichText } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import React from "react";

const RichText = ({ content }: { content: SanityRichText }) => {
  if (!content) return null;
  return (
    <div className="prose max-w-none text-inherit prose-p:my-3 prose-p:first:mt-0 prose-p:last:mb-0">
      <PortableText value={content} />
    </div>
  );
};

export default RichText;
