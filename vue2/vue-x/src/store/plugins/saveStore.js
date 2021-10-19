const saveStore = store => {
    if (localStorage.state) {
        console.log(1)
        console.log(localStorage.state)
        store.replaceState(JSON.parse(localStorage.state))
    } else {
        console.log(2)
    };
    store.subscribe(({ type, payload }, state) => {
        console.log(3)
        console.log(state)
        localStorage.state = JSON.stringify(state)
    })
}
export default saveStore;