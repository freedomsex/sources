  
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

