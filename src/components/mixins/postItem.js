import firebase from "../../configFirebase.js";
import router from "../../router";

export default (url, name, pictureId, price) => {
  firebase.db
    .collection("toys")
    .add({
      url,
      name,
      pictureId,
      price,
      created_at: new Date().getTime()
    })
    .then(router.go(-1));
};
