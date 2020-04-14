Vue.component('login', {
  data: function() {
    return {
      login: '',
      password: '',
    }
  },
  props: [
    'userId',
  ],
  methods: {
    signIn: function (login, password) {
      axios.post('http://localhost:2000/login', { login, password } ).then((response) => {
        userId = response.data;
        console.log(userId);
      })
    }
  },
  template: `
    <div class ="registration-form" >
      <input v-model="login">
      <input v-model="password" >
      <button v-on:click="signIn(login, password)">login</button>
    </div>
  `
})

Vue.component('cell', {

  props: [
    'item',
    'x',
    'y',
    'userId',
  ],

  methods: {
    makeMove: function (x, y) {
      console.log(userId);
      axios.post('http://localhost:2000/move', {x, y}, {
        headers: {
          'Authorization': userId,
        }
      }).then((response, req) => console.log(req));
    },
  },

  template: `
  <div class="cell" v-on:click="makeMove(x, y)">
    <div v-if="item == 1">X</div>
    <div v-if="item == 2">0</div>
  </div>
  `
})


const app = new Vue({
    el: '#app',
    data: {
        field: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        message: 'Hello Vue!',
        userName: 'Denis',
        userId: '',
    },
    methods: {
        clickButton: function() {
            this.message = 'Hello, Max';
        },
    },
    // mounted: function() {
    //   setInterval(() => {
    //     axios.get('http://localhost:2000/getField').then((response) => {
    //       this.field = response.data;
    //     });
    //   }, 1000);
    // }
})
