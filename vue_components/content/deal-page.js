
var DealContentPage = Vue.component('deal-page', {
    extends: ContentActivity,
    mounted() {
        this.title = 'Информация';
        this.load(`/content/deal/${this.link}`);
    }
});