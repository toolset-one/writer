const DAY_ENDINGS = ['', 'st', 'nd', 'rd']

const MONTHS = [
	'January',
	'February',
	'March', 'April',
	'May',
	'June',
	'Juli',
	'August',
	'September',
	'October',
	'November',
	'December'
]

const WEEKDAYS_SHORT = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat'
]


export const dateToDatestring = date => {
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
		month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
	year = date.getFullYear()
	return year + '-' + month + '-' + day
}

export const dateStringToDate = string => {
  const tmp = string.split('-')
  return new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]) )
}


export const dateGetHumanDate = date => {
	const dayString = DAY_ENDINGS[date.getDate()] ? date.getDate() + DAY_ENDINGS[date.getDate()] : date.getDate() + 'th',
		monthString = MONTHS[date.getMonth()],
		weekdayString = WEEKDAYS_SHORT[date.getDay()]

	return dayString + ' ' + monthString + ', ' + weekdayString
}

export const dateGetDay = date => {
	return DAY_ENDINGS[date.getDate()] ? date.getDate() + DAY_ENDINGS[date.getDate()] : date.getDate() + 'th'
}

export const dateGetWeekday = date => {
	return WEEKDAYS_SHORT[date.getDay()]
}

export const dateGetMonth = date => {
	return MONTHS[date.getMonth()]
}

export const dateGetWeek = date => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1),
    	pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const datePrevDate = (date, howManyDays = 1) => {
	let newDate = new Date(date)
	newDate.setDate(newDate.getDate() - howManyDays)
	return newDate
}

export const dateNextDate = (date, howManyDays = 1) => {
	let newDate = new Date(date)
	newDate.setDate(newDate.getDate() + howManyDays)
	return newDate
}


export const dateTimeToDuration = time => {
	const arrDuration = time.split(':'),
		duration = arrDuration[0] * (60 * 60) + arrDuration[1] * 60
		return duration
} 


export const dateGetHours = duration => Math.floor(duration / (60 * 60))

export const dateGetMinutes = duration => {
  const minutes = Math.floor(duration / 60)
  const hours = Math.floor(minutes / 60)

  const leftMinutes = minutes - hours * 60
  const stringifiedMinutes = leftMinutes < 10 ? '0' + leftMinutes : leftMinutes

  return stringifiedMinutes
}

export const dateGetSeconds = duration => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration - minutes * 60
  const stringifiedSeconds = seconds < 10 ? '0' + seconds : seconds
  return stringifiedSeconds
}

export const dateDaysBetweenDates = (date1, date2) => {

	return Math.round((date2.getTime() - date1.getTime())/(1000 * 60 * 60 * 24))
}



export const getWindowWidth = () => {
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight|| e.clientHeight|| g.clientHeight
	    return x
}