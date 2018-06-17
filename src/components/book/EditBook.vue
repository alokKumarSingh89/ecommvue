<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs6 offset-xs2>
                <v-card>
                    <v-card-title class="blue lighten-2">
                        <h2 class="white--text" style="margin: auto;text-shadow: 3px 1px #1d3842;">Edit Book</h2>
                    </v-card-title>
                    <v-card-media :src="book.img" v-if="book" default="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png?fit=399%2C275" style="min-height: 150px;width: 150px;margin: auto;"></v-card-media>
                    <v-card-text v-if="book">
                        <v-alert :value='error' color='error'>
                            {{error}}
                        </v-alert>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field disabled v-model="book.isbn" :rules="manadatryRules" label="ISBN" required></v-text-field>
                            <v-text-field v-model="book.title" :rules="manadatryRules" label="Book Title" required></v-text-field>
                            <v-text-field v-model="book.img" :rules="manadatryRules" label="Book Image" required></v-text-field>
                            <v-menu ref="pubish" :close-on-content-click="false" v-model="pubish"
                                :nudge-right="40" :return-value.sync="book.pubish" lazy transition="scale-transition"
                                offset-y full-width min-width="290px">
                                <v-text-field slot="activator" :rules="manadatryRules" v-model="book.pubish" label="Publish Date" prepend-icon="event"
                                readonly></v-text-field>
                                <v-date-picker v-model="book.pubish" @input="$refs.pubish.save(book.pubish)"></v-date-picker>
                            </v-menu>
                            <v-text-field v-model="book.category" :rules="manadatryRules" label="Book Category" required></v-text-field>
                            <v-text-field v-model="book.noOfCopy" :rules="manadatryRules" label="Number of Copy" type="number" required></v-text-field>
                            <v-btn outline="" @click="$router.go(-1)">
                                <v-icon>chevron_left </v-icon>
                                Back
                            </v-btn>
                            <v-btn :disabled="!valid" color="blue" dark outline="" @click="submit">
                                Update<v-icon>send</v-icon>
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
import {UPDATE_BOOK} from '@/store/actionType'
export default {
    data(){
        return{
            error:'',
            valid:true,
            pubish:'',
            date:null,
            manadatryRules:[
                v => !!v || "Field required"
            ]
        }
    },
    mounted(){
        if(!this.isBookAvailble){
            this.$router.push('/dashbord/books')
        }
    },
    computed:{
        ...mapState({
            isBookAvailble:state=>state.books.books.length
        }),
        book(){
            return this.$store.getters.getBook(this.$route.params.id)
        }
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                this.$store.dispatch(UPDATE_BOOK,this.book)
                .then(result=>{
                    this.$router.push('/dashbord/books')
                },
                error=>{
                    console.log(error)
                    this.error = error.message
                })

                
            }
        }
    }
}
</script>

<style>

</style>
