const ModalDialog = Vue.component('modal-dialog', {
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
})


const RemoveConfirm = Vue.component('remove-confirm', {
    props: ['show', 'data'],
    components: {
        modal: ModalDialog,
    },
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
})




Date.prototype.getMonthChar = function () {
    let month = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
    return month[this.getMonth()];
}

Date.prototype.getDayMonth = function () {
    let date = this.getDay() +' '+ this.getMonthChar();
    return date;
}

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
                console.log('error');
            });
        },
        photo(photo) {
            console.log(photo);
            let links = photo._links;
            if (links.origin.href) {
                let data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
                store.commit('viewPhoto', data);
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
        if (!this.index && this.count < 5) {
            this.fix();
            this.alertOption = true;
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
            return (uid == this.item.from) ? 1 : 0;
        },
        time() {
            let date = new Date(this.item.date);
            //    date = new Date(date);
            let hour = date.getHours();
                hour = (hour < 10) ? '0'+ hour : hour;
            let minute = date.getMinutes();
                minute = (minute < 10) ? '0'+ minute : minute;
            return hour +':'+ minute;
        },
        yesterday() {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            return date;
        },
        date() {
            let first_date = fdate;
            fdate = new Date(this.item.date).getDayMonth();
            let date = (fdate == first_date) ? '' : fdate;
            let today = new Date().getDayMonth();
            let yestd = this.yesterday.getDayMonth();
            date = (date == today) ? 'Сегодня' : date;
            date = (date == yestd) ? 'Вчера' : date;
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


var MessList = new Vue({
    el: '#user-dialog',
    store,
    data: {
        messages: [],
        response: null,
        error: 0,
        attention: false,
        uid: null,
        tid: null,
        date: null,
        toSlow: false,
    },
    mounted: function () {
        this.uid = uid;
        this.tid = tid;
        this.load(tid);
    },
    methods: {
        load(tid) {
            //console.log('load MessList data');
            setTimeout(() => this.toSlow = true, 7000);
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {id: tid, hash: hash}
            };
            axios.get('/ajax/messages_load.php', config).then((response) => {
                this.onLoad(response);
            }).catch((error) => {
                this.error = 10;
                console.log(error);
            });
        },
        onLoad(response) {
            this.messages = response.data.messages;
            console.log(200);
            this.response = 200;
            this.toSlow = false;
            if (!this.messages) {
                this.noMessages();
            }
        },
        noMessages() {
            // TODO: Заменить на компоненты, страрые зависимости
            quick_mess.ajax_load();
            notice_post.show();
        },
        setDate(date) {
            //this.date = new Date(this.item.date).getDayMonth();
        },
        remove(index) {
            console.log('remove('+index+')');
            this.messages.splice(index, 1);
        },
        admit() {
            console.log('itOk false');
            this.attention = false;
        }
    },
    computed: {
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

