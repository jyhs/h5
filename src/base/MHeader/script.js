export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        backToHome: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        back() {
            if (this.backToHome) {
                this.$router.push('/home');
            } else {
                if (this.$route.query.goindex === 'true') {
                    this.$router.push('/home');
                } else {
                    this.$router.back();
                }
            }
        }
    }
}
