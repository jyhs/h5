import {mapActions} from 'vuex';
import {XButton, Group, XTextarea} from 'vux';
import MHeader from '../../base/MHeader/index';
import Loading from '../../base/Loading/index';
import Toast from '../../base/Toast/index';
import {CommonMixin} from '../../common/mixin';

export default {
    mixins: [CommonMixin],
    data() {
        return {
            group: {},
            form: {
                name: undefined,
                description: undefined
            },
            editorOption: {
                placeholder: '请输入',
                modules: {
                    toolbar: [
                        [{'color': []}, {'background': []}]
                    ]
                }
            }
        };
    },
    components: {
        XButton,
        Group,
        XTextarea,
        MHeader,
        Loading,
        Toast
    },
    async created() {
        const {id} = this.$route.params;
        this.group = await this.getGroupById({groupId: id});
        this.form.name = this.group.name;
        this.form.description = this.group.description;
    },
    methods: {
        ...mapActions([
            'getGroupById',
            'updateGroup'
        ]),
        async submit() {
            this.$refs.loading.show();
            try {
                await this.updateGroup({
                    groupId: this.group.id,
                    description: this.form.description
                });
                this.$refs.toast.show({
                    text: `编辑成功`
                });
                setTimeout(() => {
                    this.$router.back();
                }, 500);
            } catch (e) {
                console.log(e);
            } finally {
                this.$refs.loading.hide();
            }
        }
    }
};
