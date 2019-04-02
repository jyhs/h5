import {mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, LoadMore} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import {CommonMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';

export default {
    mixins: [CommonMixin],
    components: {
        ButtonTab,
        ButtonTabItem,
        LoadMore,
        MHeader,
        Scroll,
        NoResult
    },
    data() {
        return {
            active: 'lss',
            LSS: [],
            PFS: [],
            loading: true
        };
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
            this.LSS = (await this.getUsersByType({
                type: 'lss',
                province,
                page: 1,
                size: 1000
            })).data;
            for (let item of this.LSS) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?userId=${item.id}`);
            }
            this.PFS = (await this.getUsersByType({
                type: 'pfs',
                province,
                page: 1,
                size: 1000
            })).data;
            for (let item of this.PFS) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?userId=${item.id}`);
            }
            this.loading = false;
        },
        handleTabItemChange(name) {
            this.active = name;
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
