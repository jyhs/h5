<template>
    <div class="search-list" v-show="searches.length">
        <transition-group name="list" tag="ul">
            <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
                <span class="text f12">{{item}}</span>
                <span class="icon" @click.stop="deleteOne(item)">
                    <i class="el-icon-coral-trash f16"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
