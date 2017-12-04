
const ReviewSettings = Vue.component('review-settings', {
    extends: ClosedActivity,
    props: [],
    data() {
        return {
            text: '',
            needResponse: false,
            sended: false,
            isEmpty: false,
        };
    },
    mounted() {
        this.flash();
    },
    methods: {
        flash() {
            let text = ls.get('review-text');
            this.text = text ? text : '';
        },
        handle() {
            this.text ? this.send() : this.isEmpty = true;
        },
        send() {
            api.raw.post({
                text: this.text,
                hash: hash
            }, null, 'security/remark').then(({data}) => {
                this.process = false;
                this.text = '';
                ls.remove('review-text');
            });
            this.isEmpty = false;
            this.process = true;
            this.sended = true;
        },
        noResponse() {
            this.needResponse = false;
        },
        switchToQuestions() {
            ls.set('review-text', this.text, 5);
            this.$router.push('question');
        },
    },
    template: '#review-settings',
});
