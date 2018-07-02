<template>
  <div class="card article">
    <div class="card-content">
      <p class="has-text-grey-dark is-size-5">{{ post.sys.createdAt | formatDate }}</p>
      <turbo-link :to="`/posts/${post.fields.slug}`">
        <h1 class="title">{{ post.fields.title }}</h1>
      </turbo-link>
      <Tag v-for="tag in post.fields.tags"  :key="tag" :name="tag"/>
      <div class="media summary">
        <figure v-if="post.fields.heroImage" class="media-left image hero-image">
          <contentful-image :file="post.fields.heroImage" sizes="6rem"/>
        </figure>
        <div class="media-content content">
          <p class="subtitle">{{ post.fields.summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '~/components/Tag.vue'
import TurboLink from '~/components/TurboLink.vue'
import ContentfulImage from '~/components/ContentfulImage.vue'
import formatDate from '~/plugins/formatDate'

export default {
  components: {
    Tag,
    TurboLink,
    ContentfulImage
  },
  filters: {
    formatDate
  },
  props: ['post'],
}
</script>

<style scoped>
.article {
  margin: 1.5rem 0;
}
.summary {
  margin-top: 1rem;
}
.hero-image {
  width: 6rem;
  height: 6rem;
}
</style>

