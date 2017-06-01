
var MenuUser = new Vue({
    methods: {
        initial() {
            console.log('MenuUser')
            store.commit('showInitial', 1);
        },
        intimate() {
            store.commit('showIntimate', 1);
        },
    },
    store,
    data: {
        text: 'yyy'
    },
    el: '#menu-user',
});