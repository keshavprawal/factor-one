export type OwnershipPolicyId =
  | 'warranty'
  | 'returns'
  | 'cancellation'
  | 'shipping'
  | 'installation'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'faq';

export type OwnershipPublicationStatus = 'approved' | 'provisional';

export interface OwnershipPolicyLink {
  href: string;
  label: string;
}

export interface OwnershipPolicySection {
  heading: string;
  items?: readonly string[];
  links?: readonly OwnershipPolicyLink[];
  paragraphs?: readonly string[];
}

export interface OwnershipPolicy {
  description: string;
  id: OwnershipPolicyId;
  publicationStatus: OwnershipPublicationStatus;
  sections: readonly OwnershipPolicySection[];
  slug: OwnershipPolicyId;
  title: string;
}

function ownershipPath(slug: OwnershipPolicyId) {
  return `/ownership/${slug}` as const;
}

export const ownershipPolicies = [
  {
    id: 'warranty',
    slug: 'warranty',
    title: 'Limited Warranty Policy',
    description:
      'The limited warranty, what it covers and how Factor One assesses claims.',
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
        heading: 'How a claim is assessed',
        paragraphs: [
          'Photographs, video or an inspection may be requested. Warranty claims are subject to inspection and approval by Factor One. Coverage applies only where Factor One reasonably determines that the issue falls within this warranty policy.',
        ],
      },
      {
        heading: 'What is not covered',
        items: [
          'Accidental damage, misuse or excessive loading.',
          'Modification, unauthorised repair, cutting, drilling or other alteration unless explicitly instructed by Factor One.',
          'Abnormal heat, chemicals, incompatible use, normal wear or vehicle accidents.',
        ],
      },
      {
        heading: 'Your statutory rights',
        paragraphs: [
          'This policy does not limit statutory consumer rights that apply to you.',
          'Damage on arrival is handled separately under the Returns & Refunds Policy.',
        ],
        links: [
          { href: ownershipPath('returns'), label: 'Returns & Refunds Policy' },
        ],
      },
    ],
  },
  {
    id: 'returns',
    slug: 'returns',
    title: 'Returns & Refunds Policy',
    description:
      'How Factor One handles damaged, defective, incorrect and change-of-mind returns.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: 'Damaged, defective or incorrect products',
        paragraphs: [
          'Report a damaged, defective or incorrect product within 7 calendar days of delivery. Include your order details and supporting evidence.',
          'After verification, the appropriate full remedy may include replacement, repair or refund. The discretionary return rule below does not apply to damaged, defective or incorrect products.',
        ],
      },
      {
        heading: 'Discretionary change-of-mind returns',
        paragraphs: [
          'A discretionary return may be considered only when requested within 7 calendar days and the product passes inspection.',
        ],
        items: [
          'The product is unused, has not been installed and has not been modified.',
          'All parts and accessories are included.',
          'The original packaging is retained.',
        ],
      },
      {
        heading: 'Refund and return shipping',
        paragraphs: [
          'For an approved discretionary return, the refund is 70% of the product price. Return shipping is paid by the customer.',
          'Delivery, packaging, payment processing, inspection, restocking and handling costs may be non-recoverable. This is why an approved discretionary return may receive a partial refund.',
        ],
      },
      {
        heading: 'Our approach',
        paragraphs: [
          'Our goal is not to avoid returns—it is to help customers make informed purchasing decisions so returns are rarely necessary.',
          'Nothing in this policy removes statutory rights that apply to you.',
        ],
      },
    ],
  },
  {
    id: 'cancellation',
    slug: 'cancellation',
    title: 'Order Cancellation Policy',
    description:
      'What to do when an order needs to be cancelled or was placed by mistake.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: 'Before dispatch',
        paragraphs: [
          'An order can be cancelled in full and refunded when it can still be stopped before dispatch. There is no cancellation fee before dispatch.',
          'Cancellation cannot be guaranteed once packing or dispatch processing has begun.',
        ],
      },
      {
        heading: 'After dispatch',
        paragraphs: [
          'Dispatched or delivered orders fall under the Returns & Refunds Policy.',
          'Duplicate or mistaken orders should be reported immediately so Factor One can review whether they can still be stopped.',
        ],
        links: [
          { href: ownershipPath('returns'), label: 'Returns & Refunds Policy' },
        ],
      },
      {
        heading: 'Refund method',
        paragraphs: [
          'Refunds use the original payment method where reasonably possible.',
        ],
      },
    ],
  },
  {
    id: 'shipping',
    slug: 'shipping',
    title: 'Shipping & Delivery Policy',
    description:
      'Free standard shipping, delivery expectations and help when a parcel needs attention.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: 'Shipping and payment',
        items: [
          'Free standard shipping on all orders.',
          'Delivery is available to serviceable Indian PIN codes.',
          'Orders are prepaid only. Cash on delivery is not available.',
        ],
      },
      {
        heading: 'Processing and delivery',
        paragraphs: [
          'Processing and dispatch usually take 2–4 business days. Estimated delivery after dispatch is 3–8 business days.',
          'These delivery estimates are not guarantees. Tracking details are provided after dispatch where available.',
        ],
      },
      {
        heading: 'Address and delivery responsibility',
        paragraphs: [
          'Customers are responsible for providing an accurate delivery address and for receiving the parcel. Delivery attempts, returned shipments, remote or restricted locations may affect delivery timing or serviceability.',
        ],
      },
      {
        heading: 'Delayed, lost, damaged or incorrect deliveries',
        paragraphs: [
          'Courier delays and events outside Factor One’s reasonable control may affect delivery timing. If a shipment is lost, damaged, partial or incorrect, retain the packaging where possible and contact Factor One with your order details and supporting evidence.',
        ],
        links: [
          { href: ownershipPath('contact'), label: 'Contact & Claims Support' },
          { href: ownershipPath('returns'), label: 'Returns & Refunds Policy' },
        ],
      },
    ],
  },
  {
    id: 'installation',
    slug: 'installation',
    title: 'Installation & Usage Guidance',
    description:
      'General guidance for fitting, checking and caring for Factor One accessories.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: 'Before installation',
        items: [
          'Confirm compatibility before installation and inspect the product before fitting.',
          'Follow the product-specific instructions supplied for your product.',
          'Use professional help where needed.',
        ],
      },
      {
        heading: 'Fit carefully',
        items: [
          'Do not force, cut, drill, heat, reshape or modify a product or your car unless Factor One explicitly instructs you to do so.',
          'Protect vehicle trim, electrical components, sensors and safety systems during installation.',
          'Check product and vehicle operation after installation, then perform an initial driving check.',
        ],
      },
      {
        heading: 'Use and care',
        items: [
          'Periodically inspect installed accessories.',
          'Follow product-specific cleaning instructions.',
          'Stop use if you notice looseness, cracking, interference or abnormal behaviour.',
        ],
      },
      {
        heading: 'Warranty coverage',
        paragraphs: [
          'Misuse or incorrect installation may affect warranty coverage.',
        ],
        links: [
          { href: ownershipPath('warranty'), label: 'Limited Warranty Policy' },
        ],
      },
    ],
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact & Claims Support',
    description:
      'Contact Factor One about products, orders, claims, suggestions or business enquiries.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: 'How to contact us',
        paragraphs: [
          'Email contact@factorone.in for general product and compatibility enquiries, warranty and return claims, shipping issues, product suggestions, and business or dealer enquiries.',
          'Most enquiries receive a response within 1–2 business days.',
        ],
        links: [
          {
            href: 'mailto:contact@factorone.in',
            label: 'contact@factorone.in',
          },
        ],
      },
      {
        heading: 'What to include',
        items: [
          'Your full name.',
          'Order number or invoice.',
          'Vehicle model and variant where relevant.',
          'A clear description of the issue.',
          'Photographs or video where appropriate.',
        ],
      },
      {
        heading: 'What happens next',
        paragraphs: [
          'Factor One will review the information provided and may request further evidence or an inspection where needed. The relevant warranty, returns or shipping process will then be confirmed.',
        ],
      },
    ],
  },
  {
    id: 'privacy',
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'A plain-language overview of how Factor One handles information needed for products and ownership support.',
    publicationStatus: 'provisional',
    sections: [
      {
        heading: 'Information we collect',
        paragraphs: [
          'Factor One collects only information reasonably required to provide products, services and the ownership experience. This may include your name, email, phone number, address, orders, vehicle information, warranty claims, support communications and necessary website data.',
          'Factor One does not sell personal information.',
        ],
      },
      {
        heading: 'How information is used',
        paragraphs: [
          'Information may be used for order fulfilment, payment, delivery, compatibility, support, warranty, fraud prevention, legal compliance and service improvement.',
        ],
      },
      {
        heading: 'My Garage and browser storage',
        paragraphs: [
          'My Garage currently stores selected-car and installed-product identifiers locally in your browser. Browser-local Garage data is not currently synchronized to Factor One servers.',
        ],
      },
      {
        heading: 'Cookies, security and your choices',
        paragraphs: [
          'Cookies and third-party services will be described only where they are actually used. Factor One uses reasonable security measures but cannot guarantee absolute security.',
          'Where applicable, you may request correction or deletion of your information by contacting Factor One. This policy may be updated as practices change.',
        ],
        links: [
          {
            href: 'mailto:contact@factorone.in',
            label: 'contact@factorone.in',
          },
        ],
      },
    ],
  },
  {
    id: 'terms',
    slug: 'terms',
    title: 'Terms of Sale & Website Use',
    description:
      'The provisional terms that govern Factor One products, orders and website use.',
    publicationStatus: 'provisional',
    sections: [
      {
        heading: 'Products and orders',
        paragraphs: [
          'Factor One supplies vehicle-specific automotive accessories. Order acceptance occurs after payment, verification and dispatch confirmation. Product availability and pricing may change, and pricing errors may be corrected before an order is accepted.',
          'Customers are responsible for accurate vehicle and delivery information. Orders are prepaid and cash on delivery is not available.',
        ],
      },
      {
        heading: 'Policies and product information',
        paragraphs: [
          'Shipping, cancellation, returns and warranty are governed by the linked policies. Product information may include reasonable tolerances and clearly labelled temporary or prototype imagery.',
          'Customers should use Factor One compatibility information and tools before installation or purchase where applicable.',
        ],
        links: [
          {
            href: ownershipPath('shipping'),
            label: 'Shipping & Delivery Policy',
          },
          {
            href: ownershipPath('cancellation'),
            label: 'Order Cancellation Policy',
          },
          { href: ownershipPath('returns'), label: 'Returns & Refunds Policy' },
          { href: ownershipPath('warranty'), label: 'Limited Warranty Policy' },
        ],
      },
      {
        heading: 'Website use and intellectual property',
        paragraphs: [
          'Factor One content, trademarks and product information remain protected. Website use must not interfere with the service, misuse content or infringe intellectual-property rights. Third-party services remain subject to their own terms where they are used.',
        ],
      },
      {
        heading: 'Product improvements and legal terms',
        paragraphs: [
          'Factor One may improve products over time. Liability is limited to the extent permitted by applicable law. These terms are governed by the laws of India, with competent courts at Factor One’s registered place of business. Statutory consumer rights remain unaffected.',
        ],
      },
    ],
  },
  {
    id: 'faq',
    slug: 'faq',
    title: 'Ownership FAQ',
    description:
      'Quick answers about orders, delivery, returns, warranty, compatibility and product care.',
    publicationStatus: 'approved',
    sections: [
      {
        heading: 'Can I cancel an order?',
        paragraphs: [
          'Contact Factor One immediately. A full cancellation and refund may be possible before dispatch, but cannot be guaranteed once packing or dispatch processing has begun.',
        ],
        links: [
          {
            href: ownershipPath('cancellation'),
            label: 'Order Cancellation Policy',
          },
        ],
      },
      {
        heading: 'Can I change my delivery details?',
        paragraphs: [
          'Contact Factor One as soon as possible. Changes depend on whether the order can still be updated before dispatch.',
        ],
        links: [
          { href: 'mailto:contact@factorone.in', label: 'Contact Factor One' },
        ],
      },
      {
        heading: 'Is shipping free and is cash on delivery available?',
        paragraphs: [
          'Standard shipping is free on all orders to serviceable Indian PIN codes. Orders are prepaid only; cash on delivery is not available.',
        ],
        links: [
          {
            href: ownershipPath('shipping'),
            label: 'Shipping & Delivery Policy',
          },
        ],
      },
      {
        heading: 'When will my order be dispatched and delivered?',
        paragraphs: [
          'Processing and dispatch usually take 2–4 business days. Estimated delivery after dispatch is 3–8 business days and is not guaranteed.',
        ],
        links: [
          {
            href: ownershipPath('shipping'),
            label: 'Shipping & Delivery Policy',
          },
        ],
      },
      {
        heading: 'Can I return a product?',
        paragraphs: [
          'Damaged, defective or incorrect products have a separate full-remedy process. A change-of-mind return may be considered within 7 calendar days when the product meets the policy conditions.',
        ],
        links: [
          { href: ownershipPath('returns'), label: 'Returns & Refunds Policy' },
        ],
      },
      {
        heading: 'Why is a discretionary return refunded at 70%?',
        paragraphs: [
          'For an approved discretionary return, delivery, packaging, payment processing, inspection, restocking and handling costs may be non-recoverable. The policy therefore provides a 70% refund of the product price.',
        ],
        links: [
          { href: ownershipPath('returns'), label: 'Returns & Refunds Policy' },
        ],
      },
      {
        heading: 'What if my product arrives damaged or incorrect?',
        paragraphs: [
          'Report the issue within 7 calendar days with order details and supporting evidence. After verification, the appropriate full remedy may include replacement, repair or refund.',
        ],
        links: [
          { href: ownershipPath('returns'), label: 'Returns & Refunds Policy' },
        ],
      },
      {
        heading: 'Is there a warranty?',
        paragraphs: [
          'The Limited Warranty Policy covers manufacturing defects in materials or workmanship for 12 months from delivery, subject to its terms and assessment process.',
        ],
        links: [
          { href: ownershipPath('warranty'), label: 'Limited Warranty Policy' },
        ],
      },
      {
        heading: 'How do I make a claim?',
        paragraphs: [
          'Email Factor One with your full name, order number or invoice, a description of the issue, and photographs or video where appropriate.',
        ],
        links: [
          {
            href: 'mailto:contact@factorone.in',
            label: 'Contact & Claims Support',
          },
        ],
      },
      {
        heading: 'How do I confirm compatibility?',
        paragraphs: [
          'Use the compatibility information listed for the product and confirm your car details before installation or purchase.',
        ],
        links: [{ href: '/compatibility', label: 'Vehicle Compatibility' }],
      },
      {
        heading: 'Can I install a product myself?',
        paragraphs: [
          'Follow the product-specific instructions and seek professional help where needed. Do not force or modify a product or your car unless instructed.',
        ],
        links: [
          {
            href: ownershipPath('installation'),
            label: 'Installation & Usage Guidance',
          },
        ],
      },
      {
        heading: 'How should I care for a product?',
        paragraphs: [
          'Follow the product-specific cleaning instructions and periodically inspect installed accessories. Stop use if you notice looseness, cracking, interference or abnormal behaviour.',
        ],
        links: [
          {
            href: ownershipPath('installation'),
            label: 'Installation & Usage Guidance',
          },
        ],
      },
      {
        heading: 'How do I contact Factor One?',
        paragraphs: [
          'Email contact@factorone.in. Most enquiries receive a response within 1–2 business days.',
        ],
        links: [
          {
            href: 'mailto:contact@factorone.in',
            label: 'contact@factorone.in',
          },
        ],
      },
    ],
  },
] as const satisfies readonly OwnershipPolicy[];

export const ownershipPolicyPaths = ownershipPolicies.map((policy) =>
  getOwnershipPolicyPath(policy),
);

export function getOwnershipPolicyPath(policy: Pick<OwnershipPolicy, 'slug'>) {
  return ownershipPath(policy.slug);
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
