import {debounce} from '../../common/util';

export default {
    props: {
        placeholder: {
            type: String,
            default: '搜索鱼类、耗材及设备'
        }
    },
    data() {
        return {
            query: ''
        }
    },
    methods: {
        clear() {
            this.query = ''
        },
        setQuery(query) {
            this.query = query
        },
        blur() {
            this.$refs.query.blur()
        },
        onFocus() {
            this.$emit('focus');
        },
        onBlur() {
            this.$emit('blur');
        }
    },
    created() {
        this.$watch('query', debounce((newQuery) => {
            this.$emit('query', newQuery)
        }, 200))
    }
}