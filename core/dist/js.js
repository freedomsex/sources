   
// -- Автогенератор информации ---        
var auto_gen = {    
    
    name: function (sex) 
    {      
        var name = []                              
        name[0] = ['Онилиона','Безимени','Неуказано','Хуисзиз','Незнаю','Неизвестно','Несонено'];
        name[1] = ['Саша','Дима','Сергей','Иван','Максим','Валера','Николай'];          
        name[2] = ['Оля','Юля','Настя','Алена','Катя','Маргарита','Татьяна'];  
        
        var x = Math.floor( Math.random() * 7);

        return name[sex][x];     
    } ,
    
    age: function (year) 
    {                                    
        var age = []                  
        age[0] = [18,21,24,25,27,28,31];
        age[1] = [year+3,year+2,year+1,year,year-1,year-2,year-3];
 
        var y = year ? 1 : 0;
        var x = Math.floor( Math.random() * 7);
                                
        return age[y][x]; 
    } 
    
}



var cookie_storage = {
         
    enabled: 0, 

    init: function () 
    {  

    } ,

    get_cookie: function (name) 
    {       
        var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' ); 
        if (results)
          return (unescape(results[2]));
        else
          return null; 
    } ,
     
    del_cookie: function (name) 
    {              
        expires = new Date(); // получаем текущую дату 
        expires.setTime( expires.getTime() - 1000 ); 
         document.cookie = name + "=; expires=" + expires.toGMTString() +  "; path=/";  
    } ,    
    
    set_cookie: function (name,val,time) 
    {      
        expires = new Date(); 
        expires.setTime( expires.getTime() + (1000 * 60 * time ) ); // минут
         document.cookie = name + "="+ val +"; expires=" + expires.toGMTString() +  "; path=/";

    } ,  
    
    get_data: function (name) 
    {  
        var data = get_cookie(name); 
        var result = null;     
         
        if (data)   
        try 
        {
          result = JSON.parse(data);
        } 
        catch(e) { }      
        
        return result;     
    } ,  
    
    set_data: function () 
    {  

    }  
  
  

}



function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}   

function del_cookie ( name ) {    
  expires = new Date(); // получаем текущую дату 
  expires.setTime( expires.getTime() - 1000 ); 
   document.cookie = name + "=; expires=" + expires.toGMTString() +  "; path=/"; 
}
function set_cookie ( name, val, time ) {   
  expires = new Date(); 
  expires.setTime( expires.getTime() + (1000 * 60 * time ) ); // минут
   document.cookie = name + "="+ val +"; expires=" + expires.toGMTString() +  "; path=/";
} 
 

  
var desire_clip = { 
 
    sync_taglist: 0,
  
    init: function () {                      
        desire_clip.action.set();            
        desire_clip.ajax.sync();                          
    },    
    ajax: {     
        sync: function () {                     
            $.get('/sync/taglist/', desire_clip.ajax.parse);                  
        },   
        parse: function (data) {                          
            data = json.parse(data);                           
            if (data.id != undefined) { 
                if (data.id && user_tag.sync != data.id) {
                    user_tag.sync = data.id;  
                    user_tag.action.store();   
                    desire_clip.ajax.load();  
                } 
            }          
        },     
        load: function () {                     
            $.get('/tag/user/', desire_clip.ajax.on_load);                  
        },   
        on_load: function (data) {                    // alert(data)       
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
        add: function (tag) {                             
            $.post('/tag/add/', { tag: tag });                   
        }           
    },        
    action: {   
        set: function () { 
            user_tag.action.ids();      
            $('.desire_clip').each(function (i,elem) {  
                $(elem).off('click'); 
                $(elem).removeClass('desire_user');      
                if (user_tag.idls.indexOf($(elem).data('id')) >= 0) {   
                    $(elem).addClass('desire_user');  
                } else                        
                    $(elem).on('click',desire_clip.action.add);        
            }); 
            user_tag.option.set_count();  
        },  
        add: function () {  
            desire_clip.ajax.add($(this).data('tag'));  
            desire_clip.option.toggle(this);    
            //$(this).on('click',desire_clip.action.del);          
            var data = {"tag":$(this).data('tag'),"id":$(this).data('id')}; 
            user_tag.list.push(data);          
        },  
        del: function () {                              
            option_tag.ajax.del($(this).data('id'));   
            desire_clip.option.toggle(this);      
            user_tag.list.splice($(this).data('num'),1);
            $(this).on('click',desire_clip.action.add);             
        }                                      
    },        
    option: { 
        toggle: function (elem) {   
            $(elem).off('click');   
            $(elem).toggleClass('desire_user');              
        }
    }     
}          



var device = {    
        
    init: function () 
    {   
                                      
    } ,

    width: function () 
    {   
        return $(window).width();                                 
    } ,

    height: function () 
    {   
        return $(window).height();  //document                               
    }  
    
        
}
  

              
var active_textarea ;             ////////////////////////////////////////////////////////
var giper_chat = {    
        
    open_mess:  0,
    idle_round: 0,

    count_unread: 0, 
    cascade: 0,
     
    round_time: 0, 
    round_open: 1, 
    
    timer_id:   null,  
    mess_block: null, 
    
    mess_stock: [],
      
    prev_title: null,
        
    init: function () 
    {                           
        if (device.width() > 1200) { 
            giper_chat.mess_stock = storage.array.load('mess_stock'); 
            giper_chat.remind();  
        }                      
            $('<div id="block_timer" class="timer">').appendTo('body');
        giper_chat.timer_set(); 
        giper_chat.new_round();
         
        $('#giper_reply .post').on('click', giper_chat.reply_show);  
        // Установка текста по умолчанию
        if (storage.load('reply_all'))  
            $('#giper_reply textarea').val(storage.load('reply_all'));
        giper_chat.prev_title = document.title; 
    } ,

    set_unread: function () 
    {      
        if (giper_chat.count_unread > 0) 
        {
            $('#menu_message_unread b').text(giper_chat.count_unread);
            $('#menu_message_unread').show();
            $('#menu_message').attr('title','Новых сообщений ' + giper_chat.count_unread); 
        } else {
            $('#menu_message_unread').text(''); 
            $('#menu_message_unread').hide(); 
            $('#menu_message').attr('title','Новых сообщений нет');
        }                                 
    } , 
  
    on_timer: function () 
    {
        giper_chat.title_blink ();

        if (giper_chat.round_open && giper_chat.cascade == 0)
            giper_chat.round_time--

        //if (giper_chat.cascade != 0)console.log('on_timer cascade: ' +giper_chat.cascade)
  
        giper_chat.trace();
        
        if (giper_chat.round_time < 1) 
            giper_chat.new_round(); 
    } , 
    
    new_round: function () 
    {          
        giper_chat.timer_stop(); 
        giper_chat.ajax_new(); 
    } ,
    
    trace: function () 
    {
        $('#block_timer').text(giper_chat.round_time);
    } ,
  
    ajax_new: function () 
    {         
        simple_hash();  
        giper_chat.round_open = 0;
         
        $.get('/ajax/new_mess.php',{ hash: hash }, giper_chat.on_load) 
          .always( function() { giper_chat.round_open = 1; } );    
    } ,

    on_load: function (data)
    {
        if (data) {    
            var mess = json.parse(data); 
            giper_chat.route_xz(mess); 
            giper_chat.count_unread = mess.count_unread          ////////////////////////////////////
            giper_chat.set_unread();                             ////////////////////////////////////
        }   
        setTimeout( function (){ giper_chat.timer_set(); },5000 );  
    } ,
    
    route_xz: function (mess)
    { 
        if (device.width() > 1200 && mess.type && giper_chat.open_mess < 9) {                               /* */
            if (mess.type == 'air_user' || mess.type == 'new_client') {          
                visited.action.load_cache();
                if (visited.list.length) {
                    if (visited.list.indexOf(mess.user+'') >= 0) {     
                        giper_chat.reply_enable();
                        giper_chat.idle_round = 0;  
                        setTimeout( function (){ giper_chat.timer_set(); },5000 ); 
                        return 0;         
                    }
                }  
            }           
            giper_chat.mess_stock.push(mess);
            giper_chat.stock.store(); 
            giper_chat.new_message(mess); 
        }                     
    } ,

    reply_enable: function ()
    {                      
        if (giper_chat.cascade == 0)
        {     
            if (giper_chat.open_mess > 2)                     
                $('#giper_reply').show('blind');
            if (giper_chat.open_mess > 5)                     
                $('#giper_reply textarea').show('blind');   
        }  
            
        if (giper_chat.open_mess < 3)                     
            $('#giper_reply').hide('blind');
        if (giper_chat.open_mess == 0)                     
            giper_chat.cascade = 0;      
                  
                // console.log('re cascade: ' +giper_chat.cascade)
            
    } ,

    reply_show: function ()
    {                                           
        var textarea = $('#giper_reply textarea');
        if (!$(textarea).is(":visible"))
        {                          
            active_textarea = textarea;  
            textarea.show('blind');  
            textarea.focus();            
            notepad.show();                                          ////////////////////////////////////
        }   
        else  
            giper_chat.reply_all();  
                                        
    } ,
 
    reply_all: function ()
    {  
        var textarea = $('#giper_reply textarea'); 
        var text = textarea.val(); 
         
        if (text)
        {                              
            var block_mess = $('#giper_stock').children().filter(':first');     
            giper_chat.cascade = text;
            storage.save('reply_all',text);
            $('textarea',block_mess).val(text);
            $('.post',block_mess).click(); 
            textarea.hide('blind'); 
        }              
        giper_chat.reply_enable();                  
    } ,
 
    new_message: function (val) 
    {                              //  elem.appendChild();   
                     
                                
        giper_chat.open_mess++ 
        giper_chat.reply_enable(); 
        
        new_block = giper_chat.create_message(val);

        new_block.prependTo($('#giper_stock'));
          
        new_block.show('blind'); 

        setTimeout( function (){ $('.sound',new_block).show(); },500 ); 
                            
        giper_chat.idle_round = 0;  
               // giper_chat.mess_stock.push(val);
               // giper_chat.stock.store();           
     
    } ,  
    
    remind: function () 
    {                       
        jQuery.each (giper_chat.mess_stock,function(i,val) 
        {                     
            giper_chat.new_message(val);
        });             
    } , 
    
    stock: {  
          
        store: function () 
        {  
             storage.array.save('mess_stock',giper_chat.mess_stock);  
        } ,      
    
        remove: function (num) 
        {                               
            var del = null;
            jQuery.each (giper_chat.mess_stock,function(i,val) 
            {                     
                if (val.mess_id == num)
                    del = i;
            });  
            
            if(del || del == 0)
            {                               //alert($('.new_message').length + '  <> ' + giper_chat.mess_stock.length)
                giper_chat.mess_stock.splice(del,1); 
                if ((giper_chat.mess_stock.length - $('.new_message').length) > 1)
                    giper_chat.mess_stock = [];    
                giper_chat.stock.store(); 
            }   
        }  
      
    } ,
    
     
    create_message: function (val) 
    {                  
        if (!val.reply) val.reply = '';        
        
        //return 0;
        
        var new_block = $('#new_message_ex').clone()
         .attr( 'id', val.type+'_'+val.mess_id )  //.css("display","none")  
         .data('number',val.mess_id)
         .data('user',val.user)
         .addClass( val.type );
                                              
         $('.mess_text',new_block).html(val.text);       // click( function (){ location.href =  }); 
         $('.close',new_block).click( 
             function ()
             { 
                 giper_chat.close_message($(new_block));  
             }
         );
         
         if( val.type == 'new_message' || val.type == 'old_message' ) 
         {        
             if( val.type == 'old_message' )
             {                 
                 $('.title',new_block).text('Есть сообщение без ответа'); 
                 $('.sound',new_block).remove(); 
             }         

             $('.post',new_block).click( function (){ giper_chat.post_mess(val); });

             $('textarea',new_block).val( val.reply );          
             $('.user_name',new_block).text(val.name+':'); 
             $('.history',new_block).click( 
             function ()
             {             
                 giper_chat.follow_message(val.user,val.mess_id);  
             });
                
             $('.bunn',new_block).click( function ()
             { 
                 giper_chat.ajax_bun(val.user,val.mess_id,val.type); 
                 giper_chat.open_mess--; 
             });  
 
             if( val.type == 'new_message' ) 
                 $('#contact_update').show('fade');
         }  
         
         if( val.type == 'server_mess' ) 
         { 
             $('.sound',new_block).remove(); 
             $('.title',new_block).text( val.reply );  
             $('.bunn',new_block).remove();  
             $('.post',new_block).val('Хорошо');

             $('.post',new_block).click(
                 function ()
                 { 
                     send_serv_mess($('#'+val.type+'_'+val.mess_id ),'tip_user_bun_close')  
                 }
              ); 
 
              $('.history',new_block).text( 'Подробнее...' ) ;
              $('.history',new_block).attr( 'href','/блог/наказывайте-кого-следует/' ) ;
              $('.history',new_block).attr( 'target','_blank' ) ;
         }  
         
         if( val.type == 'air_user' || val.type == 'new_client' ) 
         {                           
             if( val.type == 'air_user' )         
                 $('.title',new_block).text('Сейчас на сайте');
             if( val.type == 'new_client' )         
                 $('.title',new_block).text('Зарегистрировалась сегодня');
 
             $('.mess_text',new_block).html(val.age + ' ' + val.city + ' ' + val.text);     
                 
             $('.sound',new_block).remove();   
             // var timer_air = setTimeout( function (){ close_message( $(new_block) ); open_mess--; },30000 );
             //$('.title',new_block).text( val.reply );  
             $('.bunn',new_block).remove();        
             $('.user_name',new_block).text(val.name+','); 
             $('.user_name',new_block).text(val.name+','); 
             $('.post',new_block).val('Написать');

             $('.post',new_block).click( function () { giper_chat.post_mess(val); }); 

             $('.history',new_block).text( 'Смотреть анкету' ) ;
             $('.history',new_block).click( 
             function ()
             {             
                 giper_chat.follow_message(val.user,val.mess_id);  
             });
              
             if( val.type == 'new_client' ) {
              
             }
         }      
           
         $(new_block).draggable( { 
             handle:'.title',
             stop: function(event, ui) 
             {
                 $('.sound',new_block).remove(); 
           
                 //alert ($(this).offset().left)
           
                 var topOff  = $(this).offset().top - $(window).scrollTop()
                 var leftOff = $(this).offset().left
                  $(this).css("top",topOff).css("left",leftOff).css("position","fixed")
           
                 $(this).appendTo( 'body' );
             } 
         });  /**/ 
  
         return new_block;

    } ,

    close_message: function (elem)
    {      
        $('.sound',elem).remove(); 
        elem.hide('blind');       
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout( function (){ elem.remove(); },500 ); 
    } ,
    
    close_all: function (user)
    {                                          /*
        $('#giper_stock div').
        $('.sound',elem).remove(); 
        elem.hide('blind');       
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout( function (){ elem.remove(); },500 ); */
    } ,

    follow_message: function (user,mess_id)
    {       
        giper_chat.stock.remove(mess_id); 
        location.href = '/'+user;
    } ,

    ajax_bun: function (user,mess_id,type) 
    {  
        giper_chat.close_message( $('#'+type+'_'+mess_id ) );  
        $.post( "/mess/bun/", { id: mess_id, tid: user } ); 
             
    } ,

    timer_set: function () 
    { 
        giper_chat.timer_stop();
        if (giper_chat.idle_round == 0) { giper_chat.round_time = 10;  } else
        if (giper_chat.idle_round == 1) { giper_chat.round_time = 10;  } else
        if (giper_chat.idle_round == 2) { giper_chat.round_time = 5;   } else
        if (giper_chat.idle_round == 3) { giper_chat.round_time = 25;  } else
        if (giper_chat.idle_round == 4) { giper_chat.round_time = 35;  } else
        if (giper_chat.idle_round > 11) { giper_chat.round_time = 300; } else
        if (giper_chat.idle_round > 4 ) { giper_chat.round_time = 60;  } 
        
        giper_chat.idle_round++   
        giper_chat.timer_id = window.setInterval ( 'giper_chat.on_timer()', 1000 );   
        //console.log('таймер запущен: ' +giper_chat.round_time)
   
    } ,

    timer_stop: function () 
    {
        window.clearInterval(giper_chat.timer_id);  
        //console.log('таймер остановлен: ' +giper_chat.cascade)
    } , 

    timer_cut: function () 
    {
        if (giper_chat.idle_round > 0 && giper_chat.round_time > 10)
            giper_chat.round_time = 10;  
        giper_chat.idle_round = 0;
    } , 

    toggle_text: function () 
    {           
        var textarea   = $('textarea',giper_chat.mess_block); 
        var text_value = $(textarea).val(); 
        if (!$(textarea).is(":visible")) 
        {
            active_textarea = textarea;            ///////////////////////////////////////
            $(textarea).show('blind');
            $(textarea).focus();
            notepad.show();                        ///////////////////////////////////////
            return 0;     
        } 
        
        return text_value 
     
    } ,
     
    post_mess: function (val)
    {       
        giper_chat.mess_block = $('#'+val.type+'_'+val.mess_id);     // alert( user )
 
        var text, repl 
        
        if (giper_chat.cascade != 0)
        {
            text = giper_chat.cascade;
            repl = '';
        }
        else
        {      
            text = giper_chat.toggle_text();
            repl = text 
        } 
                                                   
        if (text)  
        {            
            simple_hash();
            
            $.post
            (
                "/mailer/post/", 
                {
                    mess: text, 
                    id:   val.user, 
                    re:   repl, 
                    captcha_code: $('.code',giper_chat.mess_block).val(), 
                    hash: hash
                 },  
                 giper_chat.on_post
             );  
                                                    
            disabled_with_timeout( $('.post',giper_chat.mess_block), 5); 
            giper_chat.timer_cut();
        }   
         
    } , 
     
    on_post: function (data)
    {                                // alert (data) 
        if( !data ) return 0;  
        var mess = JSON.parse( data );  
        
        if( mess.error == 'captcha' ) 
        {    
            $('textarea',giper_chat.mess_block).show('blind');
            $('.captcha_block',giper_chat.mess_block).show('blind');
            $('.captcha',giper_chat.mess_block).get(0).src = '/secret_pic.php?hash='+hash;      
        }

        if( mess.saved == '1' ) 
        {     
            giper_chat.idle_round = 0; 
                                   
            $('#contact_update').show('fade'); 
            giper_chat.close_message(giper_chat.mess_block); 

            notepad.hide();                 //////////////////////////////////////////////
            visited.action.save(giper_chat.mess_block.data('user')); 

            setTimeout( function ()
            { 
               if (giper_chat.cascade != 0)
                   giper_chat.reply_all(); 
            },700 );              
        } 
        
        if( mess.error == 'reload' ) 
        {            
            giper_chat.idle_round = 0;  
            location.href = '/'+user+'?text='+text; //alert ('reload')              
        }  

        disabled_with_timeout( $('.post',giper_chat.mess_block), 0.05); 
          
    } , 
       
    title_blink: function () 
    {
        if (giper_chat.count_unread == 0) 
        {
            document.title = giper_chat.prev_title;
            return false ; 
        }     
     
        if( document.title != 'Вам сообщение!' ) 
        {
            document.title = 'Вам сообщение!' ; 
        }
        else
            document.title = ' * * * * * * * * * * * * ' ; 
    } ,
     
    post_serv: function (elem,value)
    {               
        giper_chat.close_message( $(elem) );                   /*
        var param = {}; param[value] = 1;
         $.get( "/ajax/messages_load.php", param ); */
        set_cookie( 'user_bun', '1', 259200 ); 
    }
     
}
 


  $( document ).ready(function() {   
  /*            
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925673",name: "Максим",reply: "",sity: "Ивантеевка",text: "Привет. Давай познакомимся.",time: "1415561723",type: "air_user",user: "699208"});
 giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925674",name: "Николай",reply: "",sity: "Ивантеевка",text: "и дай я тебя отжарю. не пожалеешь. отсосешь мне",time: "1415561723",type: "new_message",user: "699208"});
  giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925675",name: "Виктор",reply: "",sity: "Ивантеевка",text: "юлия а где найти анонимные объявления",time: "1415561723",type: "new_message",user: "699208"});
  giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925676",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
   giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925677",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
   giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925678",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
          */      
  }) ;

 
$(document).ready(function() 
{               
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
    
}); 
      
   


var json = {
        
    parse: function (str) 
    {
        var result = null;
        try 
        {
            result = JSON.parse(str);
        } 
        catch (e) { }
        
        return result;
    } ,
    
    encode: function (str) 
    {
        return JSON.stringify(str); 
    }       
}       
   

  
// Установки  почты        
var mailsett = {    
        
    init: function () 
    {      
        $('#link_virt_turn').on('click',mailsett.turn_virt);
        $('#link_close_turn').on('click',mailsett.turn_close);  
    } ,    
  
    turn_virt: function () 
    {
        var text = $('#text_virt_turn').text();
        
        if (text == 'неприемлемо') 
        {
            $('#text_virt_turn').text('возможен');
            mailsett.send_virt(1);
        }
        else
        {  
            $('#text_virt_turn').text('неприемлемо'); 
            mailsett.send_virt(0); 
        } 
        
    } ,
    
    turn_close: function () 
    {
        var text = $('#text_close_turn').text();
        
        if (text == 'ограничить') 
        {
            $('#text_close_turn').text('разрешить');
            mailsett.send_close(0);
        }
        else
        {  
            $('#text_close_turn').text('ограничить'); 
            mailsett.send_close(1); 
        }
        
    } , 
    
    send_close: function (data) 
    {
        $.post( '/msett/close/', { option_mess_town: data }, onAjaxSuccess);
        function onAjaxSuccess(data) { }                    
    } ,
  
    send_virt: function (data) 
    {
        $.post( '/msett/virt/', { option_virt_accept: data }, onAjaxSuccess);
        function onAjaxSuccess(data) { }                    
    }
    
}


                      
var master_info = { 
  
    init: function () {                   
        if (!userinfo.data.sex) {    
            master_info.ajax.load_sex();
        } else    
        if (!userinfo.data.city && $('#human_print_city').text()) {    
            master_info.ajax.load_city();
        } else                    
        if (!userinfo.data.age) {    
            master_info.ajax.load_age();
        } else    
        if (userinfo.data.second > 300 && userinfo.data.contact.mc < 20) {    
            master_info.ajax.load_contact();
        }               
    },   
    ajax: {  
        load_contact: function () {         
            $('#anketa_master_info').load('/static/htm/master_contact.html',master_info.ajax.on_contact); 
        }, 
        on_contact: function () {           
            master_contact.action.sett(0);
            master_contact.option.print();
        }, 
        load_city: function () {         
            $('#anketa_master_info').load('/static/htm/master_city.html',master_info.ajax.on_city); 
        }, 
        on_city: function () {            
            master_city.init();
            option_static.init();
        }, 
        load_age: function () {         
            $('#anketa_master_info').load('/static/htm/master_age.html',master_info.ajax.on_age); 
        }, 
        on_age: function () {            
            master_age.init();
            option_static.init();
        }, 
        load_sex: function () {         
            $('#anketa_master_info').load('/static/htm/master_sex.html',master_info.ajax.on_sex); 
        }, 
        on_sex: function () {            
            master_sex.init();
            option_static.init();
        }             
    }   

}


 
// Навигация с помошью клавиатуры 
var navigate = {    
        
    enable:  0,   
        
    init: function () 
    {                           
        $('#form_post_mess').on('keypress', function()
        {
            navigate.post_form(event,this);    
        });
                                     
        $(document).on('keydown', function()
        {                                 
            navigate.through(event);    
        });
                                     
    } , 

    // Отправка сообщения по CTRL + Enter
    post_form: function (event, formElem) 
    {    
        if((event.ctrlKey) && ((event.keyCode == 10)||(event.keyCode == 13))) 
        {
            formElem.submit();    
        }
    } ,
          
    // Навигация с помошью стрелок + CTRL
    through: function (event) 
    {  
        if (window.event)
            event = window.event;

        if (event.ctrlKey)
        {                           
            var link = null;
            var href = null;
            switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
            {
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
            if($('a').is(link))  // alert($(link).attr('href')); return false;
                document.location = $(link).attr('href');
        }
    }  

}
 


// -- Блокнот ---
var notepad = {    
                    
    note_block: null, 
    last_click: null,
    disibled:   0,
    create:     0,    
        
    init: function () 
    {             
        if (device.width() < 1000)
        {           
            notepad.disibled = 1;                                                            
        }              
        
        notepad.disibled = get_cookie ('note_vis')*1 ? 1 : 0;   //////////////////////////

        active_textarea = $('#mess_text_val');
        notepad.note_block = $('.notepad');


        $('textarea').click( function ()
        { 
            active_textarea = this; 
            notepad.show();  
        });  
        
        $('#notepad_on').click( function (){ notepad.toggle_disable('on'); notepad.show('force'); });                                                   
               
        $('.close',notepad.note_block).click( function (){ notepad.hide(); });                
        $('.post',notepad.note_block).click( function (){ notepad.toggle_disable('off'); notepad.hide(); }); 
        $('.bunn',notepad.note_block).click( function (){ notepad.toggle_disable('off'); notepad.hide(); }); 
                                     
    } , 
    
    hide: function () 
    {     
        notepad.note_block.hide('fade');
    } ,  
    
    show: function (force) 
    {                                
        if (!notepad.disibled)     
        if (force || (active_textarea && notepad.last_click != active_textarea))
        {
            if (notepad.create) 
            {                                   
                notepad.note_block.show('fade');  
                notepad.last_click = active_textarea;        /////////////////////////////  
            }
            else
                notepad.ajax_load();   
        } 
    } ,
    
    toggle_disable: function (vset) 
    {                                         
        if (vset == 'off') notepad.disibled = 1;                       
        if (vset == 'on' ) notepad.disibled = 0;
                                      
        if (vset) 
        {                              
            set_cookie ('note_vis', notepad.disibled, 259200);   /////////////////////////
        } 
    } ,
    
    ajax_load: function () 
    {                              
         simple_hash(); 
         $.get( '/ajax/load_notepad.php', { hash: hash }, notepad.on_load); 
    } , 
    
    remind: function () 
    {      
        var top  = storage.load('notepad_top');
        var left = storage.load('notepad_left');
                                       
        if (top  && top  < 40) top  = 50;
        if (left && left < 10) left = 10; 
        if (top  > (device.height()-300)) top  = 0;
        if (left > (device.width()-300))  left = 0; 
         
        if (top)  notepad.note_block.css("top",top+'px');  
        if (left) notepad.note_block.css("left",left+'px');  
        
    } ,  
    
    on_load: function (data) 
    {           
           if( data.indexOf('div') > 0 ) 
           { 
               notepad.create = 1; 
               $('.notes',notepad.note_block).html( data );
               $('.note_line',notepad.note_block).click( 
                   function ()
                   { 
                       $(active_textarea).val( $(this).text() ); 
                   }
               );

               notepad.remind();
                                  
               notepad.note_block.draggable
               ( 
                   { 
                       handle:'.title',
                       stop: function(event, ui) 
                       {  
                           var topOff = $(this).offset().top - $(window).scrollTop();
                           notepad.note_block.css("top",topOff); 
                           storage.save('notepad_top',topOff);
                           storage.save('notepad_left',$(this).offset().left);
                       } 
                   }
               );  
                
               notepad.show();  
           }  
 
    }
    
     



     
}



var option_age = { 
  
    init: function () {                              
        $('#option_age_value').val(userinfo.data.age); 
        $('#option_age_button').off('click').on('click',option_age.action.send_age);
        $('.opt_age_val').off('click').on('click',option_age.action.send_link);               
    } ,    
    ajax: {   
        on_save: function (data) {    
            data = json.parse(data);
            if (data.age) {
                userinfo.data.age = data.age;                      
                userinfo.action.set_age(data.say);
            }                                  
        }              
    } ,  
    action: {   
        save: function (age) {   
            userinfo.data.age = age;        
            userinfo.ajax.save.age(option_age.ajax.on_save); 
            userinfo.action.set_age();   
            option_static.action.close();                  
        },    
        send_link: function () {   
            option_age.action.save($(this).text());                 
        },  
        send_age: function () {                        
            option_age.action.save($('#option_age_value').val());                   
        }                                   
    }    
}          


   
var option_anketa = {
 
    anketa: {
        growth: 0,
        weight: 0,
        figure: 0  
    },  
  
    init: function () {  
        $('#option_anketa input').prop('disabled',true);
        $('#option_anketa input:radio').on('click',option_anketa.action.set); 
        $('#option_anketa_button').on('click',option_anketa.action.send); 
        option_anketa.ajax.load();                 
    } ,    
    ajax: {    
        load: function () {                             
            $.get('/sync/anketa/', option_anketa.ajax.on_load);                   
        },   
        on_load: function (data) {   
            option_anketa.action.print(json.parse(data));                            
            //option_static.action.close();     
        },    
        save: function (anketa) {                             
            $.post('/option/anketa/', { anketa: anketa }, option_anketa.ajax.on_save); 
            option_static.action.close();                   
        },   
        on_save: function (data) {          
            data = json.parse(data);
            if (data.alert != undefined) {                  
                profile_alert.option.show(data.alert);
                option_anketa.action.set_anketa(data.text);
            }               
        }             
    } ,        
    action: {    
        set_anketa: function (text) {     
            $('#user_anketa_option').text(text);                     
        } ,    
        set: function () {     
            option_anketa.anketa.figure = $(this).val();                     
        } ,         
        send: function () {           
            option_anketa.anketa.growth = $('#option_anketa_growth').val();
            option_anketa.anketa.weight = $('#option_anketa_weight').val();                  
            option_anketa.ajax.save(option_anketa.anketa);                  
        } ,  
        print: function (anketa) {         
            if (anketa.figure != undefined) {       
                option_anketa.anketa = anketa; 
                var elem = $('#option_anketa input:radio[name=figure]');
                elem.filter('[value='+(anketa.figure*1)+']').prop('checked', true);  
                $('#option_anketa_growth').val(anketa.growth*1);
                $('#option_anketa_weight').val(anketa.weight*1); 
            }      
            $('#option_anketa input').prop('disabled',false);           
        }                                   
    }    
}          


       
var option_chlogin = {
   
    init: function () {                               
        $('.option_chlogin_toggle').on('click',option_chlogin.option.toggle);    
        $('#option_chpass_send').on('click',option_chlogin.action.chpass);   
        $('#option_chlogin_send').on('click',option_chlogin.action.chlogin); /*
        $('#hide_char').on('click',option_login.action.hide_char);     
        $('#option_remind_send').on('click',option_login.action.remind);  
        $('#option_login_reset').on('click',option_login.option.reset);     */
        
     /*
        $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
        option_intro.action.print(); */               
    } ,    
    ajax: {     
        chpass: function (pass) {                             
            $.post('/option/auth/', { pass: pass }, option_chlogin.ajax.on_pass);                    
        },     
        chlogin: function (login) {                             
            $.post('/option/auth/', { login: login }, option_chlogin.ajax.on_login);                    
        },     
        on_pass: function (data) {  
            option_chlogin.ajax.on_err(data); 
            disabled_with_timeout($('#option_chpass_send'),0.5);                   
        },     
        on_login: function (data) {     
            option_chlogin.ajax.on_err(data);       
            disabled_with_timeout($('#option_chlogin_send'),0.5);                     
        },     
        on_err: function (data) {                           
            data = json.parse(data);
            if (data.err != undefined && data.err > 0) {       
                option_chlogin.option.text(data.say);     
            } else
                option_static.action.close();                             
        }        
    } ,        
    action: {      
        chlogin: function () {                  
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chlogin_send'),5);
            option_chlogin.ajax.chlogin($('#option_chlogin_value').val());        
        },    
        chpass: function () {                      
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chpass_send'),5);
            option_chlogin.ajax.chpass($('#option_chpass_value').val());        
        }                              
    } ,        
    option: {         
        toggle: function () {                   
            option_chlogin.option.text(''); 
            $('#option_tab_chlogin').toggle('blind'); 
            $('#option_tab_chpass').toggle('blind'); 
        },          
        text: function (text) {              
            $('.option_chlogin_text').text(text);  
        } 
    }    
}          


   
var option_city = { 
  
    init: function () {                              
        $('#option_city_value').val(userinfo.data.city); 
        $('#option_city_button').off('click').on('click',option_city.action.send_city);
        $('.opt_city_val').off('click').on('click',option_city.action.send_link);               
    } ,    
    ajax: {     
        on_save: function (data) {   
            data = json.parse(data);
            if (data.city) {
                userinfo.data.city    = data.city;   
                userinfo.data.city_id = data.city_id;             
                userinfo.data.verify  = data.verify;                    
                userinfo.action.set_city();
            }         
        }              
    } ,  
    action: {    
        save: function (city) {   
            userinfo.data.city = city;        
            userinfo.ajax.save.city(option_city.ajax.on_save); 
            userinfo.action.set_city();   
            option_static.action.close();                  
        },  
        send_link: function () {       
            option_city.action.save($(this).text());                   
        },  
        send_city: function () {             
            option_city.action.save($('#option_city_value').val());                  
        }                                   
    }    
}          


    
var option_contact = {
   
    init: function () {  
        $('#option_contact input').prop('disabled',true);
        $('#option_contact input:checkbox').on('click',option_contact.action.set);
        $('#option_contact_button').on('click',option_contact.action.send); 
        option_contact.action.print();                 
    } ,    
    ajax: {     
        save: function (contact) {                             
            $.post('/option/contact/', { contact: contact }, option_contact.ajax.on_save);                   
        },   
        on_save: function (data) {  
            mess = json.parse(data);
            $('#user_contact_option').text(mess.count); 
            profile_alert.option.show(mess.alert);                           
            option_static.action.close(); 
        }             
    } ,        
    action: {    
        set: function () {     
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked')*1;                     
        } ,     
        send: function () {                             
            option_contact.ajax.save(userinfo.data.contact);                  
        } ,  
        print: function () {                           
            if (userinfo.data.contact != undefined) {  
                $('#option_contact_em').prop('checked',userinfo.data.contact.em*1);
                $('#option_contact_vk').prop('checked',userinfo.data.contact.vk*1);
                $('#option_contact_ok').prop('checked',userinfo.data.contact.ok*1);
                $('#option_contact_fb').prop('checked',userinfo.data.contact.fb*1);
                $('#option_contact_go').prop('checked',userinfo.data.contact.go*1);
                $('#option_contact_sk').prop('checked',userinfo.data.contact.sk*1);
                $('#option_contact_ph').prop('checked',userinfo.data.contact.ph*1); 
                $('#option_contact input').prop('disabled',false);
            }                 
        }                                   
    }    
}          


 
var option_email = { 
  
    init: function () {                               
        $('.option_email_button').off('click'); 
        $('.option_email_button').on('click',option_email.action.send_email);
        if (userinfo.data.email) 
            $('.option_email_value').val(userinfo.data.email); 
        option_email.ajax.load();                
    } ,    
    ajax: {    
        load: function () {                                
            $.post('/sync/email/', option_email.ajax.on_load);                     
        },   
        post: function (email) {                                
            $.post('/option/email/', { email: email }, option_email.ajax.on_save);      
            userinfo.data.email = data.email;  
            userinfo.action.set_email();                         
            option_static.action.close();                      
        },   
        on_save: function (data) {           
            profile_alert.option.show(json.parse(data));  
        },   
        on_load: function (data) {                  
            data = json.parse(data);
            if (data.email != undefined) {  
                if (data.email != '') {              
                    userinfo.data.email = data.email;   
                    userinfo.action.set_email(); 
                }     
            }  
        }              
    } ,  
    action: {                               
        send_email: function () {          
            option_email.ajax.post($('.option_email_value').val());                  
        }                                   
    }    
}       


      
var option_intro = {
 
    name: '', 
    city: '', 
    age: 0, 
    sex: 0, 
   
    init: function () {  
        $('#option_intro input').prop('disabled',true);
        $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
        $('#option_intro_button').on('click',option_intro.action.send); 
        option_intro.action.print();                
    } ,          
    action: {    
        set_sex: function () {      
            var sex = $(this).val();
            if (sex != userinfo.data.sex) { 
                userinfo.data.sex = sex;   
                userinfo.ajax.save.sex(option_sex.ajax.on_save);           
                userinfo.action.set_sex();  
            }                  
        } ,   
        set_name: function () {        
            var name = $('#option_intro_name').val();
            if (name != userinfo.data.name) { 
                userinfo.data.name = name;   
                userinfo.ajax.save.name(option_name.ajax.on_save);           
                userinfo.action.set_name();  
            }                  
        } ,   
        set_city: function () {   
            var city = $('#option_intro_city').val();
            if (city != userinfo.data.city) { 
                userinfo.data.city = city;   
                userinfo.ajax.save.city(option_city.ajax.on_save);           
                userinfo.action.set_city();  
            }                  
        } ,   
        set_age: function () { 
            var age = $('#option_intro_age').val();
            if (age != userinfo.data.age) { 
                userinfo.data.age = age;   
                userinfo.ajax.save.age(option_age.ajax.on_save);           
                userinfo.action.set_age();  
            }                  
        } ,         
        send: function () {                              
            option_intro.action.set_name();              
            option_intro.action.set_city();              
            option_intro.action.set_age();
            option_static.action.close();                    
        } ,  
        print: function () {   
            option_intro.name = userinfo.data.name; 
            option_intro.city = userinfo.data.city; 
            option_intro.age  = userinfo.data.age; 
            option_intro.sex  = userinfo.data.sex; 
            $('#option_intro_name').val(userinfo.data.name);
            $('#option_intro_city').val(userinfo.data.city);
            $('#option_intro_age').val(userinfo.data.age);                   
            var elem = $('#option_intro input:radio[name=sex]');
            elem.filter('[value='+(userinfo.data.sex*1)+']').prop('checked', true); 
            $('#option_intro input').prop('disabled',false);           
        }                                   
    }    
}          
 


var option_login = {
   
    init: function () {      
        $('#hide_char').on('click',option_login.action.hide_char);     
        $('#option_login_send').on('click',option_login.action.send);  
        $('#option_remind_send').on('click',option_login.action.remind);  
        $('.option_login_toggle').on('click',option_login.option.toggle);
        $('#option_login_reset').on('click',option_login.option.reset); 
        
     /*
        $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
        option_intro.action.print(); */               
    } ,    
    ajax: {     
        send: function (login,pass,captcha) {                             
            $.post('/sync/login/', { login: login, pass: pass, captcha: captcha }, option_login.ajax.on_save);                    
        },   
        on_save: function (data) {          
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
        remind: function (email) {                             
            $.post('/sync/remind/', { email: email }, option_login.ajax.on_load);                    
        },   
        on_load: function (data) {          
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
    } ,        
    action: {    
        hide_char: function () {         // $(this)
            var elem = $('#password_input');
            var attr = elem.attr('type');   
            if (attr == 'password') {
                elem.attr('type','text');
            } else 
                elem.attr('type','password');        
        } ,   
        send: function () {         
            var login = $('#login_input').val();
            var pass = $('#password_input').val();
            var captcha = $('#captcha_input').val();
            disabled_with_timeout($('#option_login_send'),7);
            option_login.ajax.send(login,pass,captcha);        
        } ,   
        remind: function () {         
            var email = $('#option_remind_email').val();  
            disabled_with_timeout($('#option_remind_send'),7);
            option_login.ajax.remind(email);        
        }                             
    } ,        
    option: {      
        captcha: {  
            show: function () {         
                $('#captcha_pass_block').show();         
            } ,  
            reload: function () {      
                if ($('#captcha_code').is(":visible")) 
                    $('#captcha_code').get(0).src = '/capcha_pic.php?hash='+hash;       
            } 
        } ,   
        say_login: function (text) {         
            $('#option_login_text').text(text);         
        } ,  
        say_remind: function (text) {         
            $('#option_remind_text').text(text);         
        } ,    
        toggle: function () {                    
            $('#option_tab_login').toggle('blind'); 
            $('#option_tab_remind').toggle('blind');  
            $('#option_tab_posted').hide('blind');  
        },    
        posted: function () {         
            $('#option_tab_posted').show('blind'); 
            $('#option_tab_remind').hide('blind'); 
            $('#option_tab_login').hide('blind');   
        },    
        reset: function () {         
            $('#option_tab_posted').hide('blind'); 
            $('#option_tab_remind').hide('blind'); 
            $('#option_tab_login').show('blind');   
        }  
    }    
}         


                     
var option_name = { 
  
    init: function () {                              
        $('#option_name_value').val(userinfo.data.name); 
        $('#option_name_button').off('click').on('click',option_name.action.send_name); 
        option_name.option.namelist();                   
    } ,    
    ajax: {     
        on_save: function (data) {          
            data = json.parse(data);
            if (data.name) {
                userinfo.data.name = data.name;                      
                userinfo.action.set_name();
            }                                 
        }              
    } ,  
    action: {     
        save: function (name) {   
            userinfo.data.name = name;               
            userinfo.ajax.save.name(option_name.ajax.on_save); 
            userinfo.action.set_name();   
            option_static.action.close();                  
        }, 
        send_link: function () {       
            option_name.action.save($(this).text());                
        },  
        send_name: function () {                      
            option_name.action.save($('#option_name_value').val());               
        }                                   
    } ,  
    option: {     
        namelist: function () {            
            if (userinfo.data.sex == 1) {
                $('#man_opt_name').show();
            }
            if (userinfo.data.sex == 2) {   
                $('#woman_opt_name').show(); 
            }
            if (!userinfo.data.sex) {   
                //$('#woman_opt_name').show(); 
            } 
            $('.opt_name_val').on('click',option_name.action.send_link); 
        }                                   
    }    
}    


      
var option_sex = { 
  
    init: function () {                         
        $('.option_sex_change').off('click').on('click',option_sex.action.send_sex);               
    } ,    
    ajax: {     
        on_save: function (data) {   
            userinfo.data.name = auto_gen.name(userinfo.data.sex);   
            userinfo.ajax.save.name(option_name.ajax.on_save);
            data = json.parse(data);
            if (data.sex) {
                userinfo.data.sex = data.sex;                      
                userinfo.action.set_sex();
            }      
        }              
    } ,  
    action: {    
        send_sex: function () { 
            if (userinfo.data.sex == 0) {
                userinfo.data.sex = 2;
            } else  
            if (userinfo.data.sex == 1) {
                userinfo.data.sex = 2;
            } else    
            if (userinfo.data.sex == 2) {
                userinfo.data.sex = 1;
            }    
            userinfo.ajax.save.sex(option_sex.ajax.on_save);           
            userinfo.action.set_sex();                  
        },  
        save: function (sex) {  
            userinfo.data.sex = sex;
            userinfo.ajax.save.sex(option_sex.ajax.on_save);           
            userinfo.action.set_sex();                  
        }                                   
    }    
}          



// -- Статический блок опций ---
var option_static = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,
    form: null,

    init: function () 
    {                                          
        if (!$('.option_static').length)
            return null;
        
        $('.option_static').each( function (i,elem) {   
            elem = $(elem);
            if (!elem.data('active')) {   
                elem.on('click',option_static.action.preload);                 
                elem.data('active',1); 
            }               
        });                    // alert(1)
        $('#option_static_close').on('click',option_static.action.close);                   
    } , 
         
    ajax: {    
        load: function (option) {     
            option_static.option.form.trash();                          
            $('#option_static_container')
                .load( '/static/htm/option_' + option + '.html',option_static.ajax.on_load);
        } ,  
        on_load: function (data) {           // alert(visited.list)  
            if (data) {    
                option_static.action.router();
                option_static.action.show_form();
                $("html, body").animate({ scrollTop: 0 }, "slow");              
            }                                         
        } ,    
        save: function (tid) {                               
            //$.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        }   
    } , 
      
    option: {  
        loader: {  
            show: function () {                          
                $('#static_loader').delay(1000).show('fade');                          
            } ,  
            hide: function () {  
                $('#static_loader').clearQueue();                              
                $('#static_loader').hide('fade');                           
            }                         
        } , 
        form: {  
            show: function () {                         
                $('#option_static_container').show('fade');                          
            } ,  
            hide: function () {                               
                $('#option_static_container').hide('fade');                           
            } ,  
            trash: function () {                                   
                $('#option_static_container').empty();                           
            }                         
        } , 
        block: {  
            show: function () {                          
                $('#option_static_block').show('fade');                          
            } ,  
            hide: function () {                                
                $('#option_static_block').hide('fade');                           
            }                         
        }                                    
    } , 
      
    action: {       
        show_form: function () {   
           option_static.option.form.show();          
           option_static.option.loader.hide();                    
        } ,  
        preload: function () {  
            var option = $(this).data('option');
            option_static.form = option;        
            if (option) {
               option_static.ajax.load(option); 
               option_static.option.block.show();          
               option_static.option.loader.show();
            }                       
        } ,     
        close: function () {   
           option_static.option.form.hide();         
           option_static.option.loader.hide();        
           option_static.option.block.hide();                               
        } ,     
        router: function () {                               
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
} 
 

          
var option_tag = { 
   
    loaded:   0,  
        
    init: function () {   
        $('#option_tag input').prop('disabled',true);
        $('#option_tag_button').on('click',option_tag.action.send);      
        option_tag.action.remind();    
        option_tag.ajax.load();                 
    } ,    
    ajax: {    
        load: function () {                     
            $.get('/tag/user/', option_tag.ajax.on_load);                  
        },   
        on_load: function (data) {                          
            data = json.parse(data);                           
            if (data.tags.length > 0) {  
                option_tag.action.print(data.tags); 
                user_tag.list = data.tags;
                user_tag.action.store();
            }  
            $('#option_tag input').prop('disabled',false); 
            //                            
            //option_static.action.close();     
        },    
        add: function (tag) {                             
            $.post('/tag/add/', { tag: tag }, option_tag.ajax.on_save);                   
        },   
        on_save: function (data) {                          
            data = json.parse(data);                           
            if (data.id) {       
                user_tag.list[user_tag.list.length-1].id = data.id;  
                user_tag.option.set_count();  
                option_tag.action.remind();
            } else { 
                option_tag.option.error(option_tag.loaded);
            }
            $('#option_tag_value').val('');
            user_tag.action.store();  
        },    
        del: function (id) {                             
            $.post('/tag/del/', { id: id });                   
        }             
    } ,        
    action: {  
        remind: function () {                             
            if (user_tag.list.length > 0) {
                option_tag.action.print(user_tag.list);
            }                 
        },    
        send: function () {                           
            var tag = $('#option_tag_value').val();    
            var data = {"tag":tag,"id":0};
            user_tag.list.push(data);   
            option_tag.action.remind();     
            option_tag.ajax.add(tag);   
        },    
        set: function () {     
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked')*1;                     
        } ,   
        print: function (tags) {            
            $('#option_tag_list').empty();
            for (var i = 0; i < tags.length; i++) {
                var style = '';
                block_line = $('<i class="desire_tag">').text(tags[i].tag);
                if (!tags[i].id) 
                    block_line.addClass('desire_onload');
                block_line.data('id',tags[i].id); 
                block_line.data('num',i); 
                block_line.data('tag',tags[i].tag);  
                block_line.attr('id','utag'+i);  
                block_line.on('click',option_tag.action.del); 
                $('#option_tag_list').append(block_line); 
            } 
        }, 
        add: function () {  
            option_tag.ajax.add($(this).data('tag'));
            option_tag.option.toggle(this); 
            $(this).on('click',option_tag.action.del);          
            var data = {"tag":$(this).data('tag'),"id":$(this).data('id')}; 
            user_tag.list.splice($(this).data('num'),0,data);       
        }, 
        del: function () {  
            option_tag.ajax.del($(this).data('id'));
            option_tag.option.toggle(this);  
            user_tag.list.splice($(this).data('num'),1);   
            user_tag.option.set_count();
            $(this).on('click',option_tag.action.add);                 
        }, 
        ids: function () {    
            user_tag.idls = [];
            for (var i=0; i<user_tag.list; i++) {
                if (user_tag.list[i].id)
                    user_tag.idls.push(user_tag.list[i].id);
            }  
            return user_tag.idls;              
        }                                      
    },        
    option: { 
        toggle: function (elem) {   
            $(elem).off('click');   
            $(elem).toggleClass('deleted_tag');              
        },
        error: function (i) {   
            $('#utag'+[i]).off('click');   
            $('#utag'+[i]).toggleClass('error_tag');              
        } 
    }     
}          


      
var profile_alert = { 
    init: function () {                            
        $('#profile_alert').on('click',profile_alert.option.hide);              
    } , 
    option: {   
        show: function (text) {  
            if (text) {  
                var elem = $('#profile_alert');          
                elem.clearQueue();                
                elem.html(text);                 
                $('#profile_alert').show('fade');   
                $("html, body").animate({ scrollTop: 0 }, "slow");            
                elem.delay(5000).queue(profile_alert.option.hide);   
            }               
        } , 
        hide: function () {  
            var elem = $('#profile_alert');           
            elem.clearQueue();          
            elem.hide('fade');                             
            elem.delay(500).queue(profile_alert.option.clear);
        } , 
        clear: function () {  
            $('#profile_alert').empty();                      
        }                                   
    }    
}          


     
var profile_option = { 
  
    init: function () {                           
        $('#profile_auth_button').on('click',profile_option.action.send_auth); 
        $('#profile_send_pass').on('click',profile_option.action.send_pass);  
        $('#profile_del_email').on('click',profile_option.action.del_email);  
        $('#profile_subscr_send').on('click',profile_option.action.subscr);            
    } ,    
    ajax: {   
        post: function (login,pass) {                             
            $.post('/option/auth/', { login: login, pass: pass }, profile_option.ajax.on_save);                   
        },   
        on_save: function (data) {                      
            data = json.parse(data);
            if (data.err != undefined) {  
                profile_alert.option.show(data.say);     
            }        
        },  
        send_pass: function () {                             
            $.post('/option/passend/', profile_option.ajax.alert);                   
        },  
        del_email: function () {                             
            $.post('/option/demail/', profile_option.ajax.alert);                   
        },  
        subscr: function (subscr) {                             
            $.post('/option/subscr/', profile_option.ajax.error);                   
        },   
        alert: function (data) {                     
            data = json.parse(data);
            if (data.err != undefined) {  
                profile_alert.option.show(data.say);     
            }      
        },   
        error: function (data) {                     
            data = json.parse(data);
            if (data.err != undefined && data.err > 1) {  
                profile_alert.option.show(data.say);     
            }      
        }       
    } ,  
    action: {   
        send_email: function () {                            
            option_email.ajax.post($('#profile_email_value').val());                  
        },     
        send_auth: function () {                            
            profile_option.ajax.post(
                $('#profile_login_value').val(),
                $('#profile_pass_value').val()
            );                  
        },     
        send_pass: function () {                            
            profile_option.ajax.send_pass();                  
        },     
        del_email: function () {                            
            profile_option.ajax.del_email();                  
        },     
        subscr: function () {  
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
}  


    
// -- Обратная связь ---
var report = {    
         
    is_report:  0,   
        
    init: function () 
    {     
        $('#send_question').click( function () { report.show_quest() });
        $('#send_report').click( function () { report.show_report() }); 
        $('#send_reset').click( function () { report.hide() });      
        $('#report_text').unbind('click');      
                                        
        $('#hint_close').click( function () { report.hint_hide() }); 
    } ,

    show: function () 
    {                                 
        $('#report_send').off('click'); 
        $('#report_block').show('blind');                           
    } ,

    hide: function () 
    {             
        $('#report_block').hide('blind');                            
    } ,

    show_quest: function () 
    {                
        report.show();                   
        $('#report_send').val('Отправить вопрос'); 
        $('#report_send').on('click',report.post_quest);                                      
    } ,

    show_report: function () 
    {                                 
        report.show();     
        $('#report_send').val('Отправить отзыв');  
        $('#report_send').on('click',report.post_report);                                         
    } ,

    hint_show: function () 
    {               
        $("#hint_block").show('blind');                                           
    } ,

    hint_hide: function () 
    {                      
        $("#hint_block").hide('fade');                                       
    } ,
     
    post_quest: function ()
    {        
        report.hide();
        var text = $('#report_text').val();

        $.post
        (
            "/mailer/post/", 
            {
                mess: text, 
                id:   10336,   
                hash: hash
             },  
             report.on_post
         );  
        
         report.hint_show(); 
        
    } ,
     
    post_report: function ()
    {        
        report.hide();
        var text = $('#report_text').val();

        $.post
        (
            "/details.php?reviews", 
            {
                text_reviews: text, 
                hash: hash
             } 
        );  
       
        report.hint_show();
        $('#report_text').val(''); 
        
    } ,
     
    on_post: function (data)
    {                                // alert (data) 
        if( !data ) return 0;  
        var mess = JSON.parse( data );  
        
        if( mess.error == 'reload' ) 
        {  
            location.href = '/10336?text=' + encodeURIComponent($('#report_text').val());
        }
        $('#report_text').val(''); 
        
    }   

} 
 

 
// -- Слайдер, главная ---
var slider = {  
 
    timer: null, 
    context: 0,
    next: 0,
        
    init: function () 
    {          
        if(!$('div').is('#top_intro_info_block'))
            return null;
         
        $('#top_intro_info_block').on('mouseover',slider.stop);
        $('#top_intro_info_block').on('mouseout',slider.start);
        
        // Предзагрузка картинок  
        setInterval(function()
        { 
            var nn = ( slider.next + 1 < 5 ) ? slider.next + 1 : 0; 
            a1 = new Image; 
            a1.src = "/img/board/top_intro_info_" + nn + ".jpg";   
        }, 10000);   
                        
    } ,  

    slide: function (num,st) 
    {
        var top_intro_caption = []
        var top_intro_context = []
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
 
        if( num > 4 ) num = 0;
        for (var i = 0; i<5; i++) 
        {
            $('#board_img_'+i).removeClass('show');
            $('#board_img_'+i).attr('src','');
        }
 
        $('#board_img_' + num).addClass('show active');
        $('#board_img_' + num).attr('src','/img/board/top_intro_info_'+num+'.jpg');

        if (slider.context)
        {         
            $('#top_intro_info_block_caption').text(top_intro_caption[num]);
            $('#top_intro_info_block_context').text(top_intro_context[num]); 
        }
      
        slider.next = num
    } ,

    start: function () 
    {
        slider.timer = setInterval( function(){ slider.slide(++slider.next,0)}, 20000); 
    } ,

    stop: function () 
    {
        clearTimeout(slider.timer); 
    }
    
        
}



// -- Хранилище ---  
var storage = {    
        
    enable:  0,   
        
    init: function () 
    {                           
        if (storage.is_enable())
        {
            storage.enable = 1;
        } 
                                     
    } ,

    is_enable: function () 
    {
        try 
        {
            return 'localStorage' in window && window['localStorage'] !== null;
        } 
        catch (e) 
        {
            return false;
        }
    } ,

    save: function (key,val) 
    {
        if (storage.enable) 
        {                             
            localStorage.setItem(key,val);
        }  
    } ,

    load: function (key,def) 
    {
        var result = def ? def : null;
   
        if (storage.enable && localStorage.getItem(key)) 
        {                  
            result = localStorage.getItem(key);
        }  
        
        return result;
    } ,

    array: {  
      
        load: function (key) 
        {  
            var result = [];
            var value = null;
                                
            value = storage.load(key);       
            value = json.parse(value);
            if (value)
                result = value;
           
            return result;
        } ,
        
        save: function (key,val) 
        {   
            storage.save(key,json.encode(val)); 
        } ,
        
        add: function (key,val) 
        {   
              
        } 
    }


}
   

  
// -- Города, подсказки, поиск названия ---
var city_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () 
    {                                          
        if (!$('.city_suggest').length)
            return null;
        
        $('.city_suggest').each( function (i,elem) 
        {   
            elem = $(elem);
            if (!elem.data('active'))
            {               
                elem.on('mouseover', city_suggest.enabled);
                elem.on('blur', city_suggest.blur);   
                elem.on('keyup', city_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                 
    } ,

    enabled: function () 
    {                                    
        if (!$(this).data('click'))
        {                              
            $(this).on('click', city_suggest.ajax_load ); 
            $(this).data('click',1);
        }                        
    } ,

    ajax_load: function (elem) 
    {                                // alert ($(this).val()); return false //  data('num')
        //if (!elem) elem = this;       
        city_suggest.active_elem = $(this);  
        var city = city_suggest.active_elem.val();    
        $.get('/town/suggest/', { q: city, hash: hash }, city_suggest.on_load); 
        /* */                              
    } ,

    on_load: function (data) 
    {                                      
        if (data) { 
            var mess = JSON.parse(data);     
            if (mess.cities) {        
                city_suggest.hide_suggest();
                city_suggest.show_suggest(mess.cities); 
            } 
        }                                 
    } ,

    blur: function () 
    {                                 
        $('.suggest_block').hide('fade');                                
    } , 

    hide_suggest: function () 
    {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    } , 

    show_suggest: function (cities) 
    {                                  
        var block_line = '';
        var block_this = city_suggest.active_elem.parent();  
        for (var i = 0; i < cities.length; i++) 
        { 
            if (!cities[i])
                continue; 
                
            block_line = $('<div class="suggest_line" data-city="'+cities[i]+'">').text(cities[i]);
            block_line.on('click',city_suggest.print);
            
            $('.suggest_block',block_this).append(block_line); 
        }   
                               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () 
    {                                 
        city_suggest.active_elem.val($(this).data('city')); 
        city_suggest.hide_suggest();                                
    }   
        
} 
 


// -- Имена подсказки, поиск ---
var name_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () {                                          
        if (!$('.name_suggest').length)
            return null;
        
        $('.name_suggest').each( function (i,elem) {   
            elem = $(elem);
            if (!elem.data('active')) {               
                elem.on('mouseover', name_suggest.enabled);
                elem.on('blur', name_suggest.blur);   
                elem.on('keyup', name_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                  
    } ,

    enabled: function () {                                    
        if (!$(this).data('click')) {                              
            $(this).on('click', name_suggest.ajax_load ); 
            $(this).data('click',1);
        }                       
    } ,

    ajax_load: function (elem) 
    {                                 //alert ($(this).val()); //return    data('num')
        //if (!elem) elem = this;       
        name_suggest.active_elem = $(this);  
        var name = name_suggest.active_elem.val();    
        $.post('/ajax/name.php', { name: name, hash: hash }, name_suggest.on_load); 
        /* */                              
    } ,

    on_load: function (data) {                                    
        if (data) { 
            var mess = JSON.parse(data);  
            if (mess.names) {   
                name_suggest.hide_suggest();
                name_suggest.show_suggest(mess.names); 
            } 
        }                                 
    } ,

    blur: function () {                                 
        $('.suggest_block').hide('fade');                                
    } , 

    hide_suggest: function () {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    } , 

    show_suggest: function (names) {                                  
        var block_line = '';
        var block_this = name_suggest.active_elem.parent();  
        for (var i = 0; i < names.length; i++) { 
            if (!names[i])
                continue;  
            block_line = $('<div class="suggest_line" data-name="'+names[i]+'">').text(names[i]);
            block_line.on('click',name_suggest.print); 
            $('.suggest_block',block_this).append(block_line); 
        }   
                               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () {                                 
        name_suggest.active_elem.val($(this).data('name')); 
        name_suggest.hide_suggest();                                
    }      
} 


      
// -- Таги подсказки, поиск ---
var tag_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () {                                          
        if (!$('.tag_suggest').length)
            return null; 
        $('.tag_suggest').each(function (i,elem) {   
            elem = $(elem);
            if (!elem.data('active')) {               
                elem.on('mouseover', tag_suggest.enabled);
                elem.on('blur', tag_suggest.blur);   
                elem.on('keyup', tag_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                  
    }, 
    enabled: function () {                                    
        if (!$(this).data('click')) {                              
            $(this).on('click', tag_suggest.ajax_load ); 
            $(this).data('click',1);
        }                       
    }, 
    ajax_load: function (elem) {                                    
        tag_suggest.active_elem = $(this);  
        var tag = tag_suggest.active_elem.val();   
        $.post('/tag/suggest/', { tag: tag, hash: hash }, tag_suggest.on_load);                            
    }, 
    on_load: function (data) { 
        tag_suggest.hide_suggest();     
        data = json.parse(data);                           
        if (data.tags.length > 0) {  
            tag_suggest.show_suggest(data.tags); 
        }                                 
    }, 
    blur: function () {                                 
        $('.suggest_block').hide('fade');                                
    },  
    hide_suggest: function () {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    },  
    show_suggest: function (tags) {                                  
        var block_line = '';
        var block_this = tag_suggest.active_elem.parent();  
        for (var i = 0; i < tags.length; i++) {  
            block_line = $('<div class="suggest_line" data-tag="'+tags[i]+'">').text(tags[i]);
            block_line.on('click',tag_suggest.print); 
            $('.suggest_block',block_this).append(block_line); 
        }               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () {                                 
        tag_suggest.active_elem.val($(this).data('tag'));    
        tag_suggest.hide_suggest();                                
    }      
} 


                                 
var user_menu = { 
  
    init: function () {              
                       
    },    
    ajax: {  
                  
    },  
    action: {     
        sets: {            
            search: function () {
                var str = '/index.php?view=simple&town='+userinfo.data.town+
                   '&years_up='+userinfo.data.years_up+'&years_to='+userinfo.data.years_to+''+
                   '&who='+userinfo.data.who+''; // alert(userinfo.data.years_up)
                $('#menu_user_button_search').attr('href',str);  
            },            
            contact: function () {       
                //storage.save('contact',0);
                //storage.load('contact');
                var str = '/mail.php'; 
                $('#menu_message').attr('href',str);  
            } 
        }                               
    },  
    option: {     
        act: {     
            show_reg: function () {  
                $('#menu_user_action_new').show();  
                $('#menu_user_action_block').hide(); 
            },   
            show_opt: function () { 
                $('#menu_user_action_new').hide();  
                $('#menu_user_action_block').show();
            }  
        },    
        se: function () {  
          
        }                                   
    }    
}          


      
var user_tag = { 
                    
    list: [],
    idls: [], 
    sync:  0, 
    count: 0,
  
    init: function () {                                           
        user_tag.list  = storage.array.load('user_tag_list'); 
        user_tag.sync  = storage.load('sync_taglist');     
        user_tag.count = storage.load('user_tag_count');          
    },        
    action: {    
        store: function () {                             
            storage.array.save('user_tag_list',user_tag.list);
            storage.save('user_tag_count',user_tag.count); 
            storage.save('sync_taglist',user_tag.sync);                 
        },    
        ids: function () {    
            user_tag.idls = [];               
            for (var i = 0; i < user_tag.list.length; i++) {
                if (user_tag.list[i].id)          
                    user_tag.idls.push(user_tag.list[i].id);
            }                                                
            return user_tag.idls;              
        }                      
    }, 
    option: {                                  
        set_count: function () {                     
            if (user_tag.list.length)
                $('#user_desire_count').text(user_tag.list.length); 
        }
    }     
}          



// -- Информация о пользователе --- 
var userinfo = { 
  
    data: {  
        uid:      0, 
        sex:      0, 
        age:      0, 
        name:     '', 
        city:     '',
        city_id:  0, 
        verify:   0, 
        name_mod: 0, 
        apromt:   0, 
        daily:    0, 
        
        town:     '',     
        who:      0,      
        years_up: 0, 
        years_to: 0, 
        virt:     0,     
        close:    0,    
        
        dating:   '',   
        setting:  0,  
        assist:   0,   
        intim:    0,    
                  
        second:   0, 
        time:     0,  
        email:    ''               
    },   
 
    init: function () {                            
        userinfo.ajax.load();                   
    } ,    
    ajax: {    
        load: function (option) {                               
            $.get( '/sync/sess/', userinfo.ajax.on_load);
        } ,  
        on_load: function (data) {           // alert(userinfo.name)  
            data = json.parse(data);
            if (data && data.uid) {  
                userinfo.data = data; 
                userinfo.action.set_data(data);  
                master_info.init();               
            } else {               
                storage.save('auth',0); 
                user_menu.option.act.show_reg(); 
                userinfo.action.set_string(); 
            }                                         
        } ,  
        save: {     
            sex: function (func) {                               
                $.post('/option/sex/', { sex: userinfo.data.sex }, func);
            } ,   
            age: function (func) {                               
                $.post('/option/age/', { age: userinfo.data.age }, func);
            } ,   
            name: function (func) {                               
                $.post('/option/name/', { name: userinfo.data.name }, func);
            } ,   
            city: function (func) {                               
                $.post('/option/city/', { city: userinfo.data.city }, func);
            }  
        }
    } ,  
    action: {    
        set_data: function (data) {          
            storage.save('auth',data.uid); 
            
            user_menu.option.act.show_opt();
            user_menu.action.sets.search();           
                           
            userinfo.action.set_sex();    
            userinfo.action.set_age();
            userinfo.action.set_name();    
            userinfo.action.set_city();   
         
            userinfo.action.set_string(); /**/
        } ,    
        set_name: function () {                         
            if (userinfo.data.name.length > 2) {    
                $('.user_name_option').text(userinfo.data.name);     
                $('.name_suggest').val(userinfo.data.name);
            }                                           
            userinfo.action.set_string(); 
        } ,  
        set_age: function (say) {       
            if (userinfo.data.age > 0)                       
                $('.user_age_option').text(userinfo.data.age); 
            if (say)                  
                $('.user_age_say').text(say);   
            userinfo.action.set_string();
        } , 
        set_city: function () {         
            if (userinfo.data.city.length > 3) {           
                $('.user_city_option').text(userinfo.data.city); 
                $('.city_suggest').val(userinfo.data.city);
            }                                   
            //userinfo.data.city_id = city['city_id'];             
            //userinfo.data.verify  = city['verify']; 
            userinfo.action.set_string();
        } ,  
        set_sex: function () {  
            var say;    
            if (userinfo.data.sex == 0) {
                say = 'Парень или девушка'; 
            } else  
            if (userinfo.data.sex == 1) {
                say = 'Парень'; 
            } else    
            if (userinfo.data.sex == 2) {
                say = 'Девушка'; 
            }                                   
            $('.user_sex_option').text(say);   
        } ,   
        set_string: function () {
            var str = userinfo.data.name;        
            if (!userinfo.data.name) {
                if (userinfo.data.sex == 1) {
                    str = 'Парень';
                } else 
                if (userinfo.data.sex == 2) {
                    str = 'Девушка';
                }   
            }  
                    
            if (userinfo.data.age > 10 || userinfo.data.city.length > 3)
                str = str + ', ';                
            if (userinfo.data.age > 10)
                str = str + userinfo.data.age + ' ';       
            if ((20 - str.length - userinfo.data.city.length) >= 0)
                str = str + userinfo.data.city; 
            if (!str)   
                str = 'Кто вы?';  
            if (userinfo.data.uid) {    
                $('.user_string_option').text(str);              
                storage.save('user_string_print', str); 
            } else 
            //if (!uid)
                $('.user_string_option').text('');              
        } ,
        set_email: function () {                                 
            $('.option_email_value').val(userinfo.data.email);        
            $('.profile_email_value').text(userinfo.data.email);  
        }     
                                          
    }    
} 



// -- Получить новый хэш ---
var hash; 
function simple_hash() { 
  var now = new Date(); 
   hash = now.getTime();  
}
     
function disabled_with_timeout(elem,time) {  
 elem.prop("disabled",true);
 setTimeout( function (){
  elem.prop("disabled",false);
 },time * 1000); 
}
     

   
// -- Список посещенных страниц ---
var visited = {
                    
    sync: 0,       
    list: [],   
    
    init: function () 
    {    
        if (storage.enable) {
            visited.list = storage.array.load('visitor_list');    // alert(visited.list)
            result_list.action.visited(visited.list);
            visited.ajax.sync();   
        } 
    } , 
    
    ajax: {   
    
        sync: function () 
        {                               
            $.get( '/sync/visitor/'+ uid +'/', visited.ajax.parse_sync);
        } ,    
    
        parse_sync: function (data) 
        {                                             
            if (data) {
                visited.sync = JSON.parse(data);  // alert(visited.sync)             
                visited.action.check();             
            }                                         
        } , 
    
        load: function () 
        {                                 
            $.get( '/contact/visited/'+ uid +'/', visited.ajax.on_load);
        } ,    
    
        on_load: function (data) 
        {                                            // alert(visited.list)   
            if (data) {                                     
                visited.list = JSON.parse(data);       
                storage.array.save('visitor_list',visited.list);                 
                result_list.action.visited(visited.list);              
            }                                         
        } , 
        
        save: function (tid) 
        {                               
            $.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        } ,      
    
        parse_save: function (data) 
        {                                          // 
            if (data) {
                var sync = JSON.parse(data)*1;       
                if (sync) {       
                    visited.sync = sync;     
                    storage.save('visitor_sync', visited.sync);         
                }                      
            }                                         
        } ,  
    
    } , 
    
    index: function (data) 
    {      
        var result = 0;
        visited.action.load_cache();            
        if (visited.list.length && visited.list.indexOf(data+'')) {
            result = 1;  // alert('index')
        }   
        return result; 
    } ,
 
    action: {
    
        check: function () 
        {                              
            if (visited.sync != storage.load('visitor_sync')) {
                visited.ajax.load();                                    
                storage.save('visitor_sync', visited.sync);  
            }                         
        } , 
    
        save: function (data) 
        {                          console.log("save",data);
            visited.list = storage.array.load('visitor_list');
            if (visited.list.indexOf(data+'') < 0) {     
                visited.list.push(json.encode(data));  
                storage.array.save('visitor_list',visited.list); 
                visited.ajax.save(data);  
            }     
        } , 
    
        load_cache: function () 
        {                     
            if (storage.enable) {
                visited.list = storage.array.load('visitor_list'); 
            } else 
                visited.list = [];   
        } 
        
    } 
} 

