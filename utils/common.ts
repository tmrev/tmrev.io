export function numberShortHand(number: number): string {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(number);
}

export function formatRuntime(runtime: number): string {
  const hours = runtime / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours}h ${rminutes}m`;
}

export function extractNameFromEmail(email: string | null):string {
  if (!email) return '';

  return email.split('@')[0];
}

export function extractNameFromDisplayName(displayName: string | null) {
  if (!displayName) return null;

  const spreadName = displayName.split(' ');

  if (spreadName.length === 1) return { firstName: spreadName[0] };

  return {
    firstName: spreadName[0],
    lastName: spreadName[1],
  };
}

export function extractName(displayName: string | null, email: string) {
  if (!displayName) {
    return {
      firstName: extractNameFromEmail(email),
      lastName: extractNameFromEmail(email),
    };
  }

  return extractNameFromDisplayName(displayName);
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function roundWithMaxPrecision(n:number, precision = 1) {
  const precisionWithPow10 = 10 ** precision;
  return Math.round(n * precisionWithPow10) / precisionWithPow10;
}

export const generateUrl = (url: string, params: any) => {
  const myUrlWithParams = new URL(url);

  Object.keys(params).forEach((value) => {
    myUrlWithParams.searchParams.append(value, params[value]);
  });

  return myUrlWithParams.href;
};

export const renderImageSrc = (user: any) => {
  if (user?.photoURL) return user.photoURL;

  if (user?.photoUrl) return user.photoUrl;

  if (user?.displayName) return `https://avatars.dicebear.com/api/identicon/${user.displayName}.svg`;

  if (user?.email) return `https://avatars.dicebear.com/api/identicon/${extractNameFromEmail(user.email)}.svg`;

  return 'https://avatars.dicebear.com/api/identicon/foobar.svg';
};
