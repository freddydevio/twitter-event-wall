<template>
    <div class="scroll-animation"></div>
</template>

<script>
    export default {
        name: "ScrollAnimation",
        mounted() {
            this.initInterval();
        },
        methods: {
            initInterval() {
                setInterval(() => {
                    this.scrollDown();
                    setInterval(() => {
                        this.scrollUp();
                    }, this.timeout);
                }, this.timeout);
            },
            scrollUp() {
                window.scroll({
                    left: 0,
                    top: 0,
                    behavior: 'smooth'
                });
            },
            scrollDown() {
                window.scroll({
                    left: 0,
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        },
        props: {
            timeout: Number,
        }
    };
</script>

<style scoped lang="less">
    .scroll-animation {
    }
</style>
