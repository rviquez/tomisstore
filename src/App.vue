<template>
  <v-app>
    <v-app-bar app color="primary" light>
      <div class="d-flex align-center">
        <v-btn icon v-if="$route.name !== 'Home'" @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <v-toolbar-title>
        <span class="white--text font-weight-bold">Tomi's Shop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-badge
        overlap
        color="indigo darken-1"
        dot
        left
        v-if="cart.length > 0 && $route.name !== 'Cart'"
      >
        <v-btn icon @click="$router.push({ name: 'Cart' })">
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
      <v-btn icon v-if="$route.name == 'Home'" @click="getMessagingToken">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md10>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "@/configFirebase.js";
import axios from "axios";
import { mapState } from "vuex";
const { messaging } = firebase;
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  mounted() {
    this.listenTokenRefresh();
  },
  computed: {
    ...mapState(["cart"])
  },
  methods: {
    getMessagingToken() {
      messaging
        .getToken()
        .then(async token => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem(
              "messagingToken"
            );
            console.log("token will be updated", currentMessageToken != token);
            if (currentMessageToken != token) {
              await this.saveToken(token);
            }
          } else {
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            this.notificationsPermisionRequest();
          }
        })
        .catch(function(err) {
          console.log("An error occurred while retrieving token. ", err);
        });
    },
    notificationsPermisionRequest() {
      messaging
        .requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem("messagingToken");
      console.log("currentMessageToken", currentMessageToken);
      if (!currentMessageToken) {
        messaging.onTokenRefresh(function() {
          messaging
            .getToken()
            .then(function(token) {
              this.saveToken(token);
            })
            .catch(function(err) {
              console.log("Unable to retrieve refreshed token ", err);
            });
        });
      }
    },
    saveToken(token) {
      console.log("tokens", token);
      axios
        .post(
          `https://us-central1-tomisstore.cloudfunctions.net/GeneralSubscription`,
          { token }
        )
        .then(response => {
          window.localStorage.setItem("messagingToken", token);
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
