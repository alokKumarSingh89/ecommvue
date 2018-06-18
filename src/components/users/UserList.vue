<template>
    <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-dialog v-model="dialogPop" max-width="500px">
              <v-card>
                <v-card-title class="blue white--text">
                  Update User Role And Verified the Account
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation v-if="currentUser">
                    <v-checkbox :label="`Verify the account: ${currentUser.verified.toString()}`" 
                    v-model="currentUser.verified" ></v-checkbox>
                    <v-radio-group v-model="currentUser.role" row>
                      <v-radio label="Student" value="0" ></v-radio>
                      <v-radio label="Librarian" value="1"></v-radio>
                    </v-radio-group>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="blue" flat @click.stop="updateAccount">Update</v-btn>                  
                  <v-btn color="blue" flat @click.stop="dialogPop=false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex xs3>
            <v-card>
              <v-navigation-drawer permanent>
                <v-toolbar flat>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title class="title">
                        User List
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list dense class="pt-0">
                  <v-list-tile v-for="item in users" :key="item.firstName">
                    <v-list-tile-content>
                      <v-list-tile-action-text>
                        <v-btn flat color="blue" @click="showUser(item)">{{ item.firstName }}</v-btn>
                      </v-list-tile-action-text>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-navigation-drawer> 
            </v-card>
          </v-flex>
          <v-flex xs9>
              <v-card v-if="currentUser">
                <v-card-title>
                  <v-toolbar height="38px">
                    <!-- <v-toolbar-title>{{currentUser.firstName}}</v-toolbar-title> -->
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn icon color="blue--text" @click="showDialog">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon color="blue--text">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs5>
                      <v-list dense>
                        <v-list-tile v-for="(value,key) in currentUser" :key="key">
                          <v-list-tile-content><strong class="text-format">{{key}}:</strong> </v-list-tile-content>
                          <v-list-tile-content class="align-end grey--text">{{value || 'Not Availble'}}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
          </v-flex>
        </v-layout>  
    </v-container>
</template>

<script>
import { FTECH_USER,UPDATE_USER } from "@/store/actionType";
import { mapState } from "vuex";
let _ = require('lodash')
export default {
  data() {
    return {
      currentUser:null,
      dialogPop:false,
      valid:true,
      oldCopy:null
    };
  },
  mounted() {
    this.$store.dispatch(FTECH_USER);
  },
  computed: {
    ...mapState({
      users: state => state.user.userList
    })
  },
  methods:{
    updateAccount(){
      this.showDialog()
      if(!_.isEqual(this.currentUser,this.oldCopy)){
        this.$store.dispatch(UPDATE_USER,this.currentUser)
      }
    },
    showUser(user){
      this.currentUser = _.clone(user, true)
      this.oldCopy = user
    },
    showDialog(){
      this.dialogPop = !this.dialogPop
      
    }
  }
};
</script>

<style>
  .text-format{
    text-transform: capitalize;
  }
</style>
