import {mapActions} from 'vuex';
import {Swiper, SwiperItem, Group, PopupPicker, LoadMore, XButton} from 'vux';
import Slider from '../../base/Slider/index';
import Scroll from '../../base/Scroll/index';
import MDialog from '../../base/Dialog/index';
import Toast from '../../base/Toast/index';
import EncyList from '../EncyList/index';
import GroupList from '../GroupList/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {convertToUndefined, formatUrlParams} from '../../common/util';
import {homeSwapperList, AvatarBasePath, FileBasePath} from '../../constants';

const LING_SHOW = ['lss', 'cjlss'];

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            list: homeSwapperList,
            groups: [],
            isKeepAlive: true,
            showProvincesPicker: false,
            provinces: [],
            provinceAdList: [],
            curProvince: [],
            loading: true,
            swapperImageClick: true,
            dialogImage: '',
            dialogClosable: true,
            dialogHideOnBlur: true
        }
    },
    components: {
        Scroll,
        Slider,
        MDialog,
        Toast,
        Swiper,
        SwiperItem,
        EncyList,
        GroupList,
        Group,
        PopupPicker,
        LoadMore,
        XButton
    },
    computed: {
        activeGroups() {
            return this.groups.filter(item =>
                (item.status === 1 && !LING_SHOW.includes(item.user_type))
            );
        },
        activeLingShows() {
            return this.groups.filter(item =>
                (item.status === 1 && LING_SHOW.includes(item.user_type))
            );
        }
    },
    async created() {
        this.provinces = await this.getProvinces();
        this.curProvince = [this.currentInfo.province];
        this.fetchGroups(this.currentInfo.province);
        this.fetchProvinceAds(this.currentInfo.province);
        if (!this.userHasLogin() && window.location.search) {
            const {code} = formatUrlParams(window.location.search.substring(1));
            console.log('code', code);
            if (code) {
                try {
                    const response = await this.loginByWechat({code});
                    if (!response.errno) {
                        window.sessionStorage.removeItem('SeaWaterInputHasErrorNum');
                        window.sessionStorage.removeItem('SeaWaterLoginHasError');
                        this.$refs.toast.show({
                            type: 'success',
                            text: '通过微信登录成功'
                        });
                        this._setCurrentInfo({
                            userId: response.id,
                            auth: response.token
                        });
                        this.fetchNotice({
                            userId: response.id,
                            noticeId: this.currentInfo.noticeId
                        });
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        } else {
            this.fetchNotice(convertToUndefined(this.currentInfo));
        }
    },
    activated() {
        this.$refs.scroll && this.$refs.scroll.refresh();
    },
    beforeRouteUpdate (to, from, next) {
        if (to.name === 'Home') {
            this.fetchGroups(this.currentInfo.province);
        }
        next();
    },
    methods: {
        ...mapActions([
            'getProvinces',
            'getGroupList',
            'setCurrentInfo',
            'setUpdateInfo',
            'getAdByProvinceCode',
            'loginByWechat',
            'checkNotice',
            'getNoticeImage',
            'insertNotice'
        ]),
        async fetchGroups(province) {
            this.loading = true;
            this.groups = (await this.getGroupList({
                page: 1,
                size: 10,
                province
            })).data;
            for (let group of this.groups) {
                this.$set(group, 'userAvatar', `${AvatarBasePath}?userId=${group.user_id}`);
            }
            this.loading = false;
        },
        async fetchProvinceAds(code) {
            this.provinceAdList = [];
            try {
                const response = await this.getAdByProvinceCode({province: code});
                const adNum = Number(response.ad_num);
                for (let i = 0; i < adNum; i++) {
                    this.provinceAdList.push({
                        id: `${code}${i + 1}`,
                        url: 'javascript: void(0);',
                        img: `${FileBasePath}/image/ad/${code}/${i + 1}.jpg?r=${Math.random()}`,
                        bigImg: `${FileBasePath}/image/ad/${code}/${i + 1}_big.jpg?r=${Math.random()}`
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async fetchNotice({noticeId = 0}) {
            const response = await this.checkNotice({noticeId});
            const {checked} = response;
            if (checked) {
                const imageResponse = await this.getNoticeImage();
                const {notice_id, notice_file} = imageResponse;
                this.dialogImage = notice_file;
                this.dialogClosable = false;
                this.dialogHideOnBlur = false;
                this._setCurrentInfo({
                    noticeId: notice_id
                });
            }
        },
        async hasReadNotice() {
            this.$refs.imageDialog.hide();
            if (this.userHasLogin()) {
                // await this.insertNotice({
                //     noticeId: this.currentInfo.noticeId
                // });
                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5NjY0MzIwNA==&scene=126&bizpsid=0#wechat_redirect';
            }
        },
        loadImage() {
            if (!this.checkloaded) {
                this.checkloaded = true;
                this.$refs.scroll && this.$refs.scroll.refresh();
            }
        },
        handleGroupChange(group) {
            this.isKeepAlive = !this.previousId || this.previousId === group.id;
            this.previousId = group.id;
        },
        handleSwapperImageClick(item) {
            this.dialogImage = item.bigImg;
            this.dialogClosable = true;
            this.dialogHideOnBlur = true;
            if (this.swapperImageClick) {
                if (this.cachedImage && this.cachedImage[item.id]) {
                    this.$refs.imageDialog.show();
                    this.swapperImageClick = true;
                } else {
                    if (this.cachedImage) {
                        if (!this.cachedImage[item.id]) {
                            this.cachedImage[item.id] = true;
                        }
                    } else {
                        this.cachedImage = {};
                        this.cachedImage[item.id] = true;
                    }
                    this.swapperImageClick = false;
                }
            }
        },
        loadDialogImage() {
            this.$refs.imageDialog.show();
            this.swapperImageClick = true;
        },
        handleShowProvinces() {
            this.showProvincesPicker = true;
        },
        handleProvinceChange(val) {
            const province = this.provinces.find(i => i.value === val[0]);
            this._setCurrentInfo({
                province: val[0],
                provinceName: province.name
            });
        },
        _setCurrentInfo(newInfo) {
            const currentInfo = Object.assign({}, this.currentInfo, newInfo);
            this.setCurrentInfo(currentInfo);
        },
        _setUpdateInfo(newInfo) {
            const updateInfo = Object.assign({}, this.updateInfo, newInfo);
            this.setUpdateInfo(updateInfo);
        }
    },
    watch: {
        currentInfo(newVal, oldVal) {
            if (newVal.province !== oldVal.province) {
                this.curProvince = [newVal.province];
                this.fetchGroups(newVal.province);
                this.fetchProvinceAds(newVal.province);
            }
        },
        updateInfo(newVal) {
            if (newVal.groupChange) {
                this.fetchGroups(this.currentInfo.province);
                this._setUpdateInfo({groupChange: false});
            }
        }
    }
}
