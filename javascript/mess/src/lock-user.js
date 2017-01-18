 
// -- Блокировка пользователя ---  
var lock_user = {

    init: function () 
    { 
        lock_user.set_lock();  
        $('#unlock_inform_block').click( function () { $(this).hide('blind'); } ); 
    },

    
    set_lock: function () 
    {                                            /* */
        $('#lock_user_link').unbind('click');     
        $('#lock_user_link').click( function ()
        {   
            lock_user.post_lock();
        });                          
        lock_user.red_link(0); 
        mess_list.option.bunn_all(0);      
        lock_user.link_text('Заблокировать');    
    },

    
    set_unlock: function () 
    {    
        $('#lock_user_link').unbind('click');
        $('#lock_user_link').click( function ()
        {   
            lock_user.post_unlock();
        });                     
        lock_user.red_link(1);
        mess_list.option.bunn_all(1);      
        lock_user.link_text('Разблокировать');               
    },
  
    show_link: function () 
    {     
        $('#lock_user_link').show('fade');  
    }, 
 
    hide_link: function () 
    {     
        $('#lock_user_link').hide('fade');   
    },
    
    ajax_send: function (lock) 
    {     
        simple_hash(); 
        
        var action = lock ? 'lock' : 'unlock';
      
        $.post
        (
            '/human/' + action + '/',
             
            {  
                tid: tid,  
                hash: hash
            }   
        ); 
    },
 
    post_lock: function () 
    {                              
        lock_user.inform_lock();
        lock_user.set_unlock();
        lock_user.ajax_send(1);   
    },
 
    post_unlock: function () 
    {                                   
        lock_user.inform_unlock();
        lock_user.set_lock();
        lock_user.ajax_send(0);   
    },
 
    red_link: function (lock) 
    {   
        if (lock) 
        {
            $('#lock_user_link').addClass('red_link');
        }
        else
            $('#lock_user_link').removeClass('red_link');   
    },
 
    link_text: function (text) 
    {     
        $('#lock_user_link').text(text);   
    },
  
    inform_lock: function () 
    {                                
        $('#unlock_inform_block').hide('blind');
        $('#lock_inform_block').show('blind');  
    },
  
    inform_unlock: function () 
    {                               
        $('#lock_inform_block').hide('blind');
        $('#unlock_inform_block').show('blind');  
    }  

}

