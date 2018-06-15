import firebase from 'firebase'
import axios from 'axios'
let _ = require('lodash')
import { ADD_BOOK, FETCH_BOOK } from '@/store/actionType'
export const BookModule = {
    state: {
        books: []
    },
    mutations: {
        SET_BOOK(state, payload) {
            state.books = payload
        }
    },
    actions: {
        CheckBookStore({commit,state}){
            if(state.books.length == 0){
                this.dispatch(FETCH_BOOK)
            }
        },
        [FETCH_BOOK]({ commit }, payload) {
            axios.get('/books.json').then(result => {
                let books = []
                for (let key in result.data) {
                    books.push({ id: key, ...result.data[key] })
                }
                commit('SET_BOOK', books);
            })
        },
        [ADD_BOOK]({ state, commit }, payload) {
            commit('Loading', true);
            return new Promise((resolve, reject) => {
                const book = _.findIndex(state.books, { 'isbn': payload.isbn })
                if (book > 0) {
                    reject({message:'Book Already Exits'})
                    commit('Loading', false);
                } else {
                    firebase.database().ref('books').push(payload)
                        .then(response => {
                            resolve(response)
                            commit('Loading', false);
                        })
                        .catch(error => {
                            reject(error)
                            commit('Loading', false);
                        })
                }

            })

        }
    }
}