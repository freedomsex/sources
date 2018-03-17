
const MessagesActivity = Vue.component('messages-activity', {
    extends: DefaultActivity,
    props: ['humanId', 'title'],
    data() {
        return {
            message: '',
            caption: '',
        reply:  '',
        code:  '',
        show: true,
        process: false,
        approve: true,
        dirt: false,
        alert: false,
            captcha: false,
            virification: false,
            preview: false,
            photo: false,
        photoIsRemoved: false,
        }
    },
    // beforeRouteUpdate(to, from, next) {
    //     this.photo = this.preview;
    //     console.log('MessagesActivity', this.photo);
    //     next();
    // },
    mounted: function () {
        if (this.title) {
            this.caption = this.title;
        }
    },
    methods: {
        reset() {
            //this.cancelPhoto();
            this.show = true;
            this.process = false;
            this.approve = true;
            this.message = '';
            this.photo = null;
        },
        isDirt: _.debounce(function() {
            let word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i;
            this.dirt = word.test(this.message) ? true : false;
            return this.dirt;
        }, 700),

        attention(count) {
            if (count < 3) {
                this.alert = true;
            } else {
                this.alert = false;
            }
        },
        close() {
            //this.$emit('close');
            this.back();
        },
        cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        select(data) {
            this.photo = data;
            this.preview = data;
        },
        sendMessage(token) {
            this.$store.commit('grecaptchaTokenUpdate', token);
            let data = {
                id: this.humanId,
                captcha_code: this.code,
                token: this.$store.state.grecaptchaToken,
            };
            if (this.photo && this.photo.alias) {
                data['photo'] = this.photo.alias;
            } else
            if (true) {
                data['mess'] = this.message;
                data['re'] = this.reply;
            }
            this.$store.commit('intimate/notifi', false);
            api.messages.send(data).then(({data}) => {
                this.onMessageSend(data);
            }).catch(() => {
                this.onError();
            });
            this.preview = null;
            this.process = true;
        },
        setCode(code) {
            this.code = code;
            this.sendMessage();
        },
        onMessageSend({saved, error}) {
            if (error) {
                if (error == 'need_captcha') {
                    this.captcha = true;
                }
                if (error == 'need_verify') {
                    this.virification = true;
                    this.$refs.recaptcha.render(this.sendMessage);
                    this.$refs.recaptcha.execute();
                }
                this.onError();
            } else {
                this.sended();
            }
            this.process = false;
        },
        sended() {
            //MessList.messages.unshift(data.message);
            this.$refs.messages.reload();
            this.reset();
            this.$refs.recaptcha.reset();
        },
        onError() {
            this.process = false;
        },
        account() {
            this.$router.push(this.humanId + '/detail')
        },
        uploads() {
            this.$router.push(this.humanId + '/uploads')
        },
        incoming() {
            this.$router.push(this.humanId + '/incoming')
        },
        // preview() {
        //     this.$router.push(this.humanId + '/preview')
        // },
        videochat() {
            window.open('/videochat.php?to='+this.humanId, 'videochat', 'width=432, height=280, resizable=yes, scrollbars=yes');
        }
    },
    template: '#messages-activity',
});
