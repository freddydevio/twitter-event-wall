<template>
    <div class="tweet-media-type-image">
        <div class="image" :style="'background-image: url(' + imagePath + ')'"></div>
    </div>
</template>

<script>
    export default {
        name: "TweetMediaTypeImage",
        props: {
            imagePath: {type: String},
            sizes: {type: Object}
        }
    };
</script>

<style scoped lang="less">
    .tweet-media-type-image {
        border-radius: 1rem;
        overflow: hidden;
        margin: 1rem 0;
        .image {
            width: 100%;
            height: 16rem;
            background-size: cover;
            background-position: center center;
        }
    }
</style>
