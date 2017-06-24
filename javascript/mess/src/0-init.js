$( document ).ready(function()
{
    // Получение GET параметров по имени
    $.urlParam = function(name){
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }

    part_info.init();
    dating_time.init();

    if (tid) {
        visited.action.save(tid);
    }
 });


