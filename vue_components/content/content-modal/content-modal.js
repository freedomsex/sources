const ContentModal = Vue.component('content-modal', {
    extends: ActivityActions,
    props: ['link'],
    data() {
        return {
            text: 'Загружаю...',
        }
    },
    mounted() {
        axios.get(`/static/htm/promo/${this.link}.htm`).then(({ data }) => {
            this.text = data;
        });
    },
    template: '#content-modal',
});
