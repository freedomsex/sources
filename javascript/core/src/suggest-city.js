  
// -- Города, подсказки, поиск названия ---
var city_suggest = {    
        
    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function () 
    {                                          
        if (!$('.city_suggest').length)
            return null;
        
        $('.city_suggest').each( function (i,elem) 
        {   
            elem = $(elem);
            if (!elem.data('active'))
            {               
                elem.on('mouseover', city_suggest.enabled);
                elem.on('blur', city_suggest.blur);   
                elem.on('keyup', city_suggest.ajax_load);
                elem.attr('autocomplete','off');
                elem.wrap($('<div class="suggest_wrap">'));    
                elem.parent().append($('<div class="small_loader">')); 
                elem.parent().append($('<div class="suggest_block">'));  /**/
                elem.data('active',1) 
            }               
        });                                 
    } ,

    enabled: function () 
    {                                    
        if (!$(this).data('click'))
        {                              
            $(this).on('click', city_suggest.ajax_load ); 
            $(this).data('click',1);
        }                        
    } ,

    ajax_load: function (elem) 
    {                                // alert ($(this).val()); return false //  data('num')
        //if (!elem) elem = this;       
        city_suggest.active_elem = $(this);  
        var city = city_suggest.active_elem.val();    
        $.get('/town/suggest/', { q: city, hash: hash }, city_suggest.on_load); 
        /* */                              
    } ,

    on_load: function (data) 
    {                                      
        if (data) { 
            var mess = JSON.parse(data);     
            if (mess.cities) {        
                city_suggest.hide_suggest();
                city_suggest.show_suggest(mess.cities); 
            } 
        }                                 
    } ,

    blur: function () 
    {                                 
        $('.suggest_block').hide('fade');                                
    } , 

    hide_suggest: function () 
    {                                
        $('.suggest_block').empty(); 
        $('.suggest_block').hide();                                
    } , 

    show_suggest: function (cities) 
    {                                  
        var block_line = '';
        var block_this = city_suggest.active_elem.parent();  
        for (var i = 0; i < cities.length; i++) 
        { 
            if (!cities[i])
                continue; 
                
            block_line = $('<div class="suggest_line" data-city="'+cities[i]+'">').text(cities[i]);
            block_line.on('click',city_suggest.print);
            
            $('.suggest_block',block_this).append(block_line); 
        }   
                               
        if ($('.suggest_line',block_this).length)   
            $('.suggest_block',block_this).show();                          
    } , 
    
    print: function () 
    {                                 
        city_suggest.active_elem.val($(this).data('city')); 
        city_suggest.hide_suggest();                                
    }   
        
} 
 
