
// -- Я модератор, кнопка, блок ---      
var moderator = {
         
    init: function () 
    {                                            
       $('#moder_button').click( function (){ moderator.ajax_auth();  $('#moder_block').show('fade'); }); 
       $('#moder_block_close').click( function (){ moderator.close_block();  });  
          
    },    
    
    ajax_auth: function () 
    {                                               
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/auth/',moderator.auth_resp); 
    },    
    
    ajax_promt: function () 
    {           
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/promt/',moderator.auth_resp); 
    },     
    
    ajax_press: function (id,mark) 
    {                                                                         
        disabled_with_timeout( $('.bun_btn_all'), 5); 
        $.post('/moder/press/', { id: id, mark: mark }, moderator.auth_resp); 
    },
    
    auth_resp: function (data) 
    {      
        if (data) 
        {                                    
            $('#moder_block_inner').empty();
            $('#moder_block_inner').html(data); 
            moderator.new_sett();  
            disabled_with_timeout( $('.bun_btn_all'), 0.1);  
        }
         
    },
    
    close_block: function () 
    {       
        $('#moder_block').hide('fade');
         
    },
    
    new_sett: function (data) 
    {                               
        $('#moder_agree').click( function (){ moderator.ajax_promt(); });
        $('#moder_close').click( function (){ moderator.close_block(); });
         
        var mess_id = $('#bun_mess_id').val();   
        $('#bun_ys').click( function (){
          moderator.ajax_press(mess_id,1); 
        });
        $('#bun_no').click( function (){
          moderator.ajax_press(mess_id,-1);  
        });
        $('#bun_ig').click( function (){
          moderator.ajax_press(mess_id,0);  
        });
        $('#bun_next').click( function (){
          moderator.ajax_press(0,0);  
        }); 



  
       
       
       
    }
 
 
              

}       

