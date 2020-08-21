import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import List from '../views/List.vue'
import APropos from '../views/APropos.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    { path: '/', name: 'Tous les films', component: List },
    { path: '/1970', name: 'Années 1970', component: List, meta: { decade: "1970" } },
    { path: '/1980', name: 'Années 1980', component: List, meta: { decade: "1980" } },
    { path: '/1990', name: 'Années 1990', component: List, meta: { decade: "1990" } },
    { path: '/2000', name: 'Années 2000', component: List, meta: { decade: "2000" } },
    { path: '/2010', name: 'Années 2010', component: List, meta: { decade: "2010" } },
    { path: '/about', name: 'A propos', component: APropos }
]

const router = new VueRouter({
  routes
})

export default router
