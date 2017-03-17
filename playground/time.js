var moment = require('moment');

// Jan 1st 1970 00:00:10 am

// var date = new Date();
// var months = ['Jan', 'Feb', 'Mar', 'Apr',]
// console.log(date.getMonth());

//DOCUMENTATION  momentjs.com
var date = moment();
date.add(1, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

// 05:13 pm

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date1 = moment(createdAt);
console.log(date.format('h:mm:ss a'));
