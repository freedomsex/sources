                     
var option_name = { 
  
    init: function () {                              
        $('#option_name_value').val(userinfo.data.name); 
        $('#option_name_button').off('click').on('click',option_name.action.send_name); 
        option_name.option.namelist();                   
    } ,    
    ajax: {     
        on_save: function (data) {          
            data = json.parse(data);
            if (data.name) {
                userinfo.data.name = data.name;                      
                userinfo.action.set_name();
            }                                 
        }              
    } ,  
    action: {     
        save: function (name) {   
            userinfo.data.name = name;               
            userinfo.ajax.save.name(option_name.ajax.on_save); 
            userinfo.action.set_name();   
            option_static.action.close();                  
        }, 
        send_link: function () {       
            option_name.action.save($(this).text());                
        },  
        send_name: function () {                      
            option_name.action.save($('#option_name_value').val());               
        }                                   
    } ,  
    option: {     
        namelist: function () {            
            if (userinfo.data.sex == 1) {
                $('#man_opt_name').show();
            }
            if (userinfo.data.sex == 2) {   
                $('#woman_opt_name').show(); 
            }
            if (!userinfo.data.sex) {   
                //$('#woman_opt_name').show(); 
            } 
            $('.opt_name_val').on('click',option_name.action.send_link); 
        }                                   
    }    
}    

