<template>
  <v-container fluid style="padding-top: 0;padding-left: 0;padding-right: 0;">
      <v-layout row wrap>
          <v-flex xs12>
              <v-card>
                  <v-card-media src="/static/home.jpg" style="min-height:500px;justify-content: center;align-items: center;">
                    <div class="login-pop">
                        <h2>Hey, Congulation.Please join use to enjoy</h2>
                        <v-btn dark to="/signin" color="blue" large>
                          <v-icon left>lock_open</v-icon>
                          Sign in
                        </v-btn>
                    </div>
                  </v-card-media>
              </v-card>
              <v-card-text>
                <v-layout row wrap style="justify-content: space-between;">
                    <v-flex xs3 v-for="item in content" :key="item.name" class="mb-3 ml-1">
                      <v-card class="img-card">
                          <v-card-media :src="item.img" height="200px" class="image"></v-card-media>
                          <v-card-title  primary-title>
                            <h3 class="headline mb-0">{{item.name}} </h3>
                            <p class="grey--text darken-1"> {{item.desc}} </p>
                          </v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-card class="grey lighten-2">
                          <v-container fluid grid-list-lg>
                            <v-layout row>
                              <v-flex xs7>
                                <div>
                                  <div class="headline">Library</div>
                                  <div class="grey--text darken-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. A quae molestias, delectus totam, sit omnis et placeat saepe sint eveniet nobis explicabo? Eum soluta autem maiores minus ex! At, officia? </div>
                                </div>
                              </v-flex>
                              <v-flex xs5>
                                <v-card-media src="https://picsum.photos/800/400/?image=421" height="200px" contain></v-card-media>
                              </v-flex>
                            </v-layout>
                          </v-container>
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
  data() {
    return {
      content: [
        {
          name: "Mathemetis",
          img: "https://picsum.photos/800/400/?image=434",
          desc:
            "Mathematicians seek and use patterns[8][9] to formulate new conjectures; they resolve the truth or falsity of conjectures by mathematical proof. When mathematical structures are good models of real phenomena, "
        },
        {
          name: "Physics",
          img: "https://picsum.photos/800/400/?image=435",
          desc:
            "Physics. science. Physics, science that deals with the structure of matter and the interactions between the fundamental constituents of the observable universe. In the broadest sense, physics (from the Greek physikos"
        },
        {
          name: "Chemistry",
          img: "https://picsum.photos/800/400/?image=424",
          desc:
            "Chemistry is the scientific discipline involved with compounds composed of atoms, i.e. elements, and molecules, i.e. combinations of atoms: their composition, structure, properties, behavior and the changes they "
        },
        {
          name: "Biology",
          img: "https://picsum.photos/800/400/?image=436",
          desc:
            "Biology is the natural science that studies life and living organisms, including their physical structure, chemical composition, function, development and evolution. Despite the complexity of the science, there are "
        },
        {
          name: "Computer Science",
          img: "https://picsum.photos/800/400/?image=420",
          desc:
            "A computer is a device that can be instructed to carry out sequences of arithmetic or logical operations"
        },
        {
          name: "IT",
          img: "https://picsum.photos/800/400/?image=421",
          desc:
            "A computer is a device that can be instructed to carry out sequences of arithmetic or logical operations"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-pop {
  margin: auto;
  text-align: center;
  color: #fff;
}
.login-pop h2 {
  font-size: 42px;
  text-shadow: 3px 1px 3px #62b5f6bf;
  color: #1767a7;
  font-weight: 500;
}
.headline {
  font-weight: bold;
  color: #8e8c8c;
  /* : 28px; */
}
.img-card .image{
  transition: transform .8s;
}
.img-card:hover .image {
  opacity: 0.5;
  cursor: pointer;
  transform: scale(0.8); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.img-card:hover .middle {
  opacity: 1;
}
</style>
