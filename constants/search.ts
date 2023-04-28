import { SearchTopic } from "@/components/navigation/navSearch";

export enum Topic {
  // eslint-disable-next-line no-unused-vars
  MOVIE = 'movie',
  // eslint-disable-next-line no-unused-vars
  PEOPLE = 'people',
  // eslint-disable-next-line no-unused-vars
  YEAR = 'year',
}

export const ConstantSearchTopic: Record<Topic, SearchTopic> = {
  [Topic.MOVIE]: {
    icon: "movie",
    label: "Movies",
    topic: Topic.MOVIE
  },
  [Topic.PEOPLE]: {
    icon: "people",
    label: "People",
    topic: Topic.PEOPLE
  },
  [Topic.YEAR]: {
    icon: "calendar_today",
    label: "Years",
    topic: Topic.YEAR
  }
} 