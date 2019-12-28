import store from '../store';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      {
        path: 'table',
        component: () => import('pages/Table.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.auth.isLoggedIn) {
            return next();
          }
          return next('/login');
        },
      },
    ],
  },
];

export default routes;
