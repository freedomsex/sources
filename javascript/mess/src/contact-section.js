
var ContactSection = new Vue({
    methods: {
        openInit() {
            store.commit('showInitial', 1);
        },
        openIntim() {
            console.log(111)
            store.commit('showIntimate', 1);
        },
        openSends() {
            store.commit('showSends', 1);
        },
    },
    store,
    el: '#contact-section',
});
