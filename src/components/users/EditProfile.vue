<template>
<v-container fluid class="no-padding">
        <v-layout row wrap>
            <v-flex xs8 offset-xs2>
                <v-form ref="form" v-model="valid" lazy-validation class="mb-3">
                    <v-alert :value=errorMsg :color=errorType outline>
                        {{errorMsg}}
                    </v-alert>
                    <h4 class="blue--text">Update Profile</h4>
                    <v-text-field v-model="user.id" :rules="nameRules" label="Your ID"
                        required>
                    </v-text-field>
                    <v-text-field v-model="user.firstName" :rules="nameRules" label="First Name"
                        required>
                    </v-text-field>
                    <v-text-field v-model="user.lastName" :rules="nameRules" label="Last Name"
                        required>
                    </v-text-field>
                    <v-text-field v-model="user.phone" :rules="phoneRules" :count="10" label="Phone Number"
                        required type="number">
                    </v-text-field>
                    <v-select v-model="user.sex" :items="gender" :rules="[v => !!v || 'Sex is required']"
                        label="Sex" required></v-select>
                    <v-btn :disabled="!valid" color="blue" dark outline=""
                                @click="submit">submit
                            </v-btn>
                    </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import { UPDATE_PROFILE } from "@/store/actionType";
export default {
  name: "EditProfile",
  data() {
    return {
      valid: true,
      errorMsg: "",
      errorType: "",
      gender: ["Male", "Female"],
      nameRules: [v => !!v || "Please enter data.It is required"],
      phoneRules: [
        v => !!v || "Phone is required",
        v => (v && v.length >= 10) || "Phone must be gretter than 9 number"
      ]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(UPDATE_PROFILE, this.user).then(
          response => {
            this.errorMsg = response;
            this.errorType = "success";
            setTimeout(() => {
              this.errorMsg = null;
              this.$router.push("/dashbord");
            }, 3000);
          },
          error => {
            this.errorMsg = error.message;
            this.errorType = "error";
            setTimeout(() => {
              this.errorMsg = null;
            }, 3000);
          }
        );
      }
    }
  }
};
</script>

<style>
</style>
