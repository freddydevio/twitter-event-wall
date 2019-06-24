<template>
    <div class="twitter-page">
        <span class="loading" v-if="loading">loading...</span>
        <stack :column-min-width="450" :gutter-width="4" :gutter-height="8" v-if="!loading">
            <stack-item style="transition: transform 300ms" v-for="(tweet, i) in twitterPosts" :key="i">
                <Tweet :tweet="tweet"/>
            </stack-item>
        </stack>
        <ScrollAnimation v-if="animationEnabled"
                        :timeout="animationTimeout"/>
    </div>
</template>

<script>
    import {Stack, StackItem} from 'vue-stack-grid';
    import axios from "axios";
    import Tweet from "./Tweet";
    import ScrollAnimation from "./ScrollAnimation";

    export default {
        name: "TwitterWall",
        components: {ScrollAnimation, Tweet, Stack, StackItem},
        mounted() {
            switch (process.env.VUE_APP_TWITTER_WALL_METHOD) {
                case 'search':
                    this.fetchQueryData();
                    break;
                case 'user':
                default:
                    this.fetchUserData();
                    break;
            }
        },
        data() {
            return {
                loading: true,
                twit: null,
                twitterPosts: null,
                animationEnabled: process.env.VUE_APP_SHOW_SCROLL_ANIMATION,
                animationTimeout: process.env.VUE_APP_SCROLL_ANIMATION_TIMEOUT
            };
        },
        methods: {
            fetchUserData() {
                axios
                    .get(`${process.env.VUE_APP_TWITTER_WALL_API }/api/user/timeline?user=${encodeURIComponent(process.env.VUE_APP_TWITTER_WALL_USER)}`)
                    .then(result => {
                        this.twitterPosts = result.data.data;
                        this.loading = false;
                    })
                    .catch(error => console.log(error));
            },
            fetchQueryData() {
                axios
                    .get(`${process.env.VUE_APP_TWITTER_WALL_API}/api/search?query=${encodeURIComponent(process.env.VUE_APP_TWITTER_WALL_HASTAG)}`)
                    .then(result => {
                        this.twitterPosts = result.data.data.statuses;
                        this.loading = false;
                    })
                    .catch(error => console.log(error));
            }
        }
    };
</script>

<style scoped lang="less">
    .twitter-page {
    }
</style>
