<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox"
                        @query="onQueryChange"
                        @focus="onSearchFocus"
                        @blur="onSearchBlur"
            ></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="searchHistory">
                <div class="search-history">
                    <h1 class="title f14">
                        <span class="text" v-if="searchHistory.length">搜索历史</span>
                        <span @click="showConfirm" class="clear" v-if="searchHistory.length">
                            <span class="el-icon-coral-trash f16"></span>
                        </span>
                    </h1>
                    <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
                </div>
                <div class="no-result-wrapper" v-if="showNoResult">
                    <no-result title="暂无搜索历史"></no-result>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest @listScroll="blurInput" @select="saveSearch" ref="suggest" :query="query"></suggest>
        </div>
        <confirm ref="confirm" @confirm="confirmDelete"></confirm>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style lang="stylus" src="./style.styl"></style>
