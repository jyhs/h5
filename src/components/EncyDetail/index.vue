<template>
    <transition name="slide">
        <div class="ency-detail-container">
            <m-header :title="ency.name"></m-header>
            <div class="content-wrapper">
                <div @click="showImagePreviewer">
                    <swiper loop auto :list="encyImages"></swiper>
                </div>
                <scroll :data="[ency]">
                    <div class="ency-detail-wrapper">
                        <div class="name f18">
                            <span>{{ency.name}}</span>
                            <span class="el-icon-coral-like_fill f20"
                                  :class="{focused: ency.isFocused}"
                                  @click.stop="handleFocusEncy(ency)"
                            ></span>
                        </div>
                        <div class="tags">
                            <div class="tag" v-for="item in (ency.tag || '').trim().split(',')" :key="item">
                                <span class="f10">{{item}}</span>
                            </div>
                        </div>
                        <div class="more">
                            <div class="item">
                                <span class="title f10">学名：</span><span class="f10">{{ency.sname}}</span>
                            </div>
                            <div class="item">
                                <span class="title f10">饲养难度：</span>
                                <rater :value="mapLevel(ency.level)" :font-size="10" disabled></rater>
                            </div>
                            <div class="item">
                                <span class="title f10">英文名：</span><span class="f10">{{ency.ename}}</span>
                            </div>
                            <div class="item">
                                <span class="title f10">团购指导价：</span><span class="price f10">￥{{ency.price}}</span>
                            </div>
                        </div>
                        <div class="desc f12">
                            <span v-html="ency.description"></span>
                        </div>
                    </div>
                </scroll>
            </div>
            <previewer :list="previewImages" ref="previewer"></previewer>
            <confirm ref="confirm" @confirm="toPath('/user/entry')"></confirm>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
