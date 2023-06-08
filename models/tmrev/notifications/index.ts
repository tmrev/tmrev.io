/* eslint-disable no-unused-vars */

import { TmrevReview } from "../review"
import { TmrevUser } from "../user"

export enum NotificationTypes {
  UP_VOTE = 'upVote',
  DOWN_VOTE = 'downVote',
  REPLY = 'reply',
  FOLLOW = 'follow',
  UN_FOLLOW = 'unfollow'
}

interface IRetrieveNotificationQuery {
  authToken: string
  params?: {
    read?: boolean
  }
}

interface IUpdateNotificationQuery {
  authToken: string
  notificationId: string
}

interface INotificationResponseGeneric {
  _id: string
  recipient: TmrevUser
  sender: TmrevUser
  read: boolean
  type: NotificationTypes
}

interface INotificationResponseComment extends INotificationResponseGeneric {
  message: string
  replyId: string
  reviewId: string
  review: TmrevReview
  type: NotificationTypes.REPLY
}

interface INotificationResponseVote extends INotificationResponseGeneric {
  reviewId: string
  review: TmrevReview
  type: NotificationTypes.UP_VOTE | NotificationTypes.DOWN_VOTE
}

interface INotificationResponseFollow extends INotificationResponseGeneric {
  message: string
  replyId: string
  type: NotificationTypes.FOLLOW | NotificationTypes.UN_FOLLOW
}

interface INotificationResponse {
  success: boolean
  body: NotificationResult[]
}

type NotificationResult = INotificationResponseComment | INotificationResponseVote | INotificationResponseFollow


export type {
  INotificationResponse,
  INotificationResponseComment,
  INotificationResponseFollow,
  INotificationResponseGeneric,
  INotificationResponseVote,
  IRetrieveNotificationQuery,
  IUpdateNotificationQuery,
  NotificationResult
}