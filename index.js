Vue.component('login', {
  data: function() {
    return {
      userId: '',
      login: '',
      password: '',
    }
  },

  methods: {
    signIn: function (login, password) {
      axios.post('http://localhost:2000/login', { login, password } ).then((response) => {
        console.log(response.data);
        // this.userId = responce.data;
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
  ],

  methods: {
    makeMove: function (x, y) {
      axios.post('http://localhost:2000/move', {x, y}, {
        header: {
          authorization: {key},
        }
      });
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