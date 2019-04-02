<template>
    <div class="cart-control">
        <transition name="move">
            <div class="cart-decrease" v-show="detail.count > 0" @click.stop.prevent="decreaseCart">
                <i class="inner el-icon-coral-offline"></i>
            </div>
        </transition>
        <div class="cart-count" v-show="detail.count > 0">{{detail.count}}</div>
        <div v-if="(detail.count || 0) < max" class="cart-add el-icon-coral-addition" @click.stop.prevent="addCart($event)"></div>
        <div v-else class="cart-add cart-add-disabled el-icon-coral-addition"></div>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
