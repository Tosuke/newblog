<template>
  <div class="container">
    <template v-for="post in posts">
      <div :key="post.sys.id" class="card article">
        <div class="card-content">
          <div class="container">
            <nuxt-link :to="`/posts/${post.fields.slug}`">
              <h1 class="card-header-title title">{{ post.fields.title }}</h1>
            </nuxt-link>
            <Tag v-for="tag in post.fields.tags" :key="tag" :name="tag"/>
            <div class="content">
              <p class="subtitle">{{ post.fields.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Tag from '~/components/Tag.vue'

export default {
  components: {
    Tag
  },
  props: ['posts']
}
</script>

<style scoped>
.article {
  margin: 3rem 0;
}
</style>