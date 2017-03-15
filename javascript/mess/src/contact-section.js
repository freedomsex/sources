

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
      'initial',
    ],
    data() {
        return {
            detail:  false,
            confirm: false
        }
    },
    computed: {
        sent() {
            return this.item.cont_id == this.$store.state.user.uid;
        },
    },
    methods: {
        show() {
            if (this.initial) {
                this.quick();
            } else {
                this.anketa();
            }
        },
        quick() {
            this.detail = true;
            console.log('quick');
        },
        anketa() {
            window.location = '/' + this.item.cont_id;
            console.log('anketa');
        },
        close() {
            this.detail = false;
            console.log('close');
        },
        bun() {
            let data = {
                id: this.item.cont_id,
                tid: this.item.from,
                //text: this.item.message,
                //token: 'super secret token'
            };
            apiBun.send(data, null, null);
            this.$emit('remove');
            console.log('bun');
            this.close();
        },
        cancel() {
            this.confirm = false;
            console.log('cancel');
        },
        remove() {
            apiContact.remove({ tid: this.item.cont_id });
            this.$emit('remove', this.index);
            console.log('remove');
            this.close();
        }
    },
    template: '#contact-item'
});

Vue.component('quick-reply', {
    props: ['show', 'data'],
    data() {
        return {
            message: 'eeeee',
            captcha: false,
            process: false,
            confirm: false,
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
        bun() {
            this.$emit('bun');
        },
        remove() {
            this.$emit('remove');
        },
        cancel() {
            this.captcha = false;
            this.confirm = false;
            console.log('cancel');
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
    template: '#quick-reply',
});




var ContactSection = new Vue({
    el: '#contact-section',
    store,
    data: {

    },
    methods: {
        openSends() {
            router.push({ name: 'sends' });
        },
        openInit() {
            router.push({ name: 'initial' });
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