import Vue from "vue";
import Vuex from "vuex";
import firebase from "../configFirebase.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toys: [],
    cart: [],
    user: {
      loggedIn: false,
      data: null
    },
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    getToys: (state, toys) => {
      state.toys = toys;
    },
    updateToys: (state, toyId) => {
      state.toys = state.toys.filter(el => el.id != toyId);
    },
    addToCart: (state, toy) => {
      state.cart.push({
        id: toy.id,
        pictureId: toy.pictureId,
        price: toy.price,
        url: toy.url
      });
    },
    removeFromCart: (state, toyId) => {
      state.cart = state.cart.filter(el => el.id != toyId);
    }
  },
  actions: {
    fetchUser({
      commit
    }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          uid: user.uid,
          isAnonymous: user.isAnonymous
        });
      } else {
        commit("SET_USER", null);
      }
    },
    getToys: async context => {
      let snapshot = await firebase.db.collection(`toys`).get();
      const toys = [];

      snapshot.forEach(doc => {
        if (doc) {
          let appData = doc.data();
          toys.push({
            id: doc.id,
            url: appData.url,
            name: appData.name,
            pictureId: appData.pictureId,
            price: appData.price
          });
        }
      });
      context.commit("getToys", toys);
    }
  },
  modules: {}
});
