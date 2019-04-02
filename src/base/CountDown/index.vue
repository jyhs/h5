<template>
    <div>
        <span v-if="showInitContent">{{initContent}}</span>
        <span v-if="showCountDown">{{time}}秒后获取</span>
        <span v-if="showAfterContent">{{afterContent}}</span>
    </div>
</template>
<script type="text/ecmascript-6" src="./script.js"></script>
