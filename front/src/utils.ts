const baseURL = `https://${import.meta.env.VITE_DOMAIN_NAME}`;
const baseDomain = import.meta.env.VITE_DOMAIN_NAME;

const printDateTime = (datetimestr: string): string => {
  const dateObj = new Date(datetimestr);
  const timeStr = dateObj.toString();
  return timeStr.substring(0, 21);
};

export { baseURL, baseDomain, printDateTime };

