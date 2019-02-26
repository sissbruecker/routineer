const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export class LocaleUtil {
    static getShortDayName(day: number) {
        return DAY_NAMES[day];
    }

    static getFullMonthName(month: number) {
        return MONTH_NAMES[month];
    }
}
