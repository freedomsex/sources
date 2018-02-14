const SexConfirm = Vue.component('sex-confirm', {
    extends: ModalDialog,
    props: ['show'],
    data() {
        return {
            sex: null,
        }
    },
    computed: {
        variant() {
            return this.show ? this.show : 'message';
        },
        caption() {
            return this.content[this.variant].caption ;
        },
        text() {
            return this.content[this.variant].text;
        },
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
        verify(sex) {
            this.sex = sex;
            this.processTimeout();
            this.$refs.recaptcha.render(this.save);
            this.$refs.recaptcha.execute();
        },
        save(token) {
            this.process = true;
            if (this.sex) {
                this.$store.dispatch('SAVE_SEX', {sex: this.sex, token}).then(({data}) => {
                    app.$refs['api-key'].load();
                });
                this.$emit('select', this.show);
                this.redirect();
            }
            this.$refs.recaptcha.reset();
        },
        login() {
            this.$emit('login');
            this.$emit('close');
        },
        redirect() {
            if (this.index('search')) {
                this.$router.replace('/search');
            } else
            // if (this.index('contacts')) {
            //     console.log('leave', 'contacts');
            //     next({name: 'search-settings'});
            // }
            if (this.index('account')) {
                this.$router.replace('/settings/account');
            } else
            if (this.index('message')) {
                this.$router.replace('/');
            } else
            if (this.index('city')) {
                this.$router.replace('/wizard/city');
            } else {
                this.$router.replace('/');
            }
        }
    },
    data() {
        let content = {
            search: {
                caption: 'Легко начать',
                text: 'Для правильного отображения результатов поиска необходимо указать пол. Вы парень или девушка?'
            },
            contacts: {
                caption: 'Вы девушка?',
                text: 'Начало быстрого общения в один клик. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка.'
            },
            message: {
                caption: 'Общение в один клик',
                text: 'Начать общение просто. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка.'
                //text: 'Все пользователи желают знать с кем будут общаться. Чтобы продолжить укажите, парень вы или девушка.'
            },
            account: {
                caption: 'Кто вы?',
                text: 'Приватная анкета в один клик. Самое быстрое общение. Достаточно указать кто вы, парень или девушка. И начинайте общаться.'
            },
            register: {
                caption: 'Очень легко!',
                text: 'Самое быстрое общение. Приватная анкета в один клик. Достаточно указать, парень вы или девушка. И начинайте общаться.'
            }
        };
        content.city = content.contacts;
        return {content};
    },
    template: '#sex-confirm'
});