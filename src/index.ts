import { Collection } from "./model/Collection";
import { User } from "./model/User";
import { UserEdit } from "./view/UserEdit";


// const user = User.buildUser({ id: 1 })
// user.fetch();
// console.log(user)
// user.attributes.get('id');
// user.attributes.get('id');
// user.attributes.get('id');
// user.sync.save();
// const collection = new Collection('http://localhost:3000/users', User.buildUser);
// collection.fetch();
// console.log(collection);

const user = new UserEdit(document.querySelector('.app')!, User.buildUser({name: 'test', age: 20}));
user.render();
console.log(user)