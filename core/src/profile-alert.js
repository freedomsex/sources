      
var profile_alert = { 
    init: function () {                            
        $('#profile_alert').on('click',profile_alert.option.hide);              
    } , 
    option: {   
        show: function (text) {  
            if (text) {  
                var elem = $('#profile_alert');          
                elem.clearQueue();                
                elem.html(text);                 
                $('#profile_alert').show('fade');   
                $("html, body").animate({ scrollTop: 0 }, "slow");            
                elem.delay(5000).queue(profile_alert.option.hide);   
            }               
        } , 
        hide: function () {  
            var elem = $('#profile_alert');           
            elem.clearQueue();          
            elem.hide('fade');                             
            elem.delay(500).queue(profile_alert.option.clear);
        } , 
        clear: function () {  
            $('#profile_alert').empty();                      
        }                                   
    }    
}          

