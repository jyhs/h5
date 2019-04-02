export default {
    data() {
        return {
            showFlag: false
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        }
    }
}
