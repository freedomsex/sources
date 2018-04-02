
var HelpContentPage = Vue.component('help-page', {
    extends: ContentActivity,
    data() {
        return {
            enableReview: true,
        }
    },
    mounted() {
        this.title = 'Справка';
        this.load(`/content/help/${this.link}`);
        this.loadReviews();
    },
    methods: {
        show(index) {
            this.preview = this.galery[index];
        },
        loadReviews() {
            axios.get('/docs/blog/rev/'+this.link+'.json').then(({ data }) => {
                this.reviews = data;
            });
        },
    }
});