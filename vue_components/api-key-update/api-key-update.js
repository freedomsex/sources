Vue.component('api-key-update', {
    props: [
      'item',
    ],
    data() {
        return {
            showOption:  false,
        }
    },
    methods: {
        // upKey() {
        //     console.log('upKey');
        // },
    },
    mounted() {
        //let self setInterval
        // setTimeout(() => {
        //     this.upKey();
        // }, 2000);
    },
    beforeUpdate() {
        //this.attention();
    },
    computed: {
        attention() {
            //return (this.alert || this.alertOption) ? 1 : 0;
        },
    },
    template: '#api-key-update'
});

// <api-key-update></api-key-update>
