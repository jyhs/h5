<template>
    <div class="ency-list">
        <div class="block-content"
             v-for="item in data"
             :key="item.id"
             @click="toPath(`/ency/{item.id}`)"
        >
            <div class="content-main ency-content-main">
                <div class="pic">
                    <img v-lazy="item.encyImage" alt="生物图片">
                </div>
                <div class="info">
                    <div class="name-price">
                        <span class="ency-name f15">{{item.name}}</span>
                        <span class="ency-price">
                            <span class="price-title f12"></span><span class="price-text f12">￥{{item.price}}</span>
                        </span>
                    </div>
                    <div class="tags">
                        <div class="tag" v-for="i in item.tag.trim().split(',')" :key="i">
                            <span class="f10">{{i}}</span>
                        </div>
                    </div>
                    <div class="others">
                        <div class="actions">
                            <div class="action" @click.stop="handleFocusEncy(item)">
                                <span class="el-icon-coral-like_fill f16"
                                      :class="{focused: item.isFocused}"
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
