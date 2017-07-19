
const QuickReply = Vue.component('quick-reply', {
    props: ['humanId', 'message', 'index'],
    extends: QuickMessage,
    methods: {
        sended() {
            this.$emit('sended', this.index);
            this.close();
        },
    },
    template: '#quick-reply',
});

