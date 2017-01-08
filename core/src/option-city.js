   
var option_city = { 
  
    init: function () {                              
        $('#option_city_value').val(userinfo.data.city); 
        $('#option_city_button').off('click').on('click',option_city.action.send_city);
        $('.opt_city_val').off('click').on('click',option_city.action.send_link);               
    } ,    
    ajax: {     
        on_save: function (data) {   
            data = json.parse(data);
            if (data.city) {
                userinfo.data.city    = data.city;   
                userinfo.data.city_id = data.city_id;             
                userinfo.data.verify  = data.verify;                    
                userinfo.action.set_city();
            }         
        }              
    } ,  
    action: {    
        save: function (city) {   
            userinfo.data.city = city;        
            userinfo.ajax.save.city(option_city.ajax.on_save); 
            userinfo.action.set_city();   
            option_static.action.close();                  
        },  
        send_link: function () {       
            option_city.action.save($(this).text());                   
        },  
        send_city: function () {             
            option_city.action.save($('#option_city_value').val());                  
        }                                   
    }    
}          

