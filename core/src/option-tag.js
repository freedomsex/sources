          
var option_tag = { 
   
    loaded:   0,  
        
    init: function () {   
        $('#option_tag input').prop('disabled',true);
        $('#option_tag_button').on('click',option_tag.action.send);      
        option_tag.action.remind();    
        option_tag.ajax.load();                 
    } ,    
    ajax: {    
        load: function () {                     
            $.get('/tag/user/', option_tag.ajax.on_load);                  
        },   
        on_load: function (data) {                          
            data = json.parse(data);                           
            if (data.tags.length > 0) {  
                option_tag.action.print(data.tags); 
                user_tag.list = data.tags;
                user_tag.action.store();
            }  
            $('#option_tag input').prop('disabled',false); 
            //                            
            //option_static.action.close();     
        },    
        add: function (tag) {                             
            $.post('/tag/add/', { tag: tag }, option_tag.ajax.on_save);                   
        },   
        on_save: function (data) {                          
            data = json.parse(data);                           
            if (data.id) {       
                user_tag.list[user_tag.list.length-1].id = data.id;  
                user_tag.option.set_count();  
                option_tag.action.remind();
            } else { 
                option_tag.option.error(option_tag.loaded);
            }
            $('#option_tag_value').val('');
            user_tag.action.store();  
        },    
        del: function (id) {                             
            $.post('/tag/del/', { id: id });                   
        }             
    } ,        
    action: {  
        remind: function () {                             
            if (user_tag.list.length > 0) {
                option_tag.action.print(user_tag.list);
            }                 
        },    
        send: function () {                           
            var tag = $('#option_tag_value').val();    
            var data = {"tag":tag,"id":0};
            user_tag.list.push(data);   
            option_tag.action.remind();     
            option_tag.ajax.add(tag);   
        },    
        set: function () {     
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked')*1;                     
        } ,   
        print: function (tags) {            
            $('#option_tag_list').empty();
            for (var i = 0; i < tags.length; i++) {
                var style = '';
                block_line = $('<i class="desire_tag">').text(tags[i].tag);
                if (!tags[i].id) 
                    block_line.addClass('desire_onload');
                block_line.data('id',tags[i].id); 
                block_line.data('num',i); 
                block_line.data('tag',tags[i].tag);  
                block_line.attr('id','utag'+i);  
                block_line.on('click',option_tag.action.del); 
                $('#option_tag_list').append(block_line); 
            } 
        }, 
        add: function () {  
            option_tag.ajax.add($(this).data('tag'));
            option_tag.option.toggle(this); 
            $(this).on('click',option_tag.action.del);          
            var data = {"tag":$(this).data('tag'),"id":$(this).data('id')}; 
            user_tag.list.splice($(this).data('num'),0,data);       
        }, 
        del: function () {  
            option_tag.ajax.del($(this).data('id'));
            option_tag.option.toggle(this);  
            user_tag.list.splice($(this).data('num'),1);   
            user_tag.option.set_count();
            $(this).on('click',option_tag.action.add);                 
        }, 
        ids: function () {    
            user_tag.idls = [];
            for (var i=0; i<user_tag.list; i++) {
                if (user_tag.list[i].id)
                    user_tag.idls.push(user_tag.list[i].id);
            }  
            return user_tag.idls;              
        }                                      
    },        
    option: { 
        toggle: function (elem) {   
            $(elem).off('click');   
            $(elem).toggleClass('deleted_tag');              
        },
        error: function (i) {   
            $('#utag'+[i]).off('click');   
            $('#utag'+[i]).toggleClass('error_tag');              
        } 
    }     
}          

