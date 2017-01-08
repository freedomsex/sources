             
// -- Замечания, форма публикации ---
var form_public = { 

    init: function () 
    {      
        $('#link_lock_abuse').click( function (){  
            form_public.show_form(); 
            form_mess.hide_form();
        });
 
        $('#link_abuse_cancel').click( function (){   
            form_public.hide_form(); 
            form_mess.show_form();
            confirm_block_dn.hide_block();
            form_public.red_button(0); 
        });
    } ,
     
    show_form: function () 
    {     
        $('#mail_abuse_public_block').show('blind');  
        mess_list.option.bunn_all(1);
    } , 
 
    hide_form: function () 
    {     
        $('#mail_abuse_public_block').hide('blind');  
        mess_list.option.bunn_all(0);
    },
    
    ajax_send: function () 
    {     
        simple_hash(); 
      
        $.post
        (
            "/ajax/post_abuse.php",
             
            {
                abuse: form_public.get_text(), 
                id: tid, 
                captcha: form_public.captcha_text, 
                hash: hash
            },  
 
            form_public.ajax_resp   
        ); 
    }, 
    
    abuse_post: function () 
    {   
        if (!form_public.get_text())             
          return 0; 
                     
        form_public.ajax_send();                
        disabled_with_timeout( $('#abuse_button_post'), 10);  
      
    },
       
    ajax_resp: function (data) 
    {                        
        confirm_block_dn.hide_block(); 
 
        if( !data ) return 0;  
        
        var mess = JSON.parse( data ); 
        
        if( mess.error == 'captcha' ) { 
            form_public.captcha_show();
        }   
        if( mess.saved == '1' ) { 
            form_public.clear_text(); 
            $('#link_abuse_cancel').click(); /* [!!!] [!!!] [!!!] */
            confirm_block_dn.show_confirm(mess.text); 
        }  
        if( mess.error == 'message' ) { 
            confirm_block_dn.show_confirm(mess.text); 
        }   
         
        disabled_with_timeout( $('#abuse_button_post'), 0.1); 
    },
    
    captcha_show: function () 
    {              
        $('#strong_captcha_block_abuse').show('blind');   
        $('#strong_captcha_block_abuse img').attr('src', '/img/kcaptcha/index.php?'+hash); 
        
    }, 
    
    captcha_text: function () 
    {              
        return $('#abuse_code_val').val(); 
    },
    
    clear_text: function () 
    {             
        $('#abuse_text_val').val('');  
    },
    
    get_text: function () 
    {             
        return $('#abuse_text_val').val();  
    },    
 
    public_button: function (show) 
    {             
        if (show) 
        {      
            $('#abuse_button_show_link').show('blind');    
        } 
        else
        { 
            $('#abuse_button_show_link').hide('blind'); 
        }         
    },    
 
    red_button: function (show) 
    {             
        if (show) 
        {     
            abuse_list.status_link(0);
            form_public.public_button(1);
            $('#abuse_button_show_link span').addClass('red_link');   
        } 
        else
        {
            abuse_list.status_link(1);     
            form_public.public_button(0);
            $('#abuse_button_show_link span').removeClass('red_link'); 
        }         
    }      
 
}

