<template>
    <div class="tweet-media-type-animated-gif">
        <video class="animated-gif" preload="auto" loop muted autoplay>
            <source :src="videoPath" type="video/mp4">
        </video>
    </div>
</template>

<script>
    export default {
        name: "TweetMediaTypeAnimatedGif",
        props: {
            videoPath: {type: String},
            sizes: {type: Object}
        }
    };
</script>

<style scoped lang="less">
    .tweet-media-type-animated-gif {
        border-radius: 1rem;
        overflow: hidden;
        margin: 1rem 0;
        .animated-gif {
            width: 100%;
            height: 16rem;
            background-color: black;
            transform: rotate(0deg) scale(1.005);
        }
    }
</style>
