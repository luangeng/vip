import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Person from '@/components/Person'
import PersonList from '@/components/PersonList'
import Events from '@/components/Events'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/person',
      name: 'Person',
      component: Person
    },{
      path: '/personList',
      name: 'PersonList',
      component: PersonList
    },{
      path: '/events',
      name: 'Events',
      component: Events
    }
  ]
})
