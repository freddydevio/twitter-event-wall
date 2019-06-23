<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="less">
    #app {
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        padding: 0;
        margin: 0;
        background: rgba(230, 236, 240, 0.2);
    }

    div {
        box-sizing: border-box;
    }
</style>
