
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

