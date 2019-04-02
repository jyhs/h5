export default {
    props: {
        searches: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('select', item);
        },
        deleteOne(item) {
            this.$emit('delete', item);
        }
    }
}
