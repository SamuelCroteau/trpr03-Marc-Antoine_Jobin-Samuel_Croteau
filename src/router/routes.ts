import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import TesterManagerView from '../views/TesterManagerView.vue'
import TesterBugCreationView from '../views/TesterBugCreationView.vue'
import DevBugCreationView from '../views/DevBugCreationView.vue'
import TesterBugListView from '../views/TesterBugListView.vue'
import DevBugListView from '../views/DevBugListView.vue'
import DevBugDetailsView from '../views/DevBugDetailsView.vue'

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
    path: '/devBugList',
    name: 'DevBugList',
    component: DevBugListView
  },
  {
    path: '/devBugDetails/:id',
    name: 'DevBugDetails',
    component: DevBugDetailsView
  },
  {
    path: '/testerBugList',
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
