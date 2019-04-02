import CartControl from '../CartControl/index';
import Scroll from '../Scroll/index';

export default {
    components: {
        CartControl,
        Scroll
    },
    props: {
        title: {
            type: String,
            default: '购物车'
        },
        details: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            fold: true
        }
    },
    computed: {
        listShow() {
            if (!this.fold) {
                setTimeout(() => {
                    this.$refs.listScroll.refresh();
                }, 1000);
            }
            return !this.fold;
        }
    },
    methods: {
        hideList() {
            this.fold = true;
        },
        cartAdd(target, detail) {
            this.$emit('cartAdd', detail);
        },
        cartDecrease(detail) {
            this.$emit('cartDecrease', detail);
        }
    }
}
