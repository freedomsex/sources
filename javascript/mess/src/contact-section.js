
var ContactSection = new Vue({
    el: '#contact-section',
    store,
    data: {

    },
    methods: {
        push(name) {
            if (router.name != name) {
                router.push({ name });
            }
        },
        openSends() {
            this.push('sends');
        },
        openInit() {
            this.push('initial');
        },
        openIntim() {
            this.push('intimate');
        }
    }
});
