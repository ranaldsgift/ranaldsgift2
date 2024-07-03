export class DateHelper {
    public static dateDifference(date1: Date, date2: Date, interval: string) {
        const second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
        const timediff = date2.getTime() - date1.getTime();
        if (isNaN(timediff)) return NaN;
        switch (interval) {
            case "years": return date2.getFullYear() - date1.getFullYear();
            case "months": return (
                ( date2.getFullYear() * 12 + date2.getMonth() )
                -
                ( date1.getFullYear() * 12 + date1.getMonth() )
            );
            case "weeks"  : return Math.floor(timediff / week);
            case "days"   : return Math.floor(timediff / day); 
            case "hours"  : return Math.floor(timediff / hour); 
            case "minutes": return Math.floor(timediff / minute);
            case "seconds": return Math.floor(timediff / second);
            default: return undefined;
        }        
    }

    public static timeSinceString(date1: Date, date2: Date) {
        const seconds = this.dateDifference(date1, date2, "seconds");
        const minutes = this.dateDifference(date1, date2, "minutes");
        const hours = this.dateDifference(date1, date2, "hours");
        const days = this.dateDifference(date1, date2, "days");
        const weeks = this.dateDifference(date1, date2, "weeks");
        const months = this.dateDifference(date1, date2, "months");
        const years = this.dateDifference(date1, date2, "years");

        if (years && years > 0) {
            if (years == 1)
                return `${years} year ago`;
            else
                return `${years} years ago`;
        }
        if (months && months > 0) {
            if (months == 1)
                return `${months} month ago`;
            else
                return `${months} months ago`;
        }
        if (weeks && weeks > 0) {
            if (weeks == 1)
                return `${weeks} week ago`;
            else
                return `${weeks} weeks ago`;
        }
        if (days && days > 0) {
            if (days == 1)
                return `${days} day ago`;
            else
                return `${days} days ago`;
        }
        if (hours && hours > 0) {
            if (hours == 1)
                return `${hours} hour ago`;
            else
                return `${hours} hours ago`;
        }
        if (minutes && minutes > 0) {
            if (minutes == 1)
                return `${minutes} min ago`;
            else
                return `${minutes} mins ago`;
        }
        if (seconds && seconds > 0) {
            if (seconds == 1)
                return `${seconds} sec ago`;
            else
                return `${seconds} secs ago`;
        }
        return 'just now';
    }

    public static fromISOString(dateString: string) {{
        const b = dateString.split(/\D+/);
        const offsetMult = dateString.indexOf('+') !== -1 ? -1 : 1;
        const hrOffset = offsetMult * (+b[7] || 0);
        const minOffset = offsetMult * (+b[8] || 0);  
        return new Date(Date.UTC(+b[0], +b[1] - 1, +b[2], +b[3] + hrOffset, +b[4] + minOffset, +b[5], +b[6] || 0));
      }
    }
}

Date.prototype.toJSON = function () {
    const timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    const sign = timezoneOffsetInHours >= 0 ? '+' : '-';
    const leadingZero = (Math.abs(timezoneOffsetInHours) < 10) ? '0' : '';
  
    //It's a bit unfortunate that we need to construct a new Date instance 
    //(we don't want _this_ Date instance to be modified)
    const correctedDate = new Date(this.getFullYear(), this.getMonth(), 
        this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), 
        this.getMilliseconds());
    correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
    const iso = correctedDate.toISOString().replace('Z', '');
  
    return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ':00';
}