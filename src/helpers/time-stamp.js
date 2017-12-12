const timeStamp = sTime => {
	// Assumption: you have passed a time value
	const d = new Date(sTime)

	const nHours = d.getHours()
	const sHours = nHours < 10 ? `0${nHours}` : nHours.toString()
	const nMinutes = d.getMinutes()
	const sMinutes = nMinutes < 10 ? `0${nMinutes}` : nMinutes.toString()
	const nSeconds = d.getSeconds()
	const sSeconds = nSeconds < 10 ? `0${nSeconds}` : nSeconds.toString()

	return `${sHours}:${sMinutes}:${sSeconds}`
}

const dateTimeStamp = () => {
	let sTimeStamp = ''
	const d = new Date()
	const nYear = d.getFullYear()
	const nMonth = d.getMonth() + 1
	const sMonth = nMonth < 10 ? `0${nMonth}` : nMonth.toString()
	const nDay = d.getDate()
	const sDay = nDay < 10 ? `0${nDay}` : nDay.toString()
	const nHours = d.getHours()
	const sHours = nHours < 10 ? `0${nHours}` : nHours.toString()
	const nMinutes = d.getMinutes()
	const sMinutes = nMinutes < 10 ? `0${nMinutes}` : nMinutes.toString()
	const nSeconds = d.getSeconds()
	const sSeconds = nSeconds < 10 ? `0${nSeconds}` : nSeconds.toString()

	sTimeStamp = `${nYear}-${sMonth}-${sDay} ${sHours}:${sMinutes}:${sSeconds}.000000`
	return sTimeStamp
}

export { timeStamp, dateTimeStamp }
