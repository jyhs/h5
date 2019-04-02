import {mapActions} from 'vuex';
import {Group, XTextarea, LoadMore} from 'vux';
import MHeader from '../../base/MHeader/index';
import CartControl from '../../base/CartControl/index';
import Scroll from '../../base/Scroll/index';
import Confirm from '../../base/Confirm/index';
import Loading from '../../base/Loading/index';
import Toast from '../../base/Toast/index';
import {CommonMixin} from '../../common/mixin';
import {SmallImageBasePath} from '../../constants';

export default {
    mixins: [CommonMixin],
    components: {
        Group,
        XTextarea,
        LoadMore,
        MHeader,
        CartControl,
        Scroll,
        Confirm,
        Loading,
        Toast
    },
    data() {
        return {
            cart: {},
            group: {},
            detailsInCart: [],
            loading: true
        };
    },
    created() {
        this.initData();
    },
    computed: {
        totalCount() {
            let totalCount = 0;
            for (let detail of this.detailsInCart) {
                totalCount += detail.price * detail.count;
            }
            return totalCount;
        },
        totalFreight() {
            let totalFreight = 0;
            if (this.group.current_step === 1) {
                for (let detail of this.detailsInCart) {
                    if (this.group.top_freight) {
                        totalFreight += Math.min(detail.price * this.group.freight, this.group.top_freight) * detail.count;
                    } else {
                        totalFreight += (detail.count * detail.price) * this.group.freight;
                    }
                }
                totalFreight = Math.round(totalFreight * 100) / 100;
            } else if (this.group.current_step === 2) {
                totalFreight = this.cart.freight;
            }

            return totalFreight;
        }
    },
    methods: {
        ...mapActions([
            'getGroupById',
            'getCartById',
            'getDetailsByCartId',
            'saveOrUpdateCartDetail',
            'deleteCartDetailById',
            'updateCart',
            'calculateLostAdd',
            'calculateLostSub',
            'calculateDamageAdd',
            'calculateDamageSub'
        ]),
        async initData() {
            const {cartId} = this.$route.params;
            this.loading = true;
            this.cart = await this.getCartById({cartId});
            this.group = await this.getGroupById({groupId: this.cart.group_bill_id});
            await this.initCartData();
            this.loading = false;
        },
        async initCartData() {
            this.detailsInCart = (await this.getDetailsByCartId({
                cartId: this.cart.id,
                page: 1,
                size: 1000
            })).data.map(detail => {
                this.$set(detail, 'count', detail['bill_detail_num']);
                this.$set(detail, 'groupId', this.group.id);
                this.$set(detail, 'encyImage', `${SmallImageBasePath}?materialId=${detail.material_id || 0}`);
                if (this.group.current_step === 1) {
                    this.$set(detail, 'max', detail['bill_detail_num'] + detail['lost_num']);
                } else if (this.group.current_step === 2) {
                    this.$set(detail, 'max', detail['bill_detail_num'] + detail['damage_num']);
                }
                this.$set(detail, 'min', 0);
                return detail;
            });
        },
        cartAdd(_, detail) {
            this._cartChange(detail, async () => {
                if (this.group.current_step === 1) {
                    await this.calculateLostAdd({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count,
                        sum: this.totalCount,
                        freight: this.totalFreight
                    });
                } else if (this.group.current_step === 2) {
                    await this.calculateDamageAdd({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count,
                        sum: this.totalCount,
                        freight: this.totalFreight
                    });
                }
            });
        },
        cartDecrease(detail) {
            this._cartChange(detail, async () => {
                if (this.group.current_step === 1) {
                    await this.calculateLostSub({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count,
                        sum: this.totalCount,
                        freight: this.totalFreight
                    });
                } else if (this.group.current_step === 2) {
                    await this.calculateDamageSub({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count,
                        sum: this.totalCount,
                        freight: this.totalFreight
                    });
                }
            });
        },
        deleteDetail(item) {
            this.currentItem = item;
            this.$refs.confirm.show({
                text: `从购物车删除${item.name}吗？`
            });
        },
        async confirmDelete() {
            let deleteIndex = -1;

            for (let i = 0; i < this.detailsInCart.length; i++) {
                if (this.detailsInCart[i].id === this.currentItem.id) {
                    deleteIndex = i;
                    break;
                }
            }
            if (deleteIndex !== -1) {
                this.$refs.loading.show('努力加载中');
                try {
                    const response = await this.deleteCartDetailById({
                        cartId: this.cart.id,
                        billDetailId: this.currentItem.bill_detail_id
                    });
                    if (!response.errno) {
                        this.detailsInCart.splice(deleteIndex, 1);
                        this.$nextTick(async () => {
                            await this.updateCart({
                                cartId: this.cart.id,
                                sum: this.totalCount,
                                freight: this.totalFreight
                            });
                        });
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    this.$refs.loading.hide();
                }
            }
        },
        _cartChange(detail, handler) {
            if (this.userHasLogin()) {
                setTimeout(async () => {
                    try {
                        handler && handler();
                    } catch (e) {
                        console.log(e);
                    }
                }, 17);
            } else {
                this.$refs.confirm.show({
                    text: '还未登录，去登录？',
                    confirmBtnText: '去登陆'
                });
            }
        }
    }
};
