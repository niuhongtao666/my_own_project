  function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
      get() {
        console.log('get', val);
        return val;
      },
      set(newVal) {
        if (val != newVal) {
          console.log('set', newVal);
          val = newVal;
        }
      }
    })
  }
  var myObj = {};
  defineReactive(myObj, "name", "wangjie");
  //   console.log(myObj.name);
  myObj.name = 'lisi'
