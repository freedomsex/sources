
////
// РОУТЕР ==========================================================
////

const routes = [
    { path: '/sends-contacts', name: 'sends', component: SendsDialog, props: { quick: false } },
    { path: '/initial-contacts', name: 'initial', component: InitialDialog, props: { quick: true } },
    { path: '/intimate-contacts',  name: 'intimate', component: IntimateDialog, props: { quick: false },
        // children: [
        //     {
        //         path: 'quick-reply',
        //         component: HumanDialog,
        //         props: {
        //             show : true
        //         }
        //     },
        // ]
    }
];

// 3. Создаём инстанс роутера с опцией `routes`
// Можно передать и другие опции, но пока не будем усложнять
const router = new VueRouter({
  //mode: 'history',
  routes // сокращение от routes: routes
})

const RouterView = new Vue({
    el: '#router-view',
    store,
    router,
    created() {
        console.log('routerView created');
    },
    methods: {
        close() {
            router.go(-1);
        }
    }
});

