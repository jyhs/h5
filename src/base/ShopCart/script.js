import CartControl from '../CartControl/index';
import Scroll from '../Scroll/index';

export default {
    props: {
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectDetails: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropBalls: [],
            fold: true
        }
    },
    components: {
        CartControl,
        Scroll
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectDetails.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectDetails.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `请购物`;
            } else {
                return '去确认';
            }
        },
        payClass() {
            if (this.totalPrice === 0) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        listShow() {
            if (!this.totalCount) {
                return false;
            }
            if (!this.fold) {
                setTimeout(() => {
                    this.$refs.listScroll.refresh();
                }, 1000);
            }
            return !this.fold;
        }
    },
    methods: {
        cartAdd(target, detail) {
            this.drop(target);
            this.$emit('cartAdd', detail);
        },
        cartDecrease(detail) {
            this.$emit('cartDecrease', detail);
        },
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        empty() {
            this.selectDetails.forEach((food) => {
                food.count = 0;
            });
            this.fold = true;
        },
        hideList() {
            this.fold = true;
        },
        confirm() {
            if (!this.totalPrice || this.totalPrice < this.minPrice) {
                return;
            }
            this.$emit('toPath');
        },
        beforeDrop(el) {
            let count = this.balls.length;
            while (count--) {
                const ball = this.balls[count];
                if (ball.show) {
                    const rect = ball.el.getBoundingClientRect();
                    const x = rect.left - 32;
                    const y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    const inner = el.getElementsByClassName('inner')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropping(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                const inner = el.getElementsByClassName('inner')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            });
        },
        afterDrop(el) {
            const ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
    }
}
