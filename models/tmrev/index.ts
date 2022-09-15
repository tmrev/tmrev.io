import type {
  AdvancedScore, CreatedAt, CreateTmrevReviewQuery, CreateTmrevReviewResponse,
  MovieScore,
  SingleReview,
  TmrevReview, UpdatedAt,
} from './review';
import type { TheNumberData, TheNumbers, Title } from './theNumbers';
import type { User, UserQuery } from './user';
import type { UpdateWatchList, WatchList, WatchListSearchQuery } from './watchList';

type Timestamp = {
  seconds: number
  nanoseconds: number
}

export type {
  AdvancedScore, CreatedAt, CreateTmrevReviewQuery,
  CreateTmrevReviewResponse,
  MovieScore,
  SingleReview,
  TheNumberData, TheNumbers, Timestamp,
  Title,
  TmrevReview, UpdatedAt, UpdateWatchList,
  User,
  UserQuery,
  WatchList, WatchListSearchQuery,
};
