import {Tab, TabItem, XInput, Selector, Group, Divider} from 'vux';
import Login from '../../base/Login/index';
import Register from '../../base/Register/index';
import {PathMixin} from '../../common/mixin';

export default {
    mixins: [PathMixin],
    data () {
        return {
            index: 0,
            showWechatLogin: false,
            wechatLoginUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6edb9c7695fb8375&redirect_uri=https://group.huanjiaohu.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
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
    methods: {
        handleTabItemClick(index) {
            this.index = index;
        }
    }
};
