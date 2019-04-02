import {mapActions} from 'vuex';
import {LoadMore} from 'vux';
import MHeader from '../../base/MHeader/index';
import Scroll from '../../base/Scroll/index';
import Confirm from '../../base/Confirm/index';
import Loading from '../../base/Loading/index';
import Toast from '../../base/Toast/index';
import {CommonMixin, PathMixin} from '../../common/mixin';
import {formatDateTimeParam} from '../../common/util';
import {AvatarBasePath, GroupExcelBasePath} from '../../constants';

export default {
    mixins: [
        CommonMixin,
        PathMixin
    ],
    data() {
        return {
            groups: [],
            loading: true
        };
    },
    components: {
        LoadMore,
        MHeader,
        Scroll,
        Confirm,
        Loading,
        Toast
    },
    created() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getMyGroups',
            'finishGroupById',
            'reopenGroupById',
            'downloadGroupById',
            'setUpdateInfo'
        ]),
        async initData() {
            this.loading = true;
            this.groups = (await this.getMyGroups({
                page: 1,
                size: 1000
            })).data;
            for (let group of this.groups) {
                this.$set(group, 'userAvatar', `${AvatarBasePath}?userId=${group.user_id}`);
            }
            this.loading = false;
        },
        finishGroup(group) {
            this.currentItem = group;
            this.$refs.confirm.show({
                text: '确定结束本团购吗？',
                confirmBtnText: '确定'
            });
        },
        async confirmFinish() {
            this.$refs.loading.show();
            try {
                await this.finishGroupById({
                    groupId: this.currentItem.id
                });
                this.initData();
            } catch (e) {
                console.log(e);
            } finally {
                this.$refs.loading.hide();
            }
        },
        reopenGroup(group) {
            const now = new Date();
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM-DD HH',
                startDate: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
                minHour: now.getHours() + 1,
                onConfirm: async (val) => {
                    this.$refs.loading.show();
                    try {
                        await this.reopenGroupById({
                            groupId: group.id,
                            endDate: formatDateTimeParam(new Date(`${val.replace(/-/g, '/')}:00:00`))
                        });
                        this.setUpdateInfo(Object.assign({}, this.updateInfo, {
                            groupChange: true
                        }));
                        this.initData();
                    } catch (e) {
                        console.log(e);
                    } finally {
                        this.$refs.loading.hide();
                    }
                }
            });
        },
        async handleDownload(group) {
            try {
                const result = await this.downloadGroupById({
                    groupId: group.id
                });

                if (!result.errno) {
                    window.location.href = `${GroupExcelBasePath}${result.name}?${Math.random()}`;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
};
