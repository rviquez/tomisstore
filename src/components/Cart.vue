<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex v-for="cartItem in cart" :key="cartItem.id" xs12 md6 xl3 pa-2>
        <v-card class="mx-auto" outlined color="secondary">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="'$' + cartItem.price"
              ></v-card-title>

              <!-- <v-card-subtitle v-text="item.artist"></v-card-subtitle> -->
            </div>

            <v-avatar class="ma-3" size="200" tile>
              <v-img :src="cartItem.url"></v-img>
            </v-avatar>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon x-small @click="deleteCartItem(cartItem)">
              <v-icon>mdi-skull</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["cart"])
  },
  methods: {
    deleteCartItem(cartItem) {
      this.$store.commit("removeFromCart", cartItem.id);
      if (this.cart.length < 1) {
        this.$router.go(-1);
      }
    }
  }
};
</script>
