const myPlugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        if (this.$options.rules) {
          Object.keys(this.$options.rules).forEach(key => {
            this.$watch[key] = function (val) {
              if (!this.$options.rules[key].validate(val)) {
                console.log(this.$options.rules[key].message);
              }
            }
          })
        }
      }
    })
  }
}

Vue.use(myPlugin);

const vm = new Vue({
  data: { foo: 10 },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than one'
    }
  }
})

vm.foo = 0;

console.log(vm.foo);

const virtualDOMEl = {
  tag: 'div',
  children: [],
  data: {
    attr: {
      style: ''
    }
  },
  id: 0
}