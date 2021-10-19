//1.插件：挂载$store
//2.实现store

let Vue;
class Store {
    constructor(options) {
        //data响应式处理

        this._mutations = options.mutations;
        this._actions = options.actions;
        this._wrapperGetters = options.getters;
        //定义computed选项
        const computed = {};
        this.getters = {};
        const store = this;
        Object.keys(this._wrapperGetters).forEach(key => {
                //获取用户定义的getter;
                const fn = store._wrapperGetters[key];
                //转换为computed
                computed[key] = function() {
                    return fn(store.state);
                };
                //为getters定义只读属性
                Object.defineProperty(store.getters, key, {
                    get: () => store._vm[key]
                })
            })
            /*
            TypeError: Cannot read properties of undefined (reading '_mutations')" 需要一下代码确保this的指向*/
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this._vm = new Vue({
            data: {
                $$state: options.state,
            },
            computed
        });
        // this.getters Object.defineProperty()提示 getters响应式
    };
    get state() {
        return this._vm._data.$$state; //防止通过实例直接修改state
    };
    set state(v) {
        console.error('please use replaceState to reset state');
    };
    commit(type, payload) {
        const entry = this._mutations[type];
        if (!entry) {
            console.error('unknown mutation type');
        };
        entry(this.state, payload);
    };
    dispatch(type, payload) {
        const entry = this._actions[type];
        if (!entry) {
            console.error('unknown mutation type');
        };
        entry(this, payload);
    }
};

function install(_vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
};
export default {
    Store,
    install
}