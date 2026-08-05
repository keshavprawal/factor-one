import type { KnowledgeArticle } from '../config/knowledge';

export interface KnowledgeContentIssue {
  articleSlug?: string;
  code: string;
  message: string;
  severity: 'error';
}

function findDuplicates(values: readonly string[]): readonly string[] {
  return [
    ...new Set(
      values.filter((value, index) => values.indexOf(value) !== index),
    ),
  ];
}

export function validateKnowledgeContent(
  articles: readonly KnowledgeArticle[],
  categoryIds: readonly string[],
): readonly KnowledgeContentIssue[] {
  const issues: KnowledgeContentIssue[] = [];

  for (const id of findDuplicates(articles.map((article) => article.id))) {
    issues.push({
      articleSlug: id,
      code: 'DUPLICATE_ARTICLE_ID',
      message: `Knowledge article id "${id}" is duplicated.`,
      severity: 'error',
    });
  }

  for (const slug of findDuplicates(articles.map((article) => article.slug))) {
    issues.push({
      articleSlug: slug,
      code: 'DUPLICATE_ARTICLE_SLUG',
      message: `Knowledge article slug "${slug}" is duplicated.`,
      severity: 'error',
    });
  }

  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
      issues.push({
        articleSlug: article.slug,
        code: 'INVALID_ARTICLE_SLUG',
        message: `Knowledge article slug "${article.slug}" is not URL-safe.`,
        severity: 'error',
      });
    }

    if (!categoryIds.includes(article.categoryId)) {
      issues.push({
        articleSlug: article.slug,
        code: 'UNKNOWN_ARTICLE_CATEGORY',
        message: `Knowledge article references unknown category "${article.categoryId}".`,
        severity: 'error',
      });
    }

    if (
      !article.title.trim() ||
      !article.description.trim() ||
      article.sections.length === 0 ||
      article.sections.some(
        (section) =>
          !section.heading.trim() ||
          section.paragraphs.length === 0 ||
          section.paragraphs.some((paragraph) => !paragraph.trim()),
      )
    ) {
      issues.push({
        articleSlug: article.slug,
        code: 'INCOMPLETE_ARTICLE_CONTENT',
        message: 'Knowledge article contains an empty required field.',
        severity: 'error',
      });
    }
  }

  return issues;
}
