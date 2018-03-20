Vue.directive('resized', {
  bind(el) {
    $(el).on('change', () => {
        el.style.height = '1px';
        let fix = el.scrollHeight > 40 ? 3 : 0;
        el.style.height = (el.scrollHeight + fix) + 'px';
    });
  },
  componentUpdated(el) {
      $(el).change();
  }
});

const QuickDialog = {
    extends: ModalDialog,
    props: ['humanId', 'message', 'index'],
    data() {
        return {
            text: '',
            captcha: false,
            loading: false,
            confirm: false,
            ignore: false,
            addition: false,
            code: null,
            modals: {
                cliche: false,
                notepad: false,
            },
            interests: {
                show: false,
                ignore: false,
            },
            dirt: {
                show: false,
                ignore: false,
            },
            spam: {
                show: false,
                ignore: false,
            },
        }
    },
    // beforeRouteLeave(to, from, next) {

    // },
    mounted() {
        this.reload();
        console.log('reply', this.reply);
    },
    computed: {
        caption() {
            return this.reply ? 'Быстрый ответ' : 'Написать сообщение';
        },
        human() {
            return this.$store.state.search.human;
        },
        user() {
            return this.$store.state.user;
        },
        tags() {
            return ('tags' in this.human) ? this.human.tags : [];
        },
        hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        added() {
            return (this.user.city && this.user.age && this.user.name) ? false : true;
        },
    },
    methods: {
        reload() {
            this.loading = true;
            setTimeout(() => this.loading = false, 4 * 1000);
            store.dispatch('search/HUMAN', this.humanId).then((response) => {
                this.loaded();
            }).catch((error) => {
                this.loading = false;
            });
        },
        isDirt() {
            let word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i;
            return word.test(this.text) ? true : false;
        },
        isPhone() {
            let word = /\d.*\d.*\d.*\d.*\d.*\d.*\d.*/i;
            return word.test(this.text) ? true : false;
        },
        isLink() {
            let word = /(https?:\/\/(www\.)?)/i;
            return word.test(this.text) ? true : false;
        },
        isSpam() {
            return this.isPhone() || this.isLink();
        },
        proxy() {
            if (this.added) {
                this.addition = true
            } else
            if (this.isDirt() && !this.dirt.ignore) {
                this.dirt.show = true;
            } else
            if (this.isSpam() && !this.spam.ignore) {
                this.spam.show = true;
            } else {
                this.send()
            }
        },
        loaded() {
            this.loading = false;
            this.visited();
            //console.log('hold:', this.human.hold);
            //console.log('tags:', this.human);
            //this.process = false;
        },
        remove() {
            console.log('::remove:: (!)');
            this.$emit('remove');
        },
        cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        send(token) {
            this.$store.commit('grecaptchaTokenUpdate', token);
            let data = {
                id: this.humanId,
                mess: this.text,
                captcha_code: this.code,
                token: this.$store.state.grecaptchaToken,
            };
            api.messages.send(data).then(({data}) => {
                this.onMessageSend(data);
            }).catch((error) => {
                this.onError(error);
            });
            //  this.sended();
            this.processTimeout(5);
        },
        setCode(code) {
            this.code = code;
            this.send();
        },
        onMessageSend({saved, error}) {
            if (!saved && error) {
                if (error == 'need_captcha') {
                    this.captcha = true;
                }
                if (error == 'need_verify') {
                    this.processTimeout(5);
                    this.$refs.recaptcha.render(this.send);
                    this.$refs.recaptcha.execute();
                }
            } else {
                this.$store.dispatch('notes/UPDATE', this.text);
                this.sended();
            }
        },
        sended() {
            this.process = false;
            this.$emit('sended');
            this.close();
            this.$refs.recaptcha.reset();
        },
        account() {
            this.$router.push(this.humanId + '/detail')
        },
        onError() {
            this.process = false;
        },
        visited() {
            this.$store.dispatch('visited/ADD', this.humanId);
        },
        close() {
            this.back();
            //this.$emit('close');
        },
        setText(text) {
            this.text = text;
        }
    },
    template: '#quick-message',
};

const QuickMessage = Vue.component('quick-message', {
    extends: QuickDialog,
    computed: {
        reply: () => false,
        information() {
            var result = '';
            var who = {2: 'парни', 1: 'девушки'};
            if (this.human.close && this.user.city && this.user.city != this.human.city) {
                result = 'Мне интересно общение только в моём городе';
            }
            if (this.human.sex && this.human.sex == this.user.sex) {
                result = 'Мне интересны только ' + who[this.human.sex];
            } else
            if (this.human.sex) {
                var age = this.user.age;
                if (this.human.up && age && this.human.up > age) {
                    result = 'Мне интересны ' + who[this.human.sex] + ' в возрасте от ' + this.human.up + ' лет ';
                }
                if (this.human.to && age && this.human.to < age) {
                    result = 'Мне интересны ' + who[this.human.sex] + ' в возрасте до ' + this.human.to + ' лет ';
                }
            }
            if (!this.user.age) {
                result = 'Укажите ваш возраст в анкете, для меня это важно';
            }
            if (!this.user.city) {
                result = 'Укажите ваш город в анкете, для меня это важно';
            }
            return result;
        }
    },
    methods: {
        action() {
            if (!this.user.city) {
                this.$router.push('wizard/city');
            } else
            if (!this.user.age) {
                this.$router.push('settings/account')
            }
        },
        proxy() {
            if (this.added) {
                this.addition = true;
            } else
            if (this.information && !this.interests.ignore) {
                this.interests.show = true;
            } else
            if (this.isDirt() && !this.dirt.ignore) {
                this.dirt.show = true;
            } else
            if (this.isSpam() && !this.spam.ignore) {
                this.spam.show = true;
            } else {
                this.send()
            }
        },
    },
});

const QuickReply = Vue.component('quick-reply', {
    extends: QuickDialog,
    computed: {
        reply: () => true,
        information() {
            return this.message;
        }
    },
    methods: {
        sended() {
            this.$emit('sended', this.index);
            this.close();
        },
        action() {

        },
    },
});
