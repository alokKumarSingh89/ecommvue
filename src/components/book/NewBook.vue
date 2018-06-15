<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs6 offset-xs2>
                <v-card>
                    <v-card-title class="blue lighten-2">
                        <h2 class="white--text" style="margin: auto;text-shadow: 3px 1px #1d3842;">Add New Book</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-alert :value='error' color='error'>
                            {{error}}
                        </v-alert>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="isbn" :rules="manadatryRules" label="ISBN" required></v-text-field>
                            <v-text-field v-model="title" :rules="manadatryRules" label="Book Title" required></v-text-field>
                            <v-text-field v-model="img" :rules="manadatryRules" label="Book Image" required></v-text-field>
                            <v-menu ref="pubish" :close-on-content-click="false" v-model="pubish"
                                :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition"
                                offset-y full-width min-width="290px">
                                <v-text-field slot="activator" :rules="manadatryRules" v-model="date" label="Publish Date" prepend-icon="event"
                                readonly></v-text-field>
                                <v-date-picker v-model="date" @input="$refs.pubish.save(date)"></v-date-picker>
                            </v-menu>
                            <v-text-field v-model="category" :rules="manadatryRules" label="Book Category" required></v-text-field>
                            <v-text-field v-model="noOfCopy" :rules="manadatryRules" label="Number of Copy" type="number" required></v-text-field>
                            <v-btn :disabled="!valid" color="blue" dark outline="" @click="submit">submit</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {ADD_BOOK} from '@/store/actionType'
export default {
    data(){
        return{
            valid:true,
            error:'',
            isbn:'',
            title:'',
            date:null,
            pubish:'',
            category:'',
            noOfCopy:'',
            img:'',
            manadatryRules:[
                v => !!v || "Field required"
            ]
        }
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                let book = {
                    isbn:this.isbn,
                    title:this.title,
                    pubish:this.date,
                    category:this.category,
                    noOfCopy:this.noOfCopy,
                    img:this.img
                }
                this.$store.dispatch(ADD_BOOK,book)
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
