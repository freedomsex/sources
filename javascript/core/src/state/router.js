
// window.onbeforeunload = function(e) {
//   var dialogText = 'Вы действительно хотите покинуть приложение?';
//   e.returnValue = dialogText;
//   return dialogText;
// };

////
// РОУТЕР ==========================================================
////

// const routes = [
//     { path: '/sends-contacts', name: 'sends', component: SendsDialog, props: { quick: false } },
//     { path: '/initial-contacts', name: 'initial', component: InitialDialog, props: { quick: true } },
//     { path: '/intimate-contacts',  name: 'intimate', component: IntimateDialog, props: { quick: false },
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

var routes = [
    { path: '/write/:humanId(\\d+)/(.*)?', name: 'quickWrite', component: QuickMessage, props: true,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/message')
    },
    // { path: '/', name: 'search', component: SearchActivity,
    //     beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search'),
    //     children: [
    //         { path: ':humanId(\\d+)/(.*)?', name: 'quickMessage', meta: {back: '/search'}, component: QuickMessage, props: true },
    //     ]
    // },
    { path: '/initial/(.*)?', name: 'initial', component: InitialDialog, props: {reply: true},
        //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
        children: [
            { path: ':humanId(\\d+)/(.*)?', name: 'quickReply', meta: {back: '/initial'}, component: QuickReply, props: true },
        ]
    },
    { path: '/intimate/(.*)?', name: 'intimate', component: IntimateDialog, props: true,
        //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
        children: [
            { path: ':humanId(\\d+)/(.*)?', name: 'dialog', meta: {back: '/intimate'}, component: MessagesActivity, props: true,
                children: [
                    { path: 'uploads', name: 'uploads', meta: {back: '.'}, component: PhotoSettings, props: true },
                    { path: 'incoming', name: 'incoming', meta: {back: '.'}, component: IncomingPhoto, props: true },
                    // { path: 'preview', name: 'preview', component: PhotoViewer, props: true },
                ]
            },
        ]
    },
    { path: '/confirm-sex/:show?', component: SexConfirm, props: true },
    { path: '/protect', component: ModeratorActivity },

    { path: '/content/deal/:link/:locale?', component: DealContentPage, props: true },
    { path: '/content/rules/:locale?', component: RulesContentPage, props: true },
    { path: '/content/careers/:locale?', component: СareersContentPage, props: true },
    { path: '/help/:link/:locale?', component: HelpContentPage, props: true },
    { path: '/promo/:link', component: ContentModal, props: true },

    { path: '(.*)?/settings/search', meta: {back: '/'}, component: SearchSettings,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search')
    },
    { path: '(.*)?/settings/account', component: AccountSettings,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/account')
    },
    { path: '(.*)?/settings/other', component: OtherSettings },
    { path: '(.*)?/settings/about', meta: {back: 'other'}, component: AboutSettings },
    { path: '(.*)?/settings/social', meta: {back: 'other'}, component: SocialSettings },
    { path: '(.*)?/settings/desires', meta: {back: 'other'}, component: DesiresSettings ,
            beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search')
    },
    { path: '(.*)?/settings/security', meta: {back: 'other'}, component: SecuritySettings },
    { path: '(.*)?/wizard/city', meta: {back: '/settings/account'}, component: CityWizard,
        beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/city')
    },

];

var router = new VueRouter({
  //mode: 'history',
  routes
});

// router.beforeEach((to, from, next) => {
//     console.log('router:', [to, from]);
//     next();
// });

// =================================================================
//
// =================================================================

var settingsRouter = new VueRouter({
    //mode: 'history',
    routes: [
        { path: '/search/settings/account', meta: {back: 'search'}, component: AccountSettings },

        { path: '(.*)?/:humanId(\\d+)/detail', component: AccountActivity, props: true },
        { path: '(.*)?/notepad', component: Notepad, props: true },
        // { path: '(.*)?/uploads', component: PhotoSettings },
        // { path: '(.*)?/preview', name: 'preview', component: PhotoViewer, props: true },

        { path: '/login', name: 'login', component: LoginAccount },
    ]
});

settingsRouter.beforeEach((to, from, next) => {
    // console.log('sRouter:', [to, from]);
    if (!to.meta.back) {
        to.meta.back = from.fullPath;
    }
    next();
});