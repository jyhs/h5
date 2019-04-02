<template>
    <div class="my-step-item" :class="{'my-step-item-with-tail': !currentStepLast}">
        <div :class="'my-step-item-tail ' + 'my-step-item-tail-' + currentStatus" v-show="!currentStepLast"
             :style="{right: $parent.gutter}"></div>
        <div :class="'my-step-item-head ' + 'my-step-item-head-' + currentStatus">
            <div class="my-step-item-head-inner">
                <span v-if="!icon && currentStatus !== 'finish'" class="my-step-item-icon">{{currentStepNumber}}</span>
                <span v-else :class="'my-step-item-icon ' + 'my-step-item-' + iconName">
                    <icon type="success_no_circle" class="my-step-item-checked"></icon>
                </span>
            </div>
            <div class="my-step-item-title">{{title}}</div>
        </div>
        <div :class="'my-step-item-main ' + 'my-step-item-main-' + currentStatus"></div>
    </div>
</template>
<script>
    import {Icon} from 'vux';

    export default {
        name: 'MyStepItem',
        components: {
            Icon
        },
        props: {
            title: String,
            description: String,
            stepNumber: Number,
            stepLast: Boolean,
            icon: String,
            status: String,
            tailWidth: Object
        },
        computed: {
            iconName() {
                return this.icon || 'check';
            }
        },
        created() {
            this.currentStatus = this.status;
            this.currentStepLast = this.stepLast;
            this.currentStepNumber = this.stepNumber;
        },
        data() {
            return {
                currentStatus: '',
                currentStepLast: false,
                currentStepNumber: 0
            }
        }
    }
</script>
