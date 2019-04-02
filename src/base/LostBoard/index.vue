<template>
    <div>
        <transition name="fold">
            <div class="lost-board" v-show="listShow" ref="shopCartList">
                <div class="list-header">
                    <h2 class="title">{{title}}</h2>
                </div>
                <scroll class="list-content" :data="details" ref="listScroll">
                    <ul>
                        <li class="detail-item" v-for="(detail, index) in details" :key="index">
                            <span class="name">
                                <span>{{detail.name}}</span>
                                <span v-if="detail.size" class="size f12">{{(detail.size)}}</span>
                                <span class="size f12">￥{{detail.price}}</span>
                            </span>
                            <div class="price">
                                <span>￥{{detail.price * detail.count}}</span>
                            </div>
                            <div class="cart-control-wrapper">
                                <cart-control
                                        :detail="detail"
                                        :max="detail.max"
                                        @cartAdd="cartAdd"
                                        @cartDecrease="cartDecrease"
                                ></cart-control>
                            </div>
                        </li>
                    </ul>
                </scroll>
            </div>
        </transition>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
