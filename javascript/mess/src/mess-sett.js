
// -- Настройки почты, поиска ---  
var mess_sett = {
       
    init: function () 
    {       
        $('#post_mail_setting').on('click',mess_sett.ajax_post); 
        mess_sett.print(cookie_storage.get_data('mail_sett'));
                                         
        $('#mail_setting_hide').on('click',mess_sett.hide);  
        $('#mail_setting_show').on('click',mess_sett.show);
           
    } , 
    
    print: function (sett) 
    {                          
        if (!sett.who)
        {
            $("#opt_who").val(0)
        }
        else
            $("#opt_who").val(sett.who)
        
        if (sett.town*1)
            $("#opt_town").attr("checked","checked");
            
        if (sett.virt*1)   
            $("#opt_virt").attr("checked","checked");
 
        if (sett.up > 0) 
            $("#opt_up").val(sett.up);

        if (sett.to > 0)
            $("#opt_to").val(sett.to);  
                              
    } ,                                     
                                                
    /* -- Скрыть/показать настройки --- */  
    show: function () 
    {                   
      $('#form_mail_setting').show('blind'); 
      $('#mail_setting_show').hide('fade');   
       cookie_storage.del_cookie('hide_mail_setting');
         
    } , 
    
    hide: function () 
    {                    
        $('#form_mail_setting').hide('blind');
        $('#mail_setting_show').show('fade');
        cookie_storage.set_cookie('hide_mail_setting', 1, 259200);  
    } , 
    
    on_save: function () 
    {           
        $('#saved_setting').show('fade');
        $('#saved_setting').delay(2000).hide('fade');
    } , 
    
    ajax_post: function () 
    {        
        var post_data = $('#form_mail_setting').serialize();
        $.post('/msett/save/', post_data);
         
        mess_sett.on_save(); 
        return false;
    } ,    
   
    
 
 
}
  
