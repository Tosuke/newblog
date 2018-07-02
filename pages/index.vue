<template>
  <section class="section">
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
  async asyncData() {
    const { items } = await client.getEntries(defaultPostQuery)

    return {
      posts: items
    }
  },
  head() {
    return {
      titleTemplate: '%s'
    }
  }
}
</script>
