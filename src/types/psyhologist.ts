export interface PsyhologistReview {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psyhologist {
  name: string;
  avatar_url: string;
  experience: string;
  reviews: PsyhologistReview[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export interface PsyhologistsListProps {
  psyhologists: Psyhologist[];
}
