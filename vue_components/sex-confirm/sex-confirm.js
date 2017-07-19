const SexConfirm = Vue.component('sex-confirm', {
    extends: ModalDialog,
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
    // beforeRouteLeave(to, from, next) {
    //     if (this.$store.state.user.sex) {
    //         if (this.index('search')) {
    //             console.log('leave-search', [this.$store.state.user.sex, store.state.user.sex, to]);
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('contacts')) {
    //             console.log('leave', 'contacts');
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('account')) {
    //             console.log('leave', 'account');
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('message')) {
    //             console.log('leave', 'message');
    //             next({name: 'search-settings'});
    //         }
    //     }
    //     console.log('leave', 'close');
    //     next();
    // },
    // mounted() {
    //     console.log('confirm', this.variant);
    // },
    methods: {
        close() {
            this.back();
        },
        index(val) {
            return val == this.variant;
        },
        save(sex) {
            this.$store.dispatch('SAVE_SEX', sex);
            this.$emit('select', this.show);
            this.redirect();
        },
        login() {
            this.$emit('login');
            this.$emit('close');
        },
        redirect() {
            if (this.index('search')) {
                // console.log('leave-search');
                this.$router.replace('/search');
            }
            // if (this.index('contacts')) {
            //     console.log('leave', 'contacts');
            //     next({name: 'search-settings'});
            // }
            if (this.index('account')) {
                // console.log('leave', 'account');
                this.$router.replace('/settings/account');
            }
            // if (this.index('message')) {
            //     console.log('leave', 'message');
            //     next({name: 'search-settings'});
            // }
        }
    },
    data() {
        return {
            content: {
                search: {
                    caption: 'Легко начать',
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