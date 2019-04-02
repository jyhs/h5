import {CommonMixin, PathMixin} from '../../common/mixin';
import {SmallImageBasePath} from '../../constants';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        }
    },
    watch: {
        data(newList) {
            setTimeout(() => {
                for (let ency of newList) {
                    this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
                    if (ency.focus_id) {
                        this.$set(ency, 'isFocused', true);
                    } else {
                        this.$set(ency, 'isFocused', false);
                    }
                }
            }, 20);
        }
    }
}
