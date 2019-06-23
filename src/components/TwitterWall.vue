<template>
    <div class="twitter-page">
        <span class="loading" v-if="loading">loading...</span>
        <stack :column-min-width="450" :gutter-width="4" :gutter-height="8" v-if="!loading">
            <stack-item style="transition: transform 300ms" v-for="(post, i) in twitterPosts" :key="i">
                <TwitterWidget :post="post"/>
            </stack-item>
        </stack>
    </div>
</template>

<script>
    import {Stack, StackItem} from 'vue-stack-grid';
    import axios from "axios";
    import TwitterWidget from "./TwitterWidget";

    export default {
        name: "TwitterWall",
        components: {TwitterWidget, Stack, StackItem},
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
                twitterPosts: null
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
