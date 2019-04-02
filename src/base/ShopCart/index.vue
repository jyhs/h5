<template>
    <div style="z-index: 300;">
        <div class="shop-cart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{highlight: totalCount > 0}">
                            <i class="el-icon-coral-gouwuche"></i>
                        </div>
                        <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{highlight: totalPrice > 0}">{{totalPrice}}元</div>
                    <div class="desc">另需运费{{minPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="confirm">
                    <div class="pay f18" :class="payClass">{{payDesc}}</div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="(ball, index) in balls" :key="index">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="fold">
                <div class="shop-cart-list" v-show="listShow" ref="shopCartList">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <!--
                        <span class="empty" @click="empty">清空</span>
                        -->
                    </div>
                    <scroll class="list-content" :data="selectDetails" ref="listScroll">
                        <ul>
                            <li class="detail-item" v-for="(detail, index) in selectDetails" :key="index">
                                <span class="name">
                                    <span>{{detail.name}}</span>
                                    <span v-if="detail.size" class="size f12">{{(detail.size)}}</span>
                                    <span class="size f12">￥{{detail.price}}</span>
                                </span>
                                <div class="price">
                                    <span>￥{{detail.price * detail.count}}</span>
                                </div>
                                <div class="cart-control-wrapper">
                                    <cart-control :detail="detail" @cartAdd="cartAdd" @cartDecrease="cartDecrease"></cart-control>
                                </div>
                            </li>
                        </ul>
                    </scroll>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
