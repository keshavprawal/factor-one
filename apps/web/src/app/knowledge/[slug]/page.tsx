import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/knowledge/article-card';
import { Container } from '@/components/layout/container';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { StructuredData } from '@/components/seo/structured-data';
import {
  getArticleReadingTime,
  getArticleWordCount,
  getKnowledgeArticle,
  getKnowledgeCategory,
  getRelatedKnowledgeArticles,
  knowledgeArticles,
} from '@/config/knowledge';
import { getCanonicalSiteUrl, siteConfig } from '@/config/site';

interface KnowledgeArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: KnowledgeArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);

  if (!article) {
    return {};
  }

  const canonicalSiteUrl = getCanonicalSiteUrl();

  return {
    title: article.title,
    description: article.description,
    alternates: canonicalSiteUrl
      ? { canonical: `/knowledge/${article.slug}` }
      : undefined,
    openGraph: {
      description: article.description,
      siteName: siteConfig.name,
      title: article.title,
      type: 'article',
      url: canonicalSiteUrl ? `/knowledge/${article.slug}` : undefined,
    },
    robots: { follow: false, index: false },
    twitter: {
      card: 'summary',
      description: article.description,
      title: article.title,
    },
  };
}

export default async function KnowledgeArticlePage({
  params,
}: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);

  if (!article) {
    notFound();
  }

  const category = getKnowledgeCategory(article.categoryId);
  const relatedArticles = getRelatedKnowledgeArticles(article);
  const readingTime = getArticleReadingTime(article);
  const wordCount = getArticleWordCount(article);
  const canonicalSiteUrl = getCanonicalSiteUrl();
  const articleUrl = canonicalSiteUrl
    ? new URL(`/knowledge/${article.slug}`, canonicalSiteUrl).toString()
    : null;
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    articleSection: category.name,
    wordCount,
    isAccessibleForFree: true,
    ...(articleUrl ? { mainEntityOfPage: articleUrl, url: articleUrl } : {}),
  };
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        ...(canonicalSiteUrl
          ? { item: new URL('/', canonicalSiteUrl).toString() }
          : {}),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Knowledge',
        ...(canonicalSiteUrl
          ? { item: new URL('/knowledge', canonicalSiteUrl).toString() }
          : {}),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        ...(articleUrl ? { item: articleUrl } : {}),
      },
    ],
  };

  return (
    <>
      <article>
        <header className="bg-warm section-space">
          <Container>
            <Breadcrumbs
              items={[
                { href: '/', label: 'Home' },
                { href: '/knowledge', label: 'Knowledge' },
                { label: article.title },
              ]}
            />
            <div className="mt-10 max-w-4xl">
              <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em]">
                <span>{category.name}</span>
                <span aria-hidden="true">·</span>
                <span>{readingTime} min read</span>
                <span aria-hidden="true">·</span>
                <span>Preview article</span>
              </div>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                {article.title}
              </h1>
              <p className="text-muted-foreground mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
                {article.description}
              </p>
              <div className="border-factor-red mt-8 max-w-2xl border-l-2 pl-5 text-sm leading-6">
                This is repository-driven placeholder content. It is not final
                product guidance and remains excluded from search indexing.
              </div>
            </div>
          </Container>
        </header>

        <div className="section-space bg-white">
          <Container>
            <div className="max-w-3xl space-y-14">
              {article.sections.map((section) => (
                <section
                  key={section.heading}
                  aria-labelledby={`${article.id}-${section.heading.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <h2
                    id={`${article.id}-${section.heading.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
                  >
                    {section.heading}
                  </h2>
                  <div className="text-muted-foreground mt-5 space-y-5 text-base leading-8 sm:text-lg">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </div>
      </article>

      <aside
        className="section-space bg-muted/50"
        aria-labelledby="related-articles-heading"
      >
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="related-articles-heading"
              className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              Related previews
            </h2>
            <Link
              href="/knowledge"
              className="motion-safe-transition hover:text-primary inline-flex min-h-11 items-center font-medium transition-colors"
            >
              View all Knowledge Centre previews
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </Container>
      </aside>

      {canonicalSiteUrl ? (
        <>
          <StructuredData data={articleStructuredData} />
          <StructuredData data={breadcrumbStructuredData} />
        </>
      ) : null}
    </>
  );
}
