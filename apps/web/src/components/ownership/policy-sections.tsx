import type { OwnershipPolicy } from '@/config/ownership';

export function OwnershipPolicySections({
  policy,
}: {
  policy: OwnershipPolicy;
}) {
  return (
    <div className="max-w-3xl space-y-14">
      {policy.sections.map((section) => {
        const sectionId = `${policy.id}-${section.heading
          .toLocaleLowerCase()
          .replace(/[^a-z0-9]+/g, '-')}`;

        return (
          <section key={section.heading} aria-labelledby={sectionId}>
            <h2
              id={sectionId}
              className="text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
            >
              {section.heading}
            </h2>
            <div className="text-muted-foreground mt-5 space-y-5 text-base leading-8 sm:text-lg">
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items?.length ? (
                <ul className="list-disc space-y-3 pl-5">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
