
Vue.component('attention-wall', {
    props: ['show', 'text'],
    data() {
        return {
            content: {
                1: {
                    caption: 'Предупреждение',
                    text: `На сообщения от этого пользователя поступают жалобы. Возможно его сообщения имеют грубый тон,
                    могут оскорбить, содержат интим фотографии, бессмысленные или резкие предложения.`
                },
                8: {
                    caption: 'Внимание',
                    text: `Действия пользователя нарушают правила. Сообщения пользователя намеренно оскорбительны,
                    имеют противоправное содержание, обман или предложение оплаты услуг.`
                }
            }
        }
    },
    computed: {
        caption() {
            return this.content[this.show].caption;
        },
        text() {
            return this.content[this.show].text;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#attention-wall',
});


