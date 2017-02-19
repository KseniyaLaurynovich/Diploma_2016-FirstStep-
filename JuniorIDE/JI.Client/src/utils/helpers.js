function getModelStateErrors(modelState){
  var errors = ""
  for (var property in modelState) {
    errors += modelState[property].join('\n')
  }
  return errors
}

function dateTimeToString(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  return day + ' '
        + monthNames[monthIndex] + ' '
        + year + ' '
        + hour + ':'
        + minutes + ':'
        + seconds;
}

const helpers = {
  getModelStateErrors,
  dateTimeToString
}

export default helpers
