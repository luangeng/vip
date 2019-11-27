import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Person from '@/components/Person'
import PersonList from '@/components/PersonList'
import Events from '@/components/Event'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/person',
      name: 'person',
      component: Person
    },{
      path: '/personList',
      name: 'personList',
      component: PersonList
    },{
      path: '/event',
      name: 'event',
      component: Events
    }
  ]
})
