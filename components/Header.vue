<template>
  <header>
    <section class="hero is-info is-medium is-bold">
      <div class="hero-body">
          <div class="container has-text-centered">
            <nuxt-link to="/">
              <h1 class="title">{{ title }}</h1>
            </nuxt-link>
            <h2 class="subtitle">{{ subtitle }}</h2>
          </div>
     </div>
    </section>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: process.env.TITLE,
      subtitle: process.env.SUBTITLE
    }
  }
}
</script>

