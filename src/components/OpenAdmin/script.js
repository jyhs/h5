import {mapGetters, mapActions} from 'vuex';
import {Group, XButton, LoadMore} from 'vux';
import {Input, Upload} from 'cube-ui';
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
import {timeDiffFromNow} from '../../common/util';
import {
    ApiBasePath, AvatarBasePath, FileBasePath, GroupExcelBasePath
} from '../../constants';

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
        LoadMore,
        MHeader,
        Scroll,
        NoResult,
        Confirm,
        Loading,
        Toast,
        LostBoard,
        CubeInput: Input,
        CubeUpload: Upload
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
            },
            lost: {
                sum: '-',
                count: '-'
            },
            damage: {
                sum: '-',
                count: '-'
            },
            action: {},
            files: [],
            status: 'ready'
        };
    },
    computed: {
        ...mapGetters([
            'currentInfo'
        ]),
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
            'downloadGroupById',
            'getDetailsByCartId',
            'updatePickupAddress',
            'groupToNextStep',
            'calculateLostAdd',
            'calculateDamageAdd',
            'calculateLostSub',
            'calculateDamageSub',
            'groupEvidenceList'
        ]),
        async initData() {
            const {groupId} = this.$route.params;
            this.loading = true;
            this.group = await this.getGroupById({groupId});
            this.action = {
                target: `${ApiBasePath}/group/group/groupEvidenceUpload`,
                data: {
                    groupId: this.group.id
                },
                headers: {
                    Authorization: this.currentInfo.auth
                },
                checkSuccess: this._checkUploadSuccess
            };
            this.$set(this.group, 'userAvatar', `${AvatarBasePath}?userId=${this.group.user_id}`);
            this._mapStep();
            if ([2, 5].includes(this.group.current_step)) {
                this._countDown();
            }
            this.lost = {
                count: this.group.lost_num || '-',
                sum: this.group.lost_back || '-'
            };
            this.damage = {
                count: this.group.damage_num || '-',
                sum: this.group.damage_back || '-'
            };
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
            this.files = [];
            (await this.groupEvidenceList({
                groupId: this.group.id
            })).forEach(item => {
                this.files.push({
                    url: `${FileBasePath}/image/evidence/small/${item.path}`
                });
            });
            this.loading = false;
        },
        async toNextStep() {
            if (this.group.current_step === 1) {
                if (!this.group.pickup_address) {
                    return this.$vux.toast.show({
                        type: 'warning',
                        text: '收货地址不能为空'
                    });
                }
                const response = await this.updatePickupAddress({
                    groupId: this.group.id,
                    pickupAddress: this.group.pickup_address
                });
                if (response.errno === 0) {
                    this._countDown();
                    this.group.current_step = 2;
                    this.$set(this.group, 'mapStep', 1);
                    this.$set(this.group, 'finish_date_format', response.data.finish_date_format);
                }
            } else if ([3, 4].includes(this.group.current_step)) {
                const response = await this.groupToNextStep({
                    groupId: this.group.id
                });
                if (response.errno === 0) {
                    this.group.current_step++;
                    this.$set(this.group, 'mapStep', 3);
                    if (this.group.current_step === 4) {
                        this._countDown();
                    }
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
        async showLostBoard(cart) {
            this.cart = cart;
            this.details = (await this.getDetailsByCartId({
                cartId: cart.id,
                page: 1,
                size: 1000
            })).data.map(detail => {
                this.$set(detail, 'count', detail['bill_detail_num']);
                if (this.group.current_step === 3) {
                    this.$set(detail, 'max', detail['bill_detail_num'] + detail['lost_num']);
                } else if (this.group.current_step === 4) {
                    this.$set(detail, 'max', detail['bill_detail_num'] + detail['damage_num']);
                }
                this.$set(detail, 'min', 0);
                return detail;
            });
            setTimeout(() => {
                this.$refs.lostBoard.fold = false;
            }, 17);
        },
        cartAdd(detail) {
            this._cartChange(detail, async () => {
                if (this.group.current_step === 3) {
                    const response = await this.calculateLostAdd({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count
                    });
                    if (response.errno === 0) {
                        this.lost = {
                            sum: response.data.lost_back,
                            count: response.data.lost_num
                        };
                    }
                } else if (this.group.current_step === 4) {
                    const response = await this.calculateDamageAdd({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count
                    });
                    if (response.errno === 0) {
                        this.damage = {
                            sum: response.data.damage_back,
                            count: response.data.damage_num
                        };
                    }
                }
            });
        },
        cartDecrease(detail) {
            this._cartChange(detail, async () => {
                if (this.group.current_step === 3) {
                    const response = await this.calculateLostSub({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count
                    });
                    if (response.errno === 0) {
                        this.lost = {
                            sum: response.data.lost_back,
                            count: response.data.lost_num
                        };
                    }
                } else if (this.group.current_step === 4) {
                    const response = await this.calculateDamageSub({
                        cartId: this.cart.id,
                        billDetailId: detail.bill_detail_id,
                        billDetailNum: detail.count
                    });
                    if (response.errno === 0) {
                        this.damage = {
                            sum: response.data.damage_back,
                            count: response.data.damage_num
                        };
                    }
                }
            });
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
        },
        _mapStep() {
            if (this.group.current_step === 2) {
                this.$set(this.group, 'mapStep', 1);
            } else if (this.group.current_step === 3) {
                this.$set(this.group, 'mapStep', 2);
            } else if ([4, 5].includes(this.group.current_step)) {
                this.$set(this.group, 'mapStep', 3)
            } else {
                this.$set(this.group, 'mapStep', this.group.current_step);
            }
        },
        _countDown() {
            clearInterval(this.countDownTimer);
            this.countDownTimer = setInterval(() => {
                this.timeDiff = timeDiffFromNow(this.group.finish_date_format);
                if (this.timeDiff.day === 0 && this.timeDiff.hour === 0 &&
                    this.timeDiff.day === 0 && this.timeDiff.hour === 0) {
                    clearInterval(this.countDownTimer);
                }
            }, 1000);
        },
        _checkUploadSuccess(response) {
            if (response.errno === 0) {
                this.$vux.toast.show({
                    type: 'success',
                    text: '上传成功'
                });
            } else {
                this.$vux.toast.show({
                    type: 'success',
                    text: '上传失败'
                });
            }
        }
    }
};
