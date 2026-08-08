import type { ProductId } from './products';

export interface ProductFeaturePresentation {
  description: string;
  id: string;
  title: string;
}

export interface ProductFaqPresentation {
  answer: string;
  id: string;
  question: string;
}

export interface ProductDetailMediaPresentation {
  mediaId: string;
  specificationLabels: readonly string[];
}

export interface ProductPageReferencePresentation {
  detailMediaStory: readonly ProductDetailMediaPresentation[];
  featureStory: readonly ProductFeaturePresentation[];
  faqs: readonly ProductFaqPresentation[];
  heroValueStatement: string;
  solutionHeadline: string;
  solutionSupportingLine: string;
}

/**
 * Page-level presentation copy approved for the Parcel Tray reference build.
 * Product identity, availability, compatibility, specifications and media remain
 * owned by the canonical Product Bible and media manifest.
 */
export const productPageReferencePresentations: Partial<
  Record<ProductId, ProductPageReferencePresentation>
> = {
  'parcel-tray': {
    detailMediaStory: [
      {
        mediaId: 'parcel-tray-prototype-installed',
        specificationLabels: ['Compatibility'],
      },
    ],
    heroValueStatement:
      'Extended coverage behind the rear seats, designed specifically for the VinFast VF7.',
    solutionHeadline: 'The coverage Factor One added.',
    solutionSupportingLine:
      'Extended rear coverage creates a cleaner, more complete cargo area.',
    featureStory: [
      {
        id: 'extended-rear-coverage',
        title: 'Extended Rear Coverage',
        description: 'Covers the open area behind the rear seats.',
      },
      {
        id: 'oem-fit',
        title: 'OEM Fit',
        description:
          'Designed around the VF7’s original geometry, mounting points and body lines.',
      },
      {
        id: 'tailgate-rear-seat-clearance',
        title: 'Tailgate and Rear-Seat Clearance',
        description:
          'Maintains normal tailgate movement and rear-seat folding and reclining.',
      },
      {
        id: 'rigorously-tested',
        title: 'Rigorously Tested',
        description:
          'Fit and stability checked during manufacturer dynamic testing.',
      },
    ],
    faqs: [
      {
        id: 'vf7-variants',
        question: 'Does it fit every VF7 variant?',
        answer:
          'It is listed for the 2025 onwards VF7 Earth, Wind, Wind Infinity, Sky and Sky Infinity variants.',
      },
      {
        id: 'drilling',
        question: 'Does installation require drilling?',
        answer: 'No. Installation does not require drilling or cutting.',
      },
      {
        id: 'rear-seats',
        question: 'Can the rear seats still fold and recline?',
        answer: 'Yes. The design allows rear-seat folding and reclining.',
      },
      {
        id: 'tailgate',
        question: 'Does it interfere with the tailgate?',
        answer: 'No. The design maintains normal tailgate movement.',
      },
      {
        id: 'box-contents',
        question: 'What is included in the box?',
        answer: 'The box includes the Parcel Tray and two support strings.',
      },
      {
        id: 'removal',
        question: 'How is it removed and reinstalled?',
        answer:
          'Lift the tray out when extra cargo space is needed and reinstall it with the two support strings.',
      },
      {
        id: 'warranty',
        question: 'What warranty does it include?',
        answer:
          'It includes a 12-month limited manufacturer warranty from delivery for manufacturing defects in materials or workmanship.',
      },
      {
        id: 'photography',
        question: 'Are the current images final production photography?',
        answer:
          'No. Representative visualisations and prototype-development images are temporary until final production photography is available.',
      },
    ],
  },
};

export function getProductPageReferencePresentation(productId: ProductId) {
  return productPageReferencePresentations[productId] ?? null;
}
