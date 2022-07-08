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

export type {
  AdvancedScore, CreatedAt, TmrevReview, UpdatedAt,
};
