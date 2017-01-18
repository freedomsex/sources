                      
var master_info = { 
  
    init: function () {                   
        if (!userinfo.data.sex) {    
            master_info.ajax.load_sex();
        } else    
        if (!userinfo.data.city && $('#human_print_city').text()) {    
            master_info.ajax.load_city();
        } else                    
        if (!userinfo.data.age) {    
            master_info.ajax.load_age();
        } else    
        if (userinfo.data.second > 300 && userinfo.data.contact.mc < 20) {    
            master_info.ajax.load_contact();
        }               
    },   
    ajax: {  
        load_contact: function () {         
            $('#anketa_master_info').load('/static/htm/master_contact.html',master_info.ajax.on_contact); 
        }, 
        on_contact: function () {           
            master_contact.action.sett(0);
            master_contact.option.print();
        }, 
        load_city: function () {         
            $('#anketa_master_info').load('/static/htm/master_city.html',master_info.ajax.on_city); 
        }, 
        on_city: function () {            
            master_city.init();
            option_static.init();
        }, 
        load_age: function () {         
            $('#anketa_master_info').load('/static/htm/master_age.html',master_info.ajax.on_age); 
        }, 
        on_age: function () {            
            master_age.init();
            option_static.init();
        }, 
        load_sex: function () {         
            $('#anketa_master_info').load('/static/htm/master_sex.html',master_info.ajax.on_sex); 
        }, 
        on_sex: function () {            
            master_sex.init();
            option_static.init();
        }             
    }   

}

