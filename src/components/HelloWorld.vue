<template>
  <v-container fluid style="padding-top: 0;padding-left: 0;padding-right: 0;">
      <v-layout row wrap>
          <v-flex xs12>
              <v-card>
                  <v-card-media src="/static/home.jpg" style="min-height:500px;justify-content: center;align-items: center;">
                    <div class="login-pop">
                        <h2>Hey, Congulation.Please join use to enjoy</h2>
                        <v-btn dark to="/signin" color="blue">
                          <v-icon left>lock_open</v-icon>
                          Sign in
                        </v-btn>
                    </div>
                  </v-card-media>
              </v-card>
              <v-card-text>
                <v-layout row wrap>
                    <v-flex xs3 v-for="item in content" :key="item.name">
                      <v-card>
                          <v-card-title>{{item.name}}</v-card-title>
                      </v-card>
                    </v-flex>
                </v-layout>
              </v-card-text>
          </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
export default {
  data(){
    return{
      content:[
        {name:'TEst'},
        {name:'TEst1'},
        {name:'TEst2'},
        {name:'TEst3'},
        {name:'TEst4'},
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-pop{
  margin: auto;
  text-align: center;
  color: #fff;
}
.login-pop h2{
  font-size: 42px;
    text-shadow: 3px 1px 3px #62b5f6bf;
    color: #1767a7;
    font-weight: 500;
}
</style>
