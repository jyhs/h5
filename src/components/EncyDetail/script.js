import {mapActions} from 'vuex';
import {Swiper, Rater, Group, PopupPicker, Previewer} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import Confirm from '../../base/Confirm/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {ImageBasePath} from '../../constants';

export default {
    mixins: [CommonMixin, PathMixin],
    data() {
        return {
            encyImages: [],
            previewImages: [],
            ency: {}
        }
    },
    components: {
        Swiper,
        Rater,
        Group,
        PopupPicker,
        Previewer,
        MHeader,
        Scroll,
        Confirm
    },
    async activated() {
        const {id} = this.$route.params;

        this.ency = await this.getEncyById({
            materialId: id
        });
        this.$set(this.ency, 'isFocused', !!this.ency.focus_id);
        const encyImages = (await this.getEncyImagesById({materialId: id})).image;
        encyImages.map(image => {
            this.encyImages.push({
                url: `javascript: void(0);`,
                img: `${ImageBasePath}${image}`,
                src: `${ImageBasePath}${image}`,
                fallbackImg: '',
                title: ''
            });
            this.previewImages.push({
                src: `${ImageBasePath}${image}`
            });
        });
        this.$setgoindex();
        wx.miniProgram.postMessage({
            data: {
                param: `type=dict&id=${id}`,
                shareUserId: this.currentInfo.userId || 0,
                auth: this.currentInfo.auth || 0,
                title: this.ency.name,
                imageUrl: `${(this.encyImages[0] || {}).img}?r=${Math.random()}`
            }
        });
    },
    deactivated() {
        this.encyImages = [];
        this.previewImages = [];
    },
    methods: {
        ...mapActions([
            'getEncyById',
            'getEncyImagesById'
        ]),
        userHasLogin() {
            const userId = this.currentInfo.userId;
            if (userId) {
                return true;
            } else {
                this.$refs.confirm.show({
                    text: '还未登录，去登录？',
                    confirmBtnText: '去登陆'
                });
            }
        },
        confirmToLogin() {
            this.toPath('/user/entry');
        },
        showImagePreviewer() {
            this.$refs.previewer.show(0);
        }
    }
}
