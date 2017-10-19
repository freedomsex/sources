const ActivityActions = {
    beforeRouteLeave(to, from, next) {
        console.log('Leave:', [to, from]);
        next();
    },
    data() {
        return {
            toSlow: false,
            slowTime: 3,
            labels: {
                load: false,
                error: false,
            },
            timerLoader: null,
        }
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
        loadStart(second) {
            this.labels.load = true;
            second = second ? second : this.slowTime;
            this.timerLoader = setTimeout(() => {
                this.toSlow = true
            }, second * 1000);
        },
        loadStop() {
            this.labels.load = false;
            clearTimeout(this.timerLoader);
            this.toSlow = false;
        },
        errorStart() {
            this.labels.error = true;
        },
        errorStop() {
            this.labels.error = false;
        }
    },
}
