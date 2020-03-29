<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex vertical">
    <img src="/assets/logo.png" :alt="$t(defaultTitle)" />
  </router-link>
</template>

<script>
import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  data() {
    const storeView = currentStoreView()
    return {
      defaultTitle: storeView.seo.defaultTitle ? storeView.seo.defaultTitle : config.seo.defaultTitle
    }
  }
  //   props: {
  //     width: {
  //       type: [String, Number],
  //       required: true
  //     },
  //     height: {
  //       type: [String, Number],
  //       required: true
  //     }
  //   }
}
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  @media (max-width: 767.98px) {
    padding: 10px 0 0 0;
  }
  @media (max-width: 575.98px) {
    padding: 10px 0;
  }
}
.vertical {
  @media (max-width: 991.98px) {
    vertical-align: -webkit-baseline-middle;
  }
}
</style>
