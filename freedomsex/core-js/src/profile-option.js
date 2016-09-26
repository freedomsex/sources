     
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

