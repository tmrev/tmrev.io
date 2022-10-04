import countyCode from '../data/countyCode.json';
import timezones from '../data/timezones.json';

const getCounty = ():string | undefined => {
  const county = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (countyCode as any)[(timezones as any)[county]];
};

export default getCounty;
