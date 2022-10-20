import dayjs from 'dayjs';
import { EXTENDED_WEEKDAYS } from './constants';

const formatWeekday = (weekday) => {
    return EXTENDED_WEEKDAYS[weekday];
};

const today = dayjs(new Date());
const date = dayjs(today).format("DD/MM");
const weekday = formatWeekday(dayjs(today).format("d"));

export const day = {
    date,
    weekday
};