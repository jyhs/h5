import MaskComponent from '../base/Mask/index';

let $vm;

const plugin = {
    install(vue) {
        const Mask = vue.extend(MaskComponent);

        if (!$vm) {
            $vm = new Mask({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }

        const mask = {
            show() {
                $vm && $vm.show();
            },
            hide() {
                $vm && $vm.hide();
            }
        };

        if (!vue.$vux) {
            vue.$vux = {
                mask
            }
        } else {
            vue.$vux.mask = mask;
        }

        vue.mixin({
            created: function () {
                this.$vux = vue.$vux;
            }
        })
    }
};

export default plugin;
export const install = plugin.install;
