import {mapActions} from 'vuex';
import {Group, GroupTitle, XButton, XInput, PopupPicker, XTextarea} from 'vux';
import MHeader from '../../base/MHeader/index';
import Loading from '../../base/Loading/index';
import {CommonMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';
import RegExp from '../../constants/regExp';
import {isEmpty, toFormData} from '../../common/util';

export default {
    mixins: [CommonMixin],
    data() {
        return {
            user: {},
            isSeller: false,
            avatarImgPath: '',
            chinaCities: [],
            nowCity: []
        };
    },
    components: {
        Group,
        GroupTitle,
        XButton,
        XInput,
        PopupPicker,
        XTextarea,
        MHeader,
        Loading
    },
    created() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getUserById',
            'uploadUserAvatar',
            'getChinaCities',
            'updateUser'
        ]),
        async initData() {
            const id = this.currentInfo.userId;
            const userEditing = await this.getUserById({userId: id});
            this.user = Object.assign({}, userEditing, {
                point: userEditing.point ? userEditing.point : '0',
                address: isEmpty(userEditing.address) ? '' : userEditing.address,
                contacts: isEmpty(userEditing.contacts) ? '' : userEditing.contacts,
                description: isEmpty(userEditing.description) ? '' : userEditing.description
            });
            this.avatarImgPath = `${AvatarBasePath}?userId=${id}&r=${Math.random()}`;
            this.isSeller = ['pfs', 'lss'].includes(this.user.type);
            this.chinaCities = await this.getChinaCities();
            this.nowCity = [this.user.province, this.user.city];
        },
        async uploadAvatar(e) {
            const {userId} = this.currentInfo;

            const file = (e.target || e.dataTransfer).files[0];
            if (!file) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请选择需要上传的图片'
                });
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: `上传图片不能超过2M`
                });
                return;
            }
            const fileType = file.type.substring(file.type.indexOf('/') + 1).toUpperCase();
            if (['BMP', 'JPG', 'JPEG', 'PNG', 'GIF'].indexOf(fileType) === -1) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: `上传文件不是图片`
                });
                return;
            }

            try {
                await this.uploadUserAvatar({
                    formData: toFormData({
                        avatar: file,
                        userId
                    })
                });
                this.avatarImgPath = `${AvatarBasePath}?userId=${userId}&r=${Math.random()}`;
                this.$vux.toast.show({
                    type: 'success',
                    text: `上传成功`
                });
            } catch (e) {
                console.log(e);
            }
        },
        async handleSubmit() {
            if (!this.validSubmit()) {
                return;
            }
            const sendInfo = Object.assign({}, this.user, {
                userId: this.user.id,
                province: this.nowCity[0],
                city: this.nowCity[1]
            });

            this.$refs.loading.show({
                text: '努力加载中'
            });
            await this.updateUser(sendInfo);
            this.$refs.loading.hide();

            this.$vux.toast.show({
                type: 'success',
                text: `更新成功`
            });
        },
        validSubmit() {
            if (!this.user.phone) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请填写联系电话'
                });
                return false;
            } else if (!RegExp.PhoneReg.test(this.user.phone)) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请填写正确的联系电话'
                });
                return false;
            }
            if (this.nowCity.length < 2 || !this.nowCity[0] || !this.nowCity[1]) {
                this.$vux.toast.text('请选择所在城市');
                return false;
            }

            return true;
        }
    }
};
