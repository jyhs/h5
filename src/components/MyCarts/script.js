import {mapActions} from 'vuex';
import {LoadMore} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import Toast from '../../base/Toast/index';
import Loading from '../../base/Loading/index';
import Confirm from '../../base/Confirm/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            carts: undefined,
            loading: true
        };
    },
    components: {
        LoadMore,
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
    methods: {
        ...mapActions([
            'getMyCarts',
            'deleteCartById'
        ]),
        async initData() {
            this.loading = true;
            this.carts = (await this.getMyCarts({
                page: 1,
                size: 1000
            })).data;
            for (let cart of this.carts) {
                this.$set(cart, 'userAvatar', `${AvatarBasePath}?userId=${cart.user_id}`);
            }
            this.loading = false;
        },
        deleteCart(cart) {
            this.currentItem = cart;
            this.$refs.confirm.show({
                text: `确定删除吗？`
            });
        },
        async confirmDelete() {
            this.$refs.loading.show();
            await this.deleteCartById({
                cartId: this.currentItem.id
            });
            this.$refs.loading.hide();
            this.$refs.toast.show({
                type: 'success',
                text: `删除成功`
            });
            this.initData();
        }
    }
};
