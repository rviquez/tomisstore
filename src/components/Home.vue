<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex v-for="toy in toys" :key="toy.id" xs12 md6 xl3 pa-2>
        <v-card>
          <v-img
            height="120"
            :src="toy.url ? toy.url : ''"
            aspect-ratio="2.75"
            @click="buyToy(toy)"
          ></v-img>
          <v-card-title
            primary-title
            style="padding-top:13px"
            @click="buyToy(toy)"
          >
            <div>
              <h3 class="headline">${{ toy.price }}</h3>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn icon x-small @click="buyToy(toy)">
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
            <v-btn icon x-small @click="deleteToy(toy)">
              <v-icon>mdi-skull</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn
      @click="$router.push({ name: 'Item' })"
      color="accent"
      dark
      fixed
      bottom
      right
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import firebase from "../configFirebase.js";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getToys();
  },
  computed: {
    ...mapState(["toys"], ["cart"])
  },
  methods: {
    async getToys() {
      this.$store.dispatch("getToys");
    },
    buyToy(toy) {
      this.$store.commit("addToCart", toy);
    },
    deleteToy(toy) {
      firebase.db
        .collection("toys")
        .doc(toy.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });

      firebase.storage
        .ref()
        .child(`images/${toy.pictureId}`)
        .delete()
        .then(() => {
          console.log("Picture successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing picture: ", error);
        });
      this.getToys();
    }
  }
};
</script>
