import {mapGetters, mapActions} from 'vuex';

export const CommonMixin = {
    computed: {
        ...mapGetters([
            'currentInfo',
            'updateInfo'
        ])
    },
    methods: {
        ...mapActions([
            'focusEncy',
            'setUpdateInfo'
        ]),
        mapLevel(levelCode) {
            const levelCodeMap = {
                'ry': 1,
                'yb': 3,
                'kn': 5
            };

            return levelCodeMap[levelCode];
        },
        mapDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
            const day = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : (date.getDate() + 1);
            return `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
        userHasLogin() {
            return !!localStorage.getItem('auth');
        },
        async handleFocusEncy(ency) {
            if (this.userHasLogin()) {
                try {
                    await this.focusEncy({
                        materialId: ency.id
                    });
                } catch (e) {
                    console.log(e);
                } finally {
                    this.$set(ency, 'isFocused', !ency.isFocused);
                    this.setUpdateInfo(Object.assign({}, this.updateInfo, {
                        encyFocus: true
                    }));
                }
            }
        }
    }
};

export const PathMixin = {
    methods: {
        back() {
            this.$router.back();
        },
        toPath(path) {
            this.$router.push({path});
        },
        toUrl(url) {
            window.location.href = url;
        }
    }
};
