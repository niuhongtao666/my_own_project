<template>
<div>
    <h4>comp1</h4>
    <h5>
        count:{{$store.state.counter}}
    </h5>
    <h5> 
        getters:{{$store.getters.myGetter}}
    </h5>
    <button type="button" @click="addVuexCounter">addVuexCounter</button>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'comp1',
    // data(){
    //     return {
    //         arr:[1,2,3],
    //         method:this.addVuexCounter
    //     }
    // },
    data:(vm)=>{
        return {
            arr:[1,2,3],
            method:this.addVuexCounter
        }
    },
    methods: {
        addVuexCounter() {
            // this.$store.commit('add');
            this.$store.dispatch('add');
        }
    },
    mounted(){
        console.log('out_this',this);
        var arr=this.arr;
        arr.forEach(element => {
            console.log('inner_this',this);
        });
        console.log('method',this.method);
    }
}
</script>

<style lang="">
    
</style>
