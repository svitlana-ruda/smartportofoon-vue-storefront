<template>
  <div class="header">
    <header class="fixed w-100 brdr-bottom-1 bg-cl-primary brdr-cl-secondary" :class="{ 'is-visible': navVisible }">
      <div class="header header__background">
        <div class="container">
          <div class="row justify-content-end align-items-center header__icons">
            <div class="col-6 col-md-2 col-lg-1">
              <account-icon class="account pointer" />
            </div>
            <div class="col-6 col-md-3 col-lg-2">
              <span class="account__cart">{{ $t('Winkelwagen') }}</span>
              <microcart-icon />
              <hamburger-icon class="header__hamburger" />
            </div>
          </div>
        </div>
      </div>
      <div class="container px15">
        <div class="row between-xs middle-xs" v-if="!isCheckoutPage || isThankYouPage">
          <div class="col-12 offset-sm-2 col-sm-8 offset-md-0 col-md-3">
            <logo />
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <SearchPanel />
          </div>
          <div class="col-12 col-sm-6 col-md-5 contact">
            <div class="contact__image">
              <span class="awesome__phone">
                <i class="fas fa-phone-alt" />
              </span>
            </div>
            <div class="contact__content">
              <p class="contact__paragraph">
                {{ $t(contact.text) }}
                <span class="contact__phone">
                  <a :href="contact.phoneNumber">{{ $t(contact.phone) }}</a>
                </span>
              </p>
              <p class="contact__schedule">
                {{ $t(contact.schedule) }}
              </p>
            </div>
          </div>
          <!-- <div class="col-xs-2 visible-xs">
            <wishlist-icon class="p15 icon pointer" />
          </div> -->
          <!-- <div class="col-md-4 col-xs-4 center-xs pt5">
            <div>
              <hamburger-icon class="p15 icon bg-cl-secondary pointer" />
            </div>
          </div> -->
          <!-- <div class="col-md-4 col-xs-2 end-xs">
            <div class="inline-flex right-icons">
              <search-icon class="p15 icon hidden-xs pointer" />
              <wishlist-icon class="p15 icon hidden-xs pointer" />
              <compare-icon class="p15 icon hidden-xs pointer" />
              <microcart-icon class="p15 icon pointer" />
              <account-icon class="p15 icon hidden-xs pointer" />
            </div>
          </div> -->
        </div>
        <div class="row between-xs middle-xs px15 py5" v-if="isCheckoutPage && !isThankYouPage">
          <div class="col-xs-5 col-md-3 middle-xs">
            <div>
              <router-link :to="localizedRoute('/')" class="cl-tertiary links">
                {{ $t('Return to shopping') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-2 col-md-6 center-xs">
            <logo width="auto" height="41px" />
          </div>
          <div class="col-xs-5 col-md-3 end-xs">
            <div>
              <a v-if="!currentUser" href="#" @click.prevent="gotoAccount" class="cl-tertiary links">{{
                $t('Login to your account')
              }}</a>
              <span v-else>{{ $t('You are logged in as {firstname}', currentUser) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div class="menu__background">
          <div class="container">
            <nav class="menu__list row justify-content-between">
              <router-link :to="menuItem.url" v-for="menuItem in menuItems" :key="menuItem.title">
                {{ $t(menuItem.title) }}
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import Logo from 'theme/components/core/Logo'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'
import SearchPanel from 'theme/components/core/blocks/SearchPanel/SearchPanel'

export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    SearchIcon,
    WishlistIcon,
    SearchPanel
  },
  mixins: [CurrentPage],
  data() {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 54,
      menuItems: [
        {
          title: 'PORTOFOONS',
          url: '/women/women-20'
        },
        {
          title: 'ACCESSOIRES',
          url: '/men/men-11'
        },
        {
          title: 'ZENDONTVANGERS',
          url: '/gear/gear-3'
        },
        {
          title: 'ANTENNES & TOEBEHOREN',
          url: '/training/training-9'
        },
        {
          title: 'CONTACT',
          url: '/contact'
        },
        {
          title: 'SMARTPORTOFOON',
          url: '/smartportofoon'
        },
        {
          title: 'NIEUWS',
          url: '/nieuws'
        }
      ],
      contact: {
        text: 'Heeft u vragen?',
        phone: 'Bel 0512-745293',
        schedule: 'Bereikbaar maandag t/m vrijdag van: 09:00 – 17:00',
        phoneNumber: 'tel:0512745293'
      }
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    }),
    isThankYouPage() {
      return this.$store.state.checkout.isThankYouPage ? this.$store.state.checkout.isThankYouPage : false
    }
  },
  beforeMount() {
    window.addEventListener(
      'scroll',
      () => {
        this.isScrolling = true
      },
      { passive: true }
    )

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  methods: {
    gotoAccount() {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled() {
      this.scrollTop = window.scrollY
      if (this.scrollTop > this.lastScrollTop && this.scrollTop > this.navbarHeight) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

header {
  // height: 200px;
  top: -201px;
  z-index: 3;
  transition: top 0.2s ease-in-out;
  &.is-visible {
    top: 0;
  }
}
.icon {
  opacity: 0.6;
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}
.right-icons {
  //for edge
  float: right;
}
.header-placeholder {
  height: 200px;
}
.links {
  text-decoration: underline;
}
@media (max-width: 767px) {
  .row.middle-xs {
    margin: 0 -15px;

    &.py5 {
      margin: 0;
    }
  }
  .col-xs-2:first-of-type {
    padding-left: 0;
  }
  .col-xs-2:last-of-type {
    padding-right: 0;
  }
  // a,
  // span {
  //   font-size: 12px;
  // }
}
</style>
