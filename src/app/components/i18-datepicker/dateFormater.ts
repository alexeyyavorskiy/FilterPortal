import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class CustomDateParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { month: toInteger(dateParts[0]), day: null, year: null };
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { month: toInteger(dateParts[0]), day: toInteger(dateParts[1]), year: null };
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { month: toInteger(dateParts[0]), day: toInteger(dateParts[1]), year: toInteger(dateParts[2]) };
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        // return date ? `${isNumber(date.month) ? padNumber(date.month) : ''}.${isNumber(date.day) ? padNumber(date.day) : ''}.${date.year}` : "";
        return date ? `${isNumber(date.day) ? padNumber(date.day) : ''}.${isNumber(date.month) ? padNumber(date.month) : ''}.${date.year}` : "";
    }
}

// lifted out of ng-bootstrap
function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}
