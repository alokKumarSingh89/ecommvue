<template>
  <v-app>
    <v-toolbar dark class="blue lighten-1">
      <v-toolbar-side-icon 
      @click.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer"> {{title}}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat @click="logOut" v-if="user">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <div class="loading" v-if="loading">
        <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
      </div>
      <router-view></router-view>
    </main>
    <v-footer app color="blue lighten-2" style="text-align:center" dark>
      <span style="margin:auto">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { SET_USER, LOG_OUT } from "@/store/actionType";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "Library Managment",
      count: 0
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      loading:state=>state.loading
    })
  },
  name: "App",
  methods: {
    logOut() {
      this.$store.dispatch(LOG_OUT);
      this.$router.push("/signin");
    }
  }
};
</script>
<style>
.loading {
  z-index: 4;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ccc;
  opacity: 0.9;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
