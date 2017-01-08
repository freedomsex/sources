  
var desire_clip = { 
 
    sync_taglist: 0,
  
    init: function () {                      
        desire_clip.action.set();            
        desire_clip.ajax.sync();                          
    },    
    ajax: {     
        sync: function () {                     
            $.get('/sync/taglist/', desire_clip.ajax.parse);                  
        },   
        parse: function (data) {                          
            data = json.parse(data);                           
            if (data.id != undefined) { 
                if (data.id && user_tag.sync != data.id) {
                    user_tag.sync = data.id;  
                    user_tag.action.store();   
                    desire_clip.ajax.load();  
                } 
            }          
        },     
        load: function () {                     
            $.get('/tag/user/', desire_clip.ajax.on_load);                  
        },   
        on_load: function (data) {                    // alert(data)       
            data = json.parse(data);                               
            if (data.tags != undefined) {          
                user_tag.list = data.tags;      
                user_tag.option.set_count();
                user_tag.action.store();      
            }                    
            if (data.tags.length > 0) {             
                desire_clip.action.set();    
            }
        },  
        add: function (tag) {                             
            $.post('/tag/add/', { tag: tag });                   
        }           
    },        
    action: {   
        set: function () { 
            user_tag.action.ids();      
            $('.desire_clip').each(function (i,elem) {  
                $(elem).off('click'); 
                $(elem).removeClass('desire_user');      
                if (user_tag.idls.indexOf($(elem).data('id')) >= 0) {   
                    $(elem).addClass('desire_user');  
                } else                        
                    $(elem).on('click',desire_clip.action.add);        
            }); 
            user_tag.option.set_count();  
        },  
        add: function () {  
            desire_clip.ajax.add($(this).data('tag'));  
            desire_clip.option.toggle(this);    
            //$(this).on('click',desire_clip.action.del);          
            var data = {"tag":$(this).data('tag'),"id":$(this).data('id')}; 
            user_tag.list.push(data);          
        },  
        del: function () {                              
            option_tag.ajax.del($(this).data('id'));   
            desire_clip.option.toggle(this);      
            user_tag.list.splice($(this).data('num'),1);
            $(this).on('click',desire_clip.action.add);             
        }                                      
    },        
    option: { 
        toggle: function (elem) {   
            $(elem).off('click');   
            $(elem).toggleClass('desire_user');              
        }
    }     
}          

