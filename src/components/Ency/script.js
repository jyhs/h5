import {mapActions} from 'vuex';
import {Rater, LoadMore} from 'vux';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import Confirm from '../../base/Confirm/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {SmallImageBasePath} from '../../constants';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            menuIndex: [0],
            activeType: '',
            categories: [],
            encyList: [],
            loading: true
        }
    },
    components: {
        Scroll,
        NoResult,
        Confirm,
        Rater,
        LoadMore
    },
    async created() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getAllCategory',
            'getEncyList'
        ]),
        async initData() {
            this.categories = await this.getAllCategory();
            this.activeType = this.categories[0].types[0].code;
        },
        selectMenu(index) {
            if (this.menuIndex.includes(index)) {
                const i = this.menuIndex.findIndex((item) => {
                    return item === index;
                });
                this.menuIndex.splice(i, 1);
            } else {
                this.menuIndex.push(index);
            }
        },
        async selectType(e, index) {
            this.$refs.detailsWrapper.scrollTo(0, 0, 300);
            this.activeType = e.target.dataset.code;
            // this.menuIndex = [index];
            this.$nextTick(() => {
                this.$refs.menuWrapper.scrollToElement(
                    document.getElementById(e.target.dataset.code),
                    300
                )
            });
        },
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
        }
    },
    watch: {
        async activeType(newValue) {
            this.loading = true;
            this.encyList = (await this.getEncyList({
                type: newValue,
                page: 1,
                size: 1000
            })).data;
            for (let ency of this.encyList) {
                this.$set(ency, 'encyImage', `${SmallImageBasePath}?materialId=${ency.id}`);
                this.$set(ency, 'isFocused', !!ency.focus_id);
                this.$set(ency, 'tags', ency.tag ? ency.tag.trim().split(',').slice(0, 2) : []);
            }
            this.loading = false;
        }
    }
}
