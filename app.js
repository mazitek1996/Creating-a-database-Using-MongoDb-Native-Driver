//jshint esversion: 6

const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false,
};

mongoose.connect("mongodb://localhost:27017/fruitsDB");

//reate new Schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Why there is no name"],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  color: String,
  best_eater: String,
  date: Date,
  review: String,
});

//create new model
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Watermelon",
  rating: 5,
  color: "red",
  date: new Date(),
});

// fruit.save(function (err) {
//   if (err) {
//     console.log(err);
//   }
// });

//create new fruit to be person's favourite
const Kiwi = new Fruit({
  name: "Kiwi",
  rating: 4,
  review: "The best fruit ever!",
  date: new Date(),
  color: "green",
});

Kiwi.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Kiwi saved");
  }
});

//Create new schema of person

const personSChema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  data: Date,
  favouriteFruit: fruitSchema,
});

//Create New model

const mango = new Fruit({
  name: "Mango",
  rating: 3,
  date: new Date(),

})

mango.save()

const Person = mongoose.model("Person", personSChema);

const person = new Person({
  name: "Ammy",
  age: 12,
  gender: "Female",
  data: new Date(),
  favouriteFruit: mango,
});
person.save(function (err) {
  if (err) {
    console.log(err);
  }
});

///to Update Ammy's favourite fruit

Person.updateOne({name: "Ammy"},{favouriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Ammy updated");
  }
})

// const Banana = new Fruit({
//   name: "Banana",
//   rating: 8,
//   review: "Very nurishing fruit",
//   date: new Date(),
//   color: "yellow",
//   best_eater: person,
// });

// const Orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   review: " Healthy fruit",
//   date: new Date(),
//   color: "greeq",
//   best_eater: person,
// });

// // Fruit.insertMany([Kiwi, Banana, Orange], function (err) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("Inserted Kiwi,Banana,Orange successfully");
// //   }
// // });

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // console.log(fruits);
    mongoose.connection.close();

    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

// Person.find(function (err, people) {
//   if (err) {
//     console.log(err);
//   } else {

//     people.forEach(function (person) {
//       console.log(person.name);
//     });
//   }
// });

// Fruit.updateOne({_id: "639bc0239c34679477e2705c"}, {name: "PawPaw"}, function(err){

//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Updated successfully");

// }})

//finding data with just an ID
// Fruit.find({_id: "639bc08fc0198b2b28b6a34e"})

// Deleting data from database using ID
Fruit.deleteOne({ _id: "639bb5e5c671fd3ec2028b17" }, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted successfully");
  }
});

Person.find(function (err, people) {
  if (err) {
    console.log(err);
  } else {
    console.log(people);

    people.forEach(function (person) {
      console.log(person.name);
    });
  }
});

Person.deleteMany({ name: "John" }, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted successfully");
  }
});
