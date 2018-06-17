import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/users/Signin'
import SignUp from '@/components/users/Signup'
import UserList from '@/components/users/UserList'
import EditProfile from '@/components/users/EditProfile'
import Profile from '@/components/users/Profile'
import DashBoard from '@/components/dashboard/Dashboard'
import DashBoardIndex from '@/components/dashboard/DashBoardIndex'

import NewBook from '@/components/book/NewBook';
import Books from '@/components/book/Books';
import EditBook from '@/components/book/EditBook';

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/Signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashbord',
      name: 'Dashboard',
      component: DashBoard,
      children:[
        {
          path:'',
          component:DashBoardIndex
        },
        {
          path:'profile',
          name:'Profile',
          component:Profile
        },
        {
          path:'profile/edit',
          name:'EditProfile',
          component:EditProfile
        },
        {
          path:'add-book',
          name:'NewBook',
          component:NewBook
        },
        {
          path:'books',
          name:'BookList',
          component:Books
        },
        {
          path:'book/:id',
          name:'EditBook',
          component:EditBook
        },
        {
          path:'user-managment',
          name:'UserManagment',
          component:UserList
        }
      ]
    }
  ]
})
