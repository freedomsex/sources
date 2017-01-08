
// -- Имена подсказки, поиск ---
var name_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () {                                          
        if (!$('.name_suggest').length)
            return null;
        
        $('.name_suggest').each( function (i,elem) {   
            elem = $(elem);
            if (!elem.data('active')) {               
                elem.on('mouseover', name_suggest.enabled);
                elem.on('blur', name_suggest.blur);   
                elem.on('keyup', name_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                  
    } ,

    enabled: function () {                                    
        if (!$(this).data('click')) {                              
            $(this).on('click', name_suggest.ajax_load ); 
            $(this).data('click',1);
        }                       
    } ,

    ajax_load: function (elem) 
    {                                 //alert ($(this).val()); //return    data('num')
        //if (!elem) elem = this;       
        name_suggest.active_elem = $(this);  
        var name = name_suggest.active_elem.val();    
        $.post('/ajax/name.php', { name: name, hash: hash }, name_suggest.on_load); 
        /* */                              
    } ,

    on_load: function (data) {                                    
        if (data) { 
            var mess = JSON.parse(data);  
            if (mess.names) {   
                name_suggest.hide_suggest();
                name_suggest.show_suggest(mess.names); 
            } 
        }                                 
    } ,

    blur: function () {                                 
        $('.suggest_block').hide('fade');                                
    } , 

    hide_suggest: function () {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    } , 

    show_suggest: function (names) {                                  
        var block_line = '';
        var block_this = name_suggest.active_elem.parent();  
        for (var i = 0; i < names.length; i++) { 
            if (!names[i])
                continue;  
            block_line = $('<div class="suggest_line" data-name="'+names[i]+'">').text(names[i]);
            block_line.on('click',name_suggest.print); 
            $('.suggest_block',block_this).append(block_line); 
        }   
                               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () {                                 
        name_suggest.active_elem.val($(this).data('name')); 
        name_suggest.hide_suggest();                                
    }      
} 

