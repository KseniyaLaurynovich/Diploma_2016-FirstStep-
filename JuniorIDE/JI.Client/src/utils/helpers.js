function getModelStateErrors(modelState){
  var errors = ""
  for (var property in modelState) {
    errors += modelState[property].join('\n')
  }
  return errors
}

var dateTimeOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };

function dateTimeToString(date) {
  return new Date(date).toLocaleString("en-US", dateTimeOptions);
}

const helpers = {
  getModelStateErrors,
  dateTimeToString
}

export default helpers
