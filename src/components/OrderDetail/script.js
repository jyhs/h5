import {mapActions} from 'vuex';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import Loading from '../../base/Loading/index';
import Toast from '../../base/Toast/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath, SmallImageBasePath} from '../../constants';

export default {
    name: 'OrderDetail',
    mixins: [
        CommonMixin,
        PathMixin
    ],
    components: {
        MHeader,
        Scroll,
        Loading,
        Toast
    },
    data() {
        return {
            group: {},
            cartDetails: []
        }
    },
    computed: {
        totalPrice() {
            let totalPrice = 0;
            this.cartDetails.forEach(item => {
                const {
                    count, price, lost_num: lostNum, damage_num: damageNum
                } = item;
                totalPrice += (count + lostNum + damageNum) * price;
            });
            return totalPrice;
        },
        totalFreight() {
            let totalFreight = 0;
            const {top_freight: topFreight, freight} = this.group;
            this.cartDetails.forEach(item => {
                const {
                    count, price, lost_num: lostNum, damage_num: damageNum
                } = item;
                let oneFreight;
                if (topFreight) {
                    oneFreight = Math.min(topFreight, price * freight);
                } else {
                    oneFreight = price * freight;
                }
                totalFreight += (count + lostNum + damageNum) * oneFreight;
            });
            return totalFreight;
        },
        realCount() {
            let realCount = 0;
            this.cartDetails.forEach(item => {
                 realCount += item.count;
            });
            return realCount;
        },
        realFreight() {
            let realFreight = 0;
            const {top_freight: topFreight, freight} = this.group;
            if (topFreight) {
                this.cartDetails.forEach(item => {
                    const {damage_num: damageNum, count, price} = item;
                    const oneFreight = Math.min(topFreight, price * freight);
                    realFreight += ((damageNum + count) * oneFreight);
                });
            } else {
                this.cartDetails.forEach(item => {
                    const {damage_num: damageNum, count, price} = item;
                    realFreight += ((damageNum + count) * price * freight);
                });
            }
            return realFreight;
        },
        realPay() {
            let realPay = 0;
            this.cartDetails.forEach(item => {
                realPay += (item.count * item.price);
            });
            return realPay;
        },
        lostNum() {
            let lostNum = 0;
            this.cartDetails.forEach(item => {
                lostNum += item.lost_num;
            });
            return lostNum;
        },
        damageNum() {
            let damageNum = 0;
            this.cartDetails.forEach(item => {
                damageNum += item.damage_num;
            });
            return damageNum;
        },
        lostPay() {
            let lostPay = 0;
            const {top_freight: topFreight, freight} = this.group;
            this.cartDetails.forEach(item => {
                const {lost_num: lostNum, price} = item;
                if (topFreight) {
                    lostPay += lostNum * price +
                        lostNum * Math.min(topFreight, price * freight);
                } else {
                    lostPay += lostNum * price + lostNum * price * freight;
                }
            });
            return lostPay;
        },
        damagePay() {
            let damagePay = 0;
            this.cartDetails.forEach(item => {
                const {damage_num: damageNum, price} = item;
                damagePay += damageNum * price;
            });
            return damagePay;
        }
    },
    created() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getGroupById',
            'getDetailsByCartId'
        ]),
        async initData() {
            const {groupId, cartId} = this.$route.params;
            this.loading = true;
            this.group = await this.getGroupById({groupId});
            this.$set(this.group, 'userAvatar', `${AvatarBasePath}?userId=${this.group.user_id}`);
            this.cartDetails = (await this.getDetailsByCartId({
                cartId,
                page: 1,
                size: 1000
            })).data;
            this.cartDetails.forEach(detail => {
                this.$set(detail, 'count', detail['bill_detail_num']);
                this.$set(detail, 'groupId', this.group.id);
                this.$set(detail, 'encyImage', `${SmallImageBasePath}?materialId=${detail.material_id || 0}`);
            });
            this.loading = false;
        }
    }
}
