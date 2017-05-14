Vue.directive('resized', {
  bind: function (el) {
    el.style.height = (el.scrollHeight) + 'px';
    $(el).on('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
})

Vue.component('quick-reply', {
    props: ['show', 'item'],
    data() {
        return {
            text: '',
            captcha: false,
            process: false,
            loading: false,
            confirm: false,
            ignore: false,
            code: null
        }
    },
    computed: {
        human() {
            return this.$store.state.search.human;
        },
        tags() {
            return 'tags' in this.human ? this.human.tags : [];
        },
        hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        message() {
            return this.item.message ? this.item.message.text : '';
        }
    },
    mounted() {
        this.reload();
    },
    updated() {
        if (this.show) {
        }
    },
    methods: {
        reload() {
            this.loading = true;
            setTimeout(() => this.loading = false, 30 * 1000);
            store.dispatch('human', this.item.human_id).then((response) => {
                this.loaded();
            });
        },
        loaded() {
            this.loading = false;
            console.log('hold:', this.human.hold);
            console.log('tags:', this.human);
            //this.process = false;
        },
        close() {
            this.$emit('close');
        },
        bun() {
            this.$emit('bun');
        },
        remove() {
            // store.dispatch('initial/DELETE', {uid: '10336', cont_id: contact}).then((response) => {
            //     this.loaded();
            // });
            console.log('conf:',{uid: '10336', cont_id: this.item.id} )
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
                id: this.item.human_id,
                mess: this.text,
                captcha_code: this.code
            };
            api.messages.send(data).then((response) => {
                this.handler(response.data);
            }).catch((error) => {
                this.error(error);
            });
            //  this.sended();
            this.inProcess(5);
        },
        setCode(code) {
            this.code = code;
            this.send();
        },
        handler(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha = true;
                }
                this.error();
            } else {
                this.sended();
            }
            this.process = false;
        },
        sended() {
            console.log('send');
            this.$emit('sended');
        },
        error() {
            this.process = false;
        }
    },
    template: '#quick-reply',
});

