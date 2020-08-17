<template>
  <div>
    <v-app-bar class="font-weight-bold" color="grey darken-4" dense dark>
      <v-toolbar-title>The Wall</v-toolbar-title>
      <v-spacer></v-spacer>
      <h3 class="d-none d-sm-flex">Welcome {{ user.displayName }} !</h3>
      <v-list-item-avatar color="blue-grey white--text">
        <img :src="user.photoURL" alt="" />
        <!-- {{ user.displayName.charAt(0) }} -->
      </v-list-item-avatar>
      <v-btn
        color="grey lighten-3 blue-grey--text text--darken-3"
        @click="logOut"
        class="my-2 mx-5"
        >Log Out</v-btn
      >
    </v-app-bar>
    <v-container>
      <v-row justify="center">
        <v-col md="6" sm="12" class="write_post">
          <v-textarea
            clearable
            no-resize
            outlined
            placeholder="Write your post..."
            rows="4"
            solo
            v-model="text"
          ></v-textarea>
          <v-file-input
            class="getImg"
            @change="getImg"
            accept="image/*"
            small-chips
            prepend-icon="mdi-image"
            hide-input
          ></v-file-input>
          <v-chip v-if="imgSelected" class="imgChip" small>
            {{ this.postImg.name }}
            <v-icon small @click='imgSelected = false, postImg = null'>mdi-close</v-icon>
          </v-chip>
          <v-btn
            class="post"
            block
            outlined
            color="green accent-2"
            @click="upload"
            >Post!</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-for="post in posts" :key="post.id" justify="center">
        <v-col md="6">
          <v-card color="grey lighten-4">
            <v-card-text
              class="headline font-weight-bold grey--text text--darken-4 text-center"
            >
              {{ post.text }}
            </v-card-text>
            <v-img :src="post.img"></v-img>
            <v-divider></v-divider>
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="blue-grey white--text">
                  <img :src="post.user.photoURL" alt="" />
                  <!-- {{ post.user.charAt(0) }} -->
                </v-list-item-avatar>
                <v-list-item-content>
                  <h3>{{ post.user.displayName }}</h3>
                </v-list-item-content>
                <v-row align="center" justify="end">
                  <v-icon class="mr-4 green--text text--accent-2"
                    >mdi-comment-multiple-outline</v-icon
                  >
                  <v-icon
                    class="mr-1 green--text text--accent-2"
                    @click="like(post.id)"
                    >mdi-heart</v-icon
                  >
                  <h4 class="subheading mr-2">{{ post.likes }}</h4>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { fb, db } from "@/firebase";

export default {
  name: "Home",
  data() {
    return {
      text: "",
      postImg: null,
      imgSelected: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    addPost(img_url) {
      const fecha = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const fechaActual = fecha.toLocaleDateString("es-CL", options);
      const user = {
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
      };
      db.collection("posts")
        .add({
          user: user,
          text: this.text,
          likes: 0,
          date: fecha,
          dateString: fechaActual,
          img: img_url,
        })
        .then((respuesta) => {
          const id = respuesta.id;
          console.log(id);
        });
      this.text = "";
      this.imgSelected = false;
    },
    like(id) {
      const post = this.posts.find((post) => post.id == id);
      db.collection("posts")
        .doc(post.id)
        .update({
          likes: post.likes + 1,
        });
    },
    getImg(img) {
      this.postImg = img;
      this.imgSelected = true;
    },
    upload() {
      if (this.postImg == null) {
        this.addPost(null);
        return;
      }
      const storageRef = fb
        .storage()
        .ref("postImg/" + this.postImg.name)
        .put(this.postImg);

      storageRef.on(
        "state_changed",
        function() {},
        function(upload_error) {
          console.log(upload_error);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.addPost(url);
          });
        }
      );
    },
  },
  firestore() {
    return {
      posts: db.collection("posts").orderBy("date", "desc"),
    };
  },
};
</script>

<style scoped>
.v-btn {
  margin-top: 0;
}
img {
  height: auto;
}
.getImg {
  position: relative;
  top: -80px;
  float: right;
}
.imgChip {
  position: relative;
  top: -60px;
  float: right;
}
.post {
  top: -70px;
}
.write_post {
  max-height: 12rem;
}
</style>
