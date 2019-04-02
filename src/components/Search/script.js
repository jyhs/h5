import {mapGetters, mapActions} from 'vuex';
import SearchBox from '../../base/SearchBox/index';
import Scroll from '../../base/Scroll/index';
import SearchList from '../../base/SearchList/index';
import Suggest from '../../base/Suggest/index';
import Confirm from '../../base/Confirm/index';
import NoResult from '../../base/NoResult/index';
import {PathMixin} from '../../common/mixin';

export default {
    mixins: [PathMixin],
    data() {
        return {
            query: '',
            refreshDelay: 120,
            focused: false
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ]),
        showNoResult() {
            return !this.focused && !this.searchHistory.length;
        }
    },
    components: {
        SearchBox,
        Scroll,
        SearchList,
        Suggest,
        Confirm,
        NoResult
    },
    methods: {
        ...mapActions([
            'clearSearchHistory',
            'saveSearchHistory',
            'deleteSearchHistory'
        ]),
        onQueryChange(query) {
            this.query = query;
        },
        onSearchFocus() {
            this.focused = true;
        },
        onSearchBlur() {
            this.focused = false;
        },
        showConfirm() {
            this.$refs.confirm.show({
                text: '确定删除所有搜索记录吗？'
            });
        },
        confirmDelete() {
            this.clearSearchHistory();
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query);
        },
        saveSearch(item) {
            this.saveSearchHistory(this.query);
            this.toPath(`/search/${item.id}`)
        },
        blurInput() {
            this.$refs.searchBox.blur()
        }
    },
    watch: {
        query(newQuery) {
            if (!newQuery) {
                setTimeout(() => {
                    this.$refs.shortcut.refresh()
                }, 20)
            }
        }
    }
}
