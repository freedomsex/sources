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
            process: false,
            loading: false,
            confirm: false,
            ignore: false,
            addition: false,
            code: null,
            modals: {
                cliche: false,
                notepad: false,
            }
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
        inProcess(sec) {
            this.process = true;
            setTimeout(() => this.process = false, sec*1000);
        },
        send() {
            let data = {
                id: this.humanId,
                mess: this.text,
                captcha_code: this.code
            };
            api.messages.send(data).then((response) => {
                this.onMessageSend(response.data);
            }).catch((error) => {
                this.onError(error);
            });
            //  this.sended();
            this.inProcess(5);
        },
        setCode(code) {
            this.code = code;
            this.send();
        },
        onMessageSend(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha = true;
                }
                this.onError();
            } else {
                this.sended();
            }
            this.process = false;
        },
        sended() {
            this.$emit('sended');
            this.$store.dispatch('notes/UPDATE', this.text);
            this.close();
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
            var who = {1: 'парни', 2: 'девушки'};
            if (this.human.close && this.user.city && this.user.city != this.human.city) {
                result = 'Мне интересно общение только в моём городе';
            }
            if (this.human.who && this.human.who != this.user.sex) {
                result = 'Мне интересны только ' + who[this.human.who];
            } else
            if (this.human.who) {
                var age = this.user.age;
                if (this.human.up && age && this.human.up > age) {
                    result = 'Мне интересны ' + who[this.human.who] + ' в возрасте от ' + this.human.up + ' лет ';
                }
                if (this.human.to && age && this.human.to < age) {
                    result = 'Мне интересны ' + who[this.human.who] + ' в возрасте до ' + this.human.to + ' лет ';
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
