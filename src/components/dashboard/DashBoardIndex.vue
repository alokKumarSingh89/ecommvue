<template>
    <v-layout row wrap>
        <v-flex xs5 offset-xs3>
            <v-alert :value="!user.completed" type="warning" >
                You profile is not completed. Please <router-link to="/dashbord/profile/edit">update</router-link> your profile
            </v-alert>
            <v-alert :value="user.completed && !user.verified && user.role != 1" type="info" class=" lighten-3">
                You profile is not verified.Wait Admin will verified this
            </v-alert>
        </v-flex>
        <v-flex xs12>
            <search-book />
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from "vuex";
import SearchBook from '@/components/book/SearchBook'
export default {
  components:{
      'search-book':SearchBook
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      dashboadMenu: state => state.dashboad.menu
    })
  }
};
</script>

<style>
</style>
