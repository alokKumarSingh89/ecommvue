<template>
    <v-layout row wrap>
        <v-flex xs2>
            <v-navigation-drawer permanent class="blue lighten-2" dark style="height:103%;min-height:85vh;width:100%">
                <v-toolbar flat class="transparent">
                    <v-list class="pa-0">
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img src="https://randomuser.me/api/portraits/men/85.jpg" >
                            </v-list-tile-avatar>
                            <v-list-tile-content v-if="user">
                                <v-list-tile-title>{{user.firstName}} {{user.lastName}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list class="pt-0">
                    <v-list-tile v-for="item in menu" :key="item.title" v-if="user.role == 1 || user.role == item.role ">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <router-link :to=item.link class="white--text a_text">{{ item.title }}</router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-flex>
        <v-flex xs10>
            <transition mode="out-in">
                <router-view></router-view>
            </transition>
        </v-flex>
    </v-layout>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: state => state.user.user,
      menu: state => state.dashboad.menu
    })
  }
};
</script>
<style>
.a_text {
  text-decoration: none;
}
</style>

