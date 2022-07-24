import { Timestamp } from '.';

interface TmrevReview {
  _id: string,
  advancedScore: AdvancedScore | null,
  averagedAdvancedScore: number | null,
  simpleScore: number | null,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  notes: string
  public: boolean
  title: string
  tmdbID: number,
  userId: string
}

interface CreateTmrevReviewQuery {
  advancedScore: AdvancedScore;
  averagedAdvancedScore: number;
  notes: string
  createdAt: Timestamp
  public: boolean
  // YYYY-MM-DD
  release_date: string
  reviewedDate: string
  title: string
  tmdbID: number;
  updatedAt: Timestamp;
  userId: string
  token?: string
}
interface CreateTmrevReviewResponse {
  acknowledged:boolean,
  insertedId:string
}

interface AdvancedScore {
  acting: number
  characters: number
  cinematography: number,
  climax: number,
  ending: number,
  music: number,
  personalScore: number,
  plot: number,
  theme: number,
  visuals: number
}

interface CreatedAt {
  seconds: number
  nanoseconds: number
}

interface UpdatedAt {
  seconds: number
  nanoseconds: number
}

interface MovieScore {
  _id: ID;
  totalScore: number;
  plot: number;
  theme: number;
  climax: number;
  ending: number;
  acting: number;
  characters: number;
  music: number;
  cinematography: number;
  visuals: number;
  personalScore: number;
}

interface ID {
  tmdbID: number;
  title: string;
}

export type {
  AdvancedScore, CreatedAt, CreateTmrevReviewQuery,
  CreateTmrevReviewResponse,
  MovieScore, TmrevReview, UpdatedAt,
};
