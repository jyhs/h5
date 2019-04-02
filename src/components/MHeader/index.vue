<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">礁岩海水</h1>
        <router-link tag="div" class="mine" to="/mine">
            <img :src="avatarImgPath" alt="avatar" v-if="avatarImgPath"/>
            <span class="el-icon-coral-mine" v-else></span>
        </router-link>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
