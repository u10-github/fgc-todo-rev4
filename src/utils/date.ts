import { format, parseISO, addDays, differenceInDays } from 'date-fns';
import { ja, enUS } from 'date-fns/locale';

export const DateUtils = {
  formatDate: (date: Date