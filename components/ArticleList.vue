<template>
  <div class="container">
    <article-list-content
      v-for="post in posts"
      :key="post.fields.slug"
      :post="post"/> 
  </div>
</template>

<script>
import ArticleListContent from '~/components/ArticleListContent.vue'

export default {
  components: {
    ArticleListContent
  },
  props: ['posts']
}
</script>