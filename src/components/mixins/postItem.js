import firebase from "../../configFirebase.js";
import router from "../../router";

export default (url, pictureId, price) => {
  firebase.db
    .collection("toys")
    .add({
      url,
      pictureId,
      price,
      created_at: new Date().getTime()
    })
    .then(router.go(-1));
};
