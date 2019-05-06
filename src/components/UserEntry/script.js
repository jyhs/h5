import {Tab, TabItem, XInput, Selector, Group, Divider} from 'vux';
import Login from '../../base/Login/index';
import Register from '../../base/Register/index';
import {PathMixin} from '../../common/mixin';
import {formatUrlParams} from '../../common/util';
import Vue from 'vue';

export default {
    mixins: [PathMixin],
    data () {
        return {
            index: 0,
            showWechatLogin: false,
            wechatLoginUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6edb9c7695fb8375&redirect_uri=https://group.huanjiaohu.com/mall&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
            isWechat: true
        };
    },
    components: {
        Tab,
        TabItem,
        XInput,
        Selector,
        Group,
        Login,
        Register,
        Divider
    },
    activated() {
        this.isWechat = /MicroMessenger/.test(navigator.userAgent);
    },
    async mounted() {
        const {code} = formatUrlParams(window.location.search.substring(1));
        if (code) {
            const response = await Vue.axios.post(`https://api2.huanjiaohu.com/user/userEntry`, {code});
            if (!response.errno) {
                this.$refs.toast.show({
                    type: 'success',
                    text: '订阅成功'
                });
            }
        }
    },
    methods: {
        login() {
            window.location.href = this.wechatLoginUrl;
        },
        handleTabItemClick(index) {
            this.index = index;
        }
    }
};
