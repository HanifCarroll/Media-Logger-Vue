
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'table', component: () => import('pages/Table.vue') },
    ],
  },
  // {
  //   path: '/table',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Table.vue') },
  //   ],
  // },
  // { path: '*', redirect: '/table' },
];

export default routes;
