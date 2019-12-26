
const routes = [
  {
    path: '/table',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  { path: '*', redirect: '/table' },
];

export default routes;
