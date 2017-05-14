
Vue.component('contact-item', {
    props: [
      'item',
      'index',
      'quick',
    ],
    data() {
        return {
            detail:  false,
            confirm: false
        }
    },
    computed: {
        sent() {
            return this.item.user_id == this.$store.state.user.uid;
        },
        name() {
            var result = 'Парень или девушка';
            if (this.item.user) {
                result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
                if (this.item.user.name) {
                    result = this.item.user.name;
                }
            }
            return result;
        },
        age() {
            return this.item.user ? this.item.user.age : null;
        },
        city() {
            return this.item.user ? this.item.user.city : '';
        },
        message() {
            return this.item.message ? this.item.message.text : '';
        }
    },
    methods: {
        show() {
            //this.$emit('show');
            console.log('show = initial-item');
            if (this.quick) {
                this.reply();
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
        reply() {
            this.detail = true;
            console.log('quick');
        },
        anketa() {
            window.location = '/' + this.item.human_id;
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
        splice() {
            this.$emit('splice', this.index);
        },
        cancel() {
            this.confirm = false;
            console.log('cancel');
        }
    },
    template: '#contact-item'
});

