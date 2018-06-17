import Vue from 'vue';
import Vuex from 'vuex';
import {UserModule} from '@/store/UserModule'
import { DashboadModule } from './DashboadModule';
import { BookModule } from './BookModule';

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        loading:false,
        rootUrl:'/'
    },
    mutations:{
        Loading(state,payload){
            state.loading = payload
        },
        setRootUrl(state,payload){
            state.rootUrl = payload
        }
    },
    modules:{
        user:UserModule,
        dashboad:DashboadModule,
        books:BookModule
    },
    actions:{
        Loading({commit},payload){
            commit('Loading',payload);
        }
    }
})