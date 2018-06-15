import axios from 'axios'
const url = 'https://vuelibrary-17ec0.firebaseio.com'
export default function setup(store){
    axios.interceptors.request.use((config)=>{
        config.url = url+config.url + "?auth="+store.state.user.token
        return config
    }),
    axios.interceptors.response.use(undefined,(config)=>{
        console.log(config)
    })
}