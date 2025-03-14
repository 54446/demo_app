import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    const date = new Date(value);
    
    // Get the day of the month and apply the suffix
    const day = date.getDate();
    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }

    // Get the month names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[date.getMonth()];

    // Get the year
    const year = date.getFullYear();

    // Get the time (hours and minutes)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    // Return formatted string
    return `${day}${daySuffix} ${monthName} ${year} ${formattedTime}`;
  }
}
