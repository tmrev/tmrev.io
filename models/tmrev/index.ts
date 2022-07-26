import type {
  AdvancedScore, CreatedAt, CreateTmrevReviewQuery, CreateTmrevReviewResponse,
  MovieScore,
  TmrevReview, UpdatedAt,
} from './review';
import type { TheNumberData, TheNumbers, Title } from './theNumbers';
import type { User, UserQuery } from './user';
import type { WatchList, WatchListSearchQuery } from './watchList';

type Timestamp = {
  seconds: number
  nanoseconds: number
}

export type {
  AdvancedScore, CreatedAt, CreateTmrevReviewQuery,
  CreateTmrevReviewResponse,
  MovieScore,
  TheNumberData, TheNumbers, Timestamp,
  Title,
  TmrevReview, UpdatedAt, User,
  UserQuery,
  WatchList, WatchListSearchQuery,
};
