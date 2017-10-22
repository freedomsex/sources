
Vue.component('abuse-dialog', {
    template: '#abuse-dialog',
    props: ['humanId'],
    data() {
        return {
            items: [
                {title: 'Предложение оплаты услуг', text: 'вирт за деньги, проституция'},
                {title: 'Развод на деньги', text: 'мошенничество, шантаж, вымогательство'},
                {title: 'Фото из интернета', text: 'вымышленные данные, обман, фейк'},
                {title: 'Оскорбления, хамство', text: 'троллинг, грубые сообщения'},
                {title: 'Рассылает интим фото', text: 'спамит или провоцирует'},
            ],
            selected: null,
            comment: '',
            process: false,
        };
    },
    methods: {
        select(item) {
            this.selected = item;
        },
        send() {
            let hash = getTimestamp();
            let text = `${this.selected.title}, ${this.selected.text} [${this.comment}]`;
            let data = {
                id: this.humanId,
                captcha: '',
                text, hash,
            };
            this.process = true;
            api.raw.save(data, null, 'abuse/send').then(({data}) => {
                if (data.error) {
                    this.$emit('needed');
                } else {
                    this.$emit('success');
                }
                this.process = false;
                this.$emit('close');
            });
        },
    },
});
