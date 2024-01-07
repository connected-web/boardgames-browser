import * as VueRouter from 'vue-router'

import Home from './pages/Home.vue'

import ByName from './pages/ByName.vue'
import ByTag from './pages/ByTag.vue'

import Grids from './pages/Grids.vue'
import GraphsByMonth from './pages/GraphsByMonth.vue'
import ByMonth from './pages/ByMonth.vue'
import MonthToDate from './pages/MonthToDate.vue'
import ByYear from './pages/ByYear.vue'
import YearToDate from './pages/YearToDate.vue'
import ByAllTime from './pages/ByAllTime.vue'

import Track from './pages/ApiTrack.vue'
import ReviewPlayRecords from './pages/ReviewPlayRecords.vue'
import EditPlayRecord from './pages/EditPlayRecord.vue'
import ViewPlayRecord from './pages/ViewPlayRecord.vue'
import Tag from './pages/ApiTag.vue'

import Icons from './pages/Icons.vue'
import UserDetails from './pages/UserDetails.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/games/by-name', component: ByName },
  { path: '/games/by-name/:gameId', component: ByName, props: true },
  { path: '/games/by-tag', component: ByTag },
  { path: '/games/by-tag/:tag/:tagValue', component: ByTag, props: true },
  { path: '/stats/grids', component: Grids },
  { path: '/stats/grids/:dateCode', component: Grids, props: true },
  { path: '/graphs/by-month', component: GraphsByMonth, props: true },
  { path: '/graphs/by-month/:filters', component: GraphsByMonth, props: true },
  { path: '/stats/by-month', component: ByMonth },
  { path: '/stats/by-month/:dateCode', component: ByMonth, props: true },
  { path: '/stats/month-to-date', component: MonthToDate },
  { path: '/stats/by-year', component: ByYear },
  { path: '/stats/by-year/:dateCode', component: ByYear, props: true },
  { path: '/stats/year-to-date', component: YearToDate },
  { path: '/stats/by-all-time', component: ByAllTime },
  { path: '/api/track', component: Track },
  { path: '/api/review', component: ReviewPlayRecords },
  { path: '/api/playrecord/view/:playRecordKey', component: ViewPlayRecord, props: true },
  { path: '/api/playrecord/edit/:playRecordKey', component: EditPlayRecord, props: true },
  { path: '/api/tag', component: Tag },
  { path: '/api/tag/:gameId', component: Tag },
  { path: '/extras/icons', component: Icons },
  { path: '/user/details', component: UserDetails }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

export default router
