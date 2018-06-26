<template>
  <section class="section container">
    <h1 class="title">"{{ name }}"の検索結果</h1>
    <article-list :posts="posts"/>
  </section>
</template>

<script>
import ArticleList from '~/components/ArticleList.vue'
import client, { defaultPostQuery } from '~/plugins/contentful'

export default {
  components: {
    ArticleList
  },
  async asyncData({ params }) {
    const { items } = await client.getEntries({
      ...defaultPostQuery,
      'fields.tags[in]': params.tag
    })

    return {
      posts: items
    }
  },
  data() {
    return {
      name: this.$route.params.tag
    }
  }
}
</script>

