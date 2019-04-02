<template>
    <div class="header">
        <span @click="back">
            <i class="el-icon-coral-return f20"></i>
        </span>
        <span class="title f16">{{title}}</span>
        <span class="slot">
            <slot></slot>
        </span>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
