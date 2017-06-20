function getModelStateErrors(modelState){
  var errors = ""
  for (var property in modelState) {
    errors += modelState[property].join('\n')
  }
  return errors
}

function getBase64(file, callback) {
   var reader = new FileReader();
   reader.readAsDataURL(file);

   reader.onload = function(){
     callback(null, reader.result);
   }

   reader.onerror = function (error) {
     callback(error, null);
   };
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
  dateTimeToString,
  getBase64
}

export default helpers
