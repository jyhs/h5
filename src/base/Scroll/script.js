import BScroll from 'better-scroll';

export default {
    props: {
        click: {
            type: Boolean,
            default: true
        },
        probeType: {
            type: Number,
            default: 1
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default() {
                return []
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll();
        }, 20);
    },
    methods: {
        _initScroll() {
            if (!this.$refs.scroll) {
                return;
            }
            this.scroll = new BScroll(this.$refs.scroll, {
                probeType: this.probeType,
                click: this.click
            });

            if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos);
                });
            }
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh();
            }, 20);
        }
    }
}
