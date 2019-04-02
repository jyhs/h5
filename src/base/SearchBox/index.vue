<template>
    <div class="search-box">
        <i class="el-icon-coral-search"></i>
        <input ref="query"
               v-model="query"
               class="box"
               :placeholder="placeholder"
               @focus="onFocus"
               @blur="onBlur"
        />
        <span @click="clear" v-show="query" class="el-icon-coral-close"></span>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
