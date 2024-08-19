import { padToTwoDigits } from './padToTwoDigits';
import { validateValidDate } from './validate';

type FormattedDateString = string;

export const formatDateString = (dateString: string): FormattedDateString => {
  const date = new Date(dateString);

  if (!validateValidDate(date)) {
    return '';
  }

  const year = padToTwoDigits(date.getFullYear());
  const month = padToTwoDigits(date.getMonth() + 1);
  const day = padToTwoDigits(date.getDate());

  const hour = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());

  return `${year}.${month}.${day} ${hour}:${minutes}`;
};
