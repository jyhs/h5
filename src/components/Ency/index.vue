<template>
    <div class="ency">
        <scroll class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in categories"
                    class="menu-item f14"
                    :class="{active: menuIndex.includes(index)}"
                    :key="index"
                >
                    <div class="title border-1px" @click="selectMenu(index)">
                        {{item.name}}
                        <span class="el-icon-coral-packup" v-if="menuIndex.includes(index)"></span>
                        <span class="el-icon-coral-unfold" v-else></span>
                    </div>
                    <transition name="fold">
                        <ul class="sub-menu-wrapper"
                            v-show="menuIndex.includes(index)"
                            @click="selectType($event, index)"
                        >
                            <li class="sub-menu-item f12"
                                :class="{current: type.code===activeType}"
                                v-for="(type, i) in item.types"
                                :key="i"
                                :data-code="type.code"
                                :id="type.code"
                            >
                                <span :data-code="type.code">{{type.name}}</span>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </scroll>
        <scroll class="details-wrapper" :probeType="3" ref="detailsWrapper">
            <ul>
                <li class="block-content"
                    v-for="item in encyList" :key="item.id"
                    @click="toPath(`/ency/${item.id}/detail`)"
                >
                    <div class="content-main ency-content-main">
                        <div class="pic">
                            <img v-lazy="item.encyImage"/>
                        </div>
                        <div class="info">
                            <div class="name-price">
                                <span class="ency-name f15">{{item.name}}</span>
                                <span class="ency-price">
                                    <span class="price-title f12"></span><span class="price-text f12">
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
                                    <!--
                                    <div class="action" @click.stop="showShareTypePicker(item)">
                                        <icon class="el-icon-coral-share f12"></icon>
                                        <img src="../../../assets/others/share.svg" alt="生物分享"/>
                                        <span class="f12">分享</span>
                                    </div>
                                    <div class="action" @click.stop="toComment(item)">
                                        <icon class="el-icon-coral-message f12"></icon>
                                        <img src="../../../assets/others/comm.svg" alt="生物评论"/>
                                        <span class="f12">评论(222)</span>
                                    </div>
                                    -->
                                    <div class="action" @click.stop="handleFocusEncy(item)">
                                        <span class="el-icon-coral-like_fill f16" :class="{focused: item.isFocused}"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <load-more tip="努力加载中" v-if="loading"></load-more>
            <div v-show="!loading && !encyList.length" style="margin-top: 100px;">
                <no-result title="抱歉，暂无结果"></no-result>
            </div>
            <router-view></router-view>
        </scroll>
        <confirm ref="confirm" @confirm="toPath('/user/entry')"></confirm>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
