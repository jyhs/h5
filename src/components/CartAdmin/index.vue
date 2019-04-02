<template>
    <transition name="slide">
        <div class="cart-admin-container">
            <m-header :title="group.name"></m-header>
            <scroll class="content-wrapper" :data="detailsInCart">
                <div>
                    <ul class="block">
                        <li class="block-content m-b-10" v-for="item in detailsInCart" :key="item.id">
                            <div class="img-container">
                                <img v-lazy="item.encyImage" alt="生物图片">
                            </div>
                            <div class="info">
                                <div class="info-seg">
                                    <span class="name f14">{{item.name}}<span class="size f12">{{item.size}}</span></span>
                                    <span @click.stop="deleteDetail(item)">
                                        <span class="el-icon-coral-trash f18"></span>
                                    </span>
                                </div>
                                <div class="info-seg">
                                    <span class="price f14">￥{{item.price}}</span>
                                    <cart-control
                                            :detail="item"
                                            :max="item.max"
                                            @cartAdd="cartAdd"
                                            @cartDecrease="cartDecrease"
                                            v-if="group.current_step !== 0"
                                    ></cart-control>
                                    <span class="count f14" v-else>x {{item.count}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="margin-bottom: 10px;" v-if="!loading">
                        <group v-if="cart.description && cart.description.trim()">
                            <x-textarea
                                    :max="200"
                                    name="description"
                                    placeholder="备注"
                                    v-model="cart.description"
                                    :readonly="true"
                            >
                            </x-textarea>
                        </group>
                    </div>
                </div>
                <load-more tip="努力加载中" v-if="loading"></load-more>
            </scroll>
            <confirm ref="confirm" @confirm="confirmDelete"></confirm>
            <loading ref="loading"></loading>
            <toast ref="toast"></toast>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
