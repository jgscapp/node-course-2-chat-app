
[{
  id: '#$sjduerjdu',
  name: 'Gerry',
  room: 'The Office'
}
]


class Users {
  //constructor automatically fires and help initialize an instance of the class
  constructor () {
    this.users = [];   //this refers to instance as suppose to  the  class
  }

  addUser (id, name, room) {
    //create user object
    var user = {id, name, room};
    //push to the array
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.users.filter((user) => user.id === id)[0]
    //or call getUser, get same result
    //var user = this.getUser(id);

    if (user) {
      //whit this instruction we remove a user  creating a new array without the user specified in param
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;  //return the user that was removed
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]   //return the  first element of the  array
  }

  getUserList (room) {
    //var users = this.users.filter((user) => user.room === room)  //short version same result as below
    var users = this.users.filter((user) => {
      return user.room === room   // if this is true, the  user is added to the list "users"
    });

  //convert the  array of  object to array of string,  using map
  // var namesArray = users.map((user) => user.name) // short version same result as below
   var namesArray = users.map((user) => {
     return user.name
   });

  return namesArray;
  }

}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Gerry', 47);    //variable  "me" is identical to "this" in the  constructor
// var description = me.getUserDescription();
// console.log(description);
