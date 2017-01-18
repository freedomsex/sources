 
// -- Анкетные данные --        
var anketa = {
    
    init: function () 
    {       
        $('#anketa_collaps_link').on('click', anketa.action.second_info.toggle); 
    },
    
    action: 
    {                               
        second_info: 
        {   
            toggle: function () 
            {                                          
                if ($('#anketa_second_info').is(':visible')) {
                    anketa.action.second_info.hide()
                } else {
                    anketa.action.second_info.show()
                }    
            },
            
            show: function () 
            {                                          
                $('#anketa_second_info').show('blind');  
                anketa.option.collaps.up();    
            },
            
            hide: function () 
            {                                      
                $('#anketa_second_info').hide('blind');      
                anketa.option.collaps.down();
            }  
        }    
    } ,
    
    option: 
    {                               
        collaps: 
        {
            up: function () 
            {      
                $('#anketa_collaps_link').text('Свернуть анкету');   
            },
            
            down: function () 
            {                                               
                $('#anketa_collaps_link').text('Развернуть анкету'); 
            }  
        } 
    } 
    
}

