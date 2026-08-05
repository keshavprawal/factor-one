import type { OwnershipPolicy } from '../config/ownership';

export interface OwnershipContentIssue {
  code: string;
  message: string;
  policySlug?: string;
  severity: 'error';
}

function findDuplicates(values: readonly string[]): readonly string[] {
  return [
    ...new Set(
      values.filter((value, index) => values.indexOf(value) !== index),
    ),
  ];
}

export function validateOwnershipContent(
  policies: readonly OwnershipPolicy[],
): readonly OwnershipContentIssue[] {
  const issues: OwnershipContentIssue[] = [];

  for (const id of findDuplicates(policies.map((policy) => policy.id))) {
    issues.push({
      code: 'DUPLICATE_OWNERSHIP_POLICY_ID',
      message: `Ownership policy id "${id}" is duplicated.`,
      severity: 'error',
    });
  }

  for (const slug of findDuplicates(policies.map((policy) => policy.slug))) {
    issues.push({
      code: 'DUPLICATE_OWNERSHIP_POLICY_SLUG',
      message: `Ownership policy slug "${slug}" is duplicated.`,
      severity: 'error',
    });
  }

  for (const policy of policies) {
    const hasIncompleteSection = policy.sections.some(
      (section) =>
        !section.heading.trim() ||
        (!section.paragraphs?.some((paragraph) => paragraph.trim()) &&
          !section.items?.some((item) => item.trim())) ||
        section.links?.some((link) => !link.href.trim() || !link.label.trim()),
    );

    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(policy.slug) ||
      !policy.title.trim() ||
      !policy.description.trim() ||
      policy.sections.length === 0 ||
      hasIncompleteSection
    ) {
      issues.push({
        code: 'INCOMPLETE_OWNERSHIP_POLICY',
        message:
          'Ownership policy contains an empty or invalid required field.',
        policySlug: policy.slug,
        severity: 'error',
      });
    }
  }

  return issues;
}
