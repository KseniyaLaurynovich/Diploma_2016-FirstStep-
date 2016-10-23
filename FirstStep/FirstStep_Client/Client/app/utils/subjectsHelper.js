var axios = require('axios');

var helper = {
    getSubjectsForUser: function(userId){
        return axios.get('http://firststep.com/subjects/get/1')
        .then(function(subjects){
            return JSON.parse(subjects.data);
        });
    }
};

module.exports = helper;
