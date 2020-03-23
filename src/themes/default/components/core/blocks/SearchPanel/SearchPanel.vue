<template>
  <div class="searchpanel mw-100 bg-cl-primary cl-accent" data-testid="searchPanel">
    <!-- <div class="close-icon-row">
      <i class="material-icons pointer cl-accent close-icon" @click="closeSearchpanel" data-testid="closeSearchPanel">
        close
      </i>
    </div> -->
    <div class="container">
      <div class="row">
        <div class="search__position">
          <label for="search" class="visually-hidden">
            {{ $t('Search') }}
          </label>
          <div class="search-input-group">
            <i class="fas fa-search search-icon" />
            <input
              ref="search"
              id="search"
              v-model="search"
              @keyup.enter="
                showSearchContent()
                makeSearch()
              "
              @blur="$v.search.$touch()"
              class="search-panel-input"
              :placeholder="$t('Zoek in het assortiment')"
              type="search"
            />
            <button
              class="search-panel-button"
              @click="
                showSearchContent()
                makeSearch()
              "
            >
              Zoeken
            </button>
          </div>
        </div>
      </div>
      <div class="search-content" :class="{ hidden: isHidden }">
        <div class="close-icon-row">
          <span class="awesome__close" @click="toggleSearchContent">
            <i class="fas fa-times pointer" />
          </span>
        </div>
        <div v-if="visibleProducts.length && categories.length > 1" class="categories">
          <category-panel :categories="categories" v-model="selectedCategoryIds" />
        </div>
        <div class="product-listing row">
          <product-tile
            v-for="product in visibleProducts"
            :key="product.id"
            :product="product"
            @click.native="closeSearchpanel"
          />
          <transition name="fade">
            <div v-if="getNoResultsMessage" class="no-results relative center-xs h4 col-md-12">
              {{ $t(getNoResultsMessage) }}
            </div>
          </transition>
        </div>
        <div v-show="OnlineOnly" v-if="visibleProducts.length >= 18" class="buttons-set align-center py35 mt20 px40">
          <button
            @click="seeMore"
            v-if="readMore"
            class="no-outline brdr-none py15 px20 bg-cl-mine-shaft :bg-cl-th-secondary cl-white fs-medium-small"
            type="button"
          >
            {{ $t('Load more') }}
          </button>
          <button
            @click="toggleSearchContent"
            class="no-outline brdr-none p15 fs-medium-small close-button"
            type="button"
          >
            {{ $t('Close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import ProductTile from 'theme/components/core/ProductTile'
import VueOfflineMixin from 'vue-offline/mixin'
import CategoryPanel from 'theme/components/core/blocks/Category/CategoryPanel'
import { minLength } from 'vuelidate/lib/validators'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  components: {
    ProductTile,
    CategoryPanel
  },
  mixins: [SearchPanel, VueOfflineMixin],
  validations: {
    search: {
      minLength: minLength(3)
    }
  },
  data() {
    return {
      selectedCategoryIds: [],
      isHidden: true
    }
  },
  methods: {
    toggleSearchContent() {
      this.isHidden = !this.isHidden
    },
    showSearchContent() {
      if (this.isHidden === true) {
        this.isHidden = false
      }
    }
  },
  computed: {
    visibleProducts() {
      const productList = this.products || []
      if (this.selectedCategoryIds.length) {
        return productList.filter(product =>
          product.category_ids.some(categoryId => {
            const catId = parseInt(categoryId)
            return this.selectedCategoryIds.includes(catId)
          })
        )
      }
      return productList
    },
    categories() {
      const categories = this.products
        .filter(p => p.category)
        .map(p => p.category)
        .flat()

      const discinctCategories = Array.from(new Set(categories.map(c => c.category_id))).map(catId =>
        categories.find(c => c.category_id === catId)
      )

      return discinctCategories
    },
    getNoResultsMessage() {
      let msg = ''
      if (!this.$v.search.minLength) {
        msg = 'Searched term should consist of at least 3 characters.'
      } else if (this.emptyResults) {
        msg = 'No results were found.'
      }
      return msg
    }
  },
  watch: {
    categories() {
      this.selectedCategoryIds = []
    }
  },
  // mounted() {
  //   // add autofocus to search input field
  //   this.$refs.search.focus()
  //   disableBodyScroll(this.$el)
  // },
  // updated() {
  //   disableBodyScroll(this.$el)
  // },
  destroyed() {
    clearAllBodyScrollLocks()
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
@import '~theme/css/variables/grid';
@import '~theme/css/variables/typography';

.searchpanel {
  height: 55px;
  position: relative;
  width: 100%;
  top: 12px;
  right: 0;
  z-index: 3;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  .close-icon-row {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
  }

  .container {
    padding-left: 30px;
    padding-right: 30px;

    @media (max-width: 1199.98px) {
      padding-left: 10px;
      padding-right: 10px;
    }
    @media (max-width: 991.98px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .row {
    margin-left: -map-get($grid-gutter-widths, lg) / 2;
    margin-right: -map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      margin-right: -map-get($grid-gutter-widths, xs) / 2;
      margin-left: -map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .col-md-12 {
    padding-left: map-get($grid-gutter-widths, lg) / 2;
    padding-right: map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      padding-left: map-get($grid-gutter-widths, xs) / 2;
      padding-right: map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .product-listing {
    padding-top: 20px;
  }

  .product {
    box-sizing: border-box;
    width: 33.33%;
    padding-left: map-get($grid-gutter-widths, lg) / 2;
    padding-right: map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      width: 50%;
      padding-left: map-get($grid-gutter-widths, xs) / 2;
      padding-right: map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .close-icon {
    padding: 18px 8px;
  }

  .search-input-group {
    display: flex;
    border: 1px solid #8acdc4;
    border-radius: 5px;
    width: 100%;
  }

  .search-icon {
    width: 16px;
    height: 30px;
    color: #626262;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 15px;
    padding: 0;
    background-color: #ffffff;
  }

  .search-panel-input {
    width: 100%;
    height: 30px;
    border: none;
    outline: 0;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0 0 0 10px;
    color: #626262;
    font-weight: 400;
    font-size: 14px;
    &::placeholder {
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      line-height: 30px;
      vertical-align: middle;
      letter-spacing: 0.75px;
      @media (max-width: 1199.98px) {
        font-size: 13px;
      }
      @media (max-width: 991.98px) {
        font-size: 12px;
        letter-spacing: 0.3px;
      }
      @media (max-width: 767.98px) {
        font-size: 12px;
        letter-spacing: 0.1px;
      }
      @media (max-width: 575.98px) {
        font-size: 13px;
        letter-spacing: 0.4px;
      }
    }

    @media #{$media-xs} {
      font-size: 16px;
    }
  }

  .search-panel-button {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;
    background-color: #8dc73f;
    border: 0;
    padding: 0 15px;
    letter-spacing: 1px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .no-results {
    top: 80px;
    width: 100%;
    // padding: 0 25px;
  }

  i {
    opacity: 0.6;
  }

  i:hover {
    opacity: 1;
  }

  .close-button {
    background: #fff;
  }

  // button {
  //   @media #{$media-xs} {
  //     width: 100%;
  //     margin-bottom: 15px;
  //   }
  // }
}

.search__position {
  width: 100%;
}

.search-content {
  position: fixed;
  background-color: #ffffff;
  width: 100vw;
  max-width: 300px;
  height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.hidden {
  display: none;
}
</style>
