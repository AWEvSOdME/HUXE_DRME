


module.exports =  {
    doRequest: function(requestUrl){
        return $.ajax({
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            url: requestUrl
        });
    }
};