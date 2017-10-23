
var ContentActivity = Vue.component('content-activity', {
    extends: ActivityActions,
    props: ['link', 'locale'],
    data() {
        return {
            title: '',
            text: '',
            file: '',
            more: null,
            edit: null,
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
            this.loader = false;
            if (!data.content) {
                this.failed();
            } else {
                this.text = data.content;
                this.file = data.file;
                this.more = data.more ? data.more : null;
                this.edit = data.edit ? data.edit : null;
            }
        },
        failed() {
            this.error = true;
        }
    },
    template: '#content-activity',
});
