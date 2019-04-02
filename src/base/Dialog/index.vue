<template>
    <transition name="dialog-fade">
        <div class="dialog" v-show="showFlag" @click.stop="touchMask">
            <div class="dialog-wrapper">
                <span class="icon el-icon-coral-delete" v-show="closable" @click.stop="hide"></span>
                <div class="dialog-content" @click.stop>
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
