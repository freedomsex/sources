      
// -- Таги подсказки, поиск ---
var tag_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () {                                          
        if (!$('.tag_suggest').length)
            return null; 
        $('.tag_suggest').each(function (i,elem) {   
            elem = $(elem);
            if (!elem.data('active')) {               
                elem.on('mouseover', tag_suggest.enabled);
                elem.on('blur', tag_suggest.blur);   
                elem.on('keyup', tag_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                  
    }, 
    enabled: function () {                                    
        if (!$(this).data('click')) {                              
            $(this).on('click', tag_suggest.ajax_load ); 
            $(this).data('click',1);
        }                       
    }, 
    ajax_load: function (elem) {                                    
        tag_suggest.active_elem = $(this);  
        var tag = tag_suggest.active_elem.val();   
        $.post('/tag/suggest/', { tag: tag, hash: hash }, tag_suggest.on_load);                            
    }, 
    on_load: function (data) { 
        tag_suggest.hide_suggest();     
        data = json.parse(data);                           
        if (data.tags.length > 0) {  
            tag_suggest.show_suggest(data.tags); 
        }                                 
    }, 
    blur: function () {                                 
        $('.suggest_block').hide('fade');                                
    },  
    hide_suggest: function () {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    },  
    show_suggest: function (tags) {                                  
        var block_line = '';
        var block_this = tag_suggest.active_elem.parent();  
        for (var i = 0; i < tags.length; i++) {  
            block_line = $('<div class="suggest_line" data-tag="'+tags[i]+'">').text(tags[i]);
            block_line.on('click',tag_suggest.print); 
            $('.suggest_block',block_this).append(block_line); 
        }               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () {                                 
        tag_suggest.active_elem.val($(this).data('tag'));    
        tag_suggest.hide_suggest();                                
    }      
} 

