import errorCodes from '../constants/firebaseErrors.json';

// eslint-disable-next-line import/prefer-default-export
export function handleError(key) {
  const index = key.split('(')[1].split(')')[0];

  return errorCodes[index];
}
