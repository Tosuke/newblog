<template>
  <div class="columns">
    <div class="column">
      <a class="button is-info" target="_blank" rel="noreferrer noopener" :href="twitter">
        <span class="icon">
          <icon name="brands/twitter"/>
        </span>
      </a>
      <a class="button is-info" target="_blank" rel="noreferrer noopener" :href="mastodon">
        <span class="icon">
          <icon name="brands/mastodon"/>
        </span>
      </a>
      <span v-if="webshareIsAvailable" class="button is-info" @click="webshare">
        <span class="icon">
          <icon name="share-alt"/>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/brands/twitter'
import 'vue-awesome/icons/brands/mastodon'
import 'vue-awesome/icons/share-alt'

export default {
  components: {
    Icon
  },
  props: ['title', 'url'],
  computed: {
    text() {
      return `${this.title} - ${this.url}`
    },
    twitter() {
      const text = encodeURIComponent(this.title)
      const url = encodeURIComponent(this.url)
      return `https://twitter.com/share?text=${text}&url=${url}`
    },
    mastodon() {
      const text = encodeURIComponent(this.text)
      return `https://mastportal.info/intent?text=${text}`
    },
    webshareIsAvailable() {
      return !process.server && window.navigator.share !== undefined
    }
  },
  methods: {
    webshare() {
      navigator
        .share({
          title: this.title,
          url: this.url
        })
        .then(console.log.bind(console))
        .catch(console.error.bind(console))
    }
  }
}
</script>
