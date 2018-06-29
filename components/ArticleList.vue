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
            <div class="media">
              <figure v-if="post.fields.heroImage" class="media-left image square">
                <contentful-image :file="post.fields.heroImage" sizes="6rem"/>
              </figure>
              <div class="media-content content">
                <p class="subtitle">{{ post.fields.summary }}</p>
              </div>
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
import ContentfulImage from '~/components/ContentfulImage.vue'

export default {
  components: {
    Tag,
    TurboLink,
    ContentfulImage
  },
  props: ['posts']
}
</script>

<style scoped>
.article {
  margin: 3rem 0;
}
.square {
  width: 6rem;
  height: 6rem;
}
</style>