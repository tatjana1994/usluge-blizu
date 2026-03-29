export type ListingType = 'trazim' | 'nudim';

type CategorySeoConfig = {
  label: string;
  keywords: string[];
};

const CATEGORY_SEO_MAP: Record<string, CategorySeoConfig> = {
  majstori: {
    label: 'majstorske usluge',
    keywords: [
      'majstor',
      'majstorske usluge',
      'vodoinstalater',
      'električar',
      'keramičar',
      'adaptacije',
    ],
  },
  lepota: {
    label: 'usluge lepote',
    keywords: [
      'lepota',
      'kozmetičke usluge',
      'frizer',
      'pedikir',
      'manikir',
      'šminka',
    ],
  },
  pomoc: {
    label: 'pomoć u kući',
    keywords: [
      'pomoć u kući',
      'čišćenje',
      'spremanje',
      'kućna pomoć',
      'održavanje doma',
    ],
  },
  briga: {
    label: 'nega i briga',
    keywords: [
      'nega',
      'čuvanje',
      'briga o starima',
      'čuvanje dece',
      'pomoć starijima',
    ],
  },
  dvoriste: {
    label: 'usluge za dvorište',
    keywords: [
      'dvorište',
      'košenje trave',
      'održavanje dvorišta',
      'bašta',
      'sečenje rastinja',
    ],
  },
  selidbe: {
    label: 'selidbe i prevoz',
    keywords: [
      'selidbe',
      'prevoz',
      'transport',
      'kombi prevoz',
      'nošenje stvari',
    ],
  },
  ljubimci: {
    label: 'usluge za ljubimce',
    keywords: [
      'ljubimci',
      'čuvanje pasa',
      'šetanje pasa',
      'pet care',
      'nega ljubimaca',
    ],
  },
  it: {
    label: 'IT usluge',
    keywords: [
      'IT usluge',
      'programer',
      'web sajt',
      'računari',
      'tehnička podrška',
    ],
  },
};

const DEFAULT_SEO: CategorySeoConfig = {
  label: 'usluge',
  keywords: ['usluge', 'lokalne usluge', 'oglasi usluga'],
};

export function getListingSeoByCategory(categorySlug?: string | null) {
  if (!categorySlug) return DEFAULT_SEO;
  return CATEGORY_SEO_MAP[categorySlug] ?? DEFAULT_SEO;
}

export function getListingFallbackDescription({
  title,
  city,
  type,
  categorySlug,
}: {
  title: string;
  city: string;
  type: ListingType;
  categorySlug?: string | null;
}) {
  const { label } = getListingSeoByCategory(categorySlug);

  if (type === 'nudim') {
    return `${title} u ${city}. Nudim ${label.toLowerCase()} i dostupan/a sam za dogovor preko platforme UslugeBlizu.`;
  }

  return `${title} u ${city}. Tražim ${label.toLowerCase()}. Pogledaj detalje oglasa i javi se preko platforme UslugeBlizu.`;
}
