const baseURL = 'https://77345.site';
const baseDomain = '77345.site';

const printDateTime = (datetimestr: string): string => {
  const dateObj = new Date(datetimestr);
  const timeStr = dateObj.toString();
  return timeStr.substring(0, 21);
};

export { 
  baseURL,
  baseDomain,
  printDateTime
};