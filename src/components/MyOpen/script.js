import {mapActions} from 'vuex';
import {LoadMore, Tab, TabItem, InlineXSwitch} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import Toast from '../../base/Toast/index';
import Loading from '../../base/Loading/index';
import Confirm from '../../base/Confirm/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';

export default {
    name: 'MyOpen',
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            originGroups: undefined,
            groups: undefined,
            loading: true
        };
    },
    components: {
        LoadMore,
        Tab,
        TabItem,
        InlineXSwitch,
        MHeader,
        Scroll,
        NoResult,
        Toast,
        Loading,
        Confirm
    },
    created() {
        this.initData();
    },
    activated() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getMyGroups',
            'finishGroupById'
        ]),
        async initData(type = 'now') {
            this.loading = true;
            this.originGroups = (await this.getMyGroups({
                page: 1,
                size: 1000
            })).data;
            for (let group of this.originGroups) {
                this.$set(group, 'userAvatar', `${AvatarBasePath}?userId=${group.user_id}`);
                this.$set(group, 'hasFinished', group.current_step !== 0);
            }
            this.handleTabItemChange(type);
            this.loading = false;
        },
        handleTabItemChange(type) {
            this.$refs.detailScroll.scrollTo(0, 0, 300);
            switch (type) {
                case 'all':
                    this.groups = this.originGroups;
                    break;
                case 'no':
                    this.groups = this.originGroups.filter(item => item.status);
                    break;
                case 'now':
                    this.groups = this.originGroups.filter(item => (!item.status && [1, 2, 3, 4, 5].includes(item.current_step)));
                    break;
                case 'out':
                    this.groups = this.originGroups.filter(item => (!item.status && ![1, 2, 3, 4, 5].includes(item.current_step)));
                    break;
                default:
                    break;
            }
        },
        async finishGroup(group) {
            try {
                await this.finishGroupById({
                    groupId: group.id
                });
                this.initData('no');
            } catch (e) {
                console.log(e);
            }
        }
    }
}
