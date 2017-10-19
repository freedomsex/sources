
var RulesContentPage = Vue.component('rules-page', {
    extends: ContentActivity,
    mounted() {
        this.title = 'Правила сообщества';
        this.load(`/content/rules/ru`);
    }
});