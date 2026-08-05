export type OwnershipPolicyId =
  | 'warranty'
  | 'returns'
  | 'shipping'
  | 'installation'
  | 'contact'
  | 'privacy'
  | 'terms';

export type OwnershipPublicationStatus = 'approved' | 'provisional';

export interface OwnershipPolicySection {
  heading: string;
  items?: readonly string[];
  paragraphs?: readonly string[];
}

export interface OwnershipPolicy {
  description: string;
  id: OwnershipPolicyId;
  publicationStatus: OwnershipPublicationStatus;
  sections: readonly OwnershipPolicySection[];
  slug: string;
  title: string;
}

export const ownershipPolicies = [
  {
    id: 'warranty',
    slug: 'warranty',
    title: 'Warranty Policy',
    description:
      'How Factor One handles manufacturing defects and warranty claims.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: '12-Month Limited Manufacturer Warranty',
        paragraphs: [
          'Factor One provides a limited manufacturer warranty for 12 months from delivery. It covers manufacturing defects in materials or workmanship.',
          'Where a covered issue is confirmed, Factor One may repair, replace or refund the product where appropriate.',
        ],
      },
      {
        heading: 'Who is covered',
        paragraphs: [
          'This warranty applies to the original purchaser. Proof of purchase is required for a warranty claim.',
        ],
      },
      {
        heading: 'How a claim is reviewed',
        paragraphs: [
          'Photographic or video evidence may be requested, and an inspection may be required. Warranty claims are subject to inspection and approval by Factor One.',
          'Coverage applies only where Factor One reasonably determines that the issue falls within this policy.',
        ],
      },
      {
        heading: 'What is not covered',
        items: [
          'Misuse, accidental damage or overloading.',
          'Modification, unauthorised repair, cutting, drilling or other alteration unless explicitly instructed by Factor One.',
          'Abnormal heat, chemicals, incompatible use, ordinary wear or vehicle accidents.',
        ],
      },
      {
        heading: 'Your statutory rights',
        paragraphs: [
          'This policy does not limit statutory consumer rights that apply to you.',
          'Damage on arrival is handled separately under the Returns & Refunds Policy.',
        ],
      },
    ],
  },
  {
    id: 'returns',
    slug: 'returns',
    title: 'Returns & Refunds Policy',
    description:
      'How Factor One reviews damaged, defective, incorrect and discretionary returns.',
    publicationStatus: 'provisional',
    sections: [
      {
        heading: 'Damaged, defective or incorrect items',
        paragraphs: [
          'If an item arrives damaged, is defective or is incorrect, contact Factor One with your order number and clear photographs or video. Eligible issues will receive a full remedy under the applicable policy after review.',
        ],
      },
      {
        heading: 'Discretionary returns',
        paragraphs: [
          'A discretionary return may be considered within the applicable return window once that window is approved and published. Returned items must be unused, in original condition and include their original packaging.',
          'Return shipping may be the customer’s responsibility unless the item is damaged, defective or incorrect. A return is inspected before any refund is issued.',
        ],
      },
      {
        heading: 'Refund adjustments',
        paragraphs: [
          'Delivery, packaging and handling costs may not be fully recoverable for a discretionary return. A partial refund may therefore apply after inspection.',
          'Founder-policy content: any percentage-based deduction will be approved and published separately before launch.',
        ],
      },
      {
        heading: 'Your statutory rights',
        paragraphs: [
          'Nothing in this policy removes statutory rights that apply to you.',
        ],
      },
    ],
  },
  {
    id: 'shipping',
    slug: 'shipping',
    title: 'Shipping Policy',
    description:
      'What to expect from order processing, dispatch, delivery and parcel issues.',
    publicationStatus: 'provisional',
    sections: [
      {
        heading: 'Processing and dispatch',
        paragraphs: [
          'Order processing and dispatch estimates will be shown when they are operationally approved. Factor One does not currently publish a courier partner, exact dispatch time or delivery estimate.',
        ],
      },
      {
        heading: 'Delivery and tracking',
        paragraphs: [
          'Serviceability, delivery estimates and tracking availability depend on the delivery address and approved delivery service. These details will be confirmed before products are offered for purchase.',
        ],
      },
      {
        heading: 'Addresses and receiving your parcel',
        paragraphs: [
          'Customers are responsible for providing an accurate delivery address and for receiving the parcel. Contact Factor One promptly if delivery details need to be reviewed.',
        ],
      },
      {
        heading: 'Delayed, failed or damaged deliveries',
        paragraphs: [
          'If a parcel is delayed, fails to arrive or appears damaged, retain the packaging where possible and contact Factor One with your order details and supporting photographs or video.',
          'Carrier disruption, severe weather and other events outside Factor One’s reasonable control may affect delivery timing.',
        ],
      },
    ],
  },
  {
    id: 'installation',
    slug: 'installation',
    title: 'Installation and Usage Guidance',
    description:
      'General guidance for using approved Factor One product instructions safely.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: 'Follow the product instructions',
        paragraphs: [
          'Follow only the product-specific instructions supplied with an approved Factor One product. General guidance does not replace instructions for a particular product.',
        ],
      },
      {
        heading: 'Use listed compatibility',
        paragraphs: [
          'Use a product only with cars listed as compatible. Stop installation if fitment appears incorrect.',
        ],
      },
      {
        heading: 'Do not force or modify',
        paragraphs: [
          'Do not force, cut, drill or modify a product or your car unless Factor One explicitly instructs you to do so. Seek assistance where required.',
          'Improper installation or misuse may affect warranty coverage.',
        ],
      },
    ],
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact and Claims Support',
    description:
      'What to send Factor One when you need help with an order or product issue.',
    publicationStatus: 'provisional',
    sections: [
      {
        heading: 'What to include',
        items: [
          'Your order number or invoice.',
          'A clear description of the issue.',
          'Relevant photographs or video.',
        ],
      },
      {
        heading: 'What happens next',
        paragraphs: [
          'Factor One will review the information provided and may request further evidence or an inspection where needed. The appropriate warranty, returns or shipping process will then be confirmed.',
        ],
      },
      {
        heading: 'Contact channel',
        paragraphs: [
          'The preferred support contact channel is pending founder approval and will be published before launch. This page does not provide a contact form or claims portal.',
        ],
      },
    ],
  },
  {
    id: 'privacy',
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'A provisional placeholder for approved privacy information.',
    publicationStatus: 'provisional',
    sections: [
      {
        heading: 'Provisional policy',
        paragraphs: [
          'This is a repository-driven placeholder for the final Privacy Policy. Factor One will publish approved information about personal-data handling before launch.',
          'No company registration details, addresses, legal entity names, payment processors or data-practice claims are stated here because they have not been canonically confirmed.',
        ],
      },
    ],
  },
  {
    id: 'terms',
    slug: 'terms',
    title: 'Terms & Conditions',
    description: 'A provisional placeholder for approved terms and conditions.',
    publicationStatus: 'provisional',
    sections: [
      {
        heading: 'Provisional policy',
        paragraphs: [
          'This is a repository-driven placeholder for the final Terms & Conditions. Final terms will be reviewed and published before products are offered for purchase.',
          'No company registration details, addresses, legal entity names, payment processors or commercial terms are stated here because they have not been canonically confirmed.',
        ],
      },
    ],
  },
] as const satisfies readonly OwnershipPolicy[];

export const ownershipPolicyPaths = ownershipPolicies.map((policy) =>
  getOwnershipPolicyPath(policy),
);

export function getOwnershipPolicyPath(policy: Pick<OwnershipPolicy, 'slug'>) {
  return `/ownership/${policy.slug}` as const;
}

export function getOwnershipPolicy(slug: string) {
  return ownershipPolicies.find((policy) => policy.slug === slug) ?? null;
}

export function isOwnershipPolicyIndexable(policy: OwnershipPolicy) {
  return policy.publicationStatus === 'approved';
}

export function getIndexableOwnershipPolicyPaths() {
  return ownershipPolicies
    .filter(isOwnershipPolicyIndexable)
    .map(getOwnershipPolicyPath);
}
