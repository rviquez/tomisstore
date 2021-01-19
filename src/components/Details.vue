<template>
  <v-container grid-list-xs>
    <v-layout column v-if="!!toy">
      <v-flex>
        <v-img :src="toy.url ? toy.url : ''"></v-img>
      </v-flex>
      <v-flex>
        <h1>{{ toy.name }} 1</h1>
      </v-flex>
      <v-flex>
        <h1>${{ toy.price }}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "../configFirebase.js";
export default {
  props: {
    toyProp: {
      type: Object
    }
  },
  data() {
    return {
      toy: undefined
    };
  },
  mounted() {
    if (!this.toyProp) {
      this.toy = this.toyProp;
    } else {
      const id = this.$route.params.id;
      firebase.db
        .doc(`toys/${id}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.toy = doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    }
  }
};
</script>
