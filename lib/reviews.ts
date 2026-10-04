// Real reviews only (copy from Google). The Reviews section hides itself until this has entries.
export type Review = {
  quote: string;
  name: string; // first name, or contact name for builders
  detail: string; // "Cary · Fireplace installation" or "Acme Homes · Builder"
  builder?: boolean;
};

export const REVIEWS: Review[] = [];

export const GOOGLE_REVIEWS_URL: string | null = null;
