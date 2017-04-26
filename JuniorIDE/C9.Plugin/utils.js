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
    
    module.exports.dateTimeToDateString = function(date) {
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    
      return day + ' '
            + monthNames[monthIndex] + ' '
            + year;
    }
    
    module.exports.dateTimeToTimeString = function(date) {
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
    
      return hour + ':'
            + minutes + ':'
            + seconds;
    }
    
    module.exports.getTagsHtml = function(task) {
      var isClosed = task.isClosed 
                ? "<span class='tag tag--red'>closed</span>" 
                : "";
            
      var isShared = task.isShared 
          ? "<span class='tag tag--yellow'>shared</span>" 
          : "";
          
      var isPassed = task.isPassed 
          ? "<span class='tag tag--green'>passed</span>" 
          : "";
          
      var isDeadlineSoon = task.isPassed 
          ? "<span class='tag tag--orange'>deadline soon</span>" 
          : "";
          
      return isClosed + isShared + isPassed + isDeadlineSoon;
    }
});