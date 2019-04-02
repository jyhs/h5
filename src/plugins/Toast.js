import objectAssign from 'object-assign'
import ToastComponent from '../base/Toast/index';
import {mergeOptions} from '../common/util/object';

let $vm;
let watcher;

const plugin = {
    install(vue, pluginOptions = {}) {
        const Toast = vue.extend(ToastComponent);

        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }

        const defaults = {};
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default;
            }
        }

        const toast = {
            show(options = {}) {
                // destroy watcher
                watcher && watcher();
                if (typeof options === 'string') {
                    mergeOptions($vm, objectAssign({}, pluginOptions));
                } else if (typeof options === 'object') {
                    mergeOptions($vm, objectAssign({}, pluginOptions, options));
                }
                if ((typeof options === 'object' && options.onShow) || options.onHide) {
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm);
                        val === false && options.onHide && options.onHide($vm);
                    });
                }
                $vm.show(options);
            },
            hide() {
                $vm.showFlag = false;
            },
            isVisible() {
                return $vm.showFlag;
            }
        };

        // all Vux's plugins are included in this.$vux
        if (!vue.$vux) {
            vue.$vux = {
                toast
            }
        } else {
            vue.$vux.toast = toast;
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
