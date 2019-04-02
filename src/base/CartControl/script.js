import {CommonMixin, PathMixin} from '../../common/mixin';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    props: {
        detail: {
            type: Object,
            default() {
                return {}
            }
        },
        max: {
            type: Number,
            default: 10000
        },
        min: {
            type: Number,
            default: 0
        }
    },
    methods: {
        addCart(event) {
            if (this.userHasLogin()) {
                if (!this.detail.count) {
                    this.$set(this.detail, 'count', 1);
                } else {
                    this.detail.count++;
                }
            }
            this.$emit('cartAdd', event.target, this.detail);
        },
        decreaseCart() {
            if (this.userHasLogin()) {
                this.detail.count--;
            }
            this.$emit('cartDecrease', this.detail);
        }
    }
}
