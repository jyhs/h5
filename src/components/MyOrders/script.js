import {mapActions} from 'vuex';
import {LoadMore, Tab, TabItem} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import Toast from '../../base/Toast/index';
import Loading from '../../base/Loading/index';
import Confirm from '../../base/Confirm/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';

export default {
    name: 'MyOrders',
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            originCarts: undefined,
            carts: undefined,
            loading: true
        };
    },
    components: {
        LoadMore,
        Tab,
        TabItem,
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
            'getMyCarts',
            'getDetailsByCartId'
        ]),
        async initData() {
            this.loading = true;
            this.originCarts = (await this.getMyCarts({
                page: 1,
                size: 1000
            })).data;
            for (let cart of this.originCarts) {
                this.$set(cart, 'userAvatar', `${AvatarBasePath}?userId=${cart.group_user_id}`);
            }
            this.carts = this.originCarts;
            this.loading = false;
        },
        handleTabItemChange(type) {
            this.$refs.detailScroll.scrollTo(0, 0, 300);
            switch (type) {
                case 'all':
                    this.carts = this.originCarts;
                    break;
                case 'group':
                    this.carts = this.originCarts.filter(item => item.is_group);
                    break;
                case 'noGroup':
                    this.carts = this.originCarts.filter(item => !item.is_group);
                    break;
                default:
                    break;
            }
        }
    }
}
