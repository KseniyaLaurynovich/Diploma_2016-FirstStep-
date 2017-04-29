define(function(require, exports, module) {
    
    var dateTimeOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };
    
     var timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };
    
    var dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    module.exports.dateTimeToString = function(date) {
      return date.toLocaleString("en-US", dateTimeOptions);
    }
    
    module.exports.dateTimeToDateString = function(date) {
      return date.toLocaleString("en-US", dateOptions);
    }
    
    module.exports.dateTimeToTimeString = function(date) {
      return date.toLocaleString("en-US", timeOptions);
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