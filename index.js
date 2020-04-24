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
      <button v-on:click="$emit('sign-in', user)">login</button>
    </div>
  `
})

Vue.component('start-new-game', {
  props: [
    'user-name',
    'gameId',
  ],
  methods: {
  },
  template: `
  <div class ="start-new-game">
    {{ gameId }}
    <button v-on:click="$emit('start-new-game')">start new game</button>
  </div>`
})

Vue.component('cell', {
  props: [
    'item',
    'x',
    'y',
    'userId'
  ],
  methods: {
    makeMove: function (x, y, userId) {
      axios.post('http://localhost:2000/move', {x, y}, {
        headers: {
          'Authorization': userId,
          'gameId': gameId,
        }
      })
      .then((response) =>
        console.log(response.data));
    },
  },
  template: `
  <div class="cell" v-on:click="makeMove(x, y, userId)">
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
        gameId: '',
        password: '',
    },
    methods: {
      signIn: function (login, password) {
        this.userName = login;
        axios.post('http://localhost:2000/signIn', { login, password }).then((response) => {
          this.userId = response.data;
          console.log(this.userId);
        })
      },
      startNewGame: function(userName) {
        console.log('starting new game', userName);
        axios.post('http://localhost:2000/newGame', { userName },
        {
          headers: {
            'Authorization': this.userId,
          }
        }).then((response) => {
          gameId = response.data;
          // запускаем мониторинг состояния поля для gameId
          setInterval(() => {
            axios.get('http://localhost:2000/getField', {
              headers: {
                'Authorization': this.userId,
                'gameId': gameId,
              }
            }).then((response) => {
              this.field = response.data;
            });
          }, 1000);
        });
      },
    },
    // mounted: function() {
    //   setInterval(() => {
    //     axios.get('http://localhost:2000/getField', {
    //       headers: {
    //         'Authorization': userId,
    //         'gameId': gameId,
    //       }
    //     }).then((response) => {
    //       this.field = response.data;
    //     });
    //   }, 1000);
    // }
})
