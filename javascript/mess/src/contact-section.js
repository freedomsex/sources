

// var ContactViewDialog = Vue.extend({
//     methods: {
//         close() {
//             store.commit('viewPhoto', { photo: null });
//         }
//     },
//     computed: Vuex.mapState({
//         config: state => state.photoView
//     }),
//     template: '#option-content__photo-view'
// })
Vue.component('contact-item', {
    props: [
      'item',
      'index',
    ],
    data() {
        return {
            detail:  false
        }
    },
    computed: {

    },
    methods: {
        show() {
            this.detail = true;
            console.log('show');
        },
        close() {
            this.detail = false;
            console.log('close');
        }
    },
    template: '#contact-item'
});

Vue.component('human-dialog', {
    props: ['show', 'data'],
    data() {
        return {
            message: 'eeeee',
            captcha: false,
            process: false,
            code: null
        }
    },
    computed: {
        desire() {
            let d = this.data.desire;
            return (d && d.length > 1) ? true : false;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        cancel() {
            this.captcha = false;
        },
        send() {
            let data = {
                id: tid,
                mess: this.message,
                captcha_code: this.code
            };
            //apiMessages.send(data, this.handler, null);
            this.process = true;
            console.log('send');
        },
        setCode(code) {
            this.code = code;
            this.send();
        },
        handler(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha();
                }
                this.error();
            } else {
                this.sended(response);
            }
            this.process = false;
        },
        sended(response) {

        },
        captcha() {
            this.captcha = true;
        },
        error() {
            this.process = false;
        }
    },
    template: '#human-dialog',
});


var ContactSection = new Vue({
    el: '#contact-section',
    store,
    data: {

    },
    methods: {
        openSends() {
            store.commit('optionDialog', 'sends');
        },
        openInit() {
            store.commit('optionDialog', 'initial');
        }
    }
});


Vue.component('captcha-dialog', {
    props: ['show', 'data'],
    data() {
        return {
            code: ''
        }
    },
    methods: {
        close() {
            this.$emit('cancel');
        },
        send() {
            this.$emit('code', this.code);
        },
    },
    template: '#captcha-dialog',
});