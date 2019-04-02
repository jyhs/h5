import {mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, LoadMore} from 'vux';
import Scroll from '../../base/Scroll/index';
import Confirm from '../../base/Confirm/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';

const WORD_COLORS = ['#ee735c', '#d4e5e0', '#f5a623', '#64c708', '#84daef'];

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            firstWordColor: WORD_COLORS,
            active: 'group',
            currentUser: {},
            curProvince: [],
            groups: [],
            bills: [],
            loading: true
        };
    },
    components: {
        ButtonTab,
        ButtonTabItem,
        LoadMore,
        Scroll,
        Confirm
    },
    async created() {
        this.loading = true;
        if (this.userHasLogin()) {
            this.currentUser = (await this.getUserById({
                userId: this.currentInfo.userId
            }));
            await this.fetchGroups(this.currentInfo.province);
            await this.fetchBills();
        } else {
            this.$vux.toast.show({
                type: 'warning',
                text: '请先登录'
            });
            this.toPath('/user/entry');
        }
        this.loading = false;
    },
    activated() {
        if (!this.userHasLogin()) {
            this.$vux.toast.show({
                type: 'warning',
                text: '请先登录'
            });
            this.toPath('/user/entry');
        }
    },
    methods: {
        ...mapActions([
            'getUserById',
            'getGroupList',
            'getBillList'
        ]),
        async fetchGroups(province) {
            this.groups = (await this.getGroupList({
                page: 1,
                size: 10,
                province
            })).data;
            for (let group of this.groups) {
                this.$set(group, 'userAvatar', `${AvatarBasePath}?userId=${group.user_id}`);
            }
        },
        async fetchBills() {
            this.bills = (await this.getBillList({
                page: 1,
                size: 1000
            })).data;
        },
        handleTabItemChange(name) {
            this.active = name;
        },
        openGroup(group) {
            if (this.userHasLogin()) {
                this.toPath(`group/add/${group.id}`);
            } else {
                this.$refs.confirm.show({
                    text: '还未登录，去登录？',
                    confirmBtnText: '去登陆'
                });
            }
        },
        confirmToLogin() {
            this.toPath(`/user/entry`);
        }
    },
    watch: {
        currentInfo(newVal, oldVal) {
            if (newVal.province !== oldVal.province) {
                this.fetchGroups(newVal.province);
            }
        }
    }
};
