let Vue; //保存Vue构造函数，插件中要使用
class VueRouter {
    constructor(options) {
        this.$options = options;
        //把current作为响应式数据
        //将来发生变化，router-view 的render函数可以再次执行
        this.current = window.location.hash.slice(1) || '/';
        // this.current = '/';
        // const initial = window.location.hash.slice(1) || '/';
        // Vue.util.defineReactive(this, 'current', initial) //单层的时候使用
        //定义响应式的matched数组
        Vue.util.defineReactive(this, 'matched', []);
        //match方法可以递归遍历路由表，获得匹配关系的数组
        this.match();


        //监控hash变化
        window.addEventListener('hashchange', () => {
            console.log('this.current', this.current)
                // console.log('window.location.hash', window.location.hash);
            this.current = window.location.hash.slice(1) || '/';
            this.matched = [];
            this.match();
        })
    }
    match(routes) {
        console.log('执行');
        routes = routes || this.$options.routes;
        //递归遍历路由表
        for (let route of routes) {
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route);
                continue;
            };
            //例如/about/info
            if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
                this.matched.push(route);
                if (route.children) {
                    this.match(route.children);
                }
                continue;
            }
        }
    }
}
//参数1是Vue.use调用时传入的
VueRouter.install = function(_Vue) {
    Vue = _Vue;

    //任务1.挂载$router属性 this.$router
    //全局混入的目的：延迟下面的逻辑到router实例创建完毕并附加到选项上时才执行
    Vue.mixin({
            //此钩子在每个组件创建实例时都会调用
            beforeCreate() {
                //只要根实例才有这个选项
                if (this.$options.router) {
                    Vue.prototype.$router = this.$options.router;
                }
            }
        })
        //任务2:注册实现两个组件router-link router-view
    Vue.component('router-link', {
        //接受传过来的to属性
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            //打算使用hash模式，所以加了'#',页面不再刷新
            return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
                //第二种方式 JSX写法，需要环境支持才行
                // return <a href = { '#' + this.to } > { this.$slots.default } < /a>
        },
    })
    Vue.component('router-view', {
        render(h) {
            //1.标记当前router-view的深度
            this.$vnode.data.routerView = true;
            let depth = 0;
            let parent = this.$parent;
            while (parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data;
                if (vnodeData) {
                    if (vnodeData.routerView) {
                        //说明当前parent是一个router-view
                        depth++;
                    }
                }
                parent = parent.$parent;
            };
            //2.路由匹配时获取代表深度层级的matched数组




            let component = null;
            console.log('this.$router.current', this.$router.current);
            //获取当前路由对应的组件
            // 单个不嵌套const route = this.$router.$options.routes.find((route) => route.path == this.$router.current);
            // const route = this.$router.$options.routes.find((route) => route.path == this.$router.current);
            console.log('matched', this.$router.matched);
            const route = this.$router.matched[depth];

            if (route) {
                component = route.component;
            }
            return h(component)
        },
    })
}
export default VueRouter;