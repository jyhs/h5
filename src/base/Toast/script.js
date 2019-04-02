const icons = {
    'success': 'icon el-icon-coral-success',
    'warning': 'icon el-icon-coral-warning',
    'error': 'icon el-icon-coral-delete'
};

export default {
    data() {
        return {
            showFlag: false,
            text: '',
            type: 'success',
            typeIcon: ''
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        show({text, type = 'success', interval = 2000}) {
            this.text = text;
            this.type = type;
            this.typeIcon = icons[type];
            setTimeout(() => {
                this.showFlag = true;
            }, 20);
            this.timer = setTimeout(() => {
                this.showFlag = false;
            }, interval + 20);
        },
        hide() {
            clearTimeout(this.timer);
            this.showFlag = false;
        }
    }
}
