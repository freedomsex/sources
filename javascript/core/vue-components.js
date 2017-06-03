Vue.component('api-key-update', {
    props: [
      'item',
    ],
    data() {
        return {
            showOption:  false,
        }
    },
    methods: {
        upKey() {
            console.log('upKey');
            axios.get('/sync/sess/').then((response) => {
                store.dispatch('LOAD_API_TOKEN');
            });
        },
    },
    mounted() {
        setInterval(() => {
            this.upKey();
        }, 1000 * 600);
    },
    template: '#api-key-update'
});


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




Vue.component('captcha-dialog', {
    props: ['show'],
    data() {
        return {
            code: '',
            inc: 0
        }
    },
    computed: {
        src() {
            return '/secret_pic.php?inc=' + this.inc;
        }
    },
    methods: {
        close() {
            this.$emit('cancel');
        },
        send() {
            this.$emit('send', this.code);
            this.update();
            this.close();
        },
        update() {
            this.inc++;
        },
    },
    template: '#captcha-dialog',
});


var ContactDialog = {
    props: [
      'quick',
    ],
    data() {
        return {
            response: false,
            slow: false,
            error: false,
            offset: 0,
            batch: 10
        }
    },
    computed: {
        showLoader() {
            return this.slow && !this.response;
        },
        showAlert() {
            return this.error && this.response;
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
        reset() {
            this.response = false;
            this.error  = false;
            this.slow = false;
        },
        hope() {
            let sec = 2;
            setTimeout(() => this.slow = true,  sec * 1000);
            this.reset();
        },
        loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            this.offset += this.batch;
            this.response = true;
            this.slow = false;
        },
        bun(index) {
            let item = this.contacts[index];
            console.log('bun', item);
            this.remove(index); return;
            api.bun.send({
                id: item.cont_id,
                tid: item.from,
                //text: this.item.message,
                //token: 'super secret token'
            });
        },
        splice(index) {
            this.$store.commit('delete', index);
        },
        error(error) {
            this.response = true;
            this.error = true;
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
            //console.log(this.$store);
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load() {
            this.$store.dispatch('initial/LOAD').then((response) => {
                this.loaded();
            });
            this.hope();
        },
        next() {
            this.$store.dispatch('initial/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.reset();
        },
        remove(index) {
            this.$store.dispatch('initial/DELETE', index);
        },
        read(index) {
            console.log('imm=read', index);
            this.$store.dispatch('initial/READ', index);
        },
        splice(index) {
            //console.log(this.$store); return;
            this.$store.commit('initial/delete', index);
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
            this.$store.dispatch('intimate/LOAD', this.next).then((response) => {
                this.loaded();
            }).catch((error) => this.error(error));
            this.hope();
        },
        next() {
            this.$store.dispatch('intimate/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.hope();
        },
        remove(index) {
            console.log('imm=remove', index);
            this.$store.dispatch('intimate/DELETE', index);
        },
        read(index) {
            console.log('imm=read', index);
            this.$store.dispatch('intimate/READ', index);
        },
        splice(index) {
            this.$store.commit('intimate/delete', index);
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
            this.$store.dispatch('sends/LOAD', this.next).then((response) => {
                this.loaded();
            });
            this.hope();
        },
        next() {
            this.$store.dispatch('sends/NEXT', this.offset).then((response) => {
                this.loaded();
            });
            this.reset();
        },
        remove(index) {
            this.$store.dispatch('sends/DELETE', index);
        },
        splice(index) {
            this.$store.commit('sends/delete', index);
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
        },
        unread() {
            return this.item.message ? this.item.message.unread : 0;
        },
        sent() {
            return this.item.message ? (this.item.message.sender == this.$store.state.user.uid) : 0;
        },
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
            //console.log(this.initial);
            this.confirm = 'doit';
        },
        confirmRemove() {
            //this.$emit('remove');
            //console.log('initial-item REMOVE');
            this.confirm = !this.quick ? 'some' : 'must';
        },
        reply() {
            this.detail = true;
            this.$emit('read', this.index);
            console.log('quick');
        },
        anketa() {
            window.location = '/' + this.item.human_id;
        },
        close() {
            this.detail = false;
            console.log('close');
        },
        bun() {
            console.log('bun1', this.index);
            this.$emit('bun', this.index);
        },
        remove() {
            console.log('remove=remove', this.index);
            this.$emit('remove', this.index);
        },
        cancel() {
            this.confirm = false;
            console.log('cancel');
        },
        sended() {
            this.$emit('sended', this.index);
            this.close();
        }
    },
    template: '#contact-item'
});



Vue.component('inform-dialog', {
    props: [
      'loader',
      'alert',
      'hint',
    ],
    methods: {
        close() {
            this.$emit('close');
        },
    },
    template: '#inform-dialog'
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




var MenuUser = new Vue({
    methods: {
        initial() {
            console.log('MenuUser')
            store.commit('showInitial', 1);
        },
        intimate() {
            store.commit('showIntimate', 1);
        },
    },
    store,
    data: {
        text: 'yyy'
    },
    el: '#menu-user',
});
var fdate = null;
var prev  = null;

Vue.component('message-item', {
    props: [
      'item',
      'index',
      'count',
      'alert',
      'uid',
      'first_date'
    ],
    template: '#messages-item',
    data() {
        return {
            showOption:  false,
            fixOption:   false,
            alertOption: false,
            showDialog: false,
        }
    },
    methods: {
        fix() {
            this.showOption = true;
            this.alertOption = false;
            if (!this.alert) {
                this.fixOption = this.alert ? false : !this.fixOption;
            } else {
                this.$emit('admit');
            }
        },
        bun() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken}
            };
            let data = {
                id:  this.item.id,
                tid: this.item.from
            };
            axios.post('/mess/bun/', data, config).then((response) => {
                this.$emit('remove', this.index);
            }).catch((error) => {
                console.log('error');
            });
        },
        cancel() {
            this.showDialog = false;
            console.log('cancel');
        },
        remove() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken}
            };
            let data = {
                id:  this.item.id
            };
            axios.post('/mess/delete/', data, config).then((response) => {
                this.$emit('remove', this.index);
            }).catch((error) => {
                console.log(error);
            });
            console.log('remove');
        },
        play() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {tid}
            };
            let server = this.$store.state.photoServer;
            let url = `http://${server}/api/v1/users/${uid}/sends/${this.alias}.jpg`;
            axios.get(url, config).then((response) => {
                this.photo(response.data.photo)
            }).catch((error) => {
                console.log(error);
            });
        },
        photo(photo) {
            console.log('photo', photo);
            let links = photo._links;
            if (links.origin.href) {
                let data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
                this.$store.commit('viewPhoto', data);
                this.$store.commit('optionDialog', 'photo');
            }
        },
        pathName(name) {
            if (!name || name.length < 10) {
                return null;
            }
            let path = [
                name.substr(0, 2),
                name.substr(2, 2),
                name.substr(4, 3),
            ];
            return path.join('/')+'/'+name;
        },
    },
    mounted() {
        if (!this.sent && !this.index && this.count < 5) {
            this.fix();
            this.alertOption = true;
        }
        if (!this.sent && !this.read) {
            this.$emit('set-new');
        }
    },
    beforeUpdate() {
        //this.attention();
    },
    computed: {
        attention() {
            return (this.alert || this.alertOption) ? 1 : 0;
        },
        option() {
            if (!this.index && this.alert) {
                return true;
            }
            return (this.showOption || this.fixOption) ? 1 : 0;
        },
        sent() {
            return (!uid || uid == this.item.from) ? 1 : 0;
        },
        read() {
            return (this.item.read == 0) ? false : true;
        },
        time() {
            return moment(this.item.date).format('HH:mm');
        },
        date() {
            let mdate = moment(this.item.date);
            let date = mdate.date();
            let first_date = fdate;
            fdate = date;
            date = (fdate == first_date) ? '' : fdate;
            let today = moment().date();
            let yestd = moment().subtract(1, 'day').date();

            date = (date === today) ? 'Сегодня' : date;
            date = (date === yestd) ? 'Вчера' : date;

            mdate = mdate.date() + ' ' + mdate.format('MMMM').substring(0,3);
            date = _.isString(date) ? date : mdate;
            return date;
        },
        alias() {
            let result = false;
            let text = this.item.mess;
            let old = /.+images.intim?.(.{32})\.(jpg)/i;
            let now = /\[\[IMG:(.{32})\]\]/i;
            result = old.test(text) ? old.exec(text) : false;
            result = (!result && now.test(text)) ? now.exec(text) : result;
            if (result) {
                result = result[1];
            }
            return result;
        },
        image() {
            let server = this.$store.state.photoServer;
            let image = this.pathName(this.alias);
            return image ? `http://${server}/res/photo/preview/${image}.png` : false;
        },
        previous() {
            let p = prev;
            prev = this.item.from;
            return (!p || p == prev) ? true : false;
        }
    }
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


///
// Модальное окно настроек OptionDialog - контейнер
///
Vue.component('option-dialog', {
    template: '#option-static__dialog-window',
    methods: {
        close() {
            this.$emit('close');
        }
    },
    created: function() {
        // Close the modal when the `escape` key is pressed.
        var self = this;
        document.addEventListener('keydown', function() {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },
    updated() {
        if (this.show) {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }
});


Vue.component('photo-view', {
    props: [
        'show',
        'photo',
        'thumb',
        'width',
        'height',
        'bypass'
    ],
    methods: {
        approve() {
            this.$store.commit('approveViewPhoto');
        },
        close() {
            this.$emit('close');
        }
    },
    computed: {
        accept() {
            return (this.$store.state.accepts.photo || this.bypass) ? true : false;
        }
    },
    template: '#photo-view'
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
            return ('tags' in this.human) ? this.human.tags : [];
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
            if (!this.show) {
                return false;
            }
            this.loading = true;
            setTimeout(() => this.loading = false, 4 * 1000);
            store.dispatch('human', this.item.human_id).then((response) => {
                this.loaded();
            }).catch((error) => {
                console.log(error);
                this.loading = false;
            });
        },
        loaded() {
            this.loading = false;
            //console.log('hold:', this.human.hold);
            //console.log('tags:', this.human);
            //this.process = false;
        },
        close() {
            this.$emit('close');
        },
        bun() {
            this.$emit('bun');
        },
        remove() {
            // store.dispatch('initial/DELETE', {uid: '1001', cont_id: contact}).then((response) => {
            //     this.loaded();
            // });
            //
            //  :href="'/' + item.human_id"
            //
            //
            console.log('conf:',{uid: '1001', cont_id: this.item.id} )
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
        },
        anketa() {
            window.location = '/' + this.item.human_id;
        },
        onError() {
            this.process = false;
        }
    },
    template: '#quick-reply',
});



var RemoveConfirm = Vue.component('remove-confirm', {
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
                    text: `Нажмите "Дизлайк" у сообщения или контакта, которое вызвало негативные эмоции.
                    Наказание действует сразу же. Мы никогда не узнаем о нарушениях, если удалить без наказания.`,
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
            console.log('bun0');
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



Vue.component('remove-contact', {
    extends: RemoveConfirm,
    data() {
        return {
            content: {
                some: {
                    caption: 'Удалить навсегда',
                    text: `Контакт будет удален без возможности восстановить. Дальнейшее общение с собеседником станет невозможно.
                    Обменивайтесь реальными контактами с теми кто вам интересен всегда.`,
                    action: 'Удалить навсегда'
                }
            }
        }
    },
    computed: {

    },
    methods: {
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#remove-confirm',
});

Vue.component('upload-dialog', {
    template: '#upload-dialog',
    data() {
        return {
            photos: [],
            server: null,
        }
        // file: {
        //     data: null,
        //     name: '',
        //     size: 0
        // }
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {hash}
            };
            axios.get(`http://${this.server}/api/v1/users/${uid}/photos`, config).then((response) => {
                let result = response.data.photos;
                if (result && result.length) {
                    this.photos = response.data.photos;
                }
                //console.log(this.photos);
            }).catch((error) => {
                console.log(error);
            });
        },
        upload(e) {
            $('#fileupload').click();
        },
        show: function (index) {
            this.preview(this.photos[index]);
        },
        preview(photo) {
            let links = photo._links;
            if (links.origin.href) {
                let data = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
                this.$store.commit('sendPhoto', data);
                //console.log('sendPhoto');
                //console.log(data);
            }
            this.close();
        },
        close() {
            this.$emit('close');
        }
    },
    mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add(e, data) {
                data.url = `http://${self.server}/api/v1/users/${uid}/photos?jwt=` + self.$store.state.apiToken;
                data.submit();
            },
            done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    }
})


