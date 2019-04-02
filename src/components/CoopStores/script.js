import {mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, LoadMore} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import {AvatarBasePath} from '../../constants';

export default {
    data() {
        return {
            active: 'ency',
            encyStores: [],
            equStores: [],
            loading: true
        };
    },
    components: {
        ButtonTab,
        ButtonTabItem,
        LoadMore,
        MHeader,
        Scroll,
        NoResult
    },
    created() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getUsersByType'
        ]),
        async initData() {
            this.loading = true;
            this.encyStores = (await this.getUsersByType({
                type: 'pfs',
                page: 1,
                size: 1000
            })).data;
            for (let item of this.encyStores) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?userId=${item.id}`);
            }
            this.equStores = (await this.getUsersByType({
                type: 'qcs',
                page: 1,
                size: 1000
            })).data;
            for (let item of this.equStores) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?userId=${item.id}`);
            }
            this.loading = false;
        },
        handleTabItemChange(name) {
            this.active = name;
        }
    }
};
