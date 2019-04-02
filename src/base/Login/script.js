import {XButton} from 'vux';
import {mapActions} from 'vuex';
import Toast from '../../base/Toast/index';
import Loading from '../../base/Loading/index';
import CountDown from '../CountDown/index';
import RegExp from '../../constants/regExp';
import {PathMixin} from '../../common/mixin';

export default {
    mixins: [PathMixin],
    components: {
        CountDown,
        Toast,
        Loading,
        XButton
    },
    data() {
        return {
            loginForm: {
                name: '',
                password: '',
                phone: '',
                auth: ''
            },
            loginEnabled: true,
            inputHasErrorNum: Number(window.sessionStorage.getItem('SeaWaterInputHasErrorNum')) || 0,
            loginHasError: Boolean(window.sessionStorage.getItem('SeaWaterLoginHasError')) || false,
            countDown: {
                isStart: false
            },
            requestId: ''
        };
    },
    methods: {
        ...mapActions([
            'sendVerification',
            'login',
            'getUserById',
            'getProvinces',
            'setCurrentInfo'
        ]),
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
                    phone: this.loginForm.phone
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
        async handleLogin() {
            if (!this.validLogin()) {
                return;
            }

            this.loginEnabled = false;
            try {
                const sendInfo = Object.assign({}, this.loginForm, {
                    requestId: this.requestId || undefined,
                    isError: this.loginHasError,
                    auth: this.loginForm.auth || undefined,
                    phone: this.loginForm.phone || undefined
                });
                const result = await this.login(sendInfo);
                if (!result.errno) {
                    this.loginHasError = false;
                    this.$refs.toast.show({
                        text: '登录成功'
                    });
                    const currentInfo = {
                        userId: result.id,
                        auth: result.token,
                        noticeId: 0,
                        province: result.province,
                        provinceName: result.province_name
                    };
                    this.setCurrentInfo(currentInfo);
                    window.sessionStorage.removeItem('SeaWaterInputHasErrorNum');
                    window.sessionStorage.removeItem('SeaWaterLoginHasError');
                    this.toPath('/home');
                } else {
                    this.inputHasErrorNum++;
                    this.loginForm.password = '';
                    this.loginForm.phone = '';
                    this.loginForm.auth = '';
                    window.sessionStorage.setItem('SeaWaterInputHasErrorNum', this.inputHasErrorNum);
                    if (this.inputHasErrorNum === 3) {
                        this.loginHasError = true;
                        window.sessionStorage.setItem('SeaWaterLoginHasError', true);
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.loginEnabled = true;
            }
        },
        validSendCode() {
            const {name, password, phone} = this.loginForm;

            if (!name) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '用户名不能为空'
                });
                return false;
            }
            if (!password) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '密码不能为空'
                });
                return false;
            }
            if (!phone) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '手机号不能为空'
                });
                return false;
            } else if (!RegExp.PhoneReg.test(phone)) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '请填写正确的手机号'
                });
                return false;
            }

            return true;
        },
        validLogin() {
            const {name, password} = this.loginForm;

            if (!name) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '用户名不能为空'
                });
                return false;
            }
            if (!password) {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '密码不能为空'
                });
                return false;
            }

            if (this.loginHasError) {
                const {phone, auth} = this.loginForm;

                if (!phone) {
                    this.$refs.toast.show({
                        type: 'warning',
                        text: '手机号不能为空'
                    });
                    return false;
                } else if (!RegExp.PhoneReg.test(phone)) {
                    this.$refs.toast.show({
                        type: 'warning',
                        text: '请填写正确的手机号'
                    });
                    return false;
                }
                if (!auth) {
                    this.$refs.toast.show({
                        type: 'warning',
                        text: '短信验证码不能为空'
                    });
                    return false;
                }
            }
            return true;
        }
    }
};
