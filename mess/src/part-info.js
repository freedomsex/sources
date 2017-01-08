
// -- Большие подсказки в анкете ---     
var part_info = {    
        
    init: function () 
    {   
        if ($('#part_tip_block').data('name')) 
            part_info.reset();                                 
    } , 
    
    reset: function () 
    {                              
        $('#part_tip_close').click( function (){ part_info.close(); return false; }); 
        $('#part_tip_block form').submit( function (){ part_info.close(); return false; });  
    } , 
    
    close: function () 
    {                                            
        var post_form = $('#form_post_mess');                  
        $('#part_tip_block').hide('blind'); 
        
        var name = $('#part_tip_block').data('name');  
        $.post( '/user/closetip/', { tip: name }); 
    } 
}

