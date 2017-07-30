const ActivityActions = {
    beforeRouteLeave(to, from, next) {
        console.log('Leave:', [to, from]);
        next();
    },
    methods: {
        close() {
            this.$emit('close');
        },
        back(back) {
            back = (back === undefined) ? this.$route.meta.back : back;
            back = (back === undefined) ? this.$route.query.back : back;
            console.log('back:', back);
            (back === undefined) ? this.$router.push('/') : this.$router.push(back);
        },
    },
}
