<template>
    <div id="app">
        <h1 v-text="title"></h1>
        <input  v-model="newItem"
                v-on:keyup.enter="addNew">
        <ul>
            <li v-for="item in items"
                v-bind:class="{finished: item.isFinished}"
                v-on:click="toggleFinish(item)">
                {{item.label}}
            </li>
        </ul>
        <component-a msgfromfather='you die!'
        v-on:child-tell-me-something='listToMyBoy'></component-a>
        <p>Child tells me: {{childWords}}</p>
    </div>
</template>

<script>
import Store from './store'
import ComponentA from './components/componentA'
export default {
    data: function () {
        return {
            title: 'a todo list',
            items: Store.fetch(),
            newItem: '',
            childWords: ''
        }
    },
    components: {ComponentA},
    watch: {
        items: {
            handler: function (items) {
                Store.save(items)
            },
            deep: true
        }
    },
    methods: {
        toggleFinish: function (item) {
            item.isFinished = !item.isFinished
        },
        addNew: function () {
            this.items.push({
                label: this.newItem,
                isFinished: false
            })
            this.newItem = ''
        },
        listToMyBoy: function (msg) {
            this.childWords = msg;
        }
    }
}
</script>

<style>
li{
    cursor: pointer;
}
.finished {
    text-decoration: underline;
}
html {
    height: 100%;
}
body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
