import {mapActions} from 'vuex';
import {Group, XButton, CheckIcon, InlineXSwitch, Popover, LoadMore} from 'vux';
import {Input} from 'cube-ui';
import Step from '../../base/Step/Step';
import StepItem from '../../base/Step/StepItem';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import Confirm from '../../base/Confirm/index';
import Loading from '../../base/Loading/index';
import Toast from '../../base/Toast/index';
import LostBoard from '../../base/LostBoard/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath, GroupExcelBasePath} from '../../constants';
import {timeDiffFromNow} from '../../common/util';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
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
        Toast,
        LostBoard,
        CubeInput: Input
    },
    data() {
        return {
            group: {},
            carts: [],
            loading: true,
            details: [],
            timeDiff: {
                day: '-',
                hour: '-',
                minute: '-',
                second: '-'
            }
        };
    },
    computed: {
        scrollData() {
            return [...this.carts, this.group]
        }
    },
    created() {
        this.initData();
    },
    beforeDestroy() {
        clearInterval(this.countDownTimer);
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
            'downloadGroupById',
            'updatePickupAddress',
            'deliveryGroup',
            'supplierConfirm'
        ]),
        async initData() {
            const {groupId} = this.$route.params;
            this.loading = true;
            this.group = await this.getGroupById({groupId});
            this.$set(this.group, 'userAvatar', `${AvatarBasePath}?userId=${this.group.user_id}`);
            this._mapStep();
            this._countDown();
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
        async toNextStep() {
            if (this.group.current_step === 2) {
                if (!this.group.supplier_freight || this.group.supplier_freight < 0) {
                    return this.$vux.toast.show({
                        type: 'warning',
                        text: '填写运费 + 包装费不正确'
                    });
                }
                const response = await this.deliveryGroup({
                    groupId: this.group.id,
                    supplierFreight: this.group.supplier_freight
                });
                if (response.errno === 0) {
                    this.group.current_step = 3;
                    this.$set(this.group, 'mapStep', 2);
                }
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
        },
        showLostBoard() {
            this.$refs.lostBoard.fold = false;
        },
        async confirmGroup(supplierConfirm) {
            const response = await this.supplierConfirm({
                groupId: this.group.id,
                supplierConfirm
            });
            if (response.errno === 0) {
                this.group.current_step = 6;
                this.$set(this.group, 'mapStep', 4);
            }
        },
        _mapStep() {
            if (this.group.current_step === 2) {
                this.$set(this.group, 'mapStep', 1);
            } else if ([3, 4].includes(this.group.current_step)) {
                this.$set(this.group, 'mapStep', 2);
            } else if ([5].includes(this.group.current_step)) {
                this.$set(this.group, 'mapStep', 2);
            } else {
                this.$set(this.group, 'mapStep', this.group.current_step);
            }
        },
        _countDown() {
            this.countDownTimer = setInterval(() => {
                this.timeDiff = timeDiffFromNow(this.group.finish_date_format);
                if (this.timeDiff.day === 0 && this.timeDiff.hour === 0 &&
                    this.timeDiff.day === 0 && this.timeDiff.hour === 0) {
                    clearInterval(this.countDownTimer);
                }
            }, 1000);
        }
    }
};
