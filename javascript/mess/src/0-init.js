var MessInstanse = new Vue({
    data: {
        globalNew: null,
        searchSettings: false,
    },
    computed: {
        initial() {
            return this.$store.state.modals.initial;
        },
        intimate() {
            return this.$store.state.modals.intimate;
        },
        sends() {
            return this.$store.state.modals.sends;
        },
        view() {
            return this.$store.state.optionStatic.view;
        },
        humanId() {
            return this.globalNew;
        }
    },
    methods: {
        close() {
            this.$store.commit('closeAll');
            store.commit('optionDialog', false);
        },
        newMessage() {
            this.globalNew =  Number(this.$route.path.substr(1));
        },
        closeMessage() {
            this.globalNew = null;
        },
        openSearchSettings() {
            this.searchSettings = true;
        },
        closeSearchSettings() {
            this.searchSettings = false;
        }
    },
    el: '#app',
    store,
    router
});

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


