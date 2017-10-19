
var ContentActivity = Vue.component('content-activity', {
    extends: ActivityActions,
    props: ['link', 'locale'],
    data() {
        return {
            title: '',
            text: '',
            loader: true,
            error: false,
        }
    },
    methods: {
        load(url) {
            axios.get(url).then(({ data }) => {
                this.loaded(data);
            }).catch((e) => {
                this.failed(e);
            });
        },
        loaded(data) {
            this.text = data;
            this.loader = false;
            if (!data || data.length() < 50) {
                this.failed();
            }
        },
        failed() {
            this.error = true;
        }
    },
    template: '#content-activity',
});
