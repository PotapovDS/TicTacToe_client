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
    mounted: function() {
      setInterval(() => {
        axios.get('http://localhost:2000/getField').then((response) => {
          this.field = response.data;
        });
      }, 1000);
    }
})