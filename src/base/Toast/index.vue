<template>
    <transition name="toast-fade">
        <div class="toast" v-show="showFlag" @click.stop>
            <div class="toast-wrapper">
                <div class="toast-content">
                    <span :class="typeIcon"></span>
                    <span class="text">{{text}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
<style scoped lang="stylus" src="./style.styl"></style>
