Vue.component('login', {
  data: function () {
    return {
      user: {
        login:'',
        password:'',
      }
    }
  },
  props: [
    'userName',
    'password',
  ],

  methods: {

  },
  template: `
    <div class ="registration-form" >
      <input v-model="user.login">
      <input v-model="user.password">
      {{user.login}}
      {{user.password}}
      <button v-on:click="$emit('sign-in', user)">login</button>
    </div>
  `
})

Vue.component('new-game', {
  props: [
    'userName',
    // 'userId,
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
        userName: 0,
        userId: '',
        password: '',
    },
    methods: {
      signIn: function (userName, password) {
        alert(userName);
        alert(password);
        axios.post('http://localhost:2000/signIn', { userName, password }).then((response) => {
          userId = response.data;
          console.log(userId, userName, password);
        })
      }
    },
    // mounted: function() {
    //   setInterval(() => {
    //     axios.get('http://localhost:2000/getField', {
    //       headers: {
    //         'Authorization': userId,
    //       }
    //     }).then((response) => {
    //       this.field = response.data;
    //     });
    //   }, 1000);
    // }
})
