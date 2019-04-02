import {ButtonTab, ButtonTabItem, XImg} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';

export default {
    data() {
        return {
            active: 'openGroup'
        };
    },
    components: {
        ButtonTab,
        ButtonTabItem,
        XImg,
        MHeader,
        Scroll
    },
    methods: {
        handleTabItemChange(name) {
            this.active = name;
            this.$refs.openScroller && this.$refs.openScroller.scrollTo(0, 0);
            this.$refs.manageScroller && this.$refs.manageScroller.scrollTo(0, 0);
        },
        loadImage() {
            this.$refs.openScroller && this.$refs.openScroller.refresh();
            this.$refs.manageScroller && this.$refs.manageScroller.refresh();
        }
    }
};
