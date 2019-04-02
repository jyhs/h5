import objectAssign from 'object-assign';

const mergeOptions = function ($vm, options) {
    const defaults = {};
    for (let i in $vm.$options.props) {
        if (i !== 'value' && $vm.$options.props.hasOwnProperty(i)) {
            defaults[i] = $vm.$options.props[i].default;
        }
    }
    const _options = objectAssign({}, defaults, options);
    for (let i in _options) {
        if (_options.hasOwnProperty(i)) {
            $vm[i] = _options[i];
        }
    }
};

export {
    mergeOptions
}
