import {Badge, LoadMore} from 'vux';
import {mapActions} from 'vuex';
import MHeader from '../../base/MHeader/index';
import SearchBox from '../../base/SearchBox/index';
import Scroll from '../../base/Scroll/index';
import CartControl from '../../base/CartControl/index';
import ShopCart from '../../base/ShopCart/index';
import Confirm from '../../base/Confirm/index';
import Toast from '../../base/Toast/index';
import NoResult from '../../base/NoResult/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {SmallImageBasePath, FileBasePath} from '../../constants';
import {saveCurrentInfo} from '../../common/util/cache';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            group: {},
            currentIndex: 0,
            currentType: '',
            currentPosY: 0,
            allDetails: [],
            details: [],
            cart: {},
            menus: [],
            isSearching: false,
            query: '',
            focused: false,
            loading: true
        }
    },
    components: {
        Badge,
        LoadMore,
        MHeader,
        SearchBox,
        Scroll,
        CartControl,
        ShopCart,
        Confirm,
        Toast,
        NoResult
    },
    computed: {
        selectDetails() {
            const details = [];
            this.allDetails.forEach((detail) => {
                if (detail.count > 0) {
                    details.push(detail);
                }
            });
            return details;
        },
        totalFreight() {
            let totalFreight = 0;
            for (let detail of this.selectDetails) {
                const {price, count} = detail;
                if (this.group.top_freight) {
                    totalFreight +=
                        Math.min(price * this.group.freight, this.group.top_freight) * count;
                } else {
                    totalFreight += (count * price) * this.group.freight;
                }
            }
            return Math.round(totalFreight * 100) / 100;
        },
        totalCount() {
            let cartCount = 0;
            for (let detail of this.selectDetails) {
                cartCount += detail.price * detail.count;
            }
            return cartCount;
        },
        hasNoResult() {
            return !this.loading && !this.details.length && !this.focused;
        }
    },
    async activated() {
        const {groupId, token, userId, province, provinceName} = this.$route.query;
        const info = {
            userId: userId,
            auth: token,
            noticeId: 1,
            province: province,
            provinceName: provinceName
        }
        localStorage.setItem('auth', token);
        saveCurrentInfo(info);
        this.previousId = groupId;
        this.$setgoindex();
        await this.initData(groupId);
        await this.initCart();
    },
    methods: {
        ...mapActions([
            'getCategoriesByBillId',
            'getGroupById',
            'getDetailsByBillId',
            'getDetailsByBillIdAndCategory',
            'getActiveCart',
            'addCart',
            'getDetailsByCartId',
            'saveOrUpdateCartDetail',
            'deleteCartDetailById'
        ]),
        async initData(groupId) {
            this.loading = true;
            this.group = await this.getGroupById({groupId});

            this.menus = await this.getCategoriesByBillId({
                billId: this.group.bill_id
            });
            this.allDetails = await this.getDetailsByBillId({
                billId: this.group.bill_id,
                page: 1,
                size: 200
            });
            if (this.menus && this.menus[0]) {
                this.currentType = this.menus[0].code;
                await this.initDetailsByType(this.menus[0].code);
            }
            this.loading = false;
            setTimeout(() => {
                // this.initDetailsHeight();
            }, 20);
        },
        async initCart() {
            const {groupId} = this.$route.query;
            if (this.userHasLogin()) {
                this.cart = await this.getActiveCart({
                    groupId: groupId
                });
                if (this._hasCart()) {
                    this._updateDetailsInCart();
                } else {
                    this._addCart();
                }
            }
        },
        initDetailsHeight() {
            const infoWrapper = this.$refs.infoWrapper;
            const infoWrapperHeight = infoWrapper.clientHeight;
            this.$refs.details.style.height = `${window.innerHeight - infoWrapperHeight - 80}px`;
        },
        async initDetailsByType(type) {
            const billId = this.group.bill_id;
            this.details = await this.getDetailsByBillIdAndCategory({
                billId,
                category: type,
                page: 1,
                size: 1000
            });
            for (let ency of this.details) {
                this.$set(ency, 'encyImage', `${SmallImageBasePath}?materialId=${ency.material_id || 0}`);
            }
        },
        onClickSearch() {
            this.isSearching = true;
            this.details = [];
            setTimeout(() => {
                this.$refs.searchBoxWrapper.style['transform'] = `translate3D(0, 0, 0)`;
                this.$refs.searchBoxWrapper.style['webkitTransform'] = `translate3D(0, 0, 0)`;
                this.$refs.detailsWrapper.refresh();
            }, 20);
        },
        async onClickUndo() {
            this.isSearching = false;
            this._typeChange(this.currentType);
        },
        async onQueryChange(query) {
            this.query = query;
            if (query) {
                this.details = this.allDetails.filter(
                    detail => detail.name.indexOf(query) !== -1
                );
                for (let ency of this.details) {
                    this.$set(ency, 'encyImage', `${SmallImageBasePath}?materialId=${ency.material_id || 0}`);
                }
            }
        },
        onSearchFocus() {
            this.focused = true;
        },
        onSearchBlur() {
            this.focused = false;
        },
        async selectMenu(index, item) {
            this.currentIndex = index;
            this.currentType = item.code;
            this._typeChange(this.currentType);
        },
        scrollGroupDetails(pos) {
            const currentPos = pos.y;
            const infoWrapper = this.$refs.infoWrapper;
            const menuWrapper = this.$refs.menuWrapper;
            if (infoWrapper && menuWrapper) {
                this.infoWrapperHeight = this.infoWrapperHeight || infoWrapper.clientHeight;
                if (this.infoWrapperHeight >= Math.abs(currentPos)) {
                    this.currentPosY = currentPos;
                } else {
                    this.currentPosY = -this.infoWrapperHeight;
                }
                infoWrapper.style.transform = `translate3d(0, ${this.currentPosY}px, 0)`;
                menuWrapper.$el.style.transform = `translate3d(0, ${this.currentPosY}px, 0)`;
            }
        },
        cartAdd(target, detail) {
            this._cartChange(detail, target);
        },
        cartDecrease(detail) {
            this._cartChange(detail);
        },
        shopCartAdd(detail) {
            this._cartChange(detail);
        },
        shopCartDecrease(detail) {
            this._cartChange(detail);
        },
        confirmToLogin() {
            this.toPath('/user/entry');
        },
        toPath() {
            const {groupId} = this.$route.query;
            wx.miniProgram.navigateTo({url: '/pages/group/mall/main?groupId=' + groupId + '&cartId=' + this.cart.id});
        },
        toEncyDetail(item) {
            if (item.material_id) {
                wx.miniProgram.navigateTo({url: '/pages/catalog/material/main?id=' + item.material_id});
            } else {
                this.$refs.toast.show({
                    type: 'warning',
                    text: '没有匹配到生物'
                });
            }
        },
        async _typeChange(type) {
            await this.initDetailsByType(type);
            if (this.userHasLogin()) {
                this._updateDetailsInCart();
            }
            setTimeout(() => {
                this.$refs.detailsWrapper.scrollTo(0, this.currentPosY, 300);
            }, 20);
        },
        _drop(target) {
            this.$refs.shopCart.drop(target);
        },
        _cartChange(detail, target) {
            if (this.userHasLogin()) {
                target && this._drop(target);
                setTimeout(async () => {
                    try {
                        if (detail.count) {
                            await this.saveOrUpdateCartDetail({
                                cartId: this.cart.id,
                                billDetailId: detail.id,
                                billDetailNum: detail.count,
                                sum: this.totalCount,
                                freight: this.totalFreight
                            });
                        } else {
                            await this.deleteCartDetailById({
                                cartId: this.cart.id,
                                billDetailId: detail.id,
                                billDetailNum: detail.count,
                                sum: this.totalCount,
                                freight: this.totalFreight
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }, 20);
            } else {
                this.$refs.confirm.show({
                    text: '还未登录，去登录？',
                    confirmBtnText: '去登陆'
                });
            }
        },
        _hasCart() {
            if (this.cart === undefined) {
                return false;
            }
            if (!this.cart) {
                return false;
            } else if (!this.cart.id) {
                return false;
            }

            return true;
        },
        async _addCart() {
            const {groupId} = this.$route.query;
            try {
                this.cart = await this.addCart({
                    groupId,
                    status: 1
                });
            } catch (e) {
                console.log(e);
            }
        },
        async _updateDetailsInCart() {
            const result = (await this.getDetailsByCartId({
                cartId: this.cart.id,
                page: 1,
                size: 200
            })).data;

            const detailIds = result.map(item => item['bill_detail_id']);
            const detailMap = {};
            for (let item of result) {
                detailMap[item['bill_detail_id']] = item['bill_detail_num'];
            }
            this.details.map(detail => {
                if (detailIds.includes(detail.id)) {
                    this.$set(detail, 'count', detailMap[detail.id]);
                    this.$set(detail, 'groupId', this.group.id);
                }
            });
            this.allDetails.map(detail => {
                if (detailIds.includes(detail.id)) {
                    this.$set(detail, 'count', detailMap[detail.id]);
                    this.$set(detail, 'groupId', this.group.id);
                }
            });
            if (this.details && this.details.length >= 7) {
                this.details.push({});
                this.details.push({});
                this.details.push({});
            }
        },
        _initWxShare(groupId) {
            wx.miniProgram.postMessage({
                data: {
                    param: `type=group&id=${groupId}`,
                    shareUserId: this.currentInfo.userId || 0,
                    auth: this.currentInfo.auth || 0,
                    title: this.group.name,
                    imageUrl: `${FileBasePath}/image/share/group.jpg?r=${Math.random()}`
                }
            });
        }
    },
    watch: {
        details: {
            deep: true,
            handler(newDetails) {
                for (let detail of newDetails) {
                    this.allDetails.map(aDetail => {
                        if (aDetail.id === detail.id) {
                            this.$set(aDetail, 'count', detail.count);
                        }
                    });
                }
            }
        },
        selectDetails: {
            deep: true,
            handler(newDetails, oldDetails) {
                for (let detail of newDetails) {
                    this.details.map(aDetail => {
                        if (aDetail.id === detail.id) {
                            this.$set(aDetail, 'count', detail.count);
                        }
                    });
                }
                if (oldDetails.length > newDetails.length) {
                    const newIds = newDetails.map(detail => detail.id);
                    const diff = oldDetails.filter(detail => !newIds.includes(detail.id));
                    if (diff.length) {
                        for (let detail of diff) {
                            this.details.map(aDetail => {
                                if (aDetail.id === detail.id) {
                                    this.$set(aDetail, 'count', 0);
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}
