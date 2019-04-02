export default {
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        toGroupShop(group) {
            this.$emit('groupChange', group);
            this.$router.push({
                path: `/groupShop/${group.id}`
            });
        }
    }
}
