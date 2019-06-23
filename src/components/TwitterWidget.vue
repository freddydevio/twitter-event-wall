<template>
    <div class="twitter-widget">
        <div class="headline">
            <div class="author">
                <span class="author-name">{{post.user.name}}</span>
                <span class="author-screen-name">@{{ post.user.screen_name }}</span>
            </div>
            <span class="createdAt">{{ twitterTime }}</span>
        </div>
        <div class="hashtags">
            <span class="hashtag" v-for="hashtag in post.entities.hashtags">#{{hashtag.text}}</span>
        </div>
        <span class="text">{{ post.full_text }}</span>
        <div class="image-container" v-if="imageExist">
            <div class="image" :style="'background-image: url(' + getPostedImageUrl + ')'"></div>
        </div>
        <div class="actions">
            <span class="favorite"><i class="fa fa-heart-o" aria-hidden="true"></i>{{ post.favorite_count }}</span>
            <span class="retweeted"><i class="fa fa-retweet" aria-hidden="true"></i>{{ post.retweet_count }}</span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "TwitterWidget",
        mounted() {
        },
        computed: {
            twitterTime() {
                return moment(this.post.created_at).format('DD. MMMM YYYY');
            },
            imageExist() {
                return this.post.extended_entities && this.post.extended_entities.media;
            },
            getPostedImageUrl() {
                if (this.post.extended_entities) {
                    return this.post.extended_entities.media.shift().media_url_https;
                }
            }
        },
        props: ['post']
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
        .image-container {
            margin: 1rem 0;
            overflow: hidden;
            border-radius: 1rem;
            .image {
                width: 100%;
                height: 16rem;
                background-size: cover;
                background-position: center center;
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
