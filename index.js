Vue.component('login', {
  data: function() {
    return {
      login: '',
      password: '',
    }
  },
  props: [
    'userId',
    'userName'
  ],
  methods: {
    signIn: function (username, password) {
      axios.post('http://localhost:2000/login', { username, password } ).then((response) => {
        userId = response.data;
        console.log(userId);
      })
    }
  },
  template: `
    <div class ="registration-form" >
      <input v-model="userName">
      <input v-model="password" >
      <button v-on:click="signIn(userName, password)">login</button>
    </div>
  `
})

Vue.component('newgame', {

  props: [
    'userName',
  ],
  
  methods: {
    startNewGame: function(userName) {
      axios.post('http://localhost:2000/newGame', { userName }, 
      {
        headers: {
          'Authorization': userId,
        }
      }).then((response) => console.log(response.data));
    }
  },

  template: `
  <div class ="newGame">
    <button v-on:click="startNewGame">start new game</button>
  </div>`

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
      }).then((response) => console.log(response.data));
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
        userName: 'Denis',
        userId: '',
    },
    methods: {

    },
    // mounted: function() {
    //   setInterval(() => {
    //     axios.get('http://localhost:2000/getField').then((response) => {
    //       this.field = response.data;
    //     });
    //   }, 1000);
    // }
})
