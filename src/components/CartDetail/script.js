import {mapActions} from 'vuex';
import {XNumber, Group, XTextarea, XInput, Cell, Confirm, PopupPicker, LoadMore, XButton} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import Loading from '../../base/Loading/index';
import Toast from '../../base/Toast/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {SmallImageBasePath} from '../../constants/index';
import RegExp from '../../constants/regExp';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    components: {
        XNumber,
        Group,
        XTextarea,
        XInput,
        Cell,
        Confirm,
        PopupPicker,
        LoadMore,
        XButton,
        MHeader,
        Scroll,
        Loading,
        Toast
    },
    data() {
        return {
            currentUser: {},
            group: {},
            cartDetails: [],
            contacts: '',
            phone: '',
            remark: '',
            cart: {},
            chinaCities: [],
            nowCity: [],
            loading: true
        };
    },
    computed: {
        selectDetails() {
            const details = [];
            this.cartDetails.forEach(detail => {
                this.$set(detail, 'count', detail['bill_detail_num']);
                this.$set(detail, 'groupId', this.group.id);
                this.$set(detail, 'encyImage', `${SmallImageBasePath}?materialId=${detail.material_id || 0}`);
                details.push(detail);
            });
            return details;
        },
        totalFreight() {
            let totalFreight = 0;
            for (let detail of this.selectDetails) {
                const {price, count} = detail;
                if (this.group.top_freight) {
                    totalFreight += Math.min(price * this.group.freight, this.group.top_freight) * count;
                } else {
                    totalFreight += (count * price) * this.group.freight;
                }
            }
            return Math.round(totalFreight * 100) / 100;
        },
        totalCount() {
            let cartCount = 0;
            for (let detail of this.selectDetails) {
                cartCount += detail.price * detail.count;
            }
            return cartCount;
        }
    },
    async created() {
        const {groupId, cartId} = this.$route.params;
        this.loading = true;
        this.currentUser = (await this.getUserById({
            userId: this.currentInfo.userId
        }));
        this.phone = this.currentUser.phone === '18888888888' ? '' : this.currentUser.phone;
        this.contacts = this.currentUser.contacts;

        this.group = await this.getGroupById({groupId});
        this.cart = (await this.getActiveCart({
            groupId,
            userId: this.currentInfo.userId
        }));
        this.remark = (this.cart.description === 'null' ? '' : (this.cart.description || '')).trim();
        this.chinaCities = await this.getChinaCities();
        this.nowCity = [this.currentUser.province, this.currentUser.city];

        this.cartDetails = (await this.getDetailsByCartId({
            cartId,
            page: 1,
            size: 1000
        })).data;
        this.loading = false;
    },
    methods: {
        ...mapActions([
            'getUserById',
            'getGroupById',
            'getDetailsByCartId',
            'updateCart',
            'getActiveCart',
            'getChinaCities'
        ]),
        async handleSubmit() {
            if (!this.validSubmit()) {
                return;
            }
            const {cartId} = this.$route.params;
            this.$refs.loading.show();
            try {
                const response = await this.updateCart({
                    cartId,
                    phone: this.phone,
                    description: this.remark,
                    sum: this.totalCount,
                    freight: this.totalFreight,
                    contacts: this.contacts,
                    province: this.nowCity[0],
                    city: this.nowCity[1],
                    address: this.address,
                    status: 1,
                    isConfirm: 1
                });
                if (response.errno === 406) {
                    this.$vux.toast.show({
                        type: 'warning',
                        text: response.errmsg
                    });
                } else {
                    this.toPath('/myOrders');
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.$refs.loading.hide();
            }
        },
        validSubmit() {
            if (['lss', 'cjlss'].includes(this.group.user_type)) {
                if (!this.contacts) {
                    this.$refs.toast.show({
                        type: 'warning',
                        text: '请填写联系人'
                    });
                    return false;
                }
                if (!this.address) {
                    this.$refs.toast.show({
                        type: 'warning',
                        text: '请填写详细地址'
                    });
                    return false;
                }
                if (this.nowCity.length !== 2) {
                    this.$refs.toast.show({
                        type: 'warning',
                        text: '请选择所在地'
                    });
                    return false;
                }
            }
            if (!this.phone) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '请填写联系电话'
                });
                return false;
            } else if (!RegExp.PhoneReg.test(this.phone)) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '请填写正确的联系电话'
                });
                return false;
            }
            return true;
        }
    }
};
