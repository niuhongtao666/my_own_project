<template>
<div>
    <h4>hello world-my</h4>
    <!-- <div>{{name}}</div> -->
    <!-- <button type="button" @click='changeState'>改变state</button> -->
</div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'

export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed: mapState('a', {
        name: state => state.name,
    }),
    methods: {
        changeState() {
            this.$store.commit('a/changeState', '修改的stat123e')
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
