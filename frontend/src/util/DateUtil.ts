const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export class DateUtil {

    static getNumberOfDaysInMonth(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        return new Date(year, month + 1, 0).getDate();
    }

    static getDatesInMonth(date: Date) {
        const result = [];
        const year = date.getFullYear();
        const month = date.getMonth();

        const numDays = DateUtil.getNumberOfDaysInMonth(date);

        for (let i = 0; i < numDays; i++) {
            const day = new Date(year, month, i + 1);
            result.push(day);
        }

        return result;
    }

    static getShortDayName(day: number) {
        return DAY_NAMES[day];
    }
}
