import {mapActions} from 'vuex';
import {Group, Cell, Datetime, Selector, InlineXNumber, InlineXSwitch, PopupPicker, XButton, XTextarea} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import Toast from '../../base/Toast/index';
import Loading from '../../base/Loading/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {formatDateTimeParam, formatStartDate} from '../../common/util';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    components: {
        Group,
        Cell,
        Datetime,
        Selector,
        InlineXNumber,
        InlineXSwitch,
        PopupPicker,
        XButton,
        XTextarea,
        MHeader,
        Scroll,
        Toast,
        Loading
    },
    data() {
        return {
            bill: {},
            cities: [],
            scopes: [{
                key: 'china',
                value: '全国'
            }, {
                key: 'province',
                value: '省份'
            }],
            currentUser: {},
            form: {
                name: undefined,
                contacts: undefined,
                phone: undefined,
                end_date: undefined,
                scope: undefined,
                city: undefined,
                freight: 13,
                top_freight: 50,
                description: undefined
            },
            editorOption: {
                placeholder: '请输入',
                modules: {
                    toolbar: [
                        [{'color': []}, {'background': []}]
                    ]
                }
            }
        };
    },
    computed: {
        isLss() {
            return ['cjlss', 'lss'].includes(this.currentUser.type);
        }
    },
    async created() {
        const {billId} = this.$route.params;
        this.startDate = formatStartDate();
        this.bill = await this.getBillById({billId});
        this.currentUser = await this.getUserById({
            userId: this.currentInfo.userId
        });
        this.cities = await this.getCitiesInProvince({
            province: this.currentInfo.province
        });
        this.initFormData(this.currentUser, this.cities);
    },
    methods: {
        ...mapActions([
            'getBillById',
            'getUserById',
            'getCitiesInProvince',
            'addGroupByBillId',
            'setUpdateInfo'
        ]),
        async initFormData(currentUser, cities) {
            const cityKeys = cities.map(c => c.key);
            this.form.contacts = currentUser.name;
            this.form.phone = currentUser.phone;
            this.form.scope = this.isLss ? 'china' : 'province';
            this.form.city = cityKeys.includes(this.currentUser.city) ? this.currentUser.city : undefined;
        },
        async submit() {
            const {billId} = this.$route.params;
            const needValid = ['name', 'contacts', 'phone', 'end_date'];
            const message = ['团单名', '联系人姓名', '联系人手机', '截止时间'];
            if (this.isLss) {
                needValid.push('scope');
                message.push('开团范围');
            } else {
                needValid.push('city');
                message.push('开团城市');
            }

            for (let i = 0; i < needValid.length; i++) {
                if (!this.form[needValid[i]]) {
                    this.$refs.toast.show({
                        type: 'warning',
                        text: `请完善${message[i]}`
                    });
                    return;
                }
            }

            const sendInfo = Object.assign({}, this.form, {
                billId,
                endDate: this.form.end_date ? formatDateTimeParam(this.form.end_date.replace(/-/g, '/')) : '',
                province: this.form.scope === 'china' ? 'china' : this.currentInfo.province,
                freight: this.form.freight / 100,
                topFreight: this.form.hasTop ? this.form.top_freight : undefined,
                city: this.form.scope === 'china' ? 'china' : this.form.city
            });
            this.$refs.loading.show();
            try {
                await this.addGroupByBillId(sendInfo);
                this.setUpdateInfo(Object.assign({}, this.updateInfo, {
                    groupChange: true
                }));
                this.toPath('/home');
            } catch (e) {
                console.log(e);
            } finally {
                this.$refs.loading.hide();
            }
        }
    },
    watch: {
        async currentInfo(newVal, oldVal) {
            if (newVal.province !== oldVal.province) {
                this.cities = await this.getCitiesInProvince({
                    province: newVal.province
                });
            }
        }
    }
};
