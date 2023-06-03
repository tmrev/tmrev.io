/* eslint-disable no-unused-vars */
export interface CategoryDataResponse {
  success: boolean
  body: Body
}

export interface Body {
  data: Data
}

export enum Categories {
  ACTING = 'acting',
  CHARACTERS = 'characters',
  CINEMATOGRAPHY = 'cinematography',
  CLIMAX = 'climax',
  ENDING = 'ending',
  MUSIC = 'music',
  PERSONAL_SCORE = 'personalScore',
  PLOT = 'plot',
  THEME = 'theme',
  VISUALS = 'visuals'
}

export interface Data {
  [Categories.ACTING]: NumberedArray
  [Categories.CHARACTERS]: NumberedArray
  [Categories.CINEMATOGRAPHY]: NumberedArray
  [Categories.CLIMAX]: NumberedArray
  [Categories.ENDING]: NumberedArray
  [Categories.MUSIC]: NumberedArray
  [Categories.PERSONAL_SCORE]: NumberedArray
  [Categories.PLOT]: NumberedArray
  [Categories.THEME]: NumberedArray
  [Categories.VISUALS]: NumberedArray
}

export interface NumberedArray {
  "1": number[]
  "2": number[]
  "3": number[]
  "4": number[]
  "5": number[]
  "6": number[]
  "7": number[]
  "8": number[]
  "9": number[]
  "10": number[]
}
