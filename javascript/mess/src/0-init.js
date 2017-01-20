
$( document ).ready(function()
{
    // Получение GET параметров по имени
    $.urlParam = function(name){
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }

    cont_list.init();
    mess_list.init();

    lock_user.init();
    confirm_block_dn.init();

    moderator.init();

    edit_cont.init();
    added_info.init();
    part_info.init();

    quick_photo.init();
    quick_mess.init();

    mess_sett.init();
    dating_time.init();

    anketa.init();
    add_contact.init();

    if (tid) {
        visited.action.save(tid);
    }
 });
