      
var option_sex = { 
  
    init: function () {                         
        $('.option_sex_change').off('click').on('click',option_sex.action.send_sex);               
    } ,    
    ajax: {     
        on_save: function (data) {   
            userinfo.data.name = auto_gen.name(userinfo.data.sex);   
            userinfo.ajax.save.name(option_name.ajax.on_save);
            data = json.parse(data);
            if (data.sex) {
                userinfo.data.sex = data.sex;                      
                userinfo.action.set_sex();
            }      
        }              
    } ,  
    action: {    
        send_sex: function () { 
            if (userinfo.data.sex == 0) {
                userinfo.data.sex = 2;
            } else  
            if (userinfo.data.sex == 1) {
                userinfo.data.sex = 2;
            } else    
            if (userinfo.data.sex == 2) {
                userinfo.data.sex = 1;
            }    
            userinfo.ajax.save.sex(option_sex.ajax.on_save);           
            userinfo.action.set_sex();                  
        },  
        save: function (sex) {  
            userinfo.data.sex = sex;
            userinfo.ajax.save.sex(option_sex.ajax.on_save);           
            userinfo.action.set_sex();                  
        }                                   
    }    
}          

