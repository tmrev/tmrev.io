import errorCodes from '../constants/firebaseErrors.json';

// eslint-disable-next-line import/prefer-default-export
export function handleError(key) {
  try {
    const index = key.split('(')[1].split(')')[0];

    return errorCodes[index];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return '';
  }
}
