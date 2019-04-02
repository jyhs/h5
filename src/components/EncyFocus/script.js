import {mapActions} from 'vuex';
import {Rater, Group, PopupPicker, LoadMore} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import NoResult from '../../base/NoResult/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {SmallImageBasePath} from '../../constants';

const shareTypes = [{
    name: '微信',
    value: 'wechat'
}, {
    name: 'QQ',
    value: 'qq'
}, {
    name: '微博',
    value: 'weibo'
}];

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data () {
        return {
            encyList: [],
            loading: true,
            showSharePicker: false,
            shareTypes: shareTypes,
            shareType: []
        }
    },
    components: {
        Rater,
        Group,
        PopupPicker,
        LoadMore,
        MHeader,
        Scroll,
        NoResult
    },
    created() {
        this.initFocusedEncyList();
    },
    methods: {
        ...mapActions([
            'getFocusedEncyList'
        ]),
        async initFocusedEncyList() {
            this.loading = true;
            this.encyList = (await this.getFocusedEncyList()).data;
            for (let ency of this.encyList) {
                this.$set(ency, 'encyImage', `${SmallImageBasePath}?materialId=${ency.id}`);
                this.$set(ency, 'isFocused', true);
                this.$set(ency, 'tags', ency.tag ? ency.tag.trim().split(',').slice(0, 2) : []);
            }
            this.loading = false;
        },
        showShareTypePicker(item) {
            this.currentItem = item;
            this.showSharePicker = true;
        },
        handleShareTypeChange(shareType) {
            this.shareType = shareType;
        },
        handleCloseSharePicker(closeType) {
            if (closeType) {
                console.log('shareType', this.shareType);
            }
        }
    },
    watch: {
        updateInfo() {
            this.initFocusedEncyList();
        }
    }
};
