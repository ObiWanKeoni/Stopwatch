// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import { router } from './router'
import { store } from './store';
import * as firebase from './config/firebase.config';

Vue.use(BootstrapVue)

/* eslint-disable no-new */
firebase.firebaseListener((firebaseUser) => {
  new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created () {
          if (firebaseUser) {
              store.dispatch('autoSignIn', firebaseUser);
          }
      }
  });
});