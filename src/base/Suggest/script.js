import {mapMutations, mapActions} from 'vuex';
import Scroll from '../Scroll/index';
import NoResult from '../NoResult/index';
import {PathMixin} from '../../common/mixin';
import {SmallImageBasePath} from '../../constants';

const TYPE_SINGER = 'singer';
const perpage = 20;

export default {
    mixins: [PathMixin],
    props: {
        showSinger: {
            type: Boolean,
            default: true
        },
        query: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            page: 1,
            pullup: true,
            beforeScroll: true,
            hasMore: true,
            result: undefined,
            currentUserId: undefined
        }
    },
    methods: {
        refresh() {
            this.$refs.suggest.refresh()
        },
        async search() {
            this.page = 1;
            this.hasMore = true;
            this.$refs.suggest.scrollTo(0, 0);
            this.result = (await this.getEncyList({
                name: this.query,
                page: 1,
                size: 100,
                userId: this.currentUserId
            })).data;
            for (let ency of this.result) {
                this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
            }
        },
        searchMore() {
            if (!this.hasMore) {
                return
            }
            this.page++;
            // search(this.query, this.page, this.showSinger, perpage).then((res) => {
            //     if (res.code === ERR_OK) {
            //         this.result = this.result.concat(this._genResult(res.data))
            //         this._checkMore(res.data)
            //     }
            // })
        },
        listScroll() {
            this.$emit('listScroll');
        },
        selectItem(item) {
            this.$emit('select', item);
            // this.toPath(`/search/${item.id}`);
        },
        getDisplayName(item) {
            return `${item.name}`;
        },
        getIconCls(item) {
            return 'el-icon-coral-warning-fill';
        },
        _genResult(data) {
            let ret = [];
            if (data.zhida && data.zhida.singerid) {
                ret.push({...data.zhida, ...{type: TYPE_SINGER}})
            }
            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        _checkMore(data) {
            const song = data.song;
            if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
                this.hasMore = false
            }
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'getEncyList'
        ])
    },
    watch: {
        query(newQuery) {
            this.search(newQuery)
        }
    },
    components: {
        Scroll,
        NoResult
    }
}
