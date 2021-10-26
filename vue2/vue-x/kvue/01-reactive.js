//数据响应式
function defineReactive(obj, key, val) {
  //递归--解决嵌套属性哦;
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
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
  //遍历obj的所有key.做响应式处理
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  })
}

/*标记2额外未注册的属性，需要使用$set*/
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: 1
  }
};
/*给单个key设置响应式属性 begin*/
// defineReactive(obj, 'foo', 'foo');
// obj.foo;
// obj.foo = "fooooo";
// console.log('newVal', obj.foo);
/*给单个key设置响应式属性 end*/

observe(obj);


/*标记点1 
obj.baz = {
  a: 10
}
obj.baz.a;*/


// obj.baz.a = 100; //先get baz,之后set a 

//标记2 未注册的属性
// obj.dong = "dong";//不可以用的
// set(obj, 'dong', 'dong');
// obj.dong;
