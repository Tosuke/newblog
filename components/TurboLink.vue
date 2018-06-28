<template>
  <router-link :to="to" @mouseover.native="preload">
    <slot/>
  </router-link>
</template>

<script>
import { preload } from '~/plugins/contentCache'

export default {
  props: ['to'],
  methods: {
    preload() {
      const url = this.to

      const slugRegexp = /\/posts\/([^\/]+)$/
      if (slugRegexp.test(url)) {
        const slug = slugRegexp.exec(url)[1]
        preload(slug)
        return
      }
    }
  }
}
</script>

