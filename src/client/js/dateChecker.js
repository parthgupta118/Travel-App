// To check valid data
function checkForDate(date) {
    return (/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(date);
}

export { checkForDate };