import { find } from 'lodash/fp';
import moment from 'moment-timezone';

type OpeningHour = {
    day: string;
    open: string;
    close: string;
};

type Organization = {
    alwaysOpen: boolean;
    openingHours: OpeningHour[];
    timezone: string;
};

const isOpen = ({ alwaysOpen, openingHours, timezone }: Organization): IsOpenStatus => {
    if (alwaysOpen) {
        return { open: true };
    }

    const now = moment.tz(timezone);
    const date = now.format('YYYY-MM-DD');
    const openingHour = find({ day: now.format('dddd').toLowerCase() }, openingHours);

    if (openingHour === undefined) {
        return { open: false };
    }

    const openTime = moment.tz(`${date} ${openingHour.open.match(/T(\d\d:\d\d)/)[1]}`, 'YYYY-MM-DD HH:mm', timezone);
    const closeTime = moment.tz(`${date} ${openingHour.close.match(/T(\d\d:\d\d)/)[1]}`, 'YYYY-MM-DD HH:mm', timezone);
    const open = now.isBetween(openTime, closeTime, null, '[)');
    return { open, openTime, closeTime };
};

export type IsOpenStatus = {
    open: boolean;
    openTime?: moment.Moment;
    closeTime?: moment.Moment;
};

export default isOpen;
