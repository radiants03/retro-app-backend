import { format, parseISO } from 'date-fns';

export const formatDate = (date?: Date): string => {
  if (date) {
    const isoDate = date.toISOString();
    return format(parseISO(isoDate), 'MMMM d, yyyy h:mm a');
  } else {
    return 'Never';
  }
};
