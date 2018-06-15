<template>
    <v-container>
        <v-card>
            <div>
                <v-btn fab top right absolute class="blue" dark router :to="{name:'NewBook'}">
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
            <v-data-table :headers="headers"  :items="books" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.isbn }}</td>
                    <td>{{ props.item.title }}</td>
                    <td> <img :src="props.item.img" alt="Smiley face" height="42" width="42" /></td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ props.item.noOfCopy }}</td>
                    <td>{{ props.item.pubish }}</td>
                    <td>
                      <v-btn dark fab color="blue" small>
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn fab small color="red" dark>
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>
        {{loadData}}
    </v-container>
    
</template>

<script>
import { FETCH_BOOK } from "@/store/actionType";
import { mapState } from "vuex";
export default {
  data() {
    return {
      filters: {
        model: {},
        fields: null
      },
      headers: [
        { text: "ISBN", value: "isbn" },
        { text: "Title", value: "title" },
        { text: "Img", value: "img" },
        { text: "Category", value: "category" },
        { text: "No of Copy", value: "noOfCopy" },
        { text: "Publish", value: "pubish" },
        { text:'Edit',sortable:false},
        { text:'Delete',sortable:false}
      ]
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      books: state => state.books.books
    }),
    loadData() {
      if (this.token) {
        this.$store.dispatch(FETCH_BOOK);
      }
    }
  }
};
</script>

<style>
</style>
