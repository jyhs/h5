<template>
    <transition name="slide">
        <div class="ency-focused-container">
            <m-header title="关注的生物"></m-header>
            <scroll class="content-wrapper" :data="encyList">
                <ul class="block">
                    <li class="block-content" v-for="item in encyList"
                        :key="item.id"
                        @click="toPath(`/encyFocus/${item.id}`)">
                        <div class="content-main ency-content-main">
                            <div class="pic">
                                <img :src="item.encyImage" alt="生物图片"/>
                            </div>
                            <div class="info">
                                <div class="name-price">
                                    <span class="ency-name f15">{{item.name}}</span>
                                    <span class="ency-price">
                                    <span class="price-title f12">团购指导价:</span><span class="price-text f12">
                                        ￥{{item.price}}
                                    </span>
                                </span>
                                </div>
                                <div class="tags">
                                    <div class="tag" v-for="tag in item.tags" :key="tag">
                                        <span class="f10">{{tag}}</span>
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="diff">
                                        <rater :value="mapLevel(item.level)" :font-size="10" disabled></rater>
                                    </div>
                                    <div class="actions">
                                        <div class="action" @click.stop="handleFocusEncy(item)">
                                            <span class="el-icon-coral-like_fill f16" :class="{focused: item.isFocused}"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-show="!loading && !encyList.length" class="no-result-wrapper">
                    <no-result title="抱歉，暂无结果"></no-result>
                </div>
                <load-more tip="努力加载中" v-if="loading"></load-more>
            </scroll>
            <group>
                <popup-picker
                        :show.sync="showSharePicker"
                        :show-cell="false"
                        confirm-text="确定" :data="shareTypes"
                        :columns="2"
                        @on-change="handleShareTypeChange"
                        @on-hide="handleCloseSharePicker"
                ></popup-picker>
            </group>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </transition>
</template>
<script src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
