export default {
    props: {
        closable: {
            type: Boolean,
            default: true
        },
        hideOnBlur: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            showFlag: false
        }
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        touchMask() {
            this.hideOnBlur && this.hide();
        },
        cancel() {
            this.hide();
            this.$emit('cancel')
        },
        dialog() {
            this.hide();
            this.$emit('dialog')
        }
    }
}
