import { format } from 'date-fns';

export const getDateForXML = (date: Date) => {
  const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx"; //'2023-02-15T15:17:12+03:00'
  //const lastmod = format(new Date(), formatString);
  const lastmod = format(date, formatString);
  return lastmod;
};
