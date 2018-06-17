
import {
    INIT, SET_USER, SIGN_IN, LOG_OUT,
    SIGN_UP,SETUP_USER_ACCOUT_DETAIL,
    UPDATE_PROFILE,FTECH_USER
} from '@/store/actionType';
import firebase from 'firebase'
import axios from 'axios'
export const UserModule = {
    state: {
        user: null,
        token:null,
        userList:[]
    },
    mutations: {
        [FTECH_USER](state,payload){
            state.userList = payload
        },
        [SET_USER](state, payload) {
            state.user = payload
        },
        [UPDATE_PROFILE](state,payload){
            state.user = {...state.user, ...payload}
        },
        SETUP_TOKEN(state,payload){
            state.token = payload
        }
    },
    actions: {
        [FTECH_USER]({commit},payload){
            axios.get('/users.json')
            .then(result=>{
                let users = [];
                for(let key in result.data){
                    users.push({
                        id:key,
                        ...result.data[key]
                    })
                }
                commit(FTECH_USER, users);
                
            })
        },
        RE_GENERATE_TOKEN({commit}){
            firebase.auth().currentUser.getIdToken().then(result=>{
                commit('SETUP_TOKEN',result)
            })
        },
        [INIT]({ commit }, payload) {
            let user = JSON.parse(localStorage.getItem('data'))
            commit(SET_USER, user)
        },
        [SET_USER]({ commit }, payload) {
            commit('Loading',true)
            let currentUser = firebase.auth().currentUser
            this.dispatch('RE_GENERATE_TOKEN')
            let user = {
                displayName: currentUser.displayName,
                email: currentUser.email,
                fid: currentUser.uid
            }

            localStorage.setItem('data', JSON.stringify(user))
            commit('setRootUrl','/dashbord')
            firebase.database().ref('users/' + currentUser.uid).once('value')
            .then((snapshot) => {
                let userdetails = snapshot.val();
                user = {...user,...userdetails,displayName:userdetails.firstName+' '+userdetails.lastName}
                commit(SET_USER, user);
                commit('Loading',false)
            })
            
        },
        [SIGN_IN]({ commit }, payload) {
            commit('Loading',true)
            return new Promise((resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                    .then(user => {
                        this.dispatch(SET_USER)
                        commit('Loading',false)
                        resolve('SuceessFully login')
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        [SIGN_UP]({ commit }, payload) {
            return new Promise((resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(response => {
                        // console.log(response.user)
                        this.dispatch(SETUP_USER_ACCOUT_DETAIL,response)
                        resolve('Sucessfully account created')
                        this.dispatch(SET_USER)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        [LOG_OUT]({ commit }) {
            firebase.auth().signOut()
            localStorage.clear('data')
            commit(SET_USER, null)
            commit('setRootUrl','/')
        },
        [SETUP_USER_ACCOUT_DETAIL]({ commit }, payload) {
            firebase.database().ref('users/' + payload.user.uid).set({
                role: '',
                firstName: '',
                lastName: '',
                id: '',
                phone: '',
                sex: '',
                verified:false,
                completed:false
            })
        },
        [UPDATE_PROFILE]({commit},payload){
            return new Promise((resolev,reject)=>{
                let user = {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    id: payload.id,
                    phone: payload.phone,
                    sex: payload.sex,
                    completed:true
                }
                firebase.database().ref('users/' + payload.fid).update(user,(error)=>{
                    if(error){
                        reject(error)
                    }else{
                        resolev('Succussfuly update')
                        commit(UPDATE_PROFILE,user)
                    }
                })
            })
            
        }
    }
}