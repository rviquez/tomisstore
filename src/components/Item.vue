<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex>
        <div id="spinner_container">
          <v-progress-circular
            v-if="loading"
            v-bind:size="40"
            indeterminate
            color="pink"
            class="spinner"
          >
          </v-progress-circular>
        </div>

        <v-img height="120" aspect-ratio="2.75" :src="this.url" />

        <v-container fluid style="min-height: 0" grid-list-lg>
          <v-layout row wrap align-center>
            <v-flex xs12>
              <v-btn icon @click="$router.push({ name: 'Camera' })">
                <v-icon>mdi-camera</v-icon>
              </v-btn>
              <v-text-field
                v-model="price"
                type="number"
                name="price"
                label="Precio"
                id="price"
              />
              <v-file-input
                ref="image"
                @change="onSelectFile"
                show-size
                counter
                accept="image/*"
                label=""
              ></v-file-input>
              <v-btn block color="primary" @click="post()">
                Buy a toy
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import postItem from "./mixins/postItem.js";
import firebase from "../configFirebase.js";
export default {
  props: {
    pictureUrl: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      url: null,
      price: "",
      loading: true,
      selectedFile: null,
      pictureId: ""
    };
  },
  mounted() {
    if (this.pictureUrl !== "") {
      this.url = this.pictureUrl;
    }
    this.loading = false;
  },
  methods: {
    post() {
      firebase.storage
        .ref()
        .child(`images/picture-${new Date().getTime()}`)
        .put(this.selectedFile)
        .then(res => {
          this.pictureId = res.ref.name;
          res.ref.getDownloadURL().then(pictureUrl => {
            this.url = pictureUrl;
            postItem(this.url, this.pictureId, this.price);
          });
        })
        .catch(err => {
          console.log(err);
          this.$router.go(-1);
        });
    },
    onSelectFile(file) {
      if (file) {
        this.selectedFile = file;
        this.url = URL.createObjectURL(file);
      } else {
        this.url = "";
      }
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  width: auto\9;
  /* ie8 */
}
#spinner_container {
  text-align: center;
}
.spinner {
  margin: auto;
  margin: 4rem;
}
</style>
