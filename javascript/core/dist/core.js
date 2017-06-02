'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Vue.component('attention-wall', {
    props: ['show', 'text'],
    data: function data() {
        return {
            content: {
                1: {
                    caption: 'Предупреждение',
                    text: '\u041D\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043E\u0442 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043F\u043E\u0441\u0442\u0443\u043F\u0430\u044E\u0442 \u0436\u0430\u043B\u043E\u0431\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0435\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0438\u043C\u0435\u044E\u0442 \u0433\u0440\u0443\u0431\u044B\u0439 \u0442\u043E\u043D,\n                    \u043C\u043E\u0433\u0443\u0442 \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u044C, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442 \u0438\u043D\u0442\u0438\u043C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438, \u0431\u0435\u0441\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u0440\u0435\u0437\u043A\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.'
                },
                8: {
                    caption: 'Внимание',
                    text: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0442 \u043F\u0440\u0430\u0432\u0438\u043B\u0430. \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u043D\u043E \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u0435\u043B\u044C\u043D\u044B,\n                    \u0438\u043C\u0435\u044E\u0442 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435, \u043E\u0431\u043C\u0430\u043D \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E\u043F\u043B\u0430\u0442\u044B \u0443\u0441\u043B\u0443\u0433.'
                }
            }
        };
    },

    computed: {
        caption: function caption() {
            return this.content[this.show].caption;
        },
        text: function text() {
            return this.content[this.show].text;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#attention-wall'
});

Vue.component('captcha-dialog', {
    props: ['show'],
    data: function data() {
        return {
            code: '',
            inc: 0
        };
    },

    computed: {
        src: function src() {
            return '/secret_pic.php?inc=' + this.inc;
        }
    },
    methods: {
        close: function close() {
            this.$emit('cancel');
        },
        send: function send() {
            this.$emit('send', this.code);
            this.update();
            this.close();
        },
        update: function update() {
            this.inc++;
        }
    },
    template: '#captcha-dialog'
});

var ContactDialog = {
    props: ['quick'],
    data: function data() {
        return {
            response: false,
            slow: false,
            error: false,
            offset: 0,
            batch: 10
        };
    },

    computed: {
        showLoader: function showLoader() {
            return this.slow && !this.response;
        },
        showAlert: function showAlert() {
            return this.error && this.response;
        },
        showHint: function showHint() {
            return this.count < 1;
        },
        count: function count() {
            var result = this.contacts ? this.contacts.length : 0;
            return result;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        reset: function reset() {
            this.response = false;
            this.error = false;
            this.slow = false;
        },
        hope: function hope() {
            var _this = this;

            var sec = 2;
            setTimeout(function () {
                return _this.slow = true;
            }, sec * 1000);
            this.reset();
        },
        loaded: function loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            this.offset += this.batch;
            this.response = true;
            this.slow = false;
        },
        bun: function bun(index) {
            var item = this.contacts[index];
            console.log('bun', item);
            this.remove(index);return;
            api.bun.send({
                id: item.cont_id,
                tid: item.from
            });
        },
        splice: function splice(index) {
            this.$store.commit('delete', index);
        },
        error: function error(_error) {
            this.response = true;
            this.error = true;
            console.log(_error);
        }
    },
    mounted: function mounted() {
        this.load();
    }
};

var InitialDialog = Vue.component('initial-dialog', {
    extends: ContactDialog,
    computed: {
        initial: function initial() {
            return true;
        },
        simple: function simple() {
            return true;
        },
        contacts: function contacts() {
            //console.log(this.$store);
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load: function load() {
            var _this2 = this;

            this.$store.dispatch('initial/LOAD').then(function (response) {
                _this2.loaded();
            });
            this.hope();
        },
        next: function next() {
            var _this3 = this;

            this.$store.dispatch('initial/NEXT', this.offset).then(function (response) {
                _this3.loaded();
            });
            this.reset();
        },
        remove: function remove(index) {
            this.$store.dispatch('initial/DELETE', index);
        },
        read: function read(index) {
            console.log('imm=read', index);
            this.$store.dispatch('initial/READ', index);
        },
        splice: function splice(index) {
            //console.log(this.$store); return;
            this.$store.commit('initial/delete', index);
        }
    },
    template: '#initial-dialog'
});

var IntimateDialog = Vue.component('intimate-dialog', {
    extends: ContactDialog,
    computed: {
        initial: function initial() {
            return true;
        },
        simple: function simple() {
            return false;
        },
        contacts: function contacts() {
            return this.$store.state.contacts.intimate.list;
        }
    },
    methods: {
        load: function load() {
            var _this4 = this;

            this.$store.dispatch('intimate/LOAD', this.next).then(function (response) {
                _this4.loaded();
            }).catch(function (error) {
                return _this4.error(error);
            });
            this.hope();
        },
        next: function next() {
            var _this5 = this;

            this.$store.dispatch('intimate/NEXT', this.offset).then(function (response) {
                _this5.loaded();
            });
            this.hope();
        },
        remove: function remove(index) {
            console.log('imm=remove', index);
            this.$store.dispatch('intimate/DELETE', index);
        },
        read: function read(index) {
            console.log('imm=read', index);
            this.$store.dispatch('intimate/READ', index);
        },
        splice: function splice(index) {
            this.$store.commit('intimate/delete', index);
        }
    },
    template: '#intimate-dialog'
});

var SendsDialog = Vue.component('sends-dialog', {
    extends: ContactDialog,
    computed: {
        initial: function initial() {
            return false;
        },
        simple: function simple() {
            return false;
        },
        contacts: function contacts() {
            return this.$store.state.contacts.sends.list;
        }
    },
    methods: {
        load: function load() {
            var _this6 = this;

            this.$store.dispatch('sends/LOAD', this.next).then(function (response) {
                _this6.loaded();
            });
            this.hope();
        },
        next: function next() {
            var _this7 = this;

            this.$store.dispatch('sends/NEXT', this.offset).then(function (response) {
                _this7.loaded();
            });
            this.reset();
        },
        remove: function remove(index) {
            this.$store.dispatch('sends/DELETE', index);
        },
        splice: function splice(index) {
            this.$store.commit('sends/delete', index);
        }
    },
    template: '#initial-dialog'
});

Vue.component('contact-item', {
    props: ['item', 'index', 'quick'],
    data: function data() {
        return {
            detail: false,
            confirm: false
        };
    },

    computed: {
        name: function name() {
            var result = 'Парень или девушка';
            if (this.item.user) {
                result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
                if (this.item.user.name) {
                    result = this.item.user.name;
                }
            }
            return result;
        },
        age: function age() {
            return this.item.user ? this.item.user.age : null;
        },
        city: function city() {
            return this.item.user ? this.item.user.city : '';
        },
        message: function message() {
            return this.item.message ? this.item.message.text : '';
        },
        unread: function unread() {
            return this.item.message ? this.item.message.unread : 0;
        },
        sent: function sent() {
            return this.item.message ? this.item.message.sender == this.$store.state.user.uid : 0;
        }
    },
    methods: {
        show: function show() {
            //this.$emit('show');
            console.log('show = initial-item');
            if (this.quick) {
                this.reply();
            } else {
                this.anketa();
            }
        },
        confirmBun: function confirmBun() {
            //console.log(this.initial);
            this.confirm = 'doit';
        },
        confirmRemove: function confirmRemove() {
            //this.$emit('remove');
            //console.log('initial-item REMOVE');
            this.confirm = !this.quick ? 'some' : 'must';
        },
        reply: function reply() {
            this.detail = true;
            this.$emit('read', this.index);
            console.log('quick');
        },
        anketa: function anketa() {
            window.location = '/' + this.item.human_id;
        },
        close: function close() {
            this.detail = false;
            console.log('close');
        },
        bun: function bun() {
            console.log('bun1', this.index);
            this.$emit('bun', this.index);
        },
        remove: function remove() {
            console.log('remove=remove', this.index);
            this.$emit('remove', this.index);
        },
        cancel: function cancel() {
            this.confirm = false;
            console.log('cancel');
        },
        sended: function sended() {
            this.$emit('sended', this.index);
            this.close();
        }
    },
    template: '#contact-item'
});

Vue.component('inform-dialog', {
    props: ['loader', 'alert', 'hint'],
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    template: '#inform-dialog'
});

Vue.component('loading-cover', {
    props: ['show', 'text'],
    computed: {
        loader: function loader() {
            return this.text ? this.text : 'Отправляю';
        }
    },
    template: '#loading-cover'
});

Vue.component('loading-wall', {
    props: ['show', 'text'],
    data: function data() {
        return {
            hope: false
        };
    },

    computed: {
        loader: function loader() {
            return this.text ? this.text : 'Загружаем';
        }
    },
    mounted: function mounted() {
        var _this8 = this;

        this.hope = false;
        setTimeout(function () {
            return _this8.hope = true;
        }, 3000);
    },

    template: '#loading-wall'
});

var MenuUser = new Vue({
    methods: {
        initial: function initial() {
            console.log('MenuUser');
            store.commit('showInitial', 1);
        },
        intimate: function intimate() {
            store.commit('showIntimate', 1);
        }
    },
    store: store,
    data: {
        text: 'yyy'
    },
    el: '#menu-user'
});
var fdate = null;
var prev = null;

Vue.component('message-item', {
    props: ['item', 'index', 'count', 'alert', 'uid', 'first_date'],
    template: '#messages-item',
    data: function data() {
        return {
            showOption: false,
            fixOption: false,
            alertOption: false,
            showDialog: false
        };
    },

    methods: {
        fix: function fix() {
            this.showOption = true;
            this.alertOption = false;
            if (!this.alert) {
                this.fixOption = this.alert ? false : !this.fixOption;
            } else {
                this.$emit('admit');
            }
        },
        bun: function bun() {
            var _this9 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id,
                tid: this.item.from
            };
            axios.post('/mess/bun/', data, config).then(function (response) {
                _this9.$emit('remove', _this9.index);
            }).catch(function (error) {
                console.log('error');
            });
        },
        cancel: function cancel() {
            this.showDialog = false;
            console.log('cancel');
        },
        remove: function remove() {
            var _this10 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id
            };
            axios.post('/mess/delete/', data, config).then(function (response) {
                _this10.$emit('remove', _this10.index);
            }).catch(function (error) {
                console.log(error);
            });
            console.log('remove');
        },
        play: function play() {
            var _this11 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { tid: tid }
            };
            var server = this.$store.state.photoServer;
            var url = 'http://' + server + '/api/v1/users/' + uid + '/sends/' + this.alias + '.jpg';
            axios.get(url, config).then(function (response) {
                _this11.photo(response.data.photo);
            }).catch(function (error) {
                console.log(error);
            });
        },
        photo: function photo(_photo) {
            console.log('photo', _photo);
            var links = _photo._links;
            if (links.origin.href) {
                var _data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias: _photo.alias,
                    height: _photo.height,
                    width: _photo.width
                };
                this.$store.commit('viewPhoto', _data);
                this.$store.commit('optionDialog', 'photo');
            }
        },
        pathName: function pathName(name) {
            if (!name || name.length < 10) {
                return null;
            }
            var path = [name.substr(0, 2), name.substr(2, 2), name.substr(4, 3)];
            return path.join('/') + '/' + name;
        }
    },
    mounted: function mounted() {
        if (!this.sent && !this.index && this.count < 5) {
            this.fix();
            this.alertOption = true;
        }
        if (!this.sent && !this.read) {
            this.$emit('set-new');
        }
    },
    beforeUpdate: function beforeUpdate() {
        //this.attention();
    },

    computed: {
        attention: function attention() {
            return this.alert || this.alertOption ? 1 : 0;
        },
        option: function option() {
            if (!this.index && this.alert) {
                return true;
            }
            return this.showOption || this.fixOption ? 1 : 0;
        },
        sent: function sent() {
            return !uid || uid == this.item.from ? 1 : 0;
        },
        read: function read() {
            return this.item.read == 0 ? false : true;
        },
        time: function time() {
            return moment(this.item.date).format('HH:mm');
        },
        date: function date() {
            var mdate = moment(this.item.date);
            var date = mdate.date();
            var first_date = fdate;
            fdate = date;
            date = fdate == first_date ? '' : fdate;
            var today = moment().date();
            var yestd = moment().subtract(1, 'day').date();

            date = date === today ? 'Сегодня' : date;
            date = date === yestd ? 'Вчера' : date;

            mdate = mdate.date() + ' ' + mdate.format('MMMM').substring(0, 3);
            date = _.isString(date) ? date : mdate;
            return date;
        },
        alias: function alias() {
            var result = false;
            var text = this.item.mess;
            var old = /.+images.intim?.(.{32})\.(jpg)/i;
            var now = /\[\[IMG:(.{32})\]\]/i;
            result = old.test(text) ? old.exec(text) : false;
            result = !result && now.test(text) ? now.exec(text) : result;
            if (result) {
                result = result[1];
            }
            return result;
        },
        image: function image() {
            var server = this.$store.state.photoServer;
            var image = this.pathName(this.alias);
            return image ? 'http://' + server + '/res/photo/preview/' + image + '.png' : false;
        },
        previous: function previous() {
            var p = prev;
            prev = this.item.from;
            return !p || p == prev ? true : false;
        }
    }
});

Vue.component('modal-dialog', {
    props: ['show', 'data'],
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    mounted: function mounted() {
        // Close the modal when the escape key is pressed.
        var self = this;
        document.addEventListener('keydown', function () {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },

    template: '#modal-dialog'
});

///
// Модальное окно настроек OptionDialog - контейнер
///
Vue.component('option-dialog', {
    template: '#option-static__dialog-window',
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    created: function created() {
        // Close the modal when the `escape` key is pressed.
        var self = this;
        document.addEventListener('keydown', function () {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },
    updated: function updated() {
        if (this.show) {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }
});

Vue.component('photo-view', {
    props: ['show', 'photo', 'thumb', 'width', 'height', 'bypass'],
    methods: {
        approve: function approve() {
            this.$store.commit('approveViewPhoto');
        },
        close: function close() {
            this.$emit('close');
        }
    },
    computed: {
        accept: function accept() {
            return this.$store.state.accepts.photo || this.bypass ? true : false;
        }
    },
    template: '#photo-view'
});

Vue.directive('resized', {
    bind: function bind(el) {
        el.style.height = el.scrollHeight + 'px';
        $(el).on('input', function () {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});

Vue.component('quick-reply', {
    props: ['show', 'item'],
    data: function data() {
        return {
            text: '',
            captcha: false,
            process: false,
            loading: false,
            confirm: false,
            ignore: false,
            code: null
        };
    },

    computed: {
        human: function human() {
            return this.$store.state.search.human;
        },
        tags: function tags() {
            return 'tags' in this.human ? this.human.tags : [];
        },
        hold: function hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        message: function message() {
            return this.item.message ? this.item.message.text : '';
        }
    },
    mounted: function mounted() {
        this.reload();
    },
    updated: function updated() {
        if (this.show) {}
    },

    methods: {
        reload: function reload() {
            var _this12 = this;

            if (!this.show) {
                return false;
            }
            this.loading = true;
            setTimeout(function () {
                return _this12.loading = false;
            }, 4 * 1000);
            store.dispatch('human', this.item.human_id).then(function (response) {
                _this12.loaded();
            }).catch(function (error) {
                console.log(error);
                _this12.loading = false;
            });
        },
        loaded: function loaded() {
            this.loading = false;
            //console.log('hold:', this.human.hold);
            //console.log('tags:', this.human);
            //this.process = false;
        },
        close: function close() {
            this.$emit('close');
        },
        bun: function bun() {
            this.$emit('bun');
        },
        remove: function remove() {
            // store.dispatch('initial/DELETE', {uid: '1001', cont_id: contact}).then((response) => {
            //     this.loaded();
            // });
            //
            //  :href="'/' + item.human_id"
            //
            //
            console.log('conf:', { uid: '1001', cont_id: this.item.id });
            this.$emit('remove');
        },
        cancel: function cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        inProcess: function inProcess(sec) {
            var _this13 = this;

            this.process = true;
            setTimeout(function () {
                return _this13.process = false;
            }, sec * 1000);
        },
        send: function send() {
            var _this14 = this;

            var data = {
                id: this.item.human_id,
                mess: this.text,
                captcha_code: this.code
            };
            api.messages.send(data).then(function (response) {
                _this14.onMessageSend(response.data);
            }).catch(function (error) {
                _this14.onError(error);
            });
            //  this.sended();
            this.inProcess(5);
        },
        setCode: function setCode(code) {
            this.code = code;
            this.send();
        },
        onMessageSend: function onMessageSend(response) {
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
        sended: function sended() {
            this.$emit('sended');
        },
        anketa: function anketa() {
            window.location = '/' + this.item.human_id;
        },
        onError: function onError() {
            this.process = false;
        }
    },
    template: '#quick-reply'
});

var RemoveConfirm = Vue.component('remove-confirm', {
    props: ['show', 'item'],
    data: function data() {
        return {
            content: {
                doit: {
                    caption: 'Наказывайте как следует',
                    text: '\u0417\u0430 \u0440\u0435\u0437\u043A\u0438\u0435 \u0441\u043B\u043E\u0432\u0430, \u0437\u0430 \u043E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0445\u0430\u043C\u0441\u0442\u0432\u043E,\n                    \u0437\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u043D\u0435 \u0432 \u0442\u0435\u043C\u0443 \u0438\u043B\u0438 \u0431\u0435\u0441\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F, \u043D\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u0432\u0441\u0435\u0445, \u043A\u043E\u0433\u043E\n                    \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u043C. \u041D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443.',
                    action: 'Удалить и наказать'
                },
                must: {
                    caption: 'Может стоит наказать?',
                    text: '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0414\u0438\u0437\u043B\u0430\u0439\u043A" \u0443 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u044B\u0437\u0432\u0430\u043B\u043E \u043D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u044D\u043C\u043E\u0446\u0438\u0438.\n                    \u041D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443 \u0436\u0435. \u041C\u044B \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0443\u0437\u043D\u0430\u0435\u043C \u043E \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F\u0445, \u0435\u0441\u043B\u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0435\u0437 \u043D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u044F.',
                    action: 'Удалить и забыть'
                },
                some: {
                    caption: 'Удалить навсегда',
                    text: '\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u043E\u0442\u043E\u0432\u0441\u044E\u0434\u0443, \u0431\u0435\u0437 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C. \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\n                    \u043F\u0440\u043E\u043F\u0430\u0434\u0435\u0442 \u043A\u0430\u043A \u0438\u0437 \u0432\u0430\u0448\u0435\u0439 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438, \u0442\u0430\u043A \u0438 \u0438\u0437 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u0430.',
                    action: 'Удалить навсегда'
                }
            }
        };
    },

    computed: {
        variant: function variant() {
            return this.show ? this.show : 'some';
        },
        caption: function caption() {
            return this.content[this.variant].caption;
        },
        text: function text() {
            return this.content[this.variant].text;
        },
        action: function action() {
            return this.content[this.variant].action;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        bun: function bun() {
            console.log('bun0');
            this.$emit('bun');
            this.close();
        },
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#remove-confirm'
});

Vue.component('remove-contact', {
    extends: RemoveConfirm,
    data: function data() {
        return {
            content: {
                some: {
                    caption: 'Удалить навсегда',
                    text: '\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D \u0431\u0435\u0437 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C. \u0414\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0435 \u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u043E\u043C \u0441\u0442\u0430\u043D\u0435\u0442 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E.\n                    \u041E\u0431\u043C\u0435\u043D\u0438\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u043C\u0438 \u0441 \u0442\u0435\u043C\u0438 \u043A\u0442\u043E \u0432\u0430\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0435\u043D \u0432\u0441\u0435\u0433\u0434\u0430.',
                    action: 'Удалить навсегда'
                }
            }
        };
    },

    computed: {},
    methods: {
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#remove-confirm'
});

Vue.component('upload-dialog', {
    template: '#upload-dialog',
    data: function data() {
        return {
            photos: [],
            server: null
        };
        // file: {
        //     data: null,
        //     name: '',
        //     size: 0
        // }
    },

    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto: function loadPhoto() {
            var _this15 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { hash: hash }
            };
            axios.get('http://' + this.server + '/api/v1/users/' + uid + '/photos', config).then(function (response) {
                var result = response.data.photos;
                if (result && result.length) {
                    _this15.photos = response.data.photos;
                }
                //console.log(this.photos);
            }).catch(function (error) {
                console.log(error);
            });
        },
        upload: function upload(e) {
            $('#fileupload').click();
        },

        show: function show(index) {
            this.preview(this.photos[index]);
        },
        preview: function preview(photo) {
            var links = photo._links;
            if (links.origin.href) {
                var _data2 = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                this.$store.commit('sendPhoto', _data2);
                //console.log('sendPhoto');
                //console.log(data);
            }
            this.close();
        },
        close: function close() {
            this.$emit('close');
        }
    },
    mounted: function mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add: function add(e, data) {
                data.url = 'http://' + self.server + '/api/v1/users/' + uid + '/photos?jwt=' + self.$store.state.apiToken;
                data.submit();
            },
            done: function done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    }
});

Vue.component('photo-dialog', {
    methods: {
        close: function close() {
            this.$emit('close');
            store.commit('viewPhoto', { photo: null });
        }
    },
    computed: Vuex.mapState({
        config: function config(state) {
            return state.photoView;
        }
    }),
    template: '#photo-dialog'
});

$(document).ready(function () {

    userinfo.init();
    slider.init();
    storage.init();
    giper_chat.init();
    notepad.init();

    mailsett.init();
    report.init();
    navigate.init();

    name_suggest.init();
    city_suggest.init();

    option_static.init();
    option_sex.init();
    option_email.init();
    profile_alert.init();
    profile_option.init();

    user_tag.init();
    desire_clip.init();

    result_list.init();
    visited.init();
});

var mutations = {
    load: function load(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = data;
        }
    },
    add: function add(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = _.union(state.list, data);
        }
    }
};
// // //

var initial = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref) {
            var state = _ref.state,
                commit = _ref.commit,
                rootState = _ref.rootState;

            commit('load', ls.get('initial-contacts'));
            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('initial-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref2, offset) {
            var state = _ref2.state,
                commit = _ref2.commit,
                rootState = _ref2.rootState;

            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref3, index) {
            var state = _ref3.state,
                commit = _ref3.commit,
                rootState = _ref3.rootState;

            var result = api.contacts.initial.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ: function READ(_ref4, index) {
            var state = _ref4.state,
                commit = _ref4.commit,
                rootState = _ref4.rootState;

            var result = api.contacts.initial.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('initial-contacts', state.list);
        },
        read: function read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('initial-contacts', state.list);
        }
    }, mutations)
});

var intimate = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref5) {
            var state = _ref5.state,
                commit = _ref5.commit,
                rootState = _ref5.rootState;

            commit('load', ls.get('intimate-contacts'));
            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('intimate-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref6, offset) {
            var state = _ref6.state,
                commit = _ref6.commit,
                rootState = _ref6.rootState;

            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref7, index) {
            var state = _ref7.state,
                commit = _ref7.commit,
                rootState = _ref7.rootState;

            var result = api.contacts.intimate.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ: function READ(_ref8, index) {
            var state = _ref8.state,
                commit = _ref8.commit,
                rootState = _ref8.rootState;

            var result = api.contacts.initial.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('intimate-contacts', state.list);
        },
        read: function read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('intimate-contacts', state.list);
        }
    }, mutations)
});

var sends = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref9) {
            var state = _ref9.state,
                commit = _ref9.commit,
                rootState = _ref9.rootState;

            commit('load', ls.get('sends-contacts'));
            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('sends-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref10, offset) {
            var state = _ref10.state,
                commit = _ref10.commit,
                rootState = _ref10.rootState;

            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref11, index) {
            var state = _ref11.state,
                commit = _ref11.commit,
                rootState = _ref11.rootState;

            var result = api.contacts.sends.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('sends-contacts', state.list);
        }
    }, mutations)
});

var contacts = {
    modules: {
        initial: initial,
        intimate: intimate,
        sends: sends
    }
};

var modals = {
    state: {
        initial: false,
        intimate: false,
        sends: false
    },
    mutations: {
        showInitial: function showInitial(state, data) {
            store.commit('closeAll');
            state.initial = data == true;
        },
        showIntimate: function showIntimate(state, data) {
            store.commit('closeAll');
            state.intimate = data == true;
        },
        showSends: function showSends(state, data) {
            store.commit('closeAll');
            state.sends = data == true;
        },
        closeAll: function closeAll(state) {
            state.initial = false;
            state.intimate = false;
            state.sends = false;
        }
    }
};

var search = {
    state: {
        list: [],
        human: {}
    },
    actions: {
        human: function human(_ref12, tid) {
            var commit = _ref12.commit;

            //commit('load', ls.get('initial-contacts'));
            commit('resetHuman', tid);
            var promise = api.search.get({ tid: tid });
            promise.then(function (response) {
                commit('setHuman', response.data);
                //ls.set('initial-contacts', response.data);
            });
            return promise;
        }
    },
    mutations: {
        resetHuman: function resetHuman(state, tid) {
            if (state.human && state.human.id != tid) {
                state.human = {};
            }
        },
        setHuman: function setHuman(state, data) {
            //console.log(data);
            state.human = data;
        }
    }
};

var user = {
    state: {
        uid: 0,
        sex: 0
    },
    actions: {
        LOAD_USER: function LOAD_USER(_ref13) {
            var commit = _ref13.commit;

            if (uid) {
                commit('loadUser', { uid: uid });
            }
            if (typeof user_sex != 'undefined') {
                commit('loadUser', { sex: user_sex });
            }
        },
        SAVE_SEX: function SAVE_SEX(_ref14, sex) {
            var commit = _ref14.commit;

            var promise = api.user.saveSex(sex);
            promise.then(function (response) {
                if (response.data.sex) {
                    store.commit('loadUser', { sex: response.data.sex });
                }
            });
            return promise;
        }
    },
    mutations: {
        loadUser: function loadUser(state, data) {
            _.extend(state, data);
        }
    }
};

moment.locale('ru');

var ls = lscache;

var store = new Vuex.Store({
    modules: {
        user: user,
        search: search,
        contacts: contacts,
        modals: modals
    },
    state: {
        apiToken: '',
        //photoServer: '127.0.0.1:8888',
        photoServer: '195.154.54.70',
        count: 0,
        optionStatic: {
            view: null
        },
        photoView: {
            thumb: null,
            photo: null,
            height: null
        },
        uploadView: {
            show: false
        },
        contactView: {
            show: false
        },
        formMess: {
            sendTo: null,
            sendPhoto: {
                thumb: null,
                photo: null,
                height: null,
                width: null
            },
            intimate: true
        },
        accepts: {
            photo: false
        }
    },
    actions: {
        LOAD_API_TOKEN: function LOAD_API_TOKEN(_ref15) {
            var commit = _ref15.commit;

            commit('setApiToken', { apiToken: get_cookie('jwt') });
        },
        LOAD_ACCEPTS: function LOAD_ACCEPTS(_ref16) {
            var commit = _ref16.commit;

            var accepts = ls.get('accepts');
            if (accepts && accepts.photo) {
                commit('approveViewPhoto');
            }
            //console.log(ls.get('accepts'));
        }
    },
    mutations: {
        setApiToken: function setApiToken(state, data) {
            if (data) {
                _.extend(state, data);
            }
            //console.log(state)
        },
        viewPhoto: function viewPhoto(state, data) {
            _.extend(state.photoView, data);
        },
        viewUpload: function viewUpload(state, data) {
            state.uploadView.show = data === true;
        },
        sendPhoto: function sendPhoto(state, data) {
            console.log('sendPhoto');
            _.extend(state.formMess.sendPhoto, data);
        },
        approveViewPhoto: function approveViewPhoto(state) {
            state.accepts.photo = true;
            ls.set('accepts', _.extend(state.accepts, { photo: true }));
        },
        intimated: function intimated(state, data) {
            state.formMess.intimate = data === true;
        },
        optionDialog: function optionDialog(state, data) {
            state.optionStatic.view = data ? data : null;
        }
    },
    getters: {
        accept: function accept() {}
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('LOAD_ACCEPTS');
store.dispatch('LOAD_USER');

var Api = function () {
    function Api(host, key, version, routing) {
        _classCallCheck(this, Api);

        // Delay requests sec
        var delay = '0'; // [!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]

        var ver = version ? 'v' + version + '/' : '';
        this.root = host + ver;
        this.key = key;
        this.config = {
            baseURL: this.root,
            headers: { 'Authorization': 'Bearer ' + key }
        };
        this.wait = delay * 1000; //
        this.routing = {
            route: '',
            load: '',
            get: '{resource_id}',
            cget: '',
            send: '',
            post: '',
            save: '',
            remove: '',
            delete: '{resource_id}',
            put: '{resource_id}',
            patch: '{resource_id}',
            option: '{resource_id}'
        };
        _.extend(this.routing, routing);
    }

    _createClass(Api, [{
        key: 'setParams',
        value: function setParams(params, url) {
            var result = url.replace(/\{(.*?)\}/ig, function (match, token) {
                var slug = params[token];
                delete params[token];
                return slug;
            });
            //console.log('url: ', [this.root, result, params]);
            this.config.params = params ? params : {};
            return result;
        }
    }, {
        key: 'setUrl',
        value: function setUrl(method, params, url) {
            var route = this.routing.route;
            if (url) {
                result = url;
            } else {
                var action = this.routing[method];
                result = route ? route : '';
                if (result && action) {
                    result = result + '/' + action;
                } else if (action) {
                    result = action;
                }
            }
            result = this.setParams(params, result);
            return this.root + result;
        }
    }, {
        key: 'get',
        value: function get(params, url) {
            return this.delay(axios.get(this.setUrl('get', params, url), this.config), 0);
        }
    }, {
        key: 'load',
        value: function load(params, url) {
            return this.delay(axios.get(this.setUrl('load', params, url), this.config), 0);
        }
    }, {
        key: 'cget',
        value: function cget(params, url) {
            return this.delay(axios.get(this.setUrl('cget', params, url), this.config), 0);
        }
    }, {
        key: 'send',
        value: function send(params, url) {
            return this.delay(axios.get(this.setUrl('send', params, url), this.config), 0);
        }
    }, {
        key: 'post',
        value: function post(data, params, url) {
            return this.delay(axios.post(this.setUrl('post', params, url), data, this.config), 0);
        }
    }, {
        key: 'save',
        value: function save(data, params, url) {
            return this.delay(axios.post(this.setUrl('save', params, url), data, this.config), 0);
        }
    }, {
        key: 'remove',
        value: function remove(data, params, url) {
            return this.delay(axios.post(this.setUrl('remove', params, url), data, this.config), 0);
        }
    }, {
        key: 'delete',
        value: function _delete(params, url) {
            return this.delay(axios.delete(this.setUrl('delete', params, url), this.config), 0);
        }
    }, {
        key: 'put',
        value: function put(data, params, url) {
            return this.delay(axios.put(this.setUrl('put', params, url), data, this.config), 0);
        }
    }, {
        key: 'patch',
        value: function patch(data, params, url) {
            return this.delay(axios.patch(this.setUrl('patch', params, url), data, this.config), 0);
        }
    }, {
        key: 'request',
        value: function request(method, action, data, params, url) {
            // this.config.method = method;
            // this.config.url = this.setUrl(action, url);
            // this.config.data = data;
            // this.config.params = params;
            // return this.delay(axios.request(this.config), 0);
            if (data) {
                return this.delay(axios[method](this.setUrl(action, params, url), data, this.config), 0);
            } else {
                return this.delay(axios[method](this.setUrl(action, params, url), this.config), 0);
            }
        }
    }, {
        key: 'option',
        value: function option() {}
    }, {
        key: 'delay',
        value: function delay(result, wait) {
            var msec = wait ? wait : this.wait;
            if (msec < this.wait) {
                msec = this.wait;
            }
            if (msec == 0 || typeof Promise == "undefined") {
                return result;
            }
            return new Promise(function (resolve, reject) {
                _.delay(resolve, msec, result);
            });
        }
    }]);

    return Api;
}();

var ApiBun = function (_Api) {
    _inherits(ApiBun, _Api);

    function ApiBun() {
        _classCallCheck(this, ApiBun);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiBun.__proto__ || Object.getPrototypeOf(ApiBun)).call(this, host, key));
    }

    _createClass(ApiBun, [{
        key: 'send',
        value: function send(data) {

            return axios.post('mess/bun/', data, this.config);
            console.log('ApiBun Bun-Bun');
        }
    }]);

    return ApiBun;
}(Api);

var ApiMessages = function (_Api2) {
    _inherits(ApiMessages, _Api2);

    function ApiMessages() {
        _classCallCheck(this, ApiMessages);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiMessages.__proto__ || Object.getPrototypeOf(ApiMessages)).call(this, host, key));
    }

    _createClass(ApiMessages, [{
        key: 'send',
        value: function send(data) {
            return this.post(data, null, 'mailer/post/');
        }
    }]);

    return ApiMessages;
}(Api);

var ApiUser = function (_Api3) {
    _inherits(ApiUser, _Api3);

    function ApiUser() {
        _classCallCheck(this, ApiUser);

        var key = '1234';
        var host = '/';
        var routing = {
            post: 'option/sex'
        };
        return _possibleConstructorReturn(this, (ApiUser.__proto__ || Object.getPrototypeOf(ApiUser)).call(this, host, key, null, routing));
    }

    _createClass(ApiUser, [{
        key: 'saveSex',
        value: function saveSex(sex) {
            return this.post({ sex: sex });
        }
    }]);

    return ApiUser;
}(Api);

var ApiSearch = function (_Api4) {
    _inherits(ApiSearch, _Api4);

    function ApiSearch() {
        _classCallCheck(this, ApiSearch);

        var key = '1234';
        var host = 'http://212.83.162.58/';
        var routing = {
            route: 'users',
            get: '{tid}'
        };
        return _possibleConstructorReturn(this, (ApiSearch.__proto__ || Object.getPrototypeOf(ApiSearch)).call(this, host, key, null, routing));
    }

    return ApiSearch;
}(Api);

var ApiContact = function (_Api5) {
    _inherits(ApiContact, _Api5);

    function ApiContact(routing) {
        _classCallCheck(this, ApiContact);

        var key = store.state.apiToken;
        var host = 'http://212.83.134.89:9000/';
        return _possibleConstructorReturn(this, (ApiContact.__proto__ || Object.getPrototypeOf(ApiContact)).call(this, host, key, null, routing));
    }

    return ApiContact;
}(Api);

var ApiInitial = function (_ApiContact) {
    _inherits(ApiInitial, _ApiContact);

    function ApiInitial() {
        _classCallCheck(this, ApiInitial);

        var routing = {
            route: 'users/{uid}/initials'
        };
        return _possibleConstructorReturn(this, (ApiInitial.__proto__ || Object.getPrototypeOf(ApiInitial)).call(this, routing));
    }

    return ApiInitial;
}(ApiContact);

var ApiIntimate = function (_ApiContact2) {
    _inherits(ApiIntimate, _ApiContact2);

    function ApiIntimate() {
        _classCallCheck(this, ApiIntimate);

        var routing = {
            route: 'users/{uid}/intimates'
        };
        return _possibleConstructorReturn(this, (ApiIntimate.__proto__ || Object.getPrototypeOf(ApiIntimate)).call(this, routing));
    }

    return ApiIntimate;
}(ApiContact);

var ApiSends = function (_ApiContact3) {
    _inherits(ApiSends, _ApiContact3);

    function ApiSends() {
        _classCallCheck(this, ApiSends);

        var routing = {
            route: 'users/{uid}/sends'
        };
        return _possibleConstructorReturn(this, (ApiSends.__proto__ || Object.getPrototypeOf(ApiSends)).call(this, routing));
    }

    return ApiSends;
}(ApiContact);

var api = {
    user: new ApiUser(),
    search: new ApiSearch(),
    bun: new ApiBun(),
    contacts: {
        initial: new ApiInitial(),
        intimate: new ApiIntimate(),
        sends: new ApiSends()
    },
    messages: new ApiMessages()
};

//ApiMessages.send();


// -- Получить новый хэш ---
var hash;
function simple_hash() {
    var now = new Date();
    hash = now.getTime();
}

function disabled_with_timeout(elem, time) {
    elem.prop("disabled", true);
    setTimeout(function () {
        elem.prop("disabled", false);
    }, time * 1000);
}

// -- Автогенератор информации ---        
var auto_gen = {

    name: function name(sex) {
        var name = [];
        name[0] = ['Онилиона', 'Безимени', 'Неуказано', 'Хуисзиз', 'Незнаю', 'Неизвестно', 'Несонено'];
        name[1] = ['Саша', 'Дима', 'Сергей', 'Иван', 'Максим', 'Валера', 'Николай'];
        name[2] = ['Оля', 'Юля', 'Настя', 'Алена', 'Катя', 'Маргарита', 'Татьяна'];

        var x = Math.floor(Math.random() * 7);

        return name[sex][x];
    },

    age: function age(year) {
        var age = [];
        age[0] = [18, 21, 24, 25, 27, 28, 31];
        age[1] = [year + 3, year + 2, year + 1, year, year - 1, year - 2, year - 3];

        var y = year ? 1 : 0;
        var x = Math.floor(Math.random() * 7);

        return age[y][x];
    }

};

var ContactLists = new Vue({
    computed: {
        initial: function initial() {
            return this.$store.state.modals.initial;
        },
        intimate: function intimate() {
            return this.$store.state.modals.intimate;
        },
        sends: function sends() {
            return this.$store.state.modals.sends;
        }
    },
    methods: {
        close: function close() {
            this.$store.commit('closeAll');
        }
    },
    store: store,
    el: '#contact-lists'
});

var cookie_storage = {

    enabled: 0,

    init: function init() {},

    get_cookie: function get_cookie(name) {
        var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        if (results) return unescape(results[2]);else return null;
    },

    del_cookie: function del_cookie(name) {
        var expires = new Date(); // получаем текущую дату 
        expires.setTime(expires.getTime() - 1000);
        document.cookie = name + "=; expires=" + expires.toGMTString() + "; path=/";
    },

    set_cookie: function set_cookie(name, val, time) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 1000 * 60 * time); // минут
        document.cookie = name + "=" + val + "; expires=" + expires.toGMTString() + "; path=/";
    },

    get_data: function get_data(name) {
        var data = get_cookie(name);
        var result = null;

        if (data) try {
            result = JSON.parse(data);
        } catch (e) {}

        return result;
    },

    set_data: function set_data() {}

};

function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results) return unescape(results[2]);else return null;
}

function del_cookie(name) {
    var expires = new Date(); // получаем текущую дату
    expires.setTime(expires.getTime() - 1000);
    document.cookie = name + "=; expires=" + expires.toGMTString() + "; path=/";
}
function set_cookie(name, val, time) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 1000 * 60 * time); // минут
    document.cookie = name + "=" + val + "; expires=" + expires.toGMTString() + "; path=/";
}

var desire_clip = {

    sync_taglist: 0,

    init: function init() {
        desire_clip.action.set();
        desire_clip.ajax.sync();
    },
    ajax: {
        sync: function sync() {
            $.get('/sync/taglist/', desire_clip.ajax.parse);
        },
        parse: function parse(data) {
            data = json.parse(data);
            if (data) {
                if (data.id && user_tag.sync != data.id) {
                    user_tag.sync = data.id;
                    user_tag.action.store();
                    desire_clip.ajax.load();
                }
            }
        },
        load: function load() {
            $.get('/tag/user/', desire_clip.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(data)
            data = json.parse(data);
            if (data.tags != undefined) {
                user_tag.list = data.tags;
                user_tag.option.set_count();
                user_tag.action.store();
            }
            if (data.tags.length > 0) {
                desire_clip.action.set();
            }
        },
        add: function add(tag) {
            $.post('/tag/add/', { tag: tag });
        }
    },
    action: {
        set: function set() {
            user_tag.action.ids();
            $('.desire_clip').each(function (i, elem) {
                $(elem).off('click');
                $(elem).removeClass('desire_user');
                if (user_tag.idls.indexOf($(elem).data('id')) >= 0) {
                    $(elem).addClass('desire_user');
                } else $(elem).on('click', desire_clip.action.add);
            });
            user_tag.option.set_count();
        },
        add: function add() {
            desire_clip.ajax.add($(this).data('tag'));
            desire_clip.option.toggle(this);
            //$(this).on('click',desire_clip.action.del);
            var data = { "tag": $(this).data('tag'), "id": $(this).data('id') };
            user_tag.list.push(data);
        },
        del: function del() {
            option_tag.ajax.del($(this).data('id'));
            desire_clip.option.toggle(this);
            user_tag.list.splice($(this).data('num'), 1);
            $(this).on('click', desire_clip.action.add);
        }
    },
    option: {
        toggle: function toggle(elem) {
            $(elem).off('click');
            $(elem).toggleClass('desire_user');
        }
    }
};

var device = {

    init: function init() {},

    width: function width() {
        return $(window).width();
    },

    height: function height() {
        return $(window).height(); //document                               
    }

};

var active_textarea; ////////////////////////////////////////////////////////
var giper_chat = {

    open_mess: 0,
    idle_round: 0,

    count_unread: 0,
    cascade: 0,

    round_time: 0,
    round_open: 1,

    timer_id: null,
    mess_block: null,

    mess_stock: [],

    prev_title: null,

    init: function init() {
        if (device.width() > 1200) {
            giper_chat.mess_stock = storage.array.load('mess_stock');
            giper_chat.remind();
        }
        $('<div id="block_timer" class="timer">').appendTo('body');
        giper_chat.timer_set();
        giper_chat.new_round();

        $('#giper_reply .post').on('click', giper_chat.reply_show);
        // Установка текста по умолчанию
        if (storage.load('reply_all')) $('#giper_reply textarea').val(storage.load('reply_all'));
        giper_chat.prev_title = document.title;
    },

    set_unread: function set_unread() {
        if (giper_chat.count_unread > 0) {
            $('#menu_message_unread b').text(giper_chat.count_unread);
            $('#menu_message_unread').show();
            $('#menu_message').attr('title', 'Новых сообщений ' + giper_chat.count_unread);
        } else {
            $('#menu_message_unread').text('');
            $('#menu_message_unread').hide();
            $('#menu_message').attr('title', 'Новых сообщений нет');
        }
    },

    on_timer: function on_timer() {
        giper_chat.title_blink();

        if (giper_chat.round_open && giper_chat.cascade == 0) giper_chat.round_time--;

        //if (giper_chat.cascade != 0)console.log('on_timer cascade: ' +giper_chat.cascade)

        giper_chat.trace();

        if (giper_chat.round_time < 1) giper_chat.new_round();
    },

    new_round: function new_round() {
        giper_chat.timer_stop();
        giper_chat.ajax_new();
    },

    trace: function trace() {
        $('#block_timer').text(giper_chat.round_time);
    },

    ajax_new: function ajax_new() {
        simple_hash();
        giper_chat.round_open = 0;

        $.get('/ajax/new_mess.php', { hash: hash }, giper_chat.on_load).always(function () {
            giper_chat.round_open = 1;
        });
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = json.parse(data);
            giper_chat.route_xz(mess);
            giper_chat.count_unread = mess.count_unread; ////////////////////////////////////
            giper_chat.set_unread(); ////////////////////////////////////
        }
        setTimeout(function () {
            giper_chat.timer_set();
        }, 5000);
    },

    route_xz: function route_xz(mess) {
        if (device.width() > 1200 && mess.type && giper_chat.open_mess < 9) {
            /* */
            if (mess.type == 'air_user' || mess.type == 'new_client') {
                visited.action.load_cache();
                if (visited.list.length) {
                    if (visited.list.indexOf(mess.user + '') >= 0) {
                        giper_chat.reply_enable();
                        giper_chat.idle_round = 0;
                        setTimeout(function () {
                            giper_chat.timer_set();
                        }, 5000);
                        return 0;
                    }
                }
            }
            giper_chat.mess_stock.push(mess);
            giper_chat.stock.store();
            giper_chat.new_message(mess);
        }
    },

    reply_enable: function reply_enable() {
        if (giper_chat.cascade == 0) {
            if (giper_chat.open_mess > 2) $('#giper_reply').show('blind');
            if (giper_chat.open_mess > 5) $('#giper_reply textarea').show('blind');
        }

        if (giper_chat.open_mess < 3) $('#giper_reply').hide('blind');
        if (giper_chat.open_mess == 0) giper_chat.cascade = 0;

        // console.log('re cascade: ' +giper_chat.cascade)
    },

    reply_show: function reply_show() {
        var textarea = $('#giper_reply textarea');
        if (!$(textarea).is(":visible")) {
            active_textarea = textarea;
            textarea.show('blind');
            textarea.focus();
            notepad.show(); ////////////////////////////////////
        } else giper_chat.reply_all();
    },

    reply_all: function reply_all() {
        var textarea = $('#giper_reply textarea');
        var text = textarea.val();

        if (text) {
            var block_mess = $('#giper_stock').children().filter(':first');
            giper_chat.cascade = text;
            storage.save('reply_all', text);
            $('textarea', block_mess).val(text);
            $('.post', block_mess).click();
            textarea.hide('blind');
        }
        giper_chat.reply_enable();
    },

    new_message: function new_message(val) {
        //  elem.appendChild();
        giper_chat.open_mess++;
        giper_chat.reply_enable();

        var new_block = giper_chat.create_message(val);

        new_block.prependTo($('#giper_stock'));

        new_block.show('blind');

        setTimeout(function () {
            $('.sound', new_block).show();
        }, 500);

        giper_chat.idle_round = 0;
        // giper_chat.mess_stock.push(val);
        // giper_chat.stock.store();
    },

    remind: function remind() {
        jQuery.each(giper_chat.mess_stock, function (i, val) {
            giper_chat.new_message(val);
        });
    },

    stock: {

        store: function store() {
            storage.array.save('mess_stock', giper_chat.mess_stock);
        },

        remove: function remove(num) {
            var del = null;
            jQuery.each(giper_chat.mess_stock, function (i, val) {
                if (val.mess_id == num) del = i;
            });

            if (del || del == 0) {
                //alert($('.new_message').length + '  <> ' + giper_chat.mess_stock.length)
                giper_chat.mess_stock.splice(del, 1);
                if (giper_chat.mess_stock.length - $('.new_message').length > 1) giper_chat.mess_stock = [];
                giper_chat.stock.store();
            }
        }

    },

    create_message: function create_message(val) {
        if (!val.reply) val.reply = '';

        //return 0;

        var new_block = $('#new_message_ex').clone().attr('id', val.type + '_' + val.mess_id) //.css("display","none")
        .data('number', val.mess_id).data('user', val.user).addClass(val.type);

        $('.mess_text', new_block).html(val.text); // click( function (){ location.href =  });
        $('.close', new_block).click(function () {
            giper_chat.close_message($(new_block));
        });

        if (val.type == 'new_message' || val.type == 'old_message') {
            if (val.type == 'old_message') {
                $('.title', new_block).text('Есть сообщение без ответа');
                $('.sound', new_block).remove();
            }

            $('.post', new_block).click(function () {
                giper_chat.post_mess(val);
            });

            $('textarea', new_block).val(val.reply);
            $('.user_name', new_block).text(val.name + ':');
            $('.history', new_block).click(function () {
                giper_chat.follow_message(val.user, val.mess_id);
            });

            $('.bunn', new_block).click(function () {
                giper_chat.ajax_bun(val.user, val.mess_id, val.type);
                giper_chat.open_mess--;
            });

            if (val.type == 'new_message') $('#contact_update').show('fade');
        }

        if (val.type == 'server_mess') {
            $('.sound', new_block).remove();
            $('.title', new_block).text(val.reply);
            $('.bunn', new_block).remove();
            $('.post', new_block).val('Хорошо');

            $('.post', new_block).click(function () {
                send_serv_mess($('#' + val.type + '_' + val.mess_id), 'tip_user_bun_close');
            });

            $('.history', new_block).text('Подробнее...');
            $('.history', new_block).attr('href', '/блог/наказывайте-кого-следует/');
            $('.history', new_block).attr('target', '_blank');
        }

        if (val.type == 'air_user' || val.type == 'new_client') {
            if (val.type == 'air_user') $('.title', new_block).text('Сейчас на сайте');
            if (val.type == 'new_client') $('.title', new_block).text('Зарегистрировалась сегодня');

            $('.mess_text', new_block).html(val.age + ' ' + val.city + ' ' + val.text);

            $('.sound', new_block).remove();
            // var timer_air = setTimeout( function (){ close_message( $(new_block) ); open_mess--; },30000 );
            //$('.title',new_block).text( val.reply );
            $('.bunn', new_block).remove();
            $('.user_name', new_block).text(val.name + ',');
            $('.user_name', new_block).text(val.name + ',');
            $('.post', new_block).val('Написать');

            $('.post', new_block).click(function () {
                giper_chat.post_mess(val);
            });

            $('.history', new_block).text('Смотреть анкету');
            $('.history', new_block).click(function () {
                giper_chat.follow_message(val.user, val.mess_id);
            });

            if (val.type == 'new_client') {}
        }

        $(new_block).draggable({
            handle: '.title',
            stop: function stop(event, ui) {
                $('.sound', new_block).remove();

                //alert ($(this).offset().left)

                var topOff = $(this).offset().top - $(window).scrollTop();
                var leftOff = $(this).offset().left;
                $(this).css("top", topOff).css("left", leftOff).css("position", "fixed");

                $(this).appendTo('body');
            }
        }); /**/

        return new_block;
    },

    close_message: function close_message(elem) {
        $('.sound', elem).remove();
        elem.hide('blind');
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout(function () {
            elem.remove();
        }, 500);
    },

    close_all: function close_all(user) {/*
                                         $('#giper_stock div').
                                         $('.sound',elem).remove();
                                         elem.hide('blind');
                                         giper_chat.open_mess--;
                                         giper_chat.stock.remove(elem.data('number'));
                                         setTimeout( function (){ elem.remove(); },500 ); */
    },

    follow_message: function follow_message(user, mess_id) {
        giper_chat.stock.remove(mess_id);
        location.href = '/' + user;
    },

    ajax_bun: function ajax_bun(user, mess_id, type) {
        giper_chat.close_message($('#' + type + '_' + mess_id));
        $.post("/mess/bun/", { id: mess_id, tid: user });
    },

    timer_set: function timer_set() {
        giper_chat.timer_stop();
        if (giper_chat.idle_round == 0) {
            giper_chat.round_time = 10;
        } else if (giper_chat.idle_round == 1) {
            giper_chat.round_time = 10;
        } else if (giper_chat.idle_round == 2) {
            giper_chat.round_time = 5;
        } else if (giper_chat.idle_round == 3) {
            giper_chat.round_time = 25;
        } else if (giper_chat.idle_round == 4) {
            giper_chat.round_time = 35;
        } else if (giper_chat.idle_round > 11) {
            giper_chat.round_time = 300;
        } else if (giper_chat.idle_round > 4) {
            giper_chat.round_time = 60;
        }

        giper_chat.idle_round++;
        giper_chat.timer_id = window.setInterval('giper_chat.on_timer()', 1000);
        //console.log('таймер запущен: ' +giper_chat.round_time)
    },

    timer_stop: function timer_stop() {
        window.clearInterval(giper_chat.timer_id);
        //console.log('таймер остановлен: ' +giper_chat.cascade)
    },

    timer_cut: function timer_cut() {
        if (giper_chat.idle_round > 0 && giper_chat.round_time > 10) giper_chat.round_time = 10;
        giper_chat.idle_round = 0;
    },

    toggle_text: function toggle_text() {
        var textarea = $('textarea', giper_chat.mess_block);
        var text_value = $(textarea).val();
        if (!$(textarea).is(":visible")) {
            active_textarea = textarea; ///////////////////////////////////////
            $(textarea).show('blind');
            $(textarea).focus();
            notepad.show(); ///////////////////////////////////////
            return 0;
        }

        return text_value;
    },

    post_mess: function post_mess(val) {
        giper_chat.mess_block = $('#' + val.type + '_' + val.mess_id); // alert( user )

        var text, repl;

        if (giper_chat.cascade != 0) {
            text = giper_chat.cascade;
            repl = '';
        } else {
            text = giper_chat.toggle_text();
            repl = text;
        }

        if (text) {
            simple_hash();

            $.post("/mailer/post/", {
                mess: text,
                id: val.user,
                re: repl,
                captcha_code: $('.code', giper_chat.mess_block).val(),
                hash: hash
            }, giper_chat.on_post);

            disabled_with_timeout($('.post', giper_chat.mess_block), 5);
            giper_chat.timer_cut();
        }
    },

    on_post: function on_post(data) {
        // alert (data)
        if (!data) return 0;
        var mess = JSON.parse(data);

        if (mess.error == 'captcha') {
            $('textarea', giper_chat.mess_block).show('blind');
            $('.captcha_block', giper_chat.mess_block).show('blind');
            $('.captcha', giper_chat.mess_block).get(0).src = '/secret_pic.php?hash=' + hash;
        }

        if (mess.saved == '1') {
            giper_chat.idle_round = 0;

            $('#contact_update').show('fade');
            giper_chat.close_message(giper_chat.mess_block);

            notepad.hide(); //////////////////////////////////////////////
            visited.action.save(giper_chat.mess_block.data('user'));

            setTimeout(function () {
                if (giper_chat.cascade != 0) giper_chat.reply_all();
            }, 700);
        }

        if (mess.error == 'reload') {
            giper_chat.idle_round = 0;
            location.href = '/' + user + '?text=' + text; //alert ('reload')
        }

        disabled_with_timeout($('.post', giper_chat.mess_block), 0.05);
    },

    title_blink: function title_blink() {
        if (giper_chat.count_unread == 0) {
            document.title = giper_chat.prev_title;
            return false;
        }

        if (document.title != 'Вам сообщение!') {
            document.title = 'Вам сообщение!';
        } else document.title = ' * * * * * * * * * * * * ';
    },

    post_serv: function post_serv(elem, value) {
        giper_chat.close_message($(elem)); /*
                                           var param = {}; param[value] = 1;
                                           $.get( "/ajax/messages_load.php", param ); */
        set_cookie('user_bun', '1', 259200);
    }

};

$(document).ready(function () {
    /*            
      giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925673",name: "Максим",reply: "",sity: "Ивантеевка",text: "Привет. Давай познакомимся.",time: "1415561723",type: "air_user",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925674",name: "Николай",reply: "",sity: "Ивантеевка",text: "и дай я тебя отжарю. не пожалеешь. отсосешь мне",time: "1415561723",type: "new_message",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925675",name: "Виктор",reply: "",sity: "Ивантеевка",text: "юлия а где найти анонимные объявления",time: "1415561723",type: "new_message",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925676",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
     giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925677",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
     giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925678",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
            */
});

var json = {

    parse: function parse(str) {
        var result = null;
        try {
            result = JSON.parse(str);
        } catch (e) {}

        return result;
    },

    encode: function encode(str) {
        return JSON.stringify(str);
    }
};

// Установки  почты        
var mailsett = {

    init: function init() {
        $('#link_virt_turn').on('click', mailsett.turn_virt);
        $('#link_close_turn').on('click', mailsett.turn_close);
    },

    turn_virt: function turn_virt() {
        var text = $('#text_virt_turn').text();

        if (text == 'неприемлемо') {
            $('#text_virt_turn').text('возможен');
            mailsett.send_virt(1);
        } else {
            $('#text_virt_turn').text('неприемлемо');
            mailsett.send_virt(0);
        }
    },

    turn_close: function turn_close() {
        var text = $('#text_close_turn').text();

        if (text == 'ограничить') {
            $('#text_close_turn').text('разрешить');
            mailsett.send_close(0);
        } else {
            $('#text_close_turn').text('ограничить');
            mailsett.send_close(1);
        }
    },

    send_close: function send_close(data) {
        $.post('/msett/close/', { option_mess_town: data }, onAjaxSuccess);
        function onAjaxSuccess(data) {}
    },

    send_virt: function send_virt(data) {
        $.post('/msett/virt/', { option_virt_accept: data }, onAjaxSuccess);
        function onAjaxSuccess(data) {}
    }

};

var master_info = {

    init: function init() {
        if (!userinfo.data.sex) {
            master_info.ajax.load_sex();
        } else if (!userinfo.data.city && $('#human_print_city').text()) {
            master_info.ajax.load_city();
        } else if (!userinfo.data.age) {
            master_info.ajax.load_age();
        } else if (userinfo.data.second > 300 && userinfo.data.contact.mc < 20) {
            master_info.ajax.load_contact();
        }
    },
    ajax: {
        load_contact: function load_contact() {
            $('#anketa_master_info').load('/static/htm/master_contact.html', master_info.ajax.on_contact);
        },
        on_contact: function on_contact() {
            master_contact.action.sett(0);
            master_contact.option.print();
        },
        load_city: function load_city() {
            $('#anketa_master_info').load('/static/htm/master_city.html', master_info.ajax.on_city);
        },
        on_city: function on_city() {
            master_city.init();
            option_static.init();
        },
        load_age: function load_age() {
            $('#anketa_master_info').load('/static/htm/master_age.html', master_info.ajax.on_age);
        },
        on_age: function on_age() {
            master_age.init();
            option_static.init();
        },
        load_sex: function load_sex() {
            $('#anketa_master_info').load('/static/htm/master_sex.html', master_info.ajax.on_sex);
        },
        on_sex: function on_sex() {
            master_sex.init();
            option_static.init();
        }
    }

};

// Навигация с помошью клавиатуры
var navigate = {

    enable: 0,

    init: function init() {
        $(document).on('keydown', function () {
            navigate.through(event);
        });
    },

    // Отправка сообщения по CTRL + Enter
    post_form: function post_form(event, formElem) {
        if (event.ctrlKey && (event.keyCode == 10 || event.keyCode == 13)) {
            formElem.submit();
        }
    },

    // Навигация с помошью стрелок + CTRL
    through: function through(event) {
        if (window.event) event = window.event;

        if (event.ctrlKey) {
            var link = null;
            var href = null;
            switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
                case 0x25:
                    link = '#previous_page';
                    break;
                case 0x27:
                    link = '#next_page';
                    break;
                case 0x26:
                    link = '#up_page';
                    break;
                case 0x28:
                    link = '#down_page';
                    break;
                case 0x24:
                    link = '#home_page';
                    break;
            }
            if ($('a').is(link)) // alert($(link).attr('href')); return false;
                document.location = $(link).attr('href');
        }
    }

};

// -- Блокнот ---
var notepad = {

    note_block: null,
    last_click: null,
    disibled: 0,
    create: 0,

    init: function init() {
        if (device.width() < 1000) {
            notepad.disibled = 1;
        }

        notepad.disibled = get_cookie('note_vis') * 1 ? 1 : 0; //////////////////////////

        active_textarea = $('#mess_text_val');
        notepad.note_block = $('.notepad');

        $('textarea').click(function () {
            active_textarea = this;
            notepad.show();
        });

        $('#notepad_on').click(function () {
            notepad.toggle_disable('on');notepad.show('force');
        });

        $('.close', notepad.note_block).click(function () {
            notepad.hide();
        });
        $('.post', notepad.note_block).click(function () {
            notepad.toggle_disable('off');notepad.hide();
        });
        $('.bunn', notepad.note_block).click(function () {
            notepad.toggle_disable('off');notepad.hide();
        });
    },

    hide: function hide() {
        notepad.note_block.hide('fade');
    },

    show: function show(force) {
        if (!notepad.disibled) if (force || active_textarea && notepad.last_click != active_textarea) {
            if (notepad.create) {
                notepad.note_block.show('fade');
                notepad.last_click = active_textarea; /////////////////////////////
            } else notepad.ajax_load();
        }
    },

    toggle_disable: function toggle_disable(vset) {
        if (vset == 'off') notepad.disibled = 1;
        if (vset == 'on') notepad.disibled = 0;

        if (vset) {
            set_cookie('note_vis', notepad.disibled, 259200); /////////////////////////
        }
    },

    ajax_load: function ajax_load() {
        simple_hash();
        $.get('/ajax/load_notepad.php', { hash: hash }, notepad.on_load);
    },

    remind: function remind() {
        var top = storage.load('notepad_top');
        var left = storage.load('notepad_left');

        if (top && top < 40) top = 50;
        if (left && left < 10) left = 10;
        if (top > device.height() - 300) top = 0;
        if (left > device.width() - 300) left = 0;

        if (top) notepad.note_block.css("top", top + 'px');
        if (left) notepad.note_block.css("left", left + 'px');
    },

    on_load: function on_load(data) {
        if (data.indexOf('div') > 0) {
            notepad.create = 1;
            $('.notes', notepad.note_block).html(data);
            $('.note_line', notepad.note_block).click(function () {
                var text = $(this).text();
                $(active_textarea).val(text).focus();
                if ($(active_textarea).attr('id') == 'mess-text-area') {
                    FormMess.message = text;
                } // TODO: жэсточайшы костыль для блокнота

                //                        // Trigger a DOM 'input' event
                //                        var evt = document.createEvent('HTMLEvents');
                //                        evt.initEvent('input', false, true);
                //                        elt.dispatchEvent(evt);
            });

            notepad.remind();

            notepad.note_block.draggable({
                handle: '.title',
                stop: function stop(event, ui) {
                    var topOff = $(this).offset().top - $(window).scrollTop();
                    notepad.note_block.css("top", topOff);
                    storage.save('notepad_top', topOff);
                    storage.save('notepad_left', $(this).offset().left);
                }
            });

            notepad.show();
        }
    }

};

var option_age = {

    init: function init() {
        $('#option_age_value').val(userinfo.data.age);
        $('#option_age_button').off('click').on('click', option_age.action.send_age);
        $('.opt_age_val').off('click').on('click', option_age.action.send_link);
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.age) {
                userinfo.data.age = data.age;
                userinfo.action.set_age(data.say);
            }
        }
    },
    action: {
        save: function save(age) {
            userinfo.data.age = age;
            userinfo.ajax.save.age(option_age.ajax.on_save);
            userinfo.action.set_age();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_age.action.save($(this).text());
        },
        send_age: function send_age() {
            option_age.action.save($('#option_age_value').val());
        }
    }
};

var option_anketa = {

    anketa: {
        growth: 0,
        weight: 0,
        figure: 0
    },

    init: function init() {
        $('#option_anketa input').prop('disabled', true);
        $('#option_anketa input:radio').on('click', option_anketa.action.set);
        $('#option_anketa_button').on('click', option_anketa.action.send);
        option_anketa.ajax.load();
    },
    ajax: {
        load: function load() {
            $.get('/sync/anketa/', option_anketa.ajax.on_load);
        },
        on_load: function on_load(data) {
            option_anketa.action.print(json.parse(data));
            //option_static.action.close();     
        },
        save: function save(anketa) {
            $.post('/option/anketa/', { anketa: anketa }, option_anketa.ajax.on_save);
            option_static.action.close();
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.alert != undefined) {
                profile_alert.option.show(data.alert);
                option_anketa.action.set_anketa(data.text);
            }
        }
    },
    action: {
        set_anketa: function set_anketa(text) {
            $('#user_anketa_option').text(text);
        },
        set: function set() {
            option_anketa.anketa.figure = $(this).val();
        },
        send: function send() {
            option_anketa.anketa.growth = $('#option_anketa_growth').val();
            option_anketa.anketa.weight = $('#option_anketa_weight').val();
            option_anketa.ajax.save(option_anketa.anketa);
        },
        print: function print(anketa) {
            if (anketa.figure != undefined) {
                option_anketa.anketa = anketa;
                var elem = $('#option_anketa input:radio[name=figure]');
                elem.filter('[value=' + anketa.figure * 1 + ']').prop('checked', true);
                $('#option_anketa_growth').val(anketa.growth * 1);
                $('#option_anketa_weight').val(anketa.weight * 1);
            }
            $('#option_anketa input').prop('disabled', false);
        }
    }
};

var option_chlogin = {

    init: function init() {
        $('.option_chlogin_toggle').on('click', option_chlogin.option.toggle);
        $('#option_chpass_send').on('click', option_chlogin.action.chpass);
        $('#option_chlogin_send').on('click', option_chlogin.action.chlogin); /*
                                                                              $('#hide_char').on('click',option_login.action.hide_char);     
                                                                              $('#option_remind_send').on('click',option_login.action.remind);  
                                                                              $('#option_login_reset').on('click',option_login.option.reset);     */

        /*
           $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
           option_intro.action.print(); */
    },
    ajax: {
        chpass: function chpass(pass) {
            $.post('/option/auth/', { pass: pass }, option_chlogin.ajax.on_pass);
        },
        chlogin: function chlogin(login) {
            $.post('/option/auth/', { login: login }, option_chlogin.ajax.on_login);
        },
        on_pass: function on_pass(data) {
            option_chlogin.ajax.on_err(data);
            disabled_with_timeout($('#option_chpass_send'), 0.5);
        },
        on_login: function on_login(data) {
            option_chlogin.ajax.on_err(data);
            disabled_with_timeout($('#option_chlogin_send'), 0.5);
        },
        on_err: function on_err(data) {
            data = json.parse(data);
            if (data.err != undefined && data.err > 0) {
                option_chlogin.option.text(data.say);
            } else option_static.action.close();
        }
    },
    action: {
        chlogin: function chlogin() {
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chlogin_send'), 5);
            option_chlogin.ajax.chlogin($('#option_chlogin_value').val());
        },
        chpass: function chpass() {
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chpass_send'), 5);
            option_chlogin.ajax.chpass($('#option_chpass_value').val());
        }
    },
    option: {
        toggle: function toggle() {
            option_chlogin.option.text('');
            $('#option_tab_chlogin').toggle('blind');
            $('#option_tab_chpass').toggle('blind');
        },
        text: function (_text) {
            function text(_x) {
                return _text.apply(this, arguments);
            }

            text.toString = function () {
                return _text.toString();
            };

            return text;
        }(function (text) {
            $('.option_chlogin_text').text(text);
        })
    }
};

var option_city = {

    init: function init() {
        $('#option_city_value').val(userinfo.data.city);
        $('#option_city_button').off('click').on('click', option_city.action.send_city);
        $('.opt_city_val').off('click').on('click', option_city.action.send_link);
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.city) {
                userinfo.data.city = data.city;
                userinfo.data.city_id = data.city_id;
                userinfo.data.verify = data.verify;
                userinfo.action.set_city();
            }
        }
    },
    action: {
        save: function save(city) {
            userinfo.data.city = city;
            userinfo.ajax.save.city(option_city.ajax.on_save);
            userinfo.action.set_city();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_city.action.save($(this).text());
        },
        send_city: function send_city() {
            option_city.action.save($('#option_city_value').val());
        }
    }
};

var option_contact = {

    init: function init() {
        $('#option_contact input').prop('disabled', true);
        $('#option_contact input:checkbox').on('click', option_contact.action.set);
        $('#option_contact_button').on('click', option_contact.action.send);
        option_contact.action.print();
    },
    ajax: {
        save: function save(contact) {
            $.post('/option/contact/', { contact: contact }, option_contact.ajax.on_save);
        },
        on_save: function on_save(data) {
            mess = json.parse(data);
            $('#user_contact_option').text(mess.count);
            profile_alert.option.show(mess.alert);
            option_static.action.close();
        }
    },
    action: {
        set: function set() {
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked') * 1;
        },
        send: function send() {
            option_contact.ajax.save(userinfo.data.contact);
        },
        print: function print() {
            if (userinfo.data.contact != undefined) {
                $('#option_contact_em').prop('checked', userinfo.data.contact.em * 1);
                $('#option_contact_vk').prop('checked', userinfo.data.contact.vk * 1);
                $('#option_contact_ok').prop('checked', userinfo.data.contact.ok * 1);
                $('#option_contact_fb').prop('checked', userinfo.data.contact.fb * 1);
                $('#option_contact_go').prop('checked', userinfo.data.contact.go * 1);
                $('#option_contact_sk').prop('checked', userinfo.data.contact.sk * 1);
                $('#option_contact_ph').prop('checked', userinfo.data.contact.ph * 1);
                $('#option_contact input').prop('disabled', false);
            }
        }
    }
};

var option_email = {

    init: function init() {
        $('.option_email_button').off('click');
        $('.option_email_button').on('click', option_email.action.send_email);
        if (userinfo.data.email) $('.option_email_value').val(userinfo.data.email);
        option_email.ajax.load();
    },
    ajax: {
        load: function load() {
            $.post('/sync/email/', option_email.ajax.on_load);
        },
        post: function post(email) {
            $.post('/option/email/', { email: email }, option_email.ajax.on_save);
            userinfo.data.email = data.email;
            userinfo.action.set_email();
            option_static.action.close();
        },
        on_save: function on_save(data) {
            profile_alert.option.show(json.parse(data));
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data) {
                if (data.email != '') {
                    userinfo.data.email = data.email;
                    userinfo.action.set_email();
                }
            }
        }
    },
    action: {
        send_email: function send_email() {
            option_email.ajax.post($('.option_email_value').val());
        }
    }
};

var option_intro = {

    name: '',
    city: '',
    age: 0,
    sex: 0,

    init: function init() {
        $('#option_intro input').prop('disabled', true);
        $('#option_intro input:radio').on('click', option_intro.action.set_sex);
        $('#option_intro_button').on('click', option_intro.action.send);
        option_intro.action.print();
    },
    action: {
        set_sex: function set_sex() {
            var sex = $(this).val();
            if (sex != userinfo.data.sex) {
                userinfo.data.sex = sex;
                userinfo.ajax.save.sex(option_sex.ajax.on_save);
                userinfo.action.set_sex();
            }
        },
        set_name: function set_name() {
            var name = $('#option_intro_name').val();
            if (name != userinfo.data.name) {
                userinfo.data.name = name;
                userinfo.ajax.save.name(option_name.ajax.on_save);
                userinfo.action.set_name();
            }
        },
        set_city: function set_city() {
            var city = $('#option_intro_city').val();
            if (city != userinfo.data.city) {
                userinfo.data.city = city;
                userinfo.ajax.save.city(option_city.ajax.on_save);
                userinfo.action.set_city();
            }
        },
        set_age: function set_age() {
            var age = $('#option_intro_age').val();
            if (age != userinfo.data.age) {
                userinfo.data.age = age;
                userinfo.ajax.save.age(option_age.ajax.on_save);
                userinfo.action.set_age();
            }
        },
        send: function send() {
            option_intro.action.set_name();
            option_intro.action.set_city();
            option_intro.action.set_age();
            option_static.action.close();
        },
        print: function print() {
            option_intro.name = userinfo.data.name;
            option_intro.city = userinfo.data.city;
            option_intro.age = userinfo.data.age;
            option_intro.sex = userinfo.data.sex;
            $('#option_intro_name').val(userinfo.data.name);
            $('#option_intro_city').val(userinfo.data.city);
            $('#option_intro_age').val(userinfo.data.age);
            var elem = $('#option_intro input:radio[name=sex]');
            elem.filter('[value=' + userinfo.data.sex * 1 + ']').prop('checked', true);
            $('#option_intro input').prop('disabled', false);
        }
    }
};

var option_login = {

    init: function init() {
        $('#hide_char').on('click', option_login.action.hide_char);
        $('#option_login_send').on('click', option_login.action.send);
        $('#option_remind_send').on('click', option_login.action.remind);
        $('.option_login_toggle').on('click', option_login.option.toggle);
        $('#option_login_reset').on('click', option_login.option.reset);

        /*
           $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
           option_intro.action.print(); */
    },
    ajax: {
        send: function send(login, pass, captcha) {
            $.post('/sync/login/', { login: login, pass: pass, captcha: captcha }, option_login.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                if (data.err != '0') {
                    option_login.option.captcha.reload();
                    option_login.option.captcha.show();
                    option_login.option.say_login(data.say);
                } else {
                    option_login.option.say_login(data.say);
                    location.href = location.href;
                }
                //option_anketa.action.set_anketa(data.text);    
                //option_static.action.close(); 
            }
            disabled_with_timeout($('#option_login_send'), 0.1);
        },
        remind: function remind(email) {
            $.post('/sync/remind/', { email: email }, option_login.ajax.on_load);
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                if (data.err != '0') {
                    option_login.option.say_remind(data.say);
                } else {
                    option_login.option.posted();
                }
            }
            disabled_with_timeout($('#option_remind_send'), 0.1);
        }
    },
    action: {
        hide_char: function hide_char() {
            // $(this)
            var elem = $('#password_input');
            var attr = elem.attr('type');
            if (attr == 'password') {
                elem.attr('type', 'text');
            } else elem.attr('type', 'password');
        },
        send: function send() {
            var login = $('#login_input').val();
            var pass = $('#password_input').val();
            var captcha = $('#captcha_input').val();
            disabled_with_timeout($('#option_login_send'), 7);
            option_login.ajax.send(login, pass, captcha);
        },
        remind: function remind() {
            var email = $('#option_remind_email').val();
            disabled_with_timeout($('#option_remind_send'), 7);
            option_login.ajax.remind(email);
        }
    },
    option: {
        captcha: {
            show: function show() {
                $('#captcha_pass_block').show();
            },
            reload: function reload() {
                if ($('#captcha_code').is(":visible")) $('#captcha_code').get(0).src = '/capcha_pic.php?hash=' + hash;
            }
        },
        say_login: function say_login(text) {
            $('#option_login_text').text(text);
        },
        say_remind: function say_remind(text) {
            $('#option_remind_text').text(text);
        },
        toggle: function toggle() {
            $('#option_tab_login').toggle('blind');
            $('#option_tab_remind').toggle('blind');
            $('#option_tab_posted').hide('blind');
        },
        posted: function posted() {
            $('#option_tab_posted').show('blind');
            $('#option_tab_remind').hide('blind');
            $('#option_tab_login').hide('blind');
        },
        reset: function reset() {
            $('#option_tab_posted').hide('blind');
            $('#option_tab_remind').hide('blind');
            $('#option_tab_login').show('blind');
        }
    }
};

var option_name = {

    init: function init() {
        $('#option_name_value').val(userinfo.data.name);
        $('#option_name_button').off('click').on('click', option_name.action.send_name);
        option_name.option.namelist();
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.name) {
                userinfo.data.name = data.name;
                userinfo.action.set_name();
            }
        }
    },
    action: {
        save: function save(name) {
            userinfo.data.name = name;
            userinfo.ajax.save.name(option_name.ajax.on_save);
            userinfo.action.set_name();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_name.action.save($(this).text());
        },
        send_name: function send_name() {
            option_name.action.save($('#option_name_value').val());
        }
    },
    option: {
        namelist: function namelist() {
            if (userinfo.data.sex == 1) {
                $('#man_opt_name').show();
            }
            if (userinfo.data.sex == 2) {
                $('#woman_opt_name').show();
            }
            if (!userinfo.data.sex) {
                //$('#woman_opt_name').show(); 
            }
            $('.opt_name_val').on('click', option_name.action.send_link);
        }
    }
};

var option_sex = {

    init: function init() {
        $('.option_sex_change').off('click').on('click', option_sex.action.send_sex);
    },
    ajax: {
        on_save: function on_save(data) {
            userinfo.data.name = auto_gen.name(userinfo.data.sex);
            userinfo.ajax.save.name(option_name.ajax.on_save);
            data = json.parse(data);
            if (data.sex) {
                userinfo.data.sex = data.sex;
                userinfo.action.set_sex();
            }
        }
    },
    action: {
        send_sex: function send_sex() {
            if (userinfo.data.sex == 0) {
                userinfo.data.sex = 2;
            } else if (userinfo.data.sex == 1) {
                userinfo.data.sex = 2;
            } else if (userinfo.data.sex == 2) {
                userinfo.data.sex = 1;
            }
            userinfo.ajax.save.sex(option_sex.ajax.on_save);
            userinfo.action.set_sex();
        },
        save: function save(sex) {
            userinfo.data.sex = sex;
            userinfo.ajax.save.sex(option_sex.ajax.on_save);
            userinfo.action.set_sex();
        }
    }
};

var OptionStaticViewer = new Vue({
    el: '#option-static__viewer',
    store: store,
    computed: Vuex.mapState({
        view: function view(state) {
            return state.optionStatic.view;
        }
    }),
    methods: {
        close: function close() {
            store.commit('optionDialog', false);
        }
    }
});

// -- Статический блок опций ---
var option_static = {

    click_enable: null,
    active_elem: null,
    timer_id: null,
    form: null,

    init: function init() {
        if (!$('.option_static').length) return null;

        $('.option_static').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('click', option_static.action.preload);
                elem.data('active', 1);
            }
        }); // alert(1)
        $('#option-static__close').on('click', option_static.action.close);
    },

    ajax: {
        load: function load(option) {
            option_static.option.form.trash();
            $('#option-static__container').load('/static/htm/option_' + option + '.html', option_static.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(visited.list)
            if (data) {
                option_static.action.router();
                option_static.action.show_form();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        },
        save: function save(tid) {
            //$.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        }
    },

    option: {
        loader: {
            show: function show() {
                $('#option-static__loader').delay(1000).show('fade');
            },
            hide: function hide() {
                $('#option-static__loader').clearQueue();
                $('#option-static__loader').hide('fade');
            }
        },
        form: {
            show: function show() {
                $('#option-static__container').show('fade');
            },
            hide: function hide() {
                $('#option-static__container').hide('fade');
            },
            trash: function trash() {
                $('#option-static__container').empty();
            }
        },
        block: {
            show: function show() {
                $('#option-static').show('fade');
            },
            hide: function hide() {
                $('#option-static').hide('fade');
            }
        }
    },

    action: {
        show_form: function show_form() {
            option_static.option.form.show();
            option_static.option.loader.hide();
        },
        preload: function preload() {
            var option = $(this).data('option');
            option_static.form = option;
            if (option) {
                option_static.ajax.load(option);
                option_static.option.block.show();
                option_static.option.loader.show();
            }
        },
        close: function close() {
            option_static.option.form.hide();
            option_static.option.loader.hide();
            option_static.option.block.hide();
        },
        router: function router() {
            if (option_static.form == 'login') {
                option_login.init();
            }
            if (option_static.form == 'contact') {
                option_contact.init();
            }
            if (option_static.form == 'age') {
                option_age.init();
            }
            if (option_static.form == 'name') {
                option_name.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'city') {
                option_city.init();
                city_suggest.init();
            }
            if (option_static.form == 'hidepass') {
                option_email.init();
            }
            if (option_static.form == 'anketa') {
                option_anketa.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'chlogin') {
                option_chlogin.init();
            }
            if (option_static.form == 'introduce') {
                option_intro.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'desire') {
                option_tag.init();
                tag_suggest.init();
            }
        }
    }
};

var option_tag = {

    loaded: 0,

    init: function init() {
        $('#option_tag input').prop('disabled', true);
        $('#option_tag_button').on('click', option_tag.action.send);
        option_tag.action.remind();
        option_tag.ajax.load();
    },
    ajax: {
        load: function load() {
            $.get('/tag/user/', option_tag.ajax.on_load);
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data.tags.length > 0) {
                option_tag.action.print(data.tags);
                user_tag.list = data.tags;
                user_tag.action.store();
            }
            $('#option_tag input').prop('disabled', false);
            //
            //option_static.action.close();
        },
        add: function add(tag) {
            $.post('/tag/add/', { tag: tag }, option_tag.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.id) {
                user_tag.list[user_tag.list.length - 1].id = data.id;
                user_tag.option.set_count();
                option_tag.action.remind();
            } else {
                option_tag.option.error(option_tag.loaded);
            }
            $('#option_tag_value').val('');
            user_tag.action.store();
        },
        del: function del(id) {
            $.post('/tag/del/', { id: id });
        }
    },
    action: {
        remind: function remind() {
            if (user_tag.list.length > 0) {
                option_tag.action.print(user_tag.list);
            }
        },
        send: function send() {
            var tag = $('#option_tag_value').val();
            var data = { "tag": tag, "id": 0 };
            user_tag.list.push(data);
            option_tag.action.remind();
            option_tag.ajax.add(tag);
        },
        set: function set() {
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked') * 1;
        },
        print: function print(tags) {
            $('#option_tag_list').empty();
            for (var i = 0; i < tags.length; i++) {
                var style = '';
                var block_line = $('<i class="desire_tag">').text(tags[i].tag);
                if (!tags[i].id) block_line.addClass('desire_onload');
                block_line.data('id', tags[i].id);
                block_line.data('num', i);
                block_line.data('tag', tags[i].tag);
                block_line.attr('id', 'utag' + i);
                block_line.on('click', option_tag.action.del);
                $('#option_tag_list').append(block_line);
            }
        },
        add: function add() {
            option_tag.ajax.add($(this).data('tag'));
            option_tag.option.toggle(this);
            $(this).on('click', option_tag.action.del);
            var data = { "tag": $(this).data('tag'), "id": $(this).data('id') };
            user_tag.list.splice($(this).data('num'), 0, data);
        },
        del: function del() {
            option_tag.ajax.del($(this).data('id'));
            option_tag.option.toggle(this);
            user_tag.list.splice($(this).data('num'), 1);
            user_tag.option.set_count();
            $(this).on('click', option_tag.action.add);
        },
        ids: function ids() {
            user_tag.idls = [];
            for (var i = 0; i < user_tag.list; i++) {
                if (user_tag.list[i].id) user_tag.idls.push(user_tag.list[i].id);
            }
            return user_tag.idls;
        }
    },
    option: {
        toggle: function toggle(elem) {
            $(elem).off('click');
            $(elem).toggleClass('deleted_tag');
        },
        error: function error(i) {
            $('#utag' + [i]).off('click');
            $('#utag' + [i]).toggleClass('error_tag');
        }
    }
};

var profile_alert = {
    init: function init() {
        $('#profile_alert').on('click', profile_alert.option.hide);
    },
    option: {
        show: function show(text) {
            if (text) {
                var elem = $('#profile_alert');
                elem.clearQueue();
                elem.html(text);
                $('#profile_alert').show('fade');
                $("html, body").animate({ scrollTop: 0 }, "slow");
                elem.delay(5000).queue(profile_alert.option.hide);
            }
        },
        hide: function hide() {
            var elem = $('#profile_alert');
            elem.clearQueue();
            elem.hide('fade');
            elem.delay(500).queue(profile_alert.option.clear);
        },
        clear: function clear() {
            $('#profile_alert').empty();
        }
    }
};

var profile_option = {

    init: function init() {
        $('#profile_auth_button').on('click', profile_option.action.send_auth);
        $('#profile_send_pass').on('click', profile_option.action.send_pass);
        $('#profile_del_email').on('click', profile_option.action.del_email);
        $('#profile_subscr_send').on('click', profile_option.action.subscr);
    },
    ajax: {
        post: function post(login, pass) {
            $.post('/option/auth/', { login: login, pass: pass }, profile_option.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                profile_alert.option.show(data.say);
            }
        },
        send_pass: function send_pass() {
            $.post('/option/passend/', profile_option.ajax.alert);
        },
        del_email: function del_email() {
            $.post('/option/demail/', profile_option.ajax.alert);
        },
        subscr: function subscr(_subscr) {
            $.post('/option/subscr/', profile_option.ajax.error);
        },
        alert: function alert(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                profile_alert.option.show(data.say);
            }
        },
        error: function error(data) {
            data = json.parse(data);
            if (data.err != undefined && data.err > 1) {
                profile_alert.option.show(data.say);
            }
        }
    },
    action: {
        send_email: function send_email() {
            option_email.ajax.post($('#profile_email_value').val());
        },
        send_auth: function send_auth() {
            profile_option.ajax.post($('#profile_login_value').val(), $('#profile_pass_value').val());
        },
        send_pass: function send_pass() {
            profile_option.ajax.send_pass();
        },
        del_email: function del_email() {
            profile_option.ajax.del_email();
        },
        subscr: function subscr() {
            var on = $('#subscr_status_on');
            var un = $('#subscr_status_off');
            if (on.text() == 'включены') {
                un.text('отключены');
                on.text('');
            } else {
                un.text('');
                on.text('включены');
            }
            profile_option.ajax.subscr();
        }
    }
};

// -- Обратная связь ---
var report = {

    is_report: 0,

    init: function init() {
        $('#send_question').click(function () {
            report.show_quest();
        });
        $('#send_report').click(function () {
            report.show_report();
        });
        $('#send_reset').click(function () {
            report.hide();
        });
        $('#report_text').unbind('click');

        $('#hint_close').click(function () {
            report.hint_hide();
        });
    },

    show: function show() {
        $('#report_send').off('click');
        $('#report_block').show('blind');
    },

    hide: function hide() {
        $('#report_block').hide('blind');
    },

    show_quest: function show_quest() {
        report.show();
        $('#report_send').val('Отправить вопрос');
        $('#report_send').on('click', report.post_quest);
    },

    show_report: function show_report() {
        report.show();
        $('#report_send').val('Отправить отзыв');
        $('#report_send').on('click', report.post_report);
    },

    hint_show: function hint_show() {
        $("#hint_block").show('blind');
    },

    hint_hide: function hint_hide() {
        $("#hint_block").hide('fade');
    },

    post_quest: function post_quest() {
        report.hide();
        var text = $('#report_text').val();

        $.post("/mailer/post/", {
            mess: text,
            id: 10336,
            hash: hash
        }, report.on_post);

        report.hint_show();
    },

    post_report: function post_report() {
        report.hide();
        var text = $('#report_text').val();

        $.post("/details.php?reviews", {
            text_reviews: text,
            hash: hash
        });

        report.hint_show();
        $('#report_text').val('');
    },

    on_post: function on_post(data) {
        // alert (data) 
        if (!data) return 0;
        var mess = JSON.parse(data);

        if (mess.error == 'reload') {
            location.href = '/10336?text=' + encodeURIComponent($('#report_text').val());
        }
        $('#report_text').val('');
    }

};

// -- Список контактов ---
var result_list = {

    init: function init() {
        //result_list.ajax.load_visited(); 
    },

    ajax: {

        load_visited: function load_visited() {
            $.get('/contact/visited/' + 'uid' + '/', result_list.ajax.parse_visited);
        },

        parse_visited: function parse_visited(data) {
            // alert(typeof(result_list.visited))
            if (data) {
                result_list.visited = JSON.parse(data);
            }
        }
    },

    action: {

        visited: function visited(list) {
            if (list && list.length) $('.user').each(result_list.action.select);
        },

        select: function select(i, element) {
            var tid = $(element).data('num') + '';
            if (tid != uid) // alert(typeof());  return 0;
                if (visited.list.indexOf(tid) < 0) $('i', $(element)).addClass('list_user_new');else $('i', $(element)).removeClass('list_user_new');
        }

    }
};

////
// РОУТЕР ==========================================================
////

// const routes = [
//     { path: '/sends-contacts', name: 'sends', component: SendsDialog, props: { quick: false } },
//     { path: '/initial-contacts', name: 'initial', component: InitialDialog, props: { quick: true } },
//     { path: '/intimate-contacts',  name: 'intimate', component: IntimateDialog, props: { quick: false },
//         // children: [
//         //     {
//         //         path: 'quick-reply',
//         //         component: HumanDialog,
//         //         props: {
//         //             show : true
//         //         }
//         //     },
//         // ]
//     }
// ];

// // 3. Создаём инстанс роутера с опцией `routes`
// // Можно передать и другие опции, но пока не будем усложнять
// const router = new VueRouter({
//   //mode: 'history',
//   routes // сокращение от routes: routes
// })

// const RouterView = new Vue({
//     el: '#router-view',
//     store,
//     router,
//     created() {
//         console.log('routerView created');
//     },
//     methods: {
//         close() {
//             router.go(-1);
//         }
//     }
// });


// -- Слайдер, главная ---
var slider = {

    timer: null,
    context: 0,
    next: 0,

    init: function init() {
        if (!$('div').is('#top_intro_info_block')) return null;

        $('#top_intro_info_block').on('mouseover', slider.stop);
        $('#top_intro_info_block').on('mouseout', slider.start);

        // Предзагрузка картинок
        setInterval(function () {
            var nn = slider.next + 1 < 5 ? slider.next + 1 : 0;
            var a1 = new Image();
            a1.src = "/img/board/top_intro_info_" + nn + ".jpg";
        }, 10000);
    },

    slide: function slide(num, st) {
        var top_intro_caption = [];
        var top_intro_context = [];
        top_intro_context[0] = 'Позволит познакомиться с парнем или девушкой для секса, найти партнёра в соседнем подъезде или доме напротив. Знакомиться в собственном дворе или районе уже сегодня';
        top_intro_caption[0] = 'Уникальный способ знакомства';
        top_intro_caption[1] = 'Знакомства без регистрации';
        top_intro_context[1] = 'Начинайте использовать всё и сразу, на полную, лишь только зайдя на сайт. Без подтверждений регистрации, без активации анкет. Лёгкий и быстрый поиск новых знакомств';
        top_intro_caption[2] = 'Секс знакомства без смс';
        top_intro_context[2] = 'Ни номеров телефонов, ни подтверждений, ни смс. 100% анонимность, лёгкое и раскрепощённое общение. Онлайн обмен любыми фотографиями. E-mail адрес и всё остальное указывается по желанию';
        top_intro_caption[3] = 'Онлайн общение, интимные темы';
        top_intro_context[3] = 'То что вы хотели спросить, то о чём вы хотели поговорить. Получайте прямо сейчас. Комфортное онлайн общение, интимные беседы, уютная обстановка и приятные собеседники уже ждут вас';
        top_intro_caption[4] = 'Секс знакомства бесплатно';
        top_intro_context[4] = 'Здесь всё бесплатно. Вам доступны все сервисы сайта полностью, уже сейчас. Ваша анкета всегда наверху. Vip аккаунтов нет, открытый доступ ко всем анкетам и безграничные возможности';

        if (num > 4) num = 0;
        for (var i = 0; i < 5; i++) {
            $('#board_img_' + i).removeClass('show');
            $('#board_img_' + i).attr('src', '');
        }

        $('#board_img_' + num).addClass('show active');
        $('#board_img_' + num).attr('src', '/img/board/top_intro_info_' + num + '.jpg');

        if (slider.context) {
            $('#top_intro_info_block_caption').text(top_intro_caption[num]);
            $('#top_intro_info_block_context').text(top_intro_context[num]);
        }

        slider.next = num;
    },

    start: function start() {
        slider.timer = setInterval(function () {
            slider.slide(++slider.next, 0);
        }, 20000);
    },

    stop: function stop() {
        clearTimeout(slider.timer);
    }

};

// -- Хранилище ---  
var storage = {

    enable: 0,

    init: function init() {
        if (storage.is_enable()) {
            storage.enable = 1;
        }
    },

    is_enable: function is_enable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    save: function save(key, val) {
        if (storage.enable) {
            localStorage.setItem(key, val);
        }
    },

    load: function load(key, def) {
        var result = def ? def : null;

        if (storage.enable && localStorage.getItem(key)) {
            result = localStorage.getItem(key);
        }

        return result;
    },

    array: {

        load: function load(key) {
            var result = [];
            var value = null;

            value = storage.load(key);
            value = json.parse(value);
            if (value) result = value;

            return result;
        },

        save: function save(key, val) {
            storage.save(key, json.encode(val));
        },

        add: function add(key, val) {}
    }

};

// -- Города, подсказки, поиск названия ---
var city_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.city_suggest').length) return null;

        $('.city_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', city_suggest.enabled);
                elem.on('blur', city_suggest.blur);
                elem.on('keyup', city_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },

    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', city_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },

    ajax_load: function ajax_load(elem) {
        // alert ($(this).val()); return false //  data('num')
        //if (!elem) elem = this;       
        city_suggest.active_elem = $(this);
        var city = city_suggest.active_elem.val();
        $.get('/town/suggest/', { q: city, hash: hash }, city_suggest.on_load);
        /* */
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = JSON.parse(data);
            if (mess.cities) {
                city_suggest.hide_suggest();
                city_suggest.show_suggest(mess.cities);
            }
        }
    },

    blur: function blur() {
        $('.suggest_block').hide('fade');
    },

    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },

    show_suggest: function show_suggest(cities) {
        var block_line = '';
        var block_this = city_suggest.active_elem.parent();
        for (var i = 0; i < cities.length; i++) {
            if (!cities[i]) continue;

            block_line = $('<div class="suggest_line" data-city="' + cities[i] + '">').text(cities[i]);
            block_line.on('click', city_suggest.print);

            $('.suggest_block', block_this).append(block_line);
        }

        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        city_suggest.active_elem.val($(this).data('city'));
        city_suggest.hide_suggest();
    }

};

// -- Имена подсказки, поиск ---
var name_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.name_suggest').length) return null;

        $('.name_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', name_suggest.enabled);
                elem.on('blur', name_suggest.blur);
                elem.on('keyup', name_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },

    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', name_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },

    ajax_load: function ajax_load(elem) {
        //alert ($(this).val()); //return    data('num')
        //if (!elem) elem = this;       
        name_suggest.active_elem = $(this);
        var name = name_suggest.active_elem.val();
        $.post('/ajax/name.php', { name: name, hash: hash }, name_suggest.on_load);
        /* */
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = JSON.parse(data);
            if (mess.names) {
                name_suggest.hide_suggest();
                name_suggest.show_suggest(mess.names);
            }
        }
    },

    blur: function blur() {
        $('.suggest_block').hide('fade');
    },

    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },

    show_suggest: function show_suggest(names) {
        var block_line = '';
        var block_this = name_suggest.active_elem.parent();
        for (var i = 0; i < names.length; i++) {
            if (!names[i]) continue;
            block_line = $('<div class="suggest_line" data-name="' + names[i] + '">').text(names[i]);
            block_line.on('click', name_suggest.print);
            $('.suggest_block', block_this).append(block_line);
        }

        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        name_suggest.active_elem.val($(this).data('name'));
        name_suggest.hide_suggest();
    }
};

// -- Таги подсказки, поиск ---
var tag_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.tag_suggest').length) return null;
        $('.tag_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', tag_suggest.enabled);
                elem.on('blur', tag_suggest.blur);
                elem.on('keyup', tag_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },
    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', tag_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },
    ajax_load: function ajax_load(elem) {
        tag_suggest.active_elem = $(this);
        var tag = tag_suggest.active_elem.val();
        $.post('/tag/suggest/', { tag: tag, hash: hash }, tag_suggest.on_load);
    },
    on_load: function on_load(data) {
        tag_suggest.hide_suggest();
        data = json.parse(data);
        if (data.tags.length > 0) {
            tag_suggest.show_suggest(data.tags);
        }
    },
    blur: function blur() {
        $('.suggest_block').hide('fade');
    },
    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },
    show_suggest: function show_suggest(tags) {
        var block_line = '';
        var block_this = tag_suggest.active_elem.parent();
        for (var i = 0; i < tags.length; i++) {
            block_line = $('<div class="suggest_line" data-tag="' + tags[i] + '">').text(tags[i]);
            block_line.on('click', tag_suggest.print);
            $('.suggest_block', block_this).append(block_line);
        }
        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        tag_suggest.active_elem.val($(this).data('tag'));
        tag_suggest.hide_suggest();
    }
};

var user_menu = {

    init: function init() {},
    ajax: {},
    action: {
        sets: {
            search: function search() {
                var str = '/index.php?view=simple&town=' + userinfo.data.town + '&years_up=' + userinfo.data.years_up + '&years_to=' + userinfo.data.years_to + '' + '&who=' + userinfo.data.who + ''; // alert(userinfo.data.years_up)
                $('#menu_user_button_search').attr('href', str);
            },
            contact: function contact() {
                //storage.save('contact',0);
                //storage.load('contact');
                var str = '/mail.php';
                $('#menu_message').attr('href', str);
            }
        }
    },
    option: {
        act: {
            show_reg: function show_reg() {
                $('#menu_user_action_new').show();
                $('#menu_user_action_block').hide();
            },
            show_opt: function show_opt() {
                $('#menu_user_action_new').hide();
                $('#menu_user_action_block').show();
            }
        },
        se: function se() {}
    }
};

var user_tag = {

    list: [],
    idls: [],
    sync: 0,
    count: 0,

    init: function init() {
        user_tag.list = storage.array.load('user_tag_list');
        user_tag.sync = storage.load('sync_taglist');
        user_tag.count = storage.load('user_tag_count');
    },
    action: {
        store: function store() {
            storage.array.save('user_tag_list', user_tag.list);
            storage.save('user_tag_count', user_tag.count);
            storage.save('sync_taglist', user_tag.sync);
        },
        ids: function ids() {
            user_tag.idls = [];
            for (var i = 0; i < user_tag.list.length; i++) {
                if (user_tag.list[i].id) user_tag.idls.push(user_tag.list[i].id);
            }
            return user_tag.idls;
        }
    },
    option: {
        set_count: function set_count() {
            if (user_tag.list.length) $('#user_desire_count').text(user_tag.list.length);
        }
    }
};

// -- Информация о пользователе ---
var userinfo = {

    data: {
        uid: 0,
        sex: 0,
        age: 0,
        name: '',
        city: '',
        city_id: 0,
        verify: 0,
        name_mod: 0,
        apromt: 0,
        daily: 0,

        town: '',
        who: 0,
        years_up: 0,
        years_to: 0,
        virt: 0,
        close: 0,

        dating: '',
        setting: 0,
        assist: 0,
        intim: 0,

        second: 0,
        time: 0,
        email: ''
    },

    init: function init() {
        userinfo.ajax.load();
    },
    ajax: {
        load: function load(option) {
            $.get('/sync/sess/', userinfo.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(userinfo.name)
            data = json.parse(data);
            if (data && data.uid) {
                userinfo.data = data;
                userinfo.action.set_data(data);
                master_info.init();
            } else {
                storage.save('auth', 0);
                user_menu.option.act.show_reg();
                userinfo.action.set_string();
            }
        },
        save: {
            sex: function sex(func) {
                $.post('/option/sex/', { sex: userinfo.data.sex }, func);
            },
            age: function age(func) {
                $.post('/option/age/', { age: userinfo.data.age }, func);
            },
            name: function name(func) {
                $.post('/option/name/', { name: userinfo.data.name }, func);
            },
            city: function city(func) {
                $.post('/option/city/', { city: userinfo.data.city }, func);
            }
        }
    },
    action: {
        set_data: function set_data(data) {
            storage.save('auth', data.uid);

            user_menu.option.act.show_opt();
            user_menu.action.sets.search();

            userinfo.action.set_sex();
            userinfo.action.set_age();
            userinfo.action.set_name();
            userinfo.action.set_city();

            userinfo.action.set_string(); /**/
        },
        set_name: function set_name() {
            if (userinfo.data.name && userinfo.data.name.length > 2) {
                $('.user_name_option').text(userinfo.data.name);
                $('.name_suggest').val(userinfo.data.name);
            }
            userinfo.action.set_string();
        },
        set_age: function set_age(say) {
            if (userinfo.data.age > 0) $('.user_age_option').text(userinfo.data.age);
            if (say) $('.user_age_say').text(say);
            userinfo.action.set_string();
        },
        set_city: function set_city() {
            if (userinfo.data.city && userinfo.data.city.length > 3) {
                $('.user_city_option').text(userinfo.data.city);
                $('.city_suggest').val(userinfo.data.city);
            }
            //userinfo.data.city_id = city['city_id'];
            //userinfo.data.verify  = city['verify'];
            userinfo.action.set_string();
        },
        set_sex: function set_sex() {
            var say;
            if (userinfo.data.sex == 0) {
                say = 'Парень или девушка';
            } else if (userinfo.data.sex == 1) {
                say = 'Парень';
            } else if (userinfo.data.sex == 2) {
                say = 'Девушка';
            }
            $('.user_sex_option').text(say);
        },
        set_string: function set_string() {
            var str = userinfo.data.name ? userinfo.data.name : '';
            if (!userinfo.data.name) {
                if (userinfo.data.sex == 1) {
                    str = 'Парень';
                } else if (userinfo.data.sex == 2) {
                    str = 'Девушка';
                }
            }

            var cityLen = userinfo.data.city ? userinfo.data.city.length : 0;
            if (userinfo.data.age > 10 || cityLen > 3) {
                str = str + ', ';
            }
            if (userinfo.data.age > 10) str = str + userinfo.data.age + ' ';
            if (20 - str.length - cityLen >= 0) {
                str = str + userinfo.data.city;
            }
            if (!str) {
                str = 'Кто вы?';
            }
            if (userinfo.data.uid) {
                $('.user_string_option').text(str);
                storage.save('user_string_print', str);
            } else
                //if (!uid)
                $('.user_string_option').text('');
        },
        set_email: function set_email() {
            $('.option_email_value').val(userinfo.data.email);
            $('.profile_email_value').text(userinfo.data.email);
        }

    }
};

// -- Список посещенных страниц ---
var visited = {

    sync: 0,
    list: [],

    init: function init() {
        if (storage.enable) {
            visited.list = storage.array.load('visitor_list'); // alert(visited.list)
            result_list.action.visited(visited.list);
            visited.ajax.sync();
        }
    },

    ajax: {

        sync: function sync() {
            $.get('/sync/visitor/' + uid + '/', visited.ajax.parse_sync);
        },

        parse_sync: function parse_sync(data) {
            if (data) {
                visited.sync = JSON.parse(data); // alert(visited.sync)             
                visited.action.check();
            }
        },

        load: function load() {
            $.get('/contact/visited/' + uid + '/', visited.ajax.on_load);
        },

        on_load: function on_load(data) {
            // alert(visited.list)   
            if (data) {
                visited.list = JSON.parse(data);
                storage.array.save('visitor_list', visited.list);
                result_list.action.visited(visited.list);
            }
        },

        save: function save(tid) {
            $.get('/contact/addvisit/' + uid + '/', { tid: tid }, visited.ajax.parse_save);
        },

        parse_save: function parse_save(data) {
            // 
            if (data) {
                var sync = JSON.parse(data) * 1;
                if (sync) {
                    visited.sync = sync;
                    storage.save('visitor_sync', visited.sync);
                }
            }
        }

    },

    index: function index(data) {
        var result = 0;
        visited.action.load_cache();
        if (visited.list.length && visited.list.indexOf(data + '')) {
            result = 1; // alert('index')
        }
        return result;
    },

    action: {

        check: function check() {
            if (visited.sync != storage.load('visitor_sync')) {
                visited.ajax.load();
                storage.save('visitor_sync', visited.sync);
            }
        },

        save: function save(data) {
            console.log("save", data);
            visited.list = storage.array.load('visitor_list');
            if (visited.list.indexOf(data + '') < 0) {
                visited.list.push(json.encode(data));
                storage.array.save('visitor_list', visited.list);
                visited.ajax.save(data);
            }
        },

        load_cache: function load_cache() {
            if (storage.enable) {
                visited.list = storage.array.load('visitor_list');
            } else visited.list = [];
        }

    }
};
