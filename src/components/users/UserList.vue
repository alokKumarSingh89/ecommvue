<template>
    <div>User List
        {{users}}
    </div>
</template>

<script>
import {FTECH_USER} from '@/store/actionType'
import {mapState} from 'vuex'
export default {
    mounted(){
        this.$store.dispatch(FTECH_USER)
    },
    computed:{
        ...mapState({
            users:state=>state.user.userList
        })
        
    }
}
</script>

<style>

</style>
