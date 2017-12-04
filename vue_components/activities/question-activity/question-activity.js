
const QuestionActivity = Vue.component('question-activity', {
    extends: ClosedActivity,
    props: [],
    data() {
        return {
            queries: [],
            text: '',
            needResponse: true,
            sended: false,
            showForm: false,
            isEmpty: false,
        };
    },
    mounted() {
        this.load();
        this.flash();
    },
    methods: {
        load() {
            this.loadStart(3);
            axios.get('/static/json/faq/list.ru.json?v=3').then(({data}) => {
                this.queries = data;
                this.loadStop();
            });
        },
        flash() {
            let text = ls.get('review-text');
            this.text = text ? text : '';
        },
        show(index) {
            let select = this.queries[index].show;
            this.queries[index].show = (select === false);
        },
        expand() {
            this.showForm = true;
            this.$nextTick(() => {
                this.$refs.text.focus();
            })
        },
        handle() {
            this.text ? this.send() : this.isEmpty = true;
        },
        send() {
            api.raw.post({
                text: this.text,
                hash: hash
            }, null, 'security/askme').then(({data}) => {
                this.process = false;
                this.text = '';
                ls.remove('review-text');
            });
            this.isEmpty = false;
            this.process = true;
            this.sended = true;
        },
        noReviews() {
            this.needResponse = true;
        },
        switchToReviews() {
            ls.set('review-text', this.text, 5);
            this.$router.push('reviews');
        },
    },
    template: '#question-activity',
});
