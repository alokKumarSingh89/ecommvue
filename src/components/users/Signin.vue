<template>
    <v-container fluid class="no-padding">
        <v-layout row wrap>
            <v-flex xs0 md8>
                <div class="bcimg"></div>
            </v-flex>
            <v-flex xs12 md4>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-alert :value=errorMsg :color=errorType outline>
                        {{errorMsg}}
                    </v-alert>
                    <h2 class="blue--text">Login</h2>
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail"
                        required>
                    </v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules"
                        label="Password" type="password" required>
                    </v-text-field>
                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-btn :disabled="!valid" color="blue" dark outline=""
                                @click="submit">submit
                            </v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn flat color="blue" to="/signup">Register to your self</v-btn>
                        </v-flex>
                    </v-layout>
                    
                     
                    <!-- <v-btn @click="clear">clear</v-btn> -->
                    </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {SIGN_IN} from '@/store/actionType'
export default {
  name: "Login",
  data() {
    return {
      errorMsg: null,
      errorType: "",
      valid: true,
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      email: "",
      emailRules: [v => !!v || "E-mail is required"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(SIGN_IN, {
            email: this.email,
            password: this.password
          })
          .then(
            response => {
              this.errorMsg = response;
              this.errorType = "success";
              setTimeout(() => {
                this.errorMsg = null;
                this.$router.push('/dashbord')
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
<style scoped>
.no-padding {
  padding: 0;
}
.bcimg {
  background-image: url("/static/home.jpg");
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
form {
  padding: 5em 4em;
}
form label {
  font-size: 21px;
  font-weight: 700;
}
.application .theme--dark.btn.btn--disabled:not(.btn--icon):not(.btn--flat),
.theme--dark .btn.btn--disabled:not(.btn--icon):not(.btn--flat) {
  background-color: hsla(0, 74%, 53%, 0.63) !important;
}
</style>


