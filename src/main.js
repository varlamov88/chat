import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import vuetify from './plugins/vuetify';

const firebaseConfig = {
  apiKey: 'AIzaSyCQw-AObOb-Yu_s2k6cfaa8QBj3AYr3cV0',
  authDomain: 'chat-2de80.firebaseapp.com',
  databaseURL: 'https://chat-2de80-default-rtdb.firebaseio.com',
  projectId: 'chat-2de80',
  storageBucket: 'chat-2de80.appspot.com',
  messagingSenderId: '736953368430',
  appId: '1:736953368430:web:7c697baea0398f86140b7f',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
