import { Profile, TimeStamp } from "./movie"

interface Comment {
  _id: string
  author: string
  comment: string
  createdAt: TimeStamp
  updatedAt: TimeStamp | null
  post: Post
  votes: Vote
  profile: Profile[]
}

type Post = {
  author: string
  id: string
  type: string
}

type Vote = {
  upVote: string[]
  downVote: string[]
}

export type { Comment, Post, Vote }