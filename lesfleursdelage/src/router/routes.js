
const routes = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
        {
          name: 'Index',
          path: '',
          component: () => import('pages/Home.vue'),
          meta: {
            requiresAuth: true,
            title: 'Accueil'
          }
        },
        {
          name: 'Matters',
          path: '/classroom/:id',
          component: () => import('pages/Matters.vue'),
          meta: {
            requiresAuth: true,
            title: 'Matières'
          }
        },
        {
          name: 'Posts',
          path: '/classroom/:classroom_id/matter/:matter_id',
          component: () => import('pages/Posts.vue'),
          meta: {
            requiresAuth: true,
            title: 'Publications'
          }
        },
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          requiresNoAuth: true
        }
      },
      {
        name: 'Logout',
        path: 'logout',
        component: () => import('pages/Logout.vue'),
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
