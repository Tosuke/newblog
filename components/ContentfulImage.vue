<template>
  <picture>
    <source type="image/webp" :srcset="webpSrcSet" :sizes="sizes"/>
    <source :type="contentType" :srcset="originalSrcSet" :sizes="sizes"/>
    <img :src="url"/>
  </picture>
</template>

<script>
export default {
  props: ['file', 'sizes'],
  computed: {
    url() {
      return this.file.fields.file.url
    },
    contentType() {
      return this.file.fields.file.contentType
    },
    srcList() {
      let { width, height } = this.file.fields.file.details.image
      let list = []
      while(width >= 64 && height >= 64) {
        list.push(Math.floor(width))
        width /= 2
        height /= 2
      }
      return list
    },
    originalSrcSet() {
      const url = this.url
      return this.srcList.map(w => `${url}?w=${w} ${w}w`).join(',')
    },
    webpSrcSet() {
      const url = this.url
      return this.srcList.map(w => `${url}?fm=webp&w=${w} ${w}w`).join(',')
    }
  }
}
</script>

