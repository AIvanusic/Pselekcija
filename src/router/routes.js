const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'psizbornik', component: () => import('pages/PsizbornikPage.vue') },
      { path: 'psinformacije', component: () => import('pages/PsinformacijePage.vue') },
      { path: 'psodabrani', component: () => import('pages/PsodabraniPage.vue') },
      { path: 'test', component: () => import('pages/TestPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
