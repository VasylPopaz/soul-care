export interface PsychologistReview {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  _id: string;
  id?: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews: PsychologistReview[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export interface PsychologistsListProps {
  psychologists: Psychologist[];
  favPage?: boolean;
  onFavClick?: (items: Psychologist[]) => void;
}
