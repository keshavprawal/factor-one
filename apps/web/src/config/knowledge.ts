export const knowledgeCategories = [
  {
    id: 'compatibility',
    name: 'Compatibility',
    description: 'How to read fit and compatibility information clearly.',
  },
  {
    id: 'installation',
    name: 'Installation',
    description: 'What to expect before an installation guide is published.',
  },
  {
    id: 'care',
    name: 'Care',
    description: 'A future home for approved product-care guidance.',
  },
] as const;

export type KnowledgeCategoryId = (typeof knowledgeCategories)[number]['id'];

export interface KnowledgeArticleSection {
  heading: string;
  paragraphs: readonly string[];
}

export interface KnowledgeArticle {
  categoryId: KnowledgeCategoryId;
  description: string;
  id: string;
  sections: readonly KnowledgeArticleSection[];
  slug: string;
  status: 'placeholder';
  title: string;
}

export const knowledgeArticles = [
  {
    id: 'reading-compatibility-information',
    slug: 'reading-compatibility-information',
    title: 'How to Read Compatibility Information',
    description:
      'A preview of the compatibility guidance Factor One is preparing for owners.',
    categoryId: 'compatibility',
    status: 'placeholder',
    sections: [
      {
        heading: 'What this guide will cover',
        paragraphs: [
          'This placeholder marks where approved guidance about model, year and variant information will be published.',
          'Final guidance will be added only after the relevant compatibility details have been verified.',
        ],
      },
      {
        heading: 'Before publication',
        paragraphs: [
          'No compatibility conclusion should be drawn from this preview. Use only the approved compatibility information shown with a product.',
        ],
      },
    ],
  },
  {
    id: 'confirming-product-fit',
    slug: 'confirming-product-fit',
    title: 'Confirming Product Fit',
    description:
      'A future guide to the information owners should review before choosing an accessory.',
    categoryId: 'compatibility',
    status: 'placeholder',
    sections: [
      {
        heading: 'What this guide will cover',
        paragraphs: [
          'This preview reserves a clear place for approved fit guidance without presenting unverified instructions.',
          'The completed article will explain where Factor One displays compatibility and product limitations.',
        ],
      },
      {
        heading: 'Before publication',
        paragraphs: [
          'Product-specific information remains the source to consult. This placeholder does not confirm fit for any car or accessory.',
        ],
      },
    ],
  },
  {
    id: 'preparing-for-installation',
    slug: 'preparing-for-installation',
    title: 'Preparing for Installation',
    description:
      'A preview of the installation guidance that will accompany approved products.',
    categoryId: 'installation',
    status: 'placeholder',
    sections: [
      {
        heading: 'What this guide will cover',
        paragraphs: [
          'This placeholder will become a starting point for approved installation preparation and product-specific instructions.',
          'The final article will distinguish general preparation from steps that apply only to a particular product.',
        ],
      },
      {
        heading: 'Before publication',
        paragraphs: [
          'Do not use this preview as installation guidance. Follow only the instructions supplied with an approved product.',
        ],
      },
    ],
  },
  {
    id: 'planning-product-care',
    slug: 'planning-product-care',
    title: 'Planning Product Care',
    description:
      'A future home for clear, product-specific care and maintenance guidance.',
    categoryId: 'care',
    status: 'placeholder',
    sections: [
      {
        heading: 'What this guide will cover',
        paragraphs: [
          'This preview marks where reviewed care guidance will help owners understand routine product upkeep.',
          'Final recommendations will be published only when materials and care requirements have been confirmed.',
        ],
      },
      {
        heading: 'Before publication',
        paragraphs: [
          'This placeholder contains no maintenance instructions. Refer to approved product documentation when it becomes available.',
        ],
      },
    ],
  },
] as const satisfies readonly KnowledgeArticle[];

export function getKnowledgeCategory(categoryId: KnowledgeCategoryId) {
  return knowledgeCategories.find((category) => category.id === categoryId)!;
}

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug) ?? null;
}

export function getArticleWordCount(article: KnowledgeArticle): number {
  return article.sections.reduce(
    (total, section) =>
      total +
      section.heading.trim().split(/\s+/).length +
      section.paragraphs.reduce(
        (sectionTotal, paragraph) =>
          sectionTotal + paragraph.trim().split(/\s+/).length,
        0,
      ),
    article.title.trim().split(/\s+/).length,
  );
}

export function getArticleReadingTime(article: KnowledgeArticle): number {
  return Math.max(1, Math.ceil(getArticleWordCount(article) / 220));
}

export function searchKnowledgeArticles({
  categoryId,
  query,
}: {
  categoryId?: string;
  query?: string;
}): readonly KnowledgeArticle[] {
  const normalizedQuery = query?.trim().toLocaleLowerCase() ?? '';

  return knowledgeArticles.filter((article) => {
    if (categoryId && article.categoryId !== categoryId) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const category = getKnowledgeCategory(article.categoryId);
    const searchableText = [
      article.title,
      article.description,
      category.name,
      ...article.sections.flatMap((section) => [
        section.heading,
        ...section.paragraphs,
      ]),
    ]
      .join(' ')
      .toLocaleLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getRelatedKnowledgeArticles(
  article: KnowledgeArticle,
  limit = 2,
): readonly KnowledgeArticle[] {
  return knowledgeArticles
    .filter((candidate) => candidate.id !== article.id)
    .sort((left, right) => {
      const leftMatches = left.categoryId === article.categoryId ? 1 : 0;
      const rightMatches = right.categoryId === article.categoryId ? 1 : 0;
      return rightMatches - leftMatches;
    })
    .slice(0, limit);
}
