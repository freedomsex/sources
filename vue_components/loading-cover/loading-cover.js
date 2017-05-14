
Vue.component('loading-cover', {
    props: ['show', 'text'],
    computed: {
        loader() {
            return this.text ? this.text : 'Отправляю';
        }
    },
    template: '#loading-cover',
});


