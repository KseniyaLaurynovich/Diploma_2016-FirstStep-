define(function(require, exports, module) {
    
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    
    module.exports.dateTimeToString = function(date) {
      
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
});