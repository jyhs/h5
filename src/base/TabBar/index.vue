<template>
    <div class="tab-bar">
        <router-link tag="div" class="tab-item" to="/home">
            <span class="tab-link">首页</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/ency">
            <span class="tab-link">百科</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/group">
            <span class="tab-link">团购</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/mine">
            <span class="tab-link">我的</span>
        </router-link>
    </div>
</template>
<style scoped lang="stylus" src="./style.styl"></style>
