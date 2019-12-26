
const routes = [
  {
    path: '/table',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Table.vue') },
    ],
  },
  { path: '*', redirect: '/table' },
];

export default routes;
