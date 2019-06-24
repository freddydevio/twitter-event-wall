<template>
    <div class="twitter-widget">
        <div class="headline">
            <div class="author">
                <span class="author-name">{{tweet.user.name}}</span>
                <span class="author-screen-name">@{{ tweet.user.screen_name }}</span>
            </div>
            <span class="createdAt">{{ twitterTime }}</span>
        </div>
        <span class="text">{{ tweet.full_text }}</span>
        <div class="media" v-if="tweet.extended_entities">
            <div class="media-item" v-for="(mediaItem, i) in tweet.extended_entities.media">
                <TweetMediaTypeImage v-if="mediaItem.type === 'photo'" :image-path="mediaItem.media_url_https" :sizes="mediaItem.sizes"/>
                <TweetMediaTypeAnimatedGif v-if="mediaItem.type === 'animated_gif'" :video-path="mediaItem.video_info.variants[0].url" :sizes="mediaItem.sizes"/>
            </div>
        </div>
        <div class="hashtags">
            <span class="hashtag" v-for="hashtag in tweet.entities.hashtags">#{{hashtag.text}}</span>
        </div>
        <div class="actions">
            <span class="favorite"><i class="fa fa-heart-o" aria-hidden="true"></i>{{ tweet.favorite_count }}</span>
            <span class="retweeted"><i class="fa fa-retweet" aria-hidden="true"></i>{{ tweet.retweet_count }}</span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import TweetMediaTypeImage from "./tweet/mediaType/Image";
    import TweetMediaTypeAnimatedGif from "./tweet/mediaType/AnimatedGif";

    export default {
        name: "Tweet",
        components: {TweetMediaTypeAnimatedGif, TweetMediaTypeImage},
        mounted() {
        },
        computed: {
            twitterTime() {
                return moment(this.tweet.created_at).format('DD. MMMM YYYY');
            },
        },
        props: {
            'tweet': {type: Object}
        }
    };
</script>

<style scoped lang="less">
    .twitter-widget {
        border-radius: 1rem;
        margin: 1rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 3rem -0.5rem rgba(0, 0, 0, 0.1);
        background: white;
        .headline {
            display: flex;
            flex-direction: row;
            .author {
                .author-name {
                    font-weight: bold;
                    margin-right: .5rem;
                }
                .author-screen-name {
                    color: rgba(0,0,0,.5);
                }
            }
            .createdAt {
                margin-left: .5rem;
                color: rgba(0,0,0,.5);
            }
        }
        .hashtags {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .hashtag {
                font-size: .85rem;
                margin: .25rem .5rem .25rem 0;
            }
        }
        .media {
            margin: .25rem 0;
            .media-item {
                margin: .5rem 0;
            }
        }
        .actions {
            margin-top: 1rem;
            .favorite,
            .retweeted {
                margin-right: 1rem;
            }
            .favorite .fa,
            .retweeted .fa {
                margin-right: .25rem;
            }

            .favorite .fa {
                font-weight: bolder;
            }
        }
    }
</style>
