import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from '~store';

import SexConfirm from '~dialogs/SexConfirm';

import SearchSettings from '~activities/SearchSettings';
import AccountSettings from '~activities/AccountSettings';

import AccountActivity from '~activities/AccountActivity';

Vue.use(VueRouter);

const routes = [
  {
    path: '/write/:humanId(\\d+)/(.*)?',
    name: 'quickWrite',
    component: () => import('~dialogs/quick-message/QuickMessage'),
    props: true,
    beforeEnter: (to, from, next) => (store.state.user.sex ? next() : next('/confirm-sex/message')),
  },
  {
    path: '/initial/(.*)?',
    name: 'initial',
    component: () => import('~components/contacts/ContactInitial'),
    props: {
      reply: true,
    },
    // beforeEnter: (to, from, next) => store.state.user.sex ? next() :
    // next('/confirm-sex/messages'),
    children: [
      {
        path: ':humanId(\\d+)/(.*)?',
        name: 'quickReply',
        meta: {
          back: '/initial',
        },
        component: () => import('~dialogs/quick-message/QuickReply'),
        props: true,
      },
    ],
  },
  {
    path: '/intimate/(.*)?',
    name: 'intimate',
    component: () => import('~components/contacts/ContactIntimate'),
    props: true,
    // beforeEnter: (to, from, next) => store.state.user.sex ? next() :
    // next('/confirm-sex/messages'),
    children: [
      {
        path: ':humanId(\\d+)/(.*)?',
        name: 'dialog',
        meta: {
          back: '/intimate',
        },
        component: () => import('~activities/messages-activity/MessagesActivity'),
        props: true,
        children: [
          {
            path: 'uploads',
            name: 'uploads',
            meta: {
              back: '.',
            },
            component: () => import('~activities/photo-settings/PhotoSettings'),
            props: true,
          },
          {
            path: 'incoming',
            name: 'incoming',
            meta: {
              back: '.',
            },
            component: () => import('~activities/IncomingPhoto'),
            props: true,
          },
          // { path: 'preview', name: 'preview', component: PhotoViewer, props: true },
        ],
      },
    ],
  },
  {
    path: '/confirm-sex/:show?',
    component: SexConfirm,
    props: true,
  },
  {
    path: '/protect',
    component: () => import('~activities/ModeratorActivity'),
  },

  {
    path: '/content/deal/:link/:locale?',
    component: () => import('~activities/content/DealPage'),
    props: true,
  },
  {
    path: '/content/rules/:locale?',
    component: () => import('~activities/content/RulesPage'),
    props: true,
  },
  {
    path: '/agreement/:locale?',
    component: () => import('~activities/content/Agreement'),
    props: true,
  },
  {
    path: '/content/careers/:locale?',
    component: () => import('~activities/content/CareersPage'),
    props: true,
  },
  {
    path: '/help/:link/:locale?',
    component: () => import('~activities/content/HelpPage'),
    props: true,
  },
  {
    path: '/releases/:link/:locale?',
    component: () => import('~activities/content/Release'),
    props: true,
  },
  // { path: '/promo/:link', component: ContentModal, props: true },

  {
    path: '(.*)?/settings/search',
    meta: {
      back: '/',
    },
    component: SearchSettings,
    beforeEnter: (to, from, next) => (store.state.user.sex ? next() : next('/confirm-sex/search')),
  },
  {
    path: '(.*)?/settings/account',
    component: AccountSettings,
    beforeEnter: (to, from, next) => (store.state.user.sex ? next() : next('/confirm-sex/account')),
  },
  {
    path: '(.*)?/settings/other',
    component: () => import('~activities/OtherSettings'),
  },
  {
    path: '(.*)?/settings/about',
    meta: {
      back: 'other',
    },
    component: () => import('~activities/AboutSettings'),
  },
  {
    path: '(.*)?/settings/social',
    meta: {
      back: 'other',
    },
    component: () => import('~activities/SocialSettings'),
  },
  {
    path: '(.*)?/settings/desires',
    meta: {
      back: 'other',
    },
    component: () => import('~activities/DesiresSettings'),
    beforeEnter: (to, from, next) => (store.state.user.sex ? next() : next('/confirm-sex/search')),
  },
  {
    path: '(.*)?/settings/security',
    meta: {
      back: 'other',
    },
    component: () => import('~activities/SecuritySettings'),
  },
  {
    path: '(.*)?/settings/reviews',
    meta: {
      back: 'other',
    },
    component: () => import('~activities/ReviewSettings.vue'),
  },
  {
    path: '(.*)?/settings/question',
    meta: {
      back: 'other',
    },
    component: () => import('~activities/QuestionActivity.vue'),
  },
  {
    path: '(.*)?/settings/envelop',
    meta: {
      back: 'other',
    },
    component: () => import('~activities/EnvelopSettings'),
  },
  {
    path: '(.*)?/wizard/city',
    meta: {
      back: '/settings/account',
    },
    component: () => import('~activities/CityWizard'),
    beforeEnter: (to, from, next) => (store.state.user.sex ? next() : next('/confirm-sex/search')),
  },
  // { path: '/', name: 'search', component: SearchActivity,
  // beforeEnter: (to, from, next) => store.state.user.sex ? next() :
  // next('/confirm-sex/search'),
  //     children: [
  //         { path: ':humanId(\\d+)/(.*)?', name: 'quickMessage',
  // meta: {back: '/search'}, component: QuickMessage, props: true },
  //     ]
  // },
  {
    path: '/languages',
    component: () => import('~activities/LaguagesActivity'),
  },
  {
    path: '/credits',
    component: () => import('~activities/Credits/Summary'),
  },
  {
    path: '/trust',
    component: () => import('~activities/Credits/Status'),
  },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//     console.log('router:', [to, from]);
//     next();
// });

// =================================================================
//
// =================================================================

const settingsRouter = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/search/settings/account',
      meta: {
        back: 'search',
      },
      component: AccountSettings,
    },

    {
      path: '(.*)?/:humanId(\\d+)/detail',
      component: AccountActivity,
      props: true,
    },
    {
      path: '(.*)?/notepad',
      component: () => import('~activities/Notepad'),
      props: true,
    },
    {
      path: '(.*)?/cliche',
      component: () => import('~activities/MessagesCliche'),
      props: true,
    },
    // { path: '(.*)?/uploads', component: PhotoSettings },
    // { path: '(.*)?/preview', name: 'preview', component: PhotoViewer, props: true },

    {
      path: '/login',
      name: 'login',
      component: () => import('~activities/LoginAccount'),
    },
  ],
});

settingsRouter.beforeEach((to, from, next) => {
  // console.log('sRouter:', [to, from]);
  if (!to.meta.back) {
    to.meta.back = from.fullPath;
  }
  next();
});

export {Vue, router, settingsRouter};
// window.onbeforeunload = function(e) {
//   var dialogText = 'Вы действительно хотите покинуть приложение?';
//   e.returnValue = dialogText;
//   return dialogText;
// };

// //
// РОУТЕР ==========================================================
// //

// const routes = [
//     { path: '/sends-contacts', name: 'sends', component: SendsDialog, props: { quick: false } },
//     { path: '/initial-contacts', name: 'initial',
// component: InitialDialog, props: { quick: true } },
//     { path: '/intimate-contacts',  name: 'intimate',
// component: IntimateDialog, props: { quick: false },
//         // children: [
//         //     {
//         //         path: 'quick-reply',
//         //         component: HumanDialog,
//         //         props: {
//         //             show : true
//         //         }
//         //     },
//         // ]
//     }
// ];
