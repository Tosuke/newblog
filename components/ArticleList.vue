<template>
  <div class="container">
    <template v-for="post in posts">
      <div :key="post.sys.id" class="card article">
        <div class="card-content">
          <div class="container">
            <turbo-link :to="`/posts/${post.fields.slug}`">
              <h1 class="card-header-title title">{{ post.fields.title }}</h1>
            </turbo-link>
            <Tag v-for="tag in post.fields.tags" :key="tag" :name="tag"/>
            <div class="content">
              <p class="subtitle">{{ post.fields.summary }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Tag from '~/components/Tag.vue'
import TurboLink from '~/components/TurboLink.vue'

export default {
  components: {
    Tag,
    TurboLink
  },
  props: ['posts']
}
</script>

<style scoped>
.article {
  margin: 3rem 0;
}
</style>