<template>
    <scroll ref="suggest" class="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll"
            @scrollToEnd="searchMore" @beforeScroll="listScroll"
    >
        <ul class="suggest-list">
            <li @click="selectItem(item)"
                class="suggest-item border-1px"
                v-for="(item, index) in result"
                :key="index"
            >
                <div class="type f12">
                    <span class="el-icon-coral-picture"></span>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
                <div class="tags f12" v-if="item.tag">
                    <span class="tag" v-for="(tag, index) in item.tag.split(',').slice(0, 2)" :key="index">
                        {{tag}}
                    </span>
                </div>
            </li>
        </ul>
        <div v-show="result && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
