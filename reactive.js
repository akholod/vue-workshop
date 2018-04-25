// const obj = { foo: 123};

// function convert(obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key];
//     Object.defineProperty(obj, key, {
//       get() {
//         console.log(`Getting key ${key}: ${value}`);
//         return value;
//       },
//       set(val) {
//         console.log(`Setting key ${key}: ${val}`);
//         value = val;
//       }
//     })
//   })
// }

// convert(obj);

// console.log(obj.foo);
// obj.foo = 4556;
// console.log(obj.foo);

// let activeUpdate;

// const Dep = class Dep {
//   constructor() {
//     this.subscribers = [];
//   }
//   depend() {
//     if(activeUpdate) {
//       this.subscribers.push(activeUpdate);
//     }
//   }
//   notify() {
//     this.subscribers.forEach(foo => foo());
//   }
// }

// function autorun(update) {
//   function wrapedUpdate() {
//     activeUpdate = wrapedUpdate;
//     update();
//     activeUpdate = null;
//   }
//   wrapedUpdate();
// }

// const dep = new Dep();
// autorun(() => {
//   dep.depend();
//   console.log('updated');
// })

// dep.notify();

let observers = [];

function observe(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set(val) {
        value = val;
        observers.forEach(o => o());
      }
    })
  })
}

function autorun(update) {
  observers.push(update);
  update();
}

const state = {
  count: 0
}

observe(state)

autorun(() => {
  console.log(state.count);
})

state.count++;
state.count++;
state.count++;