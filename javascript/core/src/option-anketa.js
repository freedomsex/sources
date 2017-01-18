   
var option_anketa = {
 
    anketa: {
        growth: 0,
        weight: 0,
        figure: 0  
    },  
  
    init: function () {  
        $('#option_anketa input').prop('disabled',true);
        $('#option_anketa input:radio').on('click',option_anketa.action.set); 
        $('#option_anketa_button').on('click',option_anketa.action.send); 
        option_anketa.ajax.load();                 
    } ,    
    ajax: {    
        load: function () {                             
            $.get('/sync/anketa/', option_anketa.ajax.on_load);                   
        },   
        on_load: function (data) {   
            option_anketa.action.print(json.parse(data));                            
            //option_static.action.close();     
        },    
        save: function (anketa) {                             
            $.post('/option/anketa/', { anketa: anketa }, option_anketa.ajax.on_save); 
            option_static.action.close();                   
        },   
        on_save: function (data) {          
            data = json.parse(data);
            if (data.alert != undefined) {                  
                profile_alert.option.show(data.alert);
                option_anketa.action.set_anketa(data.text);
            }               
        }             
    } ,        
    action: {    
        set_anketa: function (text) {     
            $('#user_anketa_option').text(text);                     
        } ,    
        set: function () {     
            option_anketa.anketa.figure = $(this).val();                     
        } ,         
        send: function () {           
            option_anketa.anketa.growth = $('#option_anketa_growth').val();
            option_anketa.anketa.weight = $('#option_anketa_weight').val();                  
            option_anketa.ajax.save(option_anketa.anketa);                  
        } ,  
        print: function (anketa) {         
            if (anketa.figure != undefined) {       
                option_anketa.anketa = anketa; 
                var elem = $('#option_anketa input:radio[name=figure]');
                elem.filter('[value='+(anketa.figure*1)+']').prop('checked', true);  
                $('#option_anketa_growth').val(anketa.growth*1);
                $('#option_anketa_weight').val(anketa.weight*1); 
            }      
            $('#option_anketa input').prop('disabled',false);           
        }                                   
    }    
}          

