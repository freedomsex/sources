
var option_age = { 
  
    init: function () {                              
        $('#option_age_value').val(userinfo.data.age); 
        $('#option_age_button').off('click').on('click',option_age.action.send_age);
        $('.opt_age_val').off('click').on('click',option_age.action.send_link);               
    } ,    
    ajax: {   
        on_save: function (data) {    
            data = json.parse(data);
            if (data.age) {
                userinfo.data.age = data.age;                      
                userinfo.action.set_age(data.say);
            }                                  
        }              
    } ,  
    action: {   
        save: function (age) {   
            userinfo.data.age = age;        
            userinfo.ajax.save.age(option_age.ajax.on_save); 
            userinfo.action.set_age();   
            option_static.action.close();                  
        },    
        send_link: function () {   
            option_age.action.save($(this).text());                 
        },  
        send_age: function () {                        
            option_age.action.save($('#option_age_value').val());                   
        }                                   
    }    
}          

