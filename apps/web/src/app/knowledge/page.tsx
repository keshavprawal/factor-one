import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ArticleCard } from '@/components/knowledge/article-card';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { StructuredData } from '@/components/seo/structured-data';
import { Button } from '@/components/ui/button';
import {
  knowledgeArticles,
  knowledgeCategories,
  searchKnowledgeArticles,
} from '@/config/knowledge';
import { getSiteUrl, siteConfig } from '@/config/site';
import { Container } from '@/components/layout/container';

const siteUrl = getSiteUrl();
const description =
  'Preview guides for compatibility, installation and product care from Factor One.';

export const metadata: Metadata = {
  title: 'Knowledge Centre',
  description,
  alternates: siteUrl ? { canonical: '/knowledge' } : undefined,
  openGraph: {
    description,
    siteName: siteConfig.name,
    title: 'Knowledge Centre',
    type: 'website',
    url: siteUrl ? '/knowledge' : undefined,
  },
  twitter: {
    card: 'summary',
    description,
    title: 'Knowledge Centre',
  },
};

interface KnowledgePageProps {
  searchParams: Promise<{
    category?: string | string[];
    q?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function KnowledgePage({
  searchParams,
}: KnowledgePageProps) {
  const params = await searchParams;
  const query = firstValue(params.q)?.trim() ?? '';
  const requestedCategory = firstValue(params.category) ?? '';
  const activeCategory = knowledgeCategories.some(
    (category) => category.id === requestedCategory,
  )
    ? requestedCategory
    : '';
  const articles = searchKnowledgeArticles({
    categoryId: activeCategory || undefined,
    query: query || undefined,
  });
  const hasFilters = Boolean(query || activeCategory);
  const structuredData = siteUrl
    ? {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Factor One Knowledge Centre',
        description,
        url: new URL('/knowledge', siteUrl).toString(),
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: knowledgeArticles.length,
          itemListElement: knowledgeArticles.map((article, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: article.title,
            url: new URL(`/knowledge/${article.slug}`, siteUrl).toString(),
          })),
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${new URL('/knowledge', siteUrl).toString()}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }
    : null;

  return (
    <>
      <section
        className="bg-warm section-space"
        aria-labelledby="knowledge-heading"
      >
        <Container>
          <Breadcrumbs
            items={[{ href: '/', label: 'Home' }, { label: 'Knowledge' }]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
              Knowledge Centre
            </p>
            <h1
              id="knowledge-heading"
              className="mt-4 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Clear guidance, built carefully.
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
              This foundation shows where reviewed guidance about fit,
              installation and care will live. Every article below is clearly
              marked as a preview until its content is approved.
            </p>
          </div>

          <form
            action="/knowledge"
            method="get"
            role="search"
            className="mt-12 max-w-3xl sm:mt-14"
          >
            <label htmlFor="knowledge-search" className="text-sm font-medium">
              Search the Knowledge Centre
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="text-muted-foreground pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="knowledge-search"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Search preview guides"
                  className="border-input bg-background focus-visible:ring-ring h-11 w-full rounded-md border py-2 pl-11 pr-4 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                />
              </div>
              {activeCategory ? (
                <input type="hidden" name="category" value={activeCategory} />
              ) : null}
              <Button type="submit" className="sm:px-7">
                Search
              </Button>
            </div>
          </form>
        </Container>
      </section>

      <section
        className="section-space bg-white"
        aria-labelledby="articles-heading"
      >
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
                Categories
              </p>
              <h2
                id="articles-heading"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
              >
                Browse owner guidance.
              </h2>
            </div>
            <nav aria-label="Knowledge categories">
              <ul className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href={
                      query
                        ? `/knowledge?q=${encodeURIComponent(query)}`
                        : '/knowledge'
                    }
                    aria-current={!activeCategory ? 'page' : undefined}
                    className="border-border aria-[current=page]:bg-foreground aria-[current=page]:text-background motion-safe-transition hover:bg-muted inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors"
                  >
                    All
                  </Link>
                </li>
                {knowledgeCategories.map((category) => {
                  const href = new URLSearchParams({ category: category.id });
                  if (query) href.set('q', query);

                  return (
                    <li key={category.id}>
                      <Link
                        href={`/knowledge?${href.toString()}`}
                        aria-current={
                          activeCategory === category.id ? 'page' : undefined
                        }
                        className="border-border aria-[current=page]:bg-foreground aria-[current=page]:text-background motion-safe-transition hover:bg-muted inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <p className="text-muted-foreground mt-8 text-sm" aria-live="polite">
            {articles.length} {articles.length === 1 ? 'preview' : 'previews'}
            {query ? ` matching “${query}”` : ''}
          </p>

          {articles.length > 0 ? (
            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="border-border mt-10 max-w-2xl border-t pt-8">
              <h3 className="text-2xl font-medium tracking-[-0.035em]">
                No preview guides match that search.
              </h3>
              <p className="text-muted-foreground mt-3 text-base leading-7">
                Try a broader phrase or return to all Knowledge Centre previews.
              </p>
              {hasFilters ? (
                <Link
                  href="/knowledge"
                  className="motion-safe-transition hover:text-primary mt-5 inline-flex min-h-11 items-center font-medium transition-colors"
                >
                  Clear search and category
                </Link>
              ) : null}
            </div>
          )}
        </Container>
      </section>

      {structuredData ? <StructuredData data={structuredData} /> : null}
    </>
  );
}
