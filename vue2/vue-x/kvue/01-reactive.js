//数据响应式
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      console.log("set", newVal);
      if (newVal != val) {
        val = newVal;
      }
    }
  })
}
const obj={};
defineReactive(obj,'foo','foo');
obj.foo;
obj.foo="fooooo";
