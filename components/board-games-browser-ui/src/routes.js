
import * as VueRouter from 'vue-router'

import Home from './pages/Home.vue'
import ByName from './pages/ByName.vue'
import ByTag from './pages/ByTag.vue'
import Grids from './pages/Grids.vue'
import ByMonth from './pages/ByMonth.vue'
import MonthToDate from './pages/MonthToDate.vue'
import ByYear from './pages/ByYear.vue'
import YearToDate from './pages/YearToDate.vue'
import Track from './pages/ApiTrack.vue'
import Review from './pages/ApiReview.vue'
import Authenticate from './pages/ApiAuthenticate.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/games/by-name', component: ByName },
  { path: '/games/by-tag', component: ByTag },
  { path: '/stats/grids', component: Grids },
  { path: '/stats/by-month', component: ByMonth },
  { path: '/stats/month-to-date', component: MonthToDate },
  { path: '/stats/by-year', component: ByYear },
  { path: '/stats/year-to-date', component: YearToDate },
  { path: '/api/track', component: Track },
  { path: '/api/review', component: Review },
  { path: '/api/authenticate', component: Authenticate }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

export default router