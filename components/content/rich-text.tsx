import { PortableText, type PortableTextComponents } from "@portabletext/react";

type RichTextProps = {
  value: unknown[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 leading-8 text-slate-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-3xl font-bold tracking-tight text-[#0B1F33]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-2xl font-bold text-[#0B1F33]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-xl font-semibold text-[#0B1F33]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-[#D80621] pl-5 italic text-slate-600">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#0B1F33]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      const openInNewTab = Boolean(value?.openInNewTab);

      if (!href) {
        return <>{children}</>;
      }

      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="font-medium text-[#D80621] underline underline-offset-4 hover:text-[#B9051B]"
        >
          {children}
        </a>
      );
    },
  },

  types: {
    editorialImage: ({ value }) => {
      const imageUrl = value?.image?.asset?.url;
      const alt = value?.alt ?? "";
      const caption = value?.caption;

      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full rounded-2xl border border-slate-200 object-cover"
            loading="lazy"
          />

          {caption && (
            <figcaption className="mt-2 text-sm text-slate-500">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function RichText({ value }: RichTextProps) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}