<template>
    <transition name="slide">
        <div class="group-shop-container">
            <!-- <m-header>
                <span class="el-icon-coral-search f20" @click="onClickSearch" v-if="!isSearching"></span>
                <span class="el-icon-coral-undo f20" @click="onClickUndo" v-else></span>
            </m-header> -->
            <div class="content-wrapper" :style="{bottom: group.status === 1 ? '46px': 0}">
                <div class="search-box-wrapper" ref="searchBoxWrapper">
                    <search-box ref="searchBox"
                                @query="onQueryChange"
                                @focus="onSearchFocus"
                                @blur="onSearchBlur"
                    ></search-box>
                </div>
                <div class="info-wrapper" ref="infoWrapper" >
                    <div class="info">
                        <div>
                            <span class="column f12">
                                <span class="title">组织者：</span>
                                <span>{{group.contacts}}</span>
                            </span>
                        </div>
                        <div>
                            <span class="column f12">
                                <span class="title">电话：</span>
                                <span>{{group.phone}}</span>
                            </span>
                        </div>
                        <div>
                            <span class="column f12">
                                <span class="title">截止时间：</span>
                                <span>{{group.end_date_format}}</span>
                            </span>
                        </div>
                        <div>
                            <span class="column f12">
                                <span class="title">运费：</span>
                                <span class="count">{{(group.freight * 100 || 0).toFixed(2)}}%<span v-if="group.top_freight!==0">，单品<span style="color: #ee735c">{{group.top_freight}}</span>元封顶</span></span>
                            </span>
                        </div>
                        <div>
                            <span class="column f12">
                                <span class="title">团购金额：</span>
                                <span class="count">￥{{group.sum || 0}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="description" v-if="group.description">
                        <span class="f12" v-html="group.description"></span>
                    </div>
                </div>
                <div class="details" ref="details">
                    <scroll class="menu-wrapper" ref="menuWrapper" v-if="!isSearching">
                        <ul>
                            <li v-for="(item, index) in menus"
                                class="menu-item"
                                :class="{current: currentIndex === index}"
                                :key="item.code"
                                @click="selectMenu(index, item)"
                            >
                            <span class="text border-1px">
                                <span v-show="item.type > 0" class="icon"></span>{{item.name}}
                            </span>
                            </li>
                        </ul>
                    </scroll>
                    <scroll class="details-wrapper"
                            :probeType="3"
                            :listenScroll="true"
                            @scroll="scrollGroupDetails"
                            ref="detailsWrapper"
                    >
                        <ul>
                            <li class="block-content" v-for="item in details" :key="item.id">
                                <div class="content-main ency-content-main">
                                    <div class="pic">
                                        <img v-lazy="item.encyImage" alt="生物图片" @click="toEncyDetail(item)">
                                    </div>
                                    <div class="detail-info">
                                        <div class="name-price">
                                        <span class="ency-name f14">
                                            <span>{{item.name}}</span>
                                            <span class="ency-size f12">{{item.size}}</span>
                                        </span>
                                        <span class="ency-price">￥{{item.price}}</span>
                                        </div>
                                        <div class="others">
                                            <div>
                                                <badge v-if="item.recommend === 'tj'" text="推荐"></badge>
                                                <badge v-if="item.recommend === 'tej'" text="特价"></badge>
                                            </div>
                                            <div class="cart-control-wrapper">
                                                <cart-control :detail="item"
                                                              @cartAdd="cartAdd"
                                                              @cartDecrease="cartDecrease"
                                                              v-if="group.status===1"
                                                ></cart-control>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-show="hasNoResult" class="no-result-wrapper">
                            <no-result title="抱歉，暂无结果"></no-result>
                        </div>
                        <load-more tip="努力加载中" v-if="loading"></load-more>
                    </scroll>
                </div>
            </div>
            <shop-cart
                    ref="shopCart"
                    v-if="group.status === 1"
                    :min-price="totalFreight"
                    :select-details="selectDetails"
                    @cartAdd="shopCartAdd"
                    @cartDecrease="shopCartDecrease"
                    @toPath="toPath(`/groupShop/${group.id}/cart/${cart.id}`)"
            >
            </shop-cart>
            <confirm ref="confirm" @confirm="toPath(`/user/entry`)"/>
            <toast ref="toast"></toast>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
