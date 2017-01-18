       
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

