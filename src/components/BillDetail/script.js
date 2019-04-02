import {mapActions} from 'vuex';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import {CommonMixin} from '../../common/mixin';
import {FileBasePath} from '../../constants';

export default {
    mixins: [CommonMixin],
    data() {
        return {
            bill: {},
            details: []
        };
    },
    components: {
        MHeader,
        Scroll
    },
    async created() {
        const {billId} = this.$route.params;
        this.bill = await this.getBillById({billId});
        this.details = await this.getDetailsByBillId({
            billId,
            page: 1,
            size: 1000
        });

        this.$setgoindex();
        wx.miniProgram.postMessage({
            data: {
                param: `type=bill-detail&id=${billId}`,
                shareUserId: this.currentInfo.userId || 0,
                auth: this.currentInfo.auth || 0,
                title: this.bill.name,
                imageUrl: `${FileBasePath}/image/share/bill-detail.jpg?r=${Math.random()}`
            }
        });
    },
    methods: {
        ...mapActions([
            'getBillById',
            'getDetailsByBillId'
        ])
    }
};
