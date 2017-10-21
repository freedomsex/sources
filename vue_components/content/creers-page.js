
var СareersContentPage = Vue.component('careers-page', {
    extends: ContentActivity,
    mounted() {
        this.title = 'Работа и вакансии';
        this.load(`/content/careers/ru`);
    }
});