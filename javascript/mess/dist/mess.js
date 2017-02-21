'use strict';

$(document).ready(function () {
    // Получение GET параметров по имени
    $.urlParam = function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };

    cont_list.init();

    lock_user.init();
    confirm_block_dn.init();

    moderator.init();

    edit_cont.init();
    added_info.init();
    part_info.init();

    quick_photo.init();
    quick_mess.init();

    mess_sett.init();
    dating_time.init();

    anketa.init();
    add_contact.init();

    if (tid) {
        visited.action.save(tid);
    }
});

// -- Список жалоб на пользователя ---

Vue.http.options.emulateJSON = true;

Vue.component('abuse-form', {
    template: '#abuse-form',
    props: ['show'],
    data: function data() {
        return {
            disabled: false,
            isEditorShow: 0,
            isSuggestShow: 1,
            suggest: ['Предложение оплаты услуг, вирт за деньги, проституция', 'Мошенничество, развод на деньги, шантаж, вымогательство', 'Фото из интернета, вымышленные данные, обман, фейк', 'Оскорбления, хамство, троллинг, грубые сообщения', 'Рассылает интим фото, спамит или провоцирует'],
            text: ''
        };
    },
    created: function created() {
        //console.log("abuse_form Created");
    },
    methods: {
        choiceText: function choiceText(event) {
            this.text = event.target.innerHTML;
            this.isEditorShow = true;
            this.isSuggestShow = false;
        },
        post: function post(event) {
            simple_hash();
            disabled_with_timeout($('.abuse-form__btn'), 10);
            this.$http.post('/abuse/send', {
                id: tid,
                text: this.text,
                captcha: '',
                hash: hash
            }).then(function (data) {
                this.response(data.body);
            });
        },
        cancel: function cancel() {
            this.$emit('cancel');
            this.isSuggestShow = true;
        },
        response: function response(data) {
            console.log(data);
            disabled_with_timeout($('.abuse-form__btn'), 0.1);
            if (!data) return 0;
            var mess = json.parse(data);
            if (mess.saved) {
                this.success(mess.text);
            } else {
                confirm_block_dn.show_confirm(mess.text);
            }
        },
        success: function success(text) {
            console.log('ok');
            confirm_block_dn.show_confirm(text);
            this.cancel();
        }
    }
});

var abuse_list = new Vue({
    el: '#abuse-list-component',
    data: {
        abuseStatus: 0,
        isFormShow: 0,
        isListShow: 0,
        isButtonShow: 0
    },
    mounted: function mounted() {
        //console.log(abuse_form.mess());
    },
    methods: {
        showForm: function showForm(event) {
            if (!this.isFormShow) {
                this.isFormShow = true;
            } else {
                this.hideForm();
            }
            this.isButtonShow = false;
        },
        hideForm: function hideForm(event) {
            this.isFormShow = false;
            this.isButtonShow = false;
            //this.isSuggestShow = true;
        },
        showList: function showList(event) {
            this.isListShow = !this.isListShow;
        },
        showButton: function showButton() {
            if (!this.isFormShow) {
                this.isButtonShow = true;
            }
        }
    }
});

var add_contact = {

    sync_taglist: 0,

    init: function init() {
        $('.add_contact').on('click', add_contact.action.add);
    },
    ajax: {
        add: function add(tag) {
            // alert(tag);        
            $.post('/tag/contact/', { tag: tag });
        }
    },
    action: {
        add: function add() {
            $('.add_contact').removeClass('active');
            $(this).addClass('active');
            add_contact.ajax.add($(this).data('tag'));
        }
    }
};

// -- Подстановка дополнительной информации в отправку сообщения ---
var added_info = {

    init: function init() {
        if (user_sex && (!user_name || !user_age || !user_city)) {
            $('#form_post_mess').append('<div id="added_info_block"></div>'); //{ hash: 15234 }, 
            $('#added_info_block').load('/static/htm/added_info.html #added_load', added_info.onload);
        }
    },

    onload: function onload() {
        var post_form = $('#form_post_mess');
        $('#added_info_btn').click(function () {
            added_info.show();
        });

        added_info.generate();
        added_info.visible();
        name_suggest.init(); // [!!!]
    },

    generate: function generate() {
        var print_age = user_age ? user_age : auto_gen.age(human_age);
        var print_name = user_name ? user_name : auto_gen.name(user_sex);
        var print_city = user_city ? user_city : human_city;

        $('#added_name').val(print_name);
        $('#added_city').val(print_city);
        $('#added_age').val(print_age);
    },

    visible: function visible() {
        added_info.generate();
        $('#added_info_btn').show();
    },

    show: function show() {
        $('#added_info_btn').hide('blind');
        $('#added_info').show('blind');
    }

};

// -- Анкетные данные --        
var anketa = {

    init: function init() {
        $('#anketa_collaps_link').on('click', anketa.action.second_info.toggle);
    },

    action: {
        second_info: {
            toggle: function toggle() {
                if ($('#anketa_second_info').is(':visible')) {
                    anketa.action.second_info.hide();
                } else {
                    anketa.action.second_info.show();
                }
            },

            show: function show() {
                $('#anketa_second_info').show('blind');
                anketa.option.collaps.up();
            },

            hide: function hide() {
                $('#anketa_second_info').hide('blind');
                anketa.option.collaps.down();
            }
        }
    },

    option: {
        collaps: {
            up: function up() {
                $('#anketa_collaps_link').text('Свернуть анкету');
            },

            down: function down() {
                $('#anketa_collaps_link').text('Развернуть анкету');
            }
        }
    }

};

// -- Нижний блок Уведомлений ---
var confirm_block_dn = {

    init: function init() {
        $('#confirm_block_dn').click(function () {
            confirm_block_dn.hide_block();
        });
    },

    show_block: function show_block() {
        $('#confirm_block_dn').show('blind');
    },

    hide_block: function hide_block() {
        $('#confirm_block_dn').hide('blind');
    },

    set_text: function set_text(text) {
        $('#confirm_block_dn').html(text);
    },

    show_confirm: function show_confirm(text) {
        confirm_block_dn.set_text(text);
        confirm_block_dn.show_block();
    }

};

// -- Список контактов ---
var cont_list = {

    acttab: 'inline',
    count: 0,
    clear: 1,
    inlist: 0,
    buffer: [],

    init: function init() {
        $('#contact_update').on('click', cont_list.action.update);
        $('#list_load_next').on('click', cont_list.action.next);
        $('#list_show_optn').on('click', cont_list.option.delets.show);

        $('#list_load_inline').on('click', cont_list.action.tab.inline);
        $('#list_load_online').on('click', cont_list.action.tab.online);
        $('#list_load_faline').on('click', cont_list.action.tab.faline);
        $('#list_load_deline').on('click', cont_list.action.tab.deline);

        cont_list.ajax.load();
    },

    ajax: {

        load: function load() {
            simple_hash();
            $.get('/contact/list/' + cont_list.acttab + '/', { inlist: cont_list.count, hash: hash }, cont_list.ajax.success).fail(cont_list.ajax.error);
        },

        success: function success(data) {
            var mess = [];
            if (data) {
                mess = JSON.parse(data);
            }

            cont_list.inlist = $('#list_contact_block .message_listbox_link').length;

            if (cont_list.clear) cont_list.action.clear();

            if (cont_list.count) {
                //  alert(cont_list.buffer.length)
                $.each(cont_list.buffer, cont_list.action.new_line);
                cont_list.buffer.length = 0;
                if (mess.length) $.each(mess, cont_list.action.buff_cont);
            } else {
                $.each(mess, cont_list.action.new_line);
            }

            cont_list.count = $('#list_contact_block .message_listbox_link').length;
            if (cont_list.count > 2) $('#tip_list_users_block').hide('blind');

            cookie_storage.set_cookie('list_count', cont_list.count, 259200);
            cont_list.action.show();
            cont_list.clear = 1;
        },

        error: function error() {
            setTimeout(cont_list.ajax.load, 7000);
        },

        del_user: function del_user(id) {
            $.post("/human/delete/", { tid: id });
        },

        rec_user: function rec_user(id) {
            $.post("/human/unlock/", { tid: id });
        },

        favorite: function favorite(id) {
            $.post("/human/favorite/", { tid: id });
        },

        general: function general(id) {
            $.post("/human/general/", { tid: id });
        }

    },

    action: {

        show: function show() {
            $('#list_contact_block').show('blind');
        },

        favorite: function favorite(id) {
            if ($('#listbox_line_' + id).data('fav') * 1) {
                cont_list.option.favorite.passive(id);
                cont_list.ajax.general(id);
            } else {
                cont_list.option.favorite.active(id);
                cont_list.ajax.favorite(id);
            }
        },

        delete_user: function delete_user(id) {
            $('#listbox_line_' + id + ' .message_listbox_link').hide('blind');
            $('#listbox_line_' + id + ' .listbox_recover').show('blind');
            cont_list.option.updater.show();
            cont_list.ajax.del_user(id);
        },

        recover_user: function recover_user(id) {
            $('#listbox_line_' + id + ' .message_listbox_link').show('blind');
            $('#listbox_line_' + id + ' .listbox_recover').hide('blind');
            cont_list.ajax.rec_user(id);
        },

        clear: function clear() {
            $('#list_contact_block').empty();
            cont_list.buffer.length = 0;
        },

        update: function update() {
            cont_list.count = 0;
            cont_list.ajax.load();
            cont_list.option.refresh();
        },

        next: function next() {
            cont_list.clear = 0;
            cont_list.ajax.load();
            cont_list.option.refresh();
        },

        buff_cont: function buff_cont(i, val) {
            // alert(val.name);
            cont_list.buffer.push(val);
        },

        new_line: function new_line(i, val) {
            if (i >= 5) {
                cont_list.action.buff_cont(i, val);
                return 0;
            }

            var new_block = $('#listbox_line_ex').clone().attr('id', 'listbox_line_' + val.cont_id) //.css("display","none")
            .click(function () {
                location.href = '/' + val.cont_id;
            }).data('num', val.cont_id).data('fav', val.favorite).appendTo("#list_contact_block");
            // alert ( val.style );
            $('.icon_list', new_block).addClass(val.style);
            $('.user_name', new_block).text(val.name);

            $('.cont_list_fav_user', new_block).click(function () {
                cont_list.action.favorite(val.cont_id);return false;
            });
            $('.cont_list_del_user', new_block).click(function () {
                cont_list.action.delete_user(val.cont_id);return false;
            });
            $('.listbox_recover', new_block).click(function () {
                cont_list.action.recover_user(val.cont_id);return false;
            });

            if (cont_list.acttab == 'deline') {
                $('.cont_list_fav_user', new_block).remove();
                $('.cont_list_del_user', new_block).remove();
            }

            if (val.favorite * 1) cont_list.option.favorite.active(val.cont_id);

            cont_list.option.updater.hide();

            if (val.photo) {
                $('img', new_block).get(0).src = val.photo;
                $('img', new_block).show('fade');
            }
            if (val.unread * 1) {
                $('.unread_count', new_block).text('(' + val.unread + ')');
            }
        },

        tab: {

            show: function show(tab) {
                if (tab != cont_list.acttab) {
                    cont_list.acttab = tab;
                    cont_list.count = 0;
                    cont_list.ajax.load();
                }
                cont_list.option.refresh();
                cont_list.action.tab.active();
            },

            active: function active() {
                $('.listbox_tab').removeClass('active');
                $('#list_load_' + cont_list.acttab).addClass('active');
            },

            inline: function inline() {
                cont_list.action.tab.show('inline');
            },

            faline: function faline() {
                cont_list.action.tab.show('faline');
            },

            deline: function deline() {
                cont_list.action.tab.show('deline');
            },

            addition: function addition() {}
        }

    },

    option: {

        refresh: function refresh() {
            cont_list.option.updater.hide();
            cont_list.option.delets.hide();
            cont_list.option.favorite.show();
        },

        updater: {

            show: function show() {
                $('#contact_update').show('fade');
            },

            hide: function hide() {
                $('#contact_update').hide('fade');
            }
        },

        delets: {

            show: function show() {
                $('.cont_list_del_user').toggle('fade');
                $('.cont_list_fav_user').toggle('fade');
            },

            hide: function hide() {
                $('.cont_list_del_user.touch_option').hide('fade');
            }
        },

        favorite: {

            active: function active(id) {
                $('#listbox_line_' + id + ' .cont_list_fav_user i').addClass('favorite');
                $('#listbox_line_' + id).data('fav', 1);
            },

            passive: function passive(id) {
                $('#listbox_line_' + id + ' .cont_list_fav_user i').removeClass('favorite');
                $('#listbox_line_' + id).data('fav', 0);
            },

            show: function show() {
                $('.cont_list_fav_user').show('fade');
            },

            hide: function hide() {
                $('.cont_list_fav_user').hide('fade');
            }
        }

    }
};

// -- Время свиданий ---
var dating_time = {

    init: function init() {
        dating_time.show();
        dating_time.load();
    },

    show: function show() {
        if (online < 777) {
            $('#button_videochat').show();
        } else if (online < 500000 && dating != '00:00') {
            $('#user_dating_time').text(dating);
            $('#user_dating_time_block').show();
        }
    },

    load: function load() {
        if (uid) {
            $('#dating_time_post_button').on('click', dating_time.ajax.save);

            var dating_hour = cookie_storage.get_cookie('dating_hour');
            if (dating_hour) $("#dating_hour :contains('" + dating_hour + "')").attr("selected", "selected");

            var dating_minut = cookie_storage.get_cookie('dating_minut');
            if (dating_minut) $("#dating_minut :contains('" + dating_minut + "')").attr("selected", "selected");
        } else $('#set_dating_time input').prop("disabled", true);
    },

    ajax: {

        save: function save() {
            var time_str = $('#dating_hour').val().trim() + ':' + $('#dating_minut').val().trim();
            $.get('/ajax/post_abuse.php', { dating_time: time_str, hash: hash }, dating_time.ajax.success);
        },

        success: function success(data) {
            cookie_storage.set_cookie('dating_hour', $('#dating_hour').val(), 259200);
            cookie_storage.set_cookie('dating_minut', $('#dating_minut').val(), 259200);
            $('#saved_dating').show('fade');
            $('#saved_dating').delay(2000).hide('fade');
        }
    }
};

// -- Изменение информации о контакте ---        
var edit_cont = {

    init: function init() {
        $('#edit_cont_btn').click(function () {
            edit_cont.show();
        });
        $('#edit_human_btn').click(function () {
            edit_cont.save();
        });
    },

    show: function show() {
        var print_name = human_name ? human_name : auto_gen.name(human_sex);

        if ($('#human_print_name').text().search(/(Парень|Девушка)/) < 0) print_name = $('#human_print_name').text();

        $('#edit_human_name').val(print_name);

        if (!$('human_data_block').is('#edit_cont_elem')) $('#human_data_block').append($('#edit_cont_elem'));

        $('#edit_cont_elem').toggle('blind');
        $('#human_data_print').toggle('blind'); //alert (123);
    },

    save: function save() {
        human_name = $('#edit_human_name').val();

        edit_cont.update();
        edit_cont.show();
        edit_cont.send();
    },

    send: function send() {
        $.post('/contact/extra/', { tid: tid, age: '', name: human_name, city: '' });
        cont_list.option.updater.show();
    },

    update: function update() {
        $('#human_print_name').text(human_name);
    }

};

var FormMess = new Vue({
    el: '#message_post_form',
    store: store,
    data: {
        message: '',
        reply: '',
        code: '',
        show: true,
        process: false,
        approve: true,
        uid: null,
        tid: null
    },
    mounted: function mounted() {
        this.uid = uid;
        this.tid = tid;
    },
    computed: Vuex.mapState({
        config: function config(state) {
            return state.formMess;
        },
        photo: function photo(state) {
            return state.formMess.sendPhoto;
        }
    }),
    methods: {
        reset: function reset() {
            this.show = true;
            this.process = false;
            this.approve = true;
            this.message = '';
        },

        upload: function upload() {
            store.commit('viewUpload', true);
        },
        cancelPhoto: function cancelPhoto() {
            store.commit('sendPhoto', { photo: null });
        },
        sendPhoto: function sendPhoto() {
            // TODO: почти готово, ждем сообщений
            Vue.http.headers.common['Authorization'] = 'Bearer ' + get_cookie('jwt');
            // let data = {
            // 	alias: this.photo.alias
            // };
            // this.$http.post('http://'+api_photo+'/api/v1/users/'+tid+'/sends', data).then(function (response) {
            //     //console.log(response.body);
            // });
            this.cancelPhoto();
            // window.location.reload();
        },
        sendMessage: function sendMessage() {
            var _this = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                mess: this.message,
                id: this.tid,
                re: this.reply,
                captcha_code: this.code
            };
            axios.post('/mailer/post/', data, config).then(function (response) {
                _this.handler(response.data);
            }).catch(function (error) {
                console.log(error);
            });
            this.process = true;
        },
        handler: function handler(response) {
            if (response.error) {
                if (response.error == 'captcha') {
                    this.approve = false;
                }
            } else {
                MessList.messages.unshift(response.message);
                // TODO: старая зависимость
                giper_chat.timer_cut();
                this.reset();
            }
            this.process = false;
        }
    }
});

// -- Форма отправки сообщения ---
var form_mess = {

    show_form: function show_form() {
        $('#message_post_form').show('blind');
    },

    hide_form: function hide_form() {
        $('#message_post_form').hide('blind');
    }

};

var incoming_photo = new Vue({
    el: '#incoming-photo',
    store: store,
    data: {
        photos: [],
        user: 0,
        server: null
    },
    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto: function loadPhoto() {
            var _this2 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { tid: tid, hash: hash }
            };
            axios.get('http://' + this.server + '/api/v1/users/' + uid + '/sends', config).then(function (response) {
                _this2.photos = response.data.photos;
                //console.log(this.photos);
            }).catch(function (error) {
                console.log(error);
            });
        },

        show: function show(index) {
            var photo = this.photos[index];
            var links = photo._links;
            if (links.origin.href) {
                var data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                store.commit('viewPhoto', data);
            }
            //console.log(this.photos[index].height);
        }
    }
});

$(document).ready(function () {
    incoming_photo.loadPhoto();
});

// -- Блокировка пользователя ---
var lock_user = {

    init: function init() {
        lock_user.set_lock();
        $('#unlock_inform_block').click(function () {
            $(this).hide('blind');
        });
    },

    set_lock: function set_lock() {
        /* */
        $('#lock_user_link').unbind('click');
        $('#lock_user_link').click(function () {
            lock_user.post_lock();
        });
        lock_user.red_link(0);
        MessList.attention = false;
        lock_user.link_text('Заблокировать');
    },

    set_unlock: function set_unlock() {
        $('#lock_user_link').unbind('click');
        $('#lock_user_link').click(function () {
            lock_user.post_unlock();
        });
        lock_user.red_link(1);
        MessList.attention = true;
        lock_user.link_text('Разблокировать');
    },

    show_link: function show_link() {
        $('#lock_user_link').show('fade');
    },

    hide_link: function hide_link() {
        $('#lock_user_link').hide('fade');
    },

    ajax_send: function ajax_send(lock) {
        simple_hash();

        var action = lock ? 'lock' : 'unlock';

        $.post('/human/' + action + '/', {
            tid: tid,
            hash: hash
        });
    },

    post_lock: function post_lock() {
        lock_user.inform_lock();
        lock_user.set_unlock();
        lock_user.ajax_send(1);
    },

    post_unlock: function post_unlock() {
        lock_user.inform_unlock();
        lock_user.set_lock();
        lock_user.ajax_send(0);
    },

    red_link: function red_link(lock) {
        if (lock) {
            $('#lock_user_link').addClass('red_link');
        } else $('#lock_user_link').removeClass('red_link');
    },

    link_text: function link_text(text) {
        $('#lock_user_link').text(text);
    },

    inform_lock: function inform_lock() {
        $('#unlock_inform_block').hide('blind');
        $('#lock_inform_block').show('blind');
    },

    inform_unlock: function inform_unlock() {
        $('#lock_inform_block').hide('blind');
        $('#unlock_inform_block').show('blind');
    }

};

var ModalDialog = Vue.component('modal-dialog', {
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

var RemoveConfirm = Vue.component('remove-confirm', {
    props: ['show', 'data'],
    components: {
        modal: ModalDialog
    },
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
                    text: '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0414\u0438\u0437\u043B\u0430\u0439\u043A" \u0443 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u044B\u0437\u0432\u0430\u043B\u043E \u043D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u044D\u043C\u043E\u0446\u0438\u0438.\n                    \u041D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443 \u0436\u0435. \u041C\u044B \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0443\u0437\u043D\u0430\u0435\u043C \u043E \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F\u0445\n                    \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u0430, \u0435\u0441\u043B\u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0435\u0437 \u043D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u044F.',
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
            var _this3 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id,
                tid: this.item.from
            };
            axios.post('/mess/bun/', data, config).then(function (response) {
                _this3.$emit('remove', _this3.index);
            }).catch(function (error) {
                console.log('error');
            });
        },
        cancel: function cancel() {
            this.showDialog = false;
            console.log('cancel');
        },
        remove: function remove() {
            var _this4 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id
            };
            axios.post('/mess/delete/', data, config).then(function (response) {
                _this4.$emit('remove', _this4.index);
            }).catch(function (error) {
                console.log(error);
            });
            console.log('remove');
        },
        play: function play() {
            var _this5 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { tid: tid }
            };
            var server = this.$store.state.photoServer;
            var url = 'http://' + server + '/api/v1/users/' + uid + '/sends/' + this.alias + '.jpg';
            axios.get(url, config).then(function (response) {
                _this5.photo(response.data.photo);
            }).catch(function (error) {
                console.log('error');
            });
        },
        photo: function photo(_photo) {
            //console.log(photo);
            var links = _photo._links;
            if (links.origin.href) {
                var data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias: _photo.alias,
                    height: _photo.height,
                    width: _photo.width
                };
                store.commit('viewPhoto', data);
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
            return uid == this.item.from ? 1 : 0;
        },
        time: function time() {
            return moment(this.item.date).format('HH:mm');
        },
        date: function date() {
            var date = moment(this.item.date);
            var first_date = fdate;
            fdate = date.date() + ' ' + date.format('MMMM').substring(0, 3);
            date = fdate == first_date ? '' : fdate;
            var today = moment().date();
            var yestd = moment().date(-1);
            date = date == today ? 'Сегодня' : date;
            date = date == yestd ? 'Вчера' : date;
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

var MessList = new Vue({
    el: '#user-dialog',
    store: store,
    data: {
        messages: [],
        response: null,
        error: 0,
        next: 0,
        batch: 15,
        received: 0,
        attention: false,
        uid: null,
        tid: null,
        date: null,
        toSlow: false
    },
    mounted: function mounted() {
        this.uid = uid;
        this.tid = tid;
        this.load();
    },
    methods: {
        load: function load() {
            var _this6 = this;

            //console.log('load MessList data');
            this.response = 0;
            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { id: this.tid, next: this.next, hash: hash }
            };
            axios.get('/ajax/messages_load.php', config).then(function (response) {
                _this6.onLoad(response);
            }).catch(function (error) {
                _this6.error = 10;
                console.log(error);
            });
            setTimeout(function () {
                return _this6.toSlow = true;
            }, 7000);
        },
        onLoad: function onLoad(response) {
            var messages = response.data.messages;
            this.received = messages.length;
            this.messages = _.union(this.messages, messages);
            if (!this.messages) {
                this.noMessages();
            } else {
                // TODO: Заменить на компоненты, страрые зависимости
                lock_user.show_link();
                this.next += this.batch;
            }
            this.response = 200;
            this.toSlow = false;
        },
        noMessages: function noMessages() {
            // TODO: Заменить на компоненты, страрые зависимости
            quick_mess.ajax_load();
            notice_post.show();
        },
        setDate: function setDate(date) {
            //this.date = new Date(this.item.date).getDayMonth();
        },
        remove: function remove(index) {
            console.log('remove(' + index + ')');
            this.messages.splice(index, 1);
        },
        admit: function admit() {
            console.log('itOk false');
            this.attention = false;
        }
    },
    computed: {
        more: function more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        }
    }
});

// // -- Список сообщений ---
// var mess_list = {

//     mess_is_load: 0,


//     mail_pages: 0,
//     view_confirm: 0,


//     on_load: function (data)
//     {
//         mess_list.view_confirm = 0;
//         mess_list.mess_is_load = 1;
//         mess_list.mail_pages  += 15;

//         //if( reload )
//         //   mess_list.mail_pages = 0;

//         mess_list.hide_loader();

//         if (1)
//         {
//             //if( reload )
//             //    $('#mail_messages_block').empty();

//             lock_user.show_link();
//             $('#mail_messages_block').append( data );

//             mess_list.list_init();

//             mess_list.option.pages_show();

//             $('#mail_messages_block').show('blind');

//             var first_mess =  $('.message_list_save:first').data('number');
//             var mess_id = $(this).data('number');

//             $('.bunned_mess').on('click',function() { mess_list.action.bun_mess($(this).data('number')); });
//             $('.remove_mess').on('click',function (){ mess_list.action.remove_mess($(this).data('number')); });
//             $('.img_reload').on('click',function () { mess_list.action.image_reload($(this).data('number')); });

//             return 0;
//         }

//         if( !data )
//         {                          // alert ( $('.message_list_block').length );
//             if (!$('.message_list_block').length)
//             {
//                 quick_mess.ajax_load();
//                 notice_post.show();
//             }
//             $('#mail_pages_next').hide('blind');
//             return 0;
//         }

//         if( data.indexOf('error') > 0 )
//         {
//             var mess = JSON.parse( data );
//             if( mess.error == 'hold' )
//             {
//                 mess_list.action.show_bad_alert( mess.text );
//                 return 0;
//             }
//         }

//     } ,

//     on_error: function ()
//     {
//         setTimeout( function (){ mess_list.ajax_load(tid); },7000 );
//         mess_list.show_loader(1);                              //////////////////////////////////
//     } ,


//     show_loader: function (img)
//     {
//        $('#mess_loader').show('blind');
//        if (img)
//            $('#mess_loader img').show('fade');
//     } ,

//     hide_loader: function ()
//     {
//        $('#mess_loader').hide();
//     } ,

//     action: {

//         badshow: function ()
//         {                             // alert(1);
//             mess_list.view_confirm = 1;
//             mess_list.mail_pages = 0;

//             mess_list.ajax_load(tid);

//             mess_list.show_loader(1);
//             mess_list.action.badalert_hide();
//         } ,


//         show_bad_alert: function (text)
//         {
//             mess_list.hide_loader();
//             $('#mail_bad_text_alert input').on('click',mess_list.action.badshow);
//             $('#mail_bad_text_alert .link_underline').hide(); //on('click',function(){cont_list.action.delete_user(tid);});
//             $('#mail_bad_text_alert span.text').text( text );
//             $('#mail_bad_text_alert').show('fade');
//         } ,


//         image_reload: function (id)
//         {
//             var url = $( '#img_'+ id ).get(0).src.replace("/protect/","/origin/") ;
//             $( '#img_'+ id ).get(0).src = url ;
//         } ,

//         ajax_recove: function (mess_id)
//         {
//             $.post("/mess/recover/", { tid: tid, id: mess_id });
//         } ,

//         ajax_remove: function (mess_id)
//         {
//             $.post("/mess/delete/", { tid: tid, id: mess_id });
//         } ,

//         ajax_bun: function (mess_id)
//         {
//             $.post("/mess/bun/", { tid: tid, id: mess_id } );
//         } ,

//         badalert_hide: function ()
//         {
//             $('#mail_bad_text_alert').hide('blind');
//         } ,

//         mess_hide: function (mess_id)
//         {
//             $('#message_block_'+mess_id).hide('blind');
//         } ,

//         mess_show: function (mess_id)
//         {
//             $('#message_block_'+mess_id).show('blind');
//         } ,

//         remove_mess: function (mess_id)
//         {
//             mess_list.action.ajax_remove(mess_id);
//             mess_list.action.removed_show(mess_id);
//             mess_list.action.mess_hide(mess_id);
//         } ,

//         bun_mess: function (mess_id)
//         {
//             mess_list.action.ajax_bun(mess_id);
//             mess_list.action.removed_show(mess_id);
//             mess_list.action.mess_hide(mess_id);
//             abuse_list.showButton();
//         } ,

//         recove_mess: function (mess_id)
//         {
//             mess_list.action.ajax_recove(mess_id);
//             mess_list.action.removed_hide(mess_id);
//             mess_list.action.mess_show(mess_id);
//         } ,

//         removed_hide: function (mess_id)
//         {
//             $('#remove_message_'+mess_id).hide('blind');
//         } ,

//         removed_show: function (mess_id)
//         {
//             if (!$('div').is('#remove_message_'+mess_id))
//             {
//                 var new_remove = $('#recover_mess_block_ex').clone()
//                  .attr( 'id', 'remove_message_'+mess_id ).css("display","none")
//                  .insertBefore($('#message_block_'+mess_id));
//                 $('span',new_remove).on('click',function () { mess_list.action.recove_mess(mess_id); });
//             }

//             $('#remove_message_'+mess_id).show('blind');
//         }

//     } ,

//     option:  {

//         enable: true,
//         frize: false,

//         pages_show: function ()
//         {
//              if ($('.message_list_block').length > 14)
//              {
//                  $('#mail_pages').show('blind');
//                  mess_list.option.hint(0);
//              }
//              else
//                  mess_list.option.hint(1);
//         } ,

//         hint: function (show)
//         {
//             if (show)
//             {
//                 $('#mess_option_hint').show();
//             }
//             else
//                 $('#mess_option_hint').hide();
//         } ,

//         bunn_all: function (lock)
//         {
//             if (lock)
//             {
//                 mess_list.option.red_link(lock,0);
//                 mess_list.option.frize = true;
//                 mess_list.option.show();
//             }
//             else
//             {
//                 mess_list.option.red_link(lock,0);
//                 mess_list.option.frize = false;
//                 mess_list.option.hide();
//             }
//         } ,

//         red_link: function (lock,num)
//         {
//             var elem = num ? $('.bunned_mess','#message_block_'+num) : $('.bunned_mess');

//             if (lock)
//             {
//                 elem.addClass('red_link');
//             }
//             else
//                 elem.removeClass('red_link');
//         } ,

//         togg: function (num)
//         {
//             $('.message_list_save','#message_block_'+num).toggle('fade') ;
//         } ,

//         hide: function (num)
//         {
//             var elem = num ? $('.message_list_save','#message_block_'+num) : $('.message_list_save');
//             elem.hide();
//         } ,

//         show: function (num)
//         {
//             var elem = num ? $('.message_list_save','#message_block_'+num) : $('.message_list_save');
//             elem.show('fade',100);
//         }
//     }

// }


// -- Настройки почты, поиска ---  
var mess_sett = {

    init: function init() {
        $('#post_mail_setting').on('click', mess_sett.ajax_post);
        mess_sett.print(cookie_storage.get_data('mail_sett'));

        $('#mail_setting_hide').on('click', mess_sett.hide);
        $('#mail_setting_show').on('click', mess_sett.show);
    },

    print: function print(sett) {
        if (!sett.who) {
            $("#opt_who").val(0);
        } else $("#opt_who").val(sett.who);

        if (sett.town * 1) $("#opt_town").attr("checked", "checked");

        if (sett.virt * 1) $("#opt_virt").attr("checked", "checked");

        if (sett.up > 0) $("#opt_up").val(sett.up);

        if (sett.to > 0) $("#opt_to").val(sett.to);
    },

    /* -- Скрыть/показать настройки --- */
    show: function show() {
        $('#form_mail_setting').show('blind');
        $('#mail_setting_show').hide('fade');
        cookie_storage.del_cookie('hide_mail_setting');
    },

    hide: function hide() {
        $('#form_mail_setting').hide('blind');
        $('#mail_setting_show').show('fade');
        cookie_storage.set_cookie('hide_mail_setting', 1, 259200);
    },

    on_save: function on_save() {
        $('#saved_setting').show('fade');
        $('#saved_setting').delay(2000).hide('fade');
    },

    ajax_post: function ajax_post() {
        var post_data = $('#form_mail_setting').serialize();
        $.post('/msett/save/', post_data);

        mess_sett.on_save();
        return false;
    }

};

// -- Я модератор, кнопка, блок ---
var moderator = {

    init: function init() {
        $('#moder_button').click(function () {
            moderator.ajax_auth();$('#moder_block').show('fade');
        });
        $('#moder_block_close').click(function () {
            moderator.close_block();
        });
    },

    ajax_auth: function ajax_auth() {
        disabled_with_timeout($('.bun_btn_all'), 5);
        $.post('/moder/auth/', moderator.auth_resp);
    },

    ajax_promt: function ajax_promt() {
        disabled_with_timeout($('.bun_btn_all'), 5);
        $.post('/moder/promt/', moderator.auth_resp);
    },

    ajax_press: function ajax_press(id, secure, expire, mark) {
        disabled_with_timeout($('.bun_btn_all'), 5);
        $.post('/moder/press/', { id: id, secure: secure, expire: expire, mark: mark }, moderator.auth_resp);
    },

    auth_resp: function auth_resp(data) {
        if (data) {
            $('#moder_block_inner').empty();
            $('#moder_block_inner').html(data);
            moderator.new_sett();
            disabled_with_timeout($('.bun_btn_all'), 0.1);
        }
    },

    close_block: function close_block() {
        $('#moder_block').hide('fade');
    },

    new_sett: function new_sett(data) {
        $('#moder_agree').click(function () {
            moderator.ajax_promt();
        });
        $('#moder_close').click(function () {
            moderator.close_block();
        });

        var id = $('#bun_mess_id').val();
        var secure = $('#bun_mess_secure').val();
        var expire = $('#bun_mess_expire').val();
        $('#bun_ys').click(function () {
            moderator.ajax_press(id, secure, expire, 1);
        });
        $('#bun_no').click(function () {
            moderator.ajax_press(id, secure, expire, -1);
        });
        $('#bun_ig').click(function () {
            moderator.ajax_press(id, secure, expire, 0);
        });
        $('#bun_next').click(function () {
            moderator.ajax_press(0, secure, expire, 0);
        });
    }

};

// -- Предупреждение ф форме отправки сообщения ---        
var notice_post = {

    show: function show() {
        //if ($.urlParam('notice_alert')) notice_post.alert(); 
        if ($('#notice_post').text().trim().length > 5) $('#notice_post').show('clip');
    },

    alert: function alert() {
        $('#notice_post').toggleClass("notice_post notice_alert");
    }

};

// -- Большие подсказки в анкете ---     
var part_info = {

    init: function init() {
        if ($('#part_tip_block').data('name')) part_info.reset();
    },

    reset: function reset() {
        $('#part_tip_close').click(function () {
            part_info.close();return false;
        });
        $('#part_tip_block form').submit(function () {
            part_info.close();return false;
        });
    },

    close: function close() {
        var post_form = $('#form_post_mess');
        $('#part_tip_block').hide('blind');

        var name = $('#part_tip_block').data('name');
        $.post('/user/closetip/', { tip: name });
    }
};

/* -- Установка динамической отправки формы ---  
if( uid && user_sex ) $('#form_post_mess').bind('submit', function(){
 return post_mess();
});  
   
function post_mess( user,text ) { 
  if( !text ) text = $('#mess_text_val').val();
  if( !user ) user = tid;
   simple_hash();
                    
   
  $.post("/mailer/post/", {mess: text, id: user, hash: hash},  
   onAjaxSuccess );           
  
  function onAjaxSuccess(data) {       //  alert (data)     
   if( !data ) return 0;  
    var mess = JSON.parse( data );  
    if( mess.error == 'captcha' ) { 
     $('#form_post_mess').unbind('submit');
     $('#form_post_mess').submit(); }
    if( mess.saved == '1' ) {  
     load_mess( user,'reload' );
     $('#mess_text_val').val('');
      } 
    if( mess.error == 'reload' ) {     
     ft = 0; //alert ('reload')  
     $('#form_post_mess').unbind('submit');
     $('#form_post_mess').submit();            
    }                      
  }            
   return false;
}             */

// -- Быстрые сообщения, шаблоны ---
var quick_mess = {

    tab: 'public',
    more: 0,

    init: function init() {
        $('.quick_mess_tab').on('click', quick_mess.tabs_link);
        $('#mess_shab_more').on('click', quick_mess.more_link);
    },

    show: function show(num) {
        var elem = num ? $('.message_list_save', '#message_block_' + num) : $('.message_list_save');
        elem.show('fade', 100);
    },

    tabs_link: function tabs_link() {
        quick_mess.more = 0;
        quick_mess.tab = $(this).data('tab');
        quick_mess.ajax_load();
    },

    more_link: function more_link() {
        quick_mess.more++;
        quick_mess.ajax_load();
        if (quick_mess.more >= 2) {
            $('#mess_shab_more').hide();
            return false;
        }
    },

    ajax_load: function ajax_load() {
        $('#mess_shab_more').show('fade');

        var url = '/ajax/html/mess_link_shab_text_' + quick_mess.tab + quick_mess.more + '.htm';

        $.get(url, quick_mess.on_load);
        // , {hash: hash}
    },

    print: function print() {
        $('#mess_text_val').val($(this).text().trim());
    },

    on_load: function on_load(data) {
        if (!quick_mess.more) $('#mess_shab_wrap').empty();

        $(data).filter('.link_shab_text').on('click', quick_mess.print).appendTo('#mess_shab_wrap');

        $('#mess_shab_text_block').show('fade');

        //mess_list.hide_loader();
    }

};

// -- Быстрые фотографии ---
var quick_photo = {

    init: function init() {
        quick_photo.ajax.load();
    },

    ajax: {

        load: function load() {
            // TODO: запустить быстрые фото. ВЫКЛЮЧЕНО !!!
            //$.get( '/ajax/load_pic.php',quick_photo.ajax.success);
        },

        success: function success(data) {
            if (data.indexOf('div') > 0) {
                $('#micro_images_hint').html(data);
                $('.img_list_micro').click(function () {
                    location.href = '/mail.php?photo=' + $(this).attr('alt') + '&id=' + tid;
                });
                $('#send_photo_link').mouseover(function () {
                    $('#micro_images_block').show('fade');
                });

                $(document).mouseup(function (e) {
                    var container = $('#micro_images_block');
                    if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                        {
                            container.hide('fade');
                        }
                });
            }
        }

    }
};
