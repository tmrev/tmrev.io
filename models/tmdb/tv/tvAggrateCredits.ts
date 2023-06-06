import { TvGeneralQuery } from "."

export interface ITVAggregateCreditsQuery extends TvGeneralQuery {
  params: {
    language?: string
  }
}

export interface ITVAggregateCreditsResponse {
  cast: Cast[]
  crew: Crew[]
  id: number
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  roles: Role[]
  total_episode_count: number
  order: number
}

export interface Role {
  credit_id: string
  character: string
  episode_count: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  jobs: Job[]
  department: string
  total_episode_count: number
}

export interface Job {
  credit_id: string
  job: string
  episode_count: number
}
