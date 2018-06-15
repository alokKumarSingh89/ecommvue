<template>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3 class="pb-2">
      <v-card>
        <v-card-media src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR32M0w4Esx2DlponYAfG9MrBVS7WwwZNHkGvxUCprQ3La9rofM" height="200px">
        </v-card-media>
        <v-card-title primary-title>
            <v-list>
                <v-list-tile v-for="(user,key) in userDetail" :key="key" v-if="['fid','completed','verified','role'].indexOf(key) == -1 ">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <strong>{{key}}</strong>: <span>{{user}} </span>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="blue" :to="{name:'EditProfile'}">Update Profile</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState({
            userDetail:state=>state.user.user
        })
    }
}
</script>

<style>

</style>
