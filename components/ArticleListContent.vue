<template>
  <div class="card article">
    <div class="card-content">
      <p class="has-text-grey-dark is-size-5">{{ createdAt }}</p>
      <turbo-link :to="`/posts/${slug}`">
        <h1 class="title">{{ title }}</h1>
      </turbo-link>
      <Tag v-for="tag in tags"  :key="tag" :name="tag"/>
      <div class="media summary">
        <figure v-if="heroImage" class="media-left image hero-image">
          <contentful-image :file="heroImage" sizes="6rem"/>
        </figure>
        <div class="media-content content">
          <p class="subtitle">{{ summary }}</p>
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
  props: ['post'],
  computed: {
    slug() {
      return this.post.fields.slug
    },
    title() {
      return this.post.fields.title
    },
    createdAt() {
      return formatDate(this.post.sys.createdAt)
    },
    tags() {
      return this.post.fields.tags
    },
    heroImage() {
      return this.post.fields.heroImage
    },
    summary() {
      return this.post.fields.summary
    }
  }
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

