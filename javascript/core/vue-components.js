
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




var ContactDialog = {
    props: [
      'quick',
    ],
    data() {
        return {
            response: false,
            slow: false,
            next: 0,
            batch: 10
        }
    },
    computed: {
        showLoader() {
            return this.slow && !this.response;
        },
        showHint() {
            return this.count < 1;
        },
        count() {
            let result = this.contacts ? this.contacts.length : 0;
            return result;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        hope() {
            let sec = 2;
            setTimeout(() => this.slow = true,  sec * 1000);
            this.response = false;
        },
        loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            //this.next += this.batch;
            this.response = true;
            this.slow = false;
        },
        remove(index) {
            this.splice(index);
            this.close();
        },
        bun(index) {
            console.log('bun');
            let item = this.contacts[index];
            let data = {
                id: item.cont_id,
                tid: item.from,
                //text: this.item.message,
                //token: 'super secret token'
            };
            api.bun.send(data);
            this.splice(index);
            this.close();
        },
        splice(index) {
            this.contacts.splice(index, 1);
            console.log('remove');
        },
        error(error) {
            console.log(error);
        }
    },
    mounted() {
        this.load();
    }
};


const InitialDialog = Vue.component('initial-dialog', {
    extends: ContactDialog,
    computed: {
        initial: () => true,
        simple:  () => true,
        contacts() {
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load() {
            store.dispatch('initial/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
        remove(index) {
            console.log('remove');
            //apiContact.ignore({ tid: this.contacts[index].cont_id });
            this.splice();
        },
    },
    template: '#initial-dialog'
});

const IntimateDialog = Vue.component('intimate-dialog', {
    extends: ContactDialog,
    computed: {
        initial: () => true,
        simple:  () => false,
        contacts() {
            return this.$store.state.contacts.intimate.list;
        }
    },
    methods: {
        load() {
            store.dispatch('intimate/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
        remove(index) {
            console.log('remove');
            //apiContact.remove({ tid: this.contacts[index].cont_id });
            //this.$emit('remove', this.index);
            this.splice();
        },
    },
    template: '#intimate-dialog'
});

const SendsDialog = Vue.component('sends-dialog', {
    extends: ContactDialog,
    computed: {
        initial: () => false,
        simple:  () => false,
        contacts() {
            return this.$store.state.contacts.sends.list;
        }
    },
    methods: {
        load() {
            store.dispatch('sends/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
    },
    template: '#initial-dialog'
});



Vue.component('contact-item', {
    props: [
      'item',
      'index',
      'quick',
    ],
    data() {
        return {
            detail:  false,
            confirm: false
        }
    },
    computed: {
        sent() {
            return this.item.user_id == this.$store.state.user.uid;
        },
        name() {
            var result = 'Парень или девушка';
            if (this.item.user) {
                result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
                if (this.item.user.name) {
                    result = this.item.user.name;
                }
            }
            return result;
        },
        age() {
            return this.item.user ? this.item.user.age : null;
        },
        city() {
            return this.item.user ? this.item.user.city : '';
        },
        message() {
            return this.item.message ? this.item.message.text : '';
        }
    },
    methods: {
        show() {
            //this.$emit('show');
            console.log('show = initial-item');
            if (this.quick) {
                this.reply();
            } else {
                this.anketa();
            }
        },
        confirmBun() {
            console.log(this.initial);
            this.confirm = !this.initial ? 'some' : 'doit';
        },
        confirmRemove() {
            //this.$emit('remove');
            console.log('initial-item REMOVE');
            this.confirm = !this.initial ? 'some' : 'must';
        },
        reply() {
            this.detail = true;
            console.log('quick');
        },
        anketa() {
            window.location = '/' + this.item.human_id;
            console.log('anketa');
        },
        close() {
            this.detail = false;
            console.log('close');
        },
        bun() {
            this.$emit('bun', this.index);
        },
        remove() {
            this.$emit('remove', this.index);
        },
        splice() {
            this.$emit('splice', this.index);
        },
        cancel() {
            this.confirm = false;
            console.log('cancel');
        }
    },
    template: '#contact-item'
});



var ContactSection = new Vue({
    el: '#contact-section',
    store,
    data: {

    },
    methods: {
        push(name) {
            if (router.name != name) {
                router.push({ name });
            }
        },
        openSends() {
            this.push('sends');
        },
        openInit() {
            this.push('initial');
        },
        openIntim() {
            this.push('intimate');
        }
    }
});


Vue.component('loading-cover', {
    props: ['show', 'text'],
    computed: {
        loader() {
            return this.text ? this.text : 'Отправляю';
        }
    },
    template: '#loading-cover',
});




Vue.component('loading-wall', {
    props: ['show', 'text'],
    data() {
        return {
            hope: false
        }
    },
    computed: {
        loader() {
            return this.text ? this.text : 'Загружаем';
        }
    },
    mounted() {
        this.hope = false;
        setTimeout(() => this.hope = true, 3000);
    },
    template: '#loading-wall',
});



Vue.component('modal-dialog', {
    props: ['show', 'data'],
    methods: {
        close() {
            this.$emit('close');
        },
    },
    mounted() {
        // Close the modal when the escape key is pressed.
        var self = this;
        document.addEventListener('keydown', function() {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },
    template: '#modal-dialog',
});


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



Vue.component('remove-confirm', {
    props: ['show', 'item'],
    data() {
        return {
            content: {
                doit: {
                    caption: 'Наказывайте как следует',
                    text: `За резкие слова, за оскорбления или хамство,
                    за фотографии не в тему или бессмысленные сообщения, наказывайте всех, кого
                    считаете нужным. Наказание действует сразу.`,
                    action: 'Удалить и наказать'
                },
                must: {
                    caption: 'Может стоит наказать?',
                    text: `Нажмите "Дизлайк" у сообщения, которое вызвало негативные эмоции.
                    Наказание действует сразу же. Мы никогда не узнаем о нарушениях
                    собеседника, если удалить без наказания.`,
                    action: 'Удалить и забыть'
                },
                some: {
                    caption: 'Удалить навсегда',
                    text: `Ваше сообщение будет удалено отовсюду, без возможности восстановить. Сообщение
                    пропадет как из вашей истории переписки, так и из переписки вашего собеседника.`,
                    action: 'Удалить навсегда'
                }
            }
        }
    },
    computed: {
        variant() {
            return this.show ? this.show : 'some';
        },
        caption() {
            return this.content[this.variant].caption;
        },
        text() {
            return this.content[this.variant].text;
        },
        action() {
            return this.content[this.variant].action;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        bun() {
            this.$emit('bun');
            this.close();
        },
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#remove-confirm',
});

