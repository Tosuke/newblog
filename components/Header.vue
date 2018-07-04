<template>
  <header>
    <section class="hero is-info is-small is-bold">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-menu">
              <div class="navbar-end">
                <span class="navbar-item">
                  <a class="button is-info is-inverted" href="/feed/atom.xml" target="_blank">
                    <span class="icon">
                      <icon name="rss"/>
                    </span>
                    <span>Subscribe</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
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
import 'vue-awesome/icons/rss'
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Icon
  },
  data() {
    return {
      title: process.env.TITLE,
      subtitle: process.env.SUBTITLE
    }
  }
}
</script>

