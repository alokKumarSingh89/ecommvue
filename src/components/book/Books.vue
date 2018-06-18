<template>
    <v-container>
        <v-card>
            <div>
                <v-btn fab top right absolute class="blue" dark router :to="{name:'NewBook'}">
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
            <v-data-table :headers="headers"  :items="books" hide-actions class="elevation-1" :pagination.sync="pagination">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.isbn }}</td>
                    <td>{{ props.item.title }}</td>
                    <td> <img :src="props.item.img" alt="Smiley face" height="42" width="42" /></td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ props.item.noOfCopy }}</td>
                    <td>{{ props.item.pubish }}</td>
                    <td v-if="user.role == 1">
                      <v-btn dark fab color="blue" small :to="'/dashbord/book/'+props.item.id">
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </td>
                    <td v-if="user.role == 1">
                      <v-btn fab small color="red" dark @click="delete(props.item)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages" circle ></v-pagination>
            </div>
        </v-card>
        
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
      pagination: { rowsPerPage: 7 },
      headers: [
        { text: "ISBN", value: "isbn" },
        { text: "Title", value: "title" },
        { text: "Img", value: "img" },
        { text: "Category", value: "category" },
        { text: "No of Copy", value: "noOfCopy" },
        { text: "Publish", value: "pubish" },
        { text: "Edit", sortable: false },
        { text: "Delete", sortable: false }
      ]
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      books: state => state.books.books,
      user: state => state.user.user
    }),
    loadData() {
      if (this.token) {
        this.$store.dispatch(FETCH_BOOK);
      }
    },
    pages() {
      this.loadData;
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  methods: {
    delete(item) {
      alert("item");
    }
  }
};
</script>

<style>

</style>
