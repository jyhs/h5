import {mapActions} from 'vuex';
import {Step, StepItem, Group, XButton, CheckIcon, InlineXSwitch, Popover, LoadMore} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import Confirm from '../../base/Confirm/index';
import Loading from '../../base/Loading/index';
import Toast from '../../base/Toast/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath, GroupExcelBasePath} from '../../constants';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            group: {},
            carts: [],
            loading: true
        };
    },
    components: {
        Step,
        StepItem,
        Group,
        XButton,
        CheckIcon,
        InlineXSwitch,
        Popover,
        LoadMore,
        MHeader,
        Scroll,
        NoResult,
        Confirm,
        Loading,
        Toast
    },
    created() {
        this.initData();
    },
    beforeRouteUpdate(to, from, next) {
        // 一种hack写法，不提倡
        if (!to.params.cartId) {
            this.initData();
        }
        next();
    },
    methods: {
        ...mapActions([
            'getGroupById',
            'getCartsByGroupId',
            'deleteCartById',
            'updateCartPay',
            'groupToNextStep',
            'groupBackPreStep',
            'downloadGroupById'
        ]),
        async initData() {
            const {groupId} = this.$route.params;
            this.loading = true;
            this.group = await this.getGroupById({groupId});
            this.carts = (await this.getCartsByGroupId({
                groupId,
                page: 1,
                size: 1000
            })).data;
            for (let cart of this.carts) {
                this.$set(cart, 'userAvatar', `${AvatarBasePath}?userId=${cart.user_id}`);
                this.$set(cart, 'telTo', `tel:${cart.phone}`);
                this.$set(cart, 'hasPay', cart.is_pay === 1);
            }
            this.loading = false;
        },
        toCartAdmin(cart) {
            if ([0, 1, 2].includes(this.group.current_step)) {
                this.toPath(`/cart/${this.group.id}/${cart.user_id}/${cart.id}/admin`);
            }
        },
        deleteCart(cart) {
            this.currentItem = cart;
            this.$refs.confirm.show({
                text: `确定删除${cart.user_name}的购物车吗？`
            });
        },
        async confirmDelete() {
            try {
                await this.deleteCartById({
                    cartId: this.currentItem.id
                });
                this.$refs.toast.show({
                    text: '删除成功'
                });
                this.initData();
            } catch (e) {
                console.log(e);
            }
        },
        changeCartPay(cart) {
            this.$nextTick(async () => {
                this.$refs.loading.show();
                try {
                    await this.updateCartPay({
                        cartId: cart.id,
                        isPay: cart.hasPay ? 1 : 0
                    });
                    cart.is_pay = cart.hasPay ? 1 : 0;
                } catch (e) {
                    console.log(e);
                } finally {
                    this.$refs.loading.hide();
                }
            });
        },
        async backPreStep() {
            this.$refs.loading.show();
            try {
                await this.groupBackPreStep({
                    groupId: this.group.id
                });
                this.group.current_step--;
            } catch (e) {
                console.log(e);
            } finally {
                this.$refs.loading.hide();
            }
        },
        async toNextStep() {
            if (this.group.current_step !== 4) {
                this.$refs.confirmNext.show({
                    text: `确定操作到下一步吗？此流程不可回退。`
                });
            } else {
                this.toPath('/home');
            }
        },
        async confirmToNext() {
            this.$refs.loading.show();
            try {
                if (this.group.current_step === 3) {
                    this.handleDownload();
                }
                const response = await this.groupToNextStep({
                    groupId: this.group.id
                });
                if (!response.errno) {
                    this.group.current_step++;
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.$refs.loading.hide();
            }
        },
        async handleDownload() {
            try {
                const result = await this.downloadGroupById({
                    groupId: this.group.id
                });

                if (!result.errno) {
                    window.location.href = `${GroupExcelBasePath}${result.name}?${Math.random()}`;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
};
