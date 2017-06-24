Vue.component('sex-confirm', {
    props: ['show'],
    computed: {
        variant() {
            return this.show ? this.show : 'message';
        },
        caption() {
            return this.content[this.variant].caption;
        },
        text() {
            return this.content[this.variant].text;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        save(sex) {
            this.$store.dispatch('SAVE_SEX', sex);
            this.$emit('select', this.show);
            this.close();
        },
    },
    data() {
        return {
            content: {
                search: {
                    caption: 'Подтвердите',
                    text: 'Для правильного отображения результатов поиска необходимо указать пол. Вы парень или девушка?'
                },
                contacts: {
                    caption: 'Вы девушка?',
                    text: 'Начало быстрого общения в один клик. Хотите получать сообщения и новые знакомства. Достаточно подтвердить, парень вы или девушка.'
                },
                message: {
                    caption: 'Подтвердите',
                    text: 'Все пользователи желают знать с кем будут общаться. Чтобы продолжить укажите, парень вы или девушка.'
                },
                account: {
                    caption: 'Кто вы?',
                    text: 'Приватная анкета в один клик. Самое быстрое общение. Достаточно указать кто вы, парень или девушка. И начинайте общаться.'
                }
            }
        }
    },
    template: '#sex-confirm'
});