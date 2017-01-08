      
var option_intro = {
 
    name: '', 
    city: '', 
    age: 0, 
    sex: 0, 
   
    init: function () {  
        $('#option_intro input').prop('disabled',true);
        $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
        $('#option_intro_button').on('click',option_intro.action.send); 
        option_intro.action.print();                
    } ,          
    action: {    
        set_sex: function () {      
            var sex = $(this).val();
            if (sex != userinfo.data.sex) { 
                userinfo.data.sex = sex;   
                userinfo.ajax.save.sex(option_sex.ajax.on_save);           
                userinfo.action.set_sex();  
            }                  
        } ,   
        set_name: function () {        
            var name = $('#option_intro_name').val();
            if (name != userinfo.data.name) { 
                userinfo.data.name = name;   
                userinfo.ajax.save.name(option_name.ajax.on_save);           
                userinfo.action.set_name();  
            }                  
        } ,   
        set_city: function () {   
            var city = $('#option_intro_city').val();
            if (city != userinfo.data.city) { 
                userinfo.data.city = city;   
                userinfo.ajax.save.city(option_city.ajax.on_save);           
                userinfo.action.set_city();  
            }                  
        } ,   
        set_age: function () { 
            var age = $('#option_intro_age').val();
            if (age != userinfo.data.age) { 
                userinfo.data.age = age;   
                userinfo.ajax.save.age(option_age.ajax.on_save);           
                userinfo.action.set_age();  
            }                  
        } ,         
        send: function () {                              
            option_intro.action.set_name();              
            option_intro.action.set_city();              
            option_intro.action.set_age();
            option_static.action.close();                    
        } ,  
        print: function () {   
            option_intro.name = userinfo.data.name; 
            option_intro.city = userinfo.data.city; 
            option_intro.age  = userinfo.data.age; 
            option_intro.sex  = userinfo.data.sex; 
            $('#option_intro_name').val(userinfo.data.name);
            $('#option_intro_city').val(userinfo.data.city);
            $('#option_intro_age').val(userinfo.data.age);                   
            var elem = $('#option_intro input:radio[name=sex]');
            elem.filter('[value='+(userinfo.data.sex*1)+']').prop('checked', true); 
            $('#option_intro input').prop('disabled',false);           
        }                                   
    }    
}          
 
