function getModelStateErrors(modelState){
  var errors = ""
  for (var property in modelState) {
    errors += modelState[property].join('\n')
  }
  return errors
}

const helpers = {
  getModelStateErrors
}

export default helpers
