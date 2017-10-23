
var HelpContentPage = Vue.component('help-page', {
    extends: ContentActivity,
    mounted() {
        this.title = 'Справка';
        this.load(`/content/help/${this.link}`);
    }
});