
[{

}
]


class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.users.filter((user) => user.id === id)[0]

    if (user) {
      //whit this instruction we remove a user  creating a new array without the user specified in param
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
    var users = this.users.filter((user) => {
      return user.room === room
    });
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
// var me = new Person('Gerry', 47);
// var description = me.getUserDescription();
// console.log(description);
