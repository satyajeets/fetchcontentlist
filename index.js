var fs = require('fs');
var request = require('request');
var _ = require('underscore');
var validator = require('url-validator');
var config = require('./config');

request('http://www.reddit.com/r/pics/new.json', function(error, response, data) {
    var dataToWrite = '';
    if (!error && response.statusCode == 200) {
        data = JSON.parse(data);
        _.each(data.data.children, function(ele) {
            var fileNameArr = ele.data.thumbnail.split("/");
            var fileName = fileNameArr[fileNameArr.length-1];
            if (validator(ele.data.thumbnail)) {
                var arr = ele.data.thumbnail.split("/");                
                var name = arr[arr.length-1];
                dataToWrite += name + '\n';
            }
        });
        fs.writeFileSync(config.basePath + '/contentList.txt', dataToWrite);
    } else {
        console.log('api failed to fetch data');
    }
});