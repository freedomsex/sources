
// -- Нижний блок Уведомлений ---
var confirm_block_dn = {

    init: function () 
    {     
        $('#confirm_block_dn').click( function () 
        {
            confirm_block_dn.hide_block(); 
        }); 
    },
  
    show_block: function () 
    {     
        $('#confirm_block_dn').show('blind'); 
    }, 
 
    hide_block: function () 
    {     
        $('#confirm_block_dn').hide('blind'); 
    },

    set_text: function (text) 
    {      
        $('#confirm_block_dn').html(text); 
    },  

    show_confirm: function (text) 
    {  
        confirm_block_dn.set_text(text);
        confirm_block_dn.show_block(); 
    } 
   
   
}   

