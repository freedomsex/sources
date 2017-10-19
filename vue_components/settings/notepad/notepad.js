const Notepad = Vue.component('notepad', {
    props: [],
    extends: ActivityActions,
    data() {
        return {
            writes: []
        }
    },
    mounted() {
        this.$store.dispatch('notes/WRITES').then((data) => {
            this.writes = data;
        })
    },
    computed: {
        // ...
    },
    methods: {
        cliche() {
            this.$emit('cliche');
            this.close();
        },
        select(text) {
            // this.$store.dispatch('notes/ITEM', id).then((item) => {
            // })
                // this.$store.dispatch('notes/UPDATE', {id, count: item.count});
            this.$emit('select', text);
            this.close();
        }
    },
    template: '#notepad',
});
