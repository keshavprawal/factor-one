import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  getArticleReadingTime,
  getKnowledgeCategory,
  type KnowledgeArticle,
} from '@/config/knowledge';

export function ArticleCard({ article }: { article: KnowledgeArticle }) {
  const category = getKnowledgeCategory(article.categoryId);

  return (
    <article className="border-border flex h-full flex-col border-t pt-6">
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.12em]">
        <span>{category.name}</span>
        <span aria-hidden="true">·</span>
        <span>{getArticleReadingTime(article)} min read</span>
        <span aria-hidden="true">·</span>
        <span>Preview</span>
      </div>
      <h2 className="mt-4 text-2xl font-medium tracking-[-0.035em]">
        {article.title}
      </h2>
      <p className="text-muted-foreground mt-3 flex-1 text-base leading-7">
        {article.description}
      </p>
      <Link
        href={`/knowledge/${article.slug}`}
        className="motion-safe-transition hover:text-primary group mt-6 inline-flex min-h-11 items-center gap-2 self-start font-medium transition-[color,transform] active:translate-y-px"
        aria-label={`Read preview: ${article.title}`}
      >
        Read preview
        <ArrowUpRight
          className="motion-safe-transition size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
