
var ReleaseContentPage = Vue.component('release-page', {
    extends: ContentActivity,
    mounted() {
        this.title = 'Что нового';
        this.load(`/content/releases/${this.link}`);
    }
});