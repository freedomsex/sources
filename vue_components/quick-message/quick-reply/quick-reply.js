
Vue.component('quick-reply', {
    props: ['humanId', 'message'],
    extends: QuickMessage,
    template: '#quick-reply',
});

