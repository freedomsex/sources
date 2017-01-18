    
// -- Обратная связь ---
var report = {    
         
    is_report:  0,   
        
    init: function () 
    {     
        $('#send_question').click( function () { report.show_quest() });
        $('#send_report').click( function () { report.show_report() }); 
        $('#send_reset').click( function () { report.hide() });      
        $('#report_text').unbind('click');      
                                        
        $('#hint_close').click( function () { report.hint_hide() }); 
    } ,

    show: function () 
    {                                 
        $('#report_send').off('click'); 
        $('#report_block').show('blind');                           
    } ,

    hide: function () 
    {             
        $('#report_block').hide('blind');                            
    } ,

    show_quest: function () 
    {                
        report.show();                   
        $('#report_send').val('Отправить вопрос'); 
        $('#report_send').on('click',report.post_quest);                                      
    } ,

    show_report: function () 
    {                                 
        report.show();     
        $('#report_send').val('Отправить отзыв');  
        $('#report_send').on('click',report.post_report);                                         
    } ,

    hint_show: function () 
    {               
        $("#hint_block").show('blind');                                           
    } ,

    hint_hide: function () 
    {                      
        $("#hint_block").hide('fade');                                       
    } ,
     
    post_quest: function ()
    {        
        report.hide();
        var text = $('#report_text').val();

        $.post
        (
            "/mailer/post/", 
            {
                mess: text, 
                id:   10336,   
                hash: hash
             },  
             report.on_post
         );  
        
         report.hint_show(); 
        
    } ,
     
    post_report: function ()
    {        
        report.hide();
        var text = $('#report_text').val();

        $.post
        (
            "/details.php?reviews", 
            {
                text_reviews: text, 
                hash: hash
             } 
        );  
       
        report.hint_show();
        $('#report_text').val(''); 
        
    } ,
     
    on_post: function (data)
    {                                // alert (data) 
        if( !data ) return 0;  
        var mess = JSON.parse( data );  
        
        if( mess.error == 'reload' ) 
        {  
            location.href = '/10336?text=' + encodeURIComponent($('#report_text').val());
        }
        $('#report_text').val(''); 
        
    }   

} 
 
