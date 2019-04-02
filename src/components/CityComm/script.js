import {mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, LoadMore, Popover} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import {CommonMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants/index';

export default {
    mixins: [CommonMixin],
    data() {
        return {
            userList: [],
            loading: true
        };
    },
    components: {
        ButtonTab,
        ButtonTabItem,
        LoadMore,
        Popover,
        MHeader,
        Scroll,
        NoResult
    },
    created() {
        this.initData(this.currentInfo.province);
    },
    methods: {
        ...mapActions([
            'getUsersByType'
        ]),
        async initData(province) {
            this.loading = true;
            this.userList = (await this.getUsersByType({
                type: 'cjtz',
                province
            })).data;
            for (let item of this.userList) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?userId=${item.id}`);
            }
            this.loading = false;
        }
    },
    watch: {
        currentInfo(newVal, oldVal) {
            if (newVal.province !== oldVal.province) {
                this.initData(newVal.province);
            }
        }
    }
};
