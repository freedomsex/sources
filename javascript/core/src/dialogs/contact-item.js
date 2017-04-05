
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
        }
    },
    methods: {
        show() {
            //this.$emit('show');
            console.log('show = initial-item');
            if (this.initial) {
                this.quick();
            } else {
                this.anketa();
            }
        },
        confirmBun() {
            console.log(this.initial);
            this.confirm = !this.initial ? 'some' : 'doit';
        },
        confirmRemove() {
            //this.$emit('remove');
            console.log('initial-item REMOVE');
            this.confirm = !this.initial ? 'some' : 'must';
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
            this.$emit('bun', this.index);
        },
        remove() {
            this.$emit('remove', this.index);
        },
        cancel() {
            this.confirm = false;
            console.log('cancel');
        }
    },
    template: '#contact-item'
});

