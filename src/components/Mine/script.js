import {mapActions} from 'vuex';
import Confirm from '../../base/Confirm/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            currentUser: {},
            avatarImgPath: ''
        }
    },
    components: {
        Confirm
    },
    async activated() {
        const currentUserId = this.currentInfo.userId;
        if (currentUserId) {
            this.avatarImgPath = `${AvatarBasePath}?userId=${currentUserId}&r=${Math.random()}`;
            this.fetchUser();
        } else {
            this.avatarImgPath = '';
            this.toPath('/user/entry');
        }
    },
    methods: {
        ...mapActions([
            'getUserById',
            'logout',
            'setCurrentInfo'
        ]),
        async fetchUser() {
            const currentUserId = this.currentInfo.userId;
            this.currentUser = await this.getUserById({
                userId: currentUserId
            });
        },
        showLogoutConfirm() {
            this.$refs.confirm.show({
                text: '是否退出登录？',
                confirmBtnText: '确定'
            });
        },
        async confirmLogout() {
            try {
                await this.logout();
                const currentInfo = Object.assign({}, this.currentInfo, {
                    userId: '',
                    auth: '',
                    noticeId: 0
                });
                this.setCurrentInfo(currentInfo);
                this.toPath('/user/entry');
            } catch (e) {
                console.log(e);
            }
        }
    },
    watch: {
        updateInfo(newVal) {
            if (newVal.encyFocus) {
                this.fetchUser();
                this.setUpdateInfo(Object.assign({}, newVal, {
                    encyFocus: false
                }));
            }
        }
    }
}
