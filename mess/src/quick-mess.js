  
// -- Быстрые сообщения, шаблоны ---      
var quick_mess = {

    tab: 'public', 
    more: 0, 
   
    init: function () {  
        $('.quick_mess_tab').on('click',quick_mess.tabs_link); 
        $('#mess_shab_more').on('click',quick_mess.more_link);
    } ,

    show: function (num) 
    { 
        var elem = num ? $('.message_list_save','#message_block_'+num) : $('.message_list_save');
        elem.show('fade',100);  
    } ,

    tabs_link: function () 
    {         
        quick_mess.more = 0; 
        quick_mess.tab = $(this).data('tab');
        quick_mess.ajax_load();      
    } ,

    more_link: function () 
    {         
        quick_mess.more++;
        quick_mess.ajax_load();                     
        if (quick_mess.more >= 2) 
        { 
            $('#mess_shab_more').hide();
            return false; 
        }   
    } ,

    ajax_load: function () 
    {         
        $('#mess_shab_more').show('fade'); 
                             
        var url = '/ajax/html/mess_link_shab_text_'+quick_mess.tab+quick_mess.more+'.htm';
                               
        $.get(url, quick_mess.on_load);
                        // , {hash: hash}
    } ,
          
    print: function () 
    {         
        $('#mess_text_val').val( $(this).text().trim() );
    } ,
    
    on_load:  function (data)
    {                 
        if (!quick_mess.more) 
            $('#mess_shab_wrap').empty(); 

        $(data).filter('.link_shab_text') 
            .on('click',quick_mess.print)   
            .appendTo('#mess_shab_wrap');  
            
        $('#mess_shab_text_block').show('fade');
                                            
        mess_list.hide_loader(); 
                              
    }
   

}

