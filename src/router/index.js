import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const TimeEntry = () => import('@/views/TimeEntry')

const Colors = () => import('@/components/theme/Colors')

// Views - Icons
const Flags = () => import('@/components/icons/Flags')
const FontAwesome = () => import('@/components/icons/FontAwesome')
const SimpleLineIcons = () => import('@/components/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/components/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/components/notifications/Alerts')
const Badges = () => import('@/components/notifications/Badges')
const Modals = () => import('@/components/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/Page404')
const Page500 = () => import('@/views/Page500')
const Login = () => import('@/views/Login')


Vue.use(Router)

export const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true },
        },
        {
          path: 'time',
          name: 'TimeEntry',
          component: TimeEntry,
          meta: { requiresAuth: true },
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          meta: { requiresAuth: true },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors,
              meta: { requiresAuth: true },
            },
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          meta: { requiresAuth: true },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons,
              meta: { requiresAuth: true },
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags,
              meta: { requiresAuth: true },
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome,
              meta: { requiresAuth: true },
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons,
              meta: { requiresAuth: true },
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          meta: { requiresAuth: true },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts,
              meta: { requiresAuth: true },
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges,
              meta: { requiresAuth: true },
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals,
              meta: { requiresAuth: true },
            }
          ]
        }
      ]
    },
    {
      path: '/500',
      name: 'Page500',
      component: Page500,
      meta: { requiresAuth: false },
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404,
      meta: { requiresAuth: false },
    },
    {
      path: '*',
      redirect: '/404',
      name: '404',
      component: {
        render (c) { return c('router-view') }
      },
      meta: { requiresAuth: false },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  
  if (requiresAuth && !isAuthenticated) {
      next('login')
  } else if (!requiresAuth && isAuthenticated) {
      next()
  } else {
      next()
  }
})