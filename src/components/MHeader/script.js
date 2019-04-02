import {CommonMixin} from '../../common/mixin';
import {AvatarBasePath} from '../../constants';

export default {
    mixins: [CommonMixin],
    data() {
        return {
            avatarImgPath: ''
        }
    },
    created() {
        const userId = this.currentInfo.userId;
        if (userId) {
            this.avatarImgPath = `${AvatarBasePath}?userId=${userId}&r=${Math.random()}`;
        } else {
            this.avatarImgPath = '';
        }
    },
    watch: {
        currentInfo(newVal) {
            const userId = newVal.userId;
            if (userId) {
                this.avatarImgPath = `${AvatarBasePath}?userId=${userId}&r=${Math.random()}`;
            } else {
                this.avatarImgPath = '';
            }
        }
    }
}
