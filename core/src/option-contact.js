    
var option_contact = {
   
    init: function () {  
        $('#option_contact input').prop('disabled',true);
        $('#option_contact input:checkbox').on('click',option_contact.action.set);
        $('#option_contact_button').on('click',option_contact.action.send); 
        option_contact.action.print();                 
    } ,    
    ajax: {     
        save: function (contact) {                             
            $.post('/option/contact/', { contact: contact }, option_contact.ajax.on_save);                   
        },   
        on_save: function (data) {  
            mess = json.parse(data);
            $('#user_contact_option').text(mess.count); 
            profile_alert.option.show(mess.alert);                           
            option_static.action.close(); 
        }             
    } ,        
    action: {    
        set: function () {     
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked')*1;                     
        } ,     
        send: function () {                             
            option_contact.ajax.save(userinfo.data.contact);                  
        } ,  
        print: function () {                           
            if (userinfo.data.contact != undefined) {  
                $('#option_contact_em').prop('checked',userinfo.data.contact.em*1);
                $('#option_contact_vk').prop('checked',userinfo.data.contact.vk*1);
                $('#option_contact_ok').prop('checked',userinfo.data.contact.ok*1);
                $('#option_contact_fb').prop('checked',userinfo.data.contact.fb*1);
                $('#option_contact_go').prop('checked',userinfo.data.contact.go*1);
                $('#option_contact_sk').prop('checked',userinfo.data.contact.sk*1);
                $('#option_contact_ph').prop('checked',userinfo.data.contact.ph*1); 
                $('#option_contact input').prop('disabled',false);
            }                 
        }                                   
    }    
}          

