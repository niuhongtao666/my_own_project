//数据响应式
function defineReactive(obj, key, val) {
    //递归--解决嵌套属性哦;
    observe(val);
    Object.defineProperty(obj, key, {
        get() {
            // console.log("get", key);
            console.log("val", val);
            return val;
        },
        set(newVal) {
            console.log("set", newVal);
            console.log("set", val);
            if (newVal != val) {
                /*标记点1 
                如果newVal是对象，再次做响应式处理
                obj.baz = {
                  a: 10
                }
                obj.baz.a;*/
                observe(newVal);

                val = newVal;
            }
        }
    })
}
//给多个属性加上响应式
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return false;
    }

    new Observer(obj);
}
//根据传入value的类型做相应的响应式处理
class Observer {
    constructor(value) {
            this.value = value;
            if (Array.isArray(value)) {
                //do
            } else {
                this.walk(value);
            }
        }
        //对象响应式处理
    walk(obj) {
        //遍历obj的所有key.做响应式处理
        Object.keys(obj).forEach((key) => {
            defineReactive(obj, key, obj[key]);
        })
    }
}

/*标记2额外未注册的属性，需要使用$set*/
function set(obj, key, val) {
    defineReactive(obj, key, val)
}
//代理//从而访问数据不用app.$data.counter,而是直接用app.counter；

function Proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key];
            },
            set(v) {
                vm.$data[key] = v;
            }
        })
    })

}


//kvue
//1.对data选项做响应式处理
//2.编译模版
class KVue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;

        //data响应式处理
        observe(this.$data);
        //实现代理
        Proxy(this);
    }
}