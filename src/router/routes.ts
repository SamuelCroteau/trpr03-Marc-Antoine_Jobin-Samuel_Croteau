import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import TesterManagerView from '../views/TesterManagerView.vue'
import TesterBugCreationView from '../views/TesterBugCreationView.vue'
import DevBugCreationView from '../views/DevBugCreationView.vue'
import TesterBugListView from '../views/TesterBugListView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/testerManager',
    name: 'TesterManager',
    component: TesterManagerView
  },
  {
    path: '/testerBugCreation',
    name: 'TesterBugCreation',
    component: TesterBugCreationView
  },
  {
    path: '/devBugCreation',
    name: 'DevBugCreation',
    component: DevBugCreationView
  },
  {
    path: '/DevBugList',
    name: 'DevBugList',
    component: DevBugCreationView
  },
  {
    path: '/TesterBugList',
    name: 'TesterBugList',
    component: TesterBugListView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

export default routes
