import {XButton} from 'vux';
import {mapActions} from 'vuex';
import Toast from '../../base/Toast/index';
import Loading from '../../base/Loading/index';
import CountDown from '../CountDown/index';
import RegExp from '../../constants/regExp';

export default {
    name: 'Register',
    components: {
        Toast,
        Loading,
        CountDown,
        XButton
    },
    data() {
        return {
            registerForm: {
                name: '',
                phone: '',
                password1: '',
                password2: '',
                auth: ''
            },
            registerEnabled: true,
            countDown: {
                isStart: false
            },
            requestId: ''
        };
    },
    methods: {
        ...mapActions([
            'checkUsername',
            'sendVerification',
            'register'
        ]),
        async handleCheckName(e) {
            try {
                await this.checkUsername({
                    name: e.target.value
                });
            } catch (e) {
                console.log(e);
            }
        },
        handleCountEnd() {
            this.countDown.isStart = false;
        },
        async sendVerifyCode() {
            if (!this.validSendCode()) {
                return;
            }

            this.$refs.loading.show({
                text: '短信发送中'
            });
            try {
                const result = await this.sendVerification({
                    phone: this.registerForm.phone
                });
                this.requestId = result.requestId;
                this.$refs.toast.show({
                    type: 'success',
                    text: '发送成功，请查收'
                });
                this.countDown.isStart = true;
            } catch (e) {
                console.log(e);
            } finally {
                this.$refs.loading.hide();
            }
        },
        async handleRegister() {
            if (!this.validRegister()) {
                return;
            }
            try {
                const response = await this.register({
                    ...this.registerForm,
                    requestId: this.requestId
                });
                if (!response.errno) {
                    this.$refs.toast.show({
                        type: 'success',
                        text: '注册成功，请登录'
                    });
                    this.$emit('toLogin');
                }
            } catch (error) {
                console.error(error);
            }
        },
        validSendCode() {
            const {name, password1, password2, phone} = this.registerForm;

            if (!name) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '用户名不能为空'
                });
                return false;
            }
            if (!password1) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '密码不能为空'
                });
                return false;
            }
            if (!password2) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '确认密码不能为空'
                });
                return false;
            }
            if (password1 !== password2) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '两次输入密码不同'
                });
                return false;
            }
            if (!phone) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '手机号不能为空'
                });
                return false;
            } else if (!RegExp.PhoneReg.test(phone)) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '请填写正确的手机号'
                });
                return false;
            }

            return true;
        },
        validRegister() {
            const {name, phone, password1, password2, auth} = this.registerForm;

            if (!name) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '用户名不能为空'
                });
                return false;
            }
            if (!password1) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '密码不能为空'
                });
                return false;
            }
            if (!password2) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '确认密码不能为空'
                });
                return false;
            }
            if (password1 !== password2) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '两次输入密码不同'
                });
                return false;
            }
            if (!phone) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '手机号不能为空'
                });
                return false;
            } else if (!RegExp.PhoneReg.test(phone)) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '请填写正确的手机号'
                });
                return false;
            }
            if (!auth) {
                this.$refs.toast.show({
                    type: 'warn',
                    text: '短信验证码不能为空'
                });
                return false;
            }

            return true;
        }
    }
};
