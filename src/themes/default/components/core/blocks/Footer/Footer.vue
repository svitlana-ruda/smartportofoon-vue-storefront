<template>
  <footer :class="{ 'brdr-top-1 brdr-cl-secondary': isCheckoutPage }" class="footer">
    <div class="footer-links footer footer__background" v-if="!isCheckoutPage">
      <div class="container">
        <div class="row justify-content-center footer__space">
          <div class="col-6 col-md-3">
            <h3 class="footer footer__heading">
              {{ $t(this.heading[0]) }}
            </h3>
            <div class="footer__address">
              <p>{{ $t(this.address[0]) }}<br />{{ $t(this.address[1]) }}<br />{{ $t(this.address[2]) }}</p>
            </div>
            <div>
              <p>
                <span class="no-space">
                  <span class="awesome__phone--white"><i class="fas fa-phone-alt"/></span>&nbsp;
                  <a :href="contact.phoneNumber" class="footer footer__item">{{ contact.phone }}</a
                  ><br />
                </span>
                <span class="no-space">
                  <span class="awesome__mail--white"><i class="far fa-envelope"/></span>&nbsp;
                  <a :href="contact.mailAddress" class="footer footer__item">{{ contact.mail }}</a>
                </span>
              </p>
            </div>
            <div class="footer__address">
              <p>{{ $t(this.address[3]) }}<br />{{ $t(this.address[4]) }}</p>
            </div>
          </div>
          <div class="col-6 col-md-3 footer__block">
            <h3 class="footer footer__heading">
              {{ $t(this.heading[1]) }}
            </h3>
            <div v-for="serviceLink in serviceLinks" :key="serviceLink.title">
              <router-link class="footer footer__item" :to="localizedRoute(serviceLink.route)" exact>
                {{ $t(serviceLink.title) }}
              </router-link>
            </div>
          </div>
          <div class="col-6 col-md-3 footer__block">
            <h3 class="footer footer__heading">
              {{ $t(this.heading[2]) }}
            </h3>
            <div v-for="infoLink in infoLinks" :key="infoLink.title">
              <router-link class="footer footer__item" :to="localizedRoute(infoLink.route)" exact>
                {{ $t(infoLink.title) }}
              </router-link>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <h3 class="footer footer__heading">
              {{ $t(this.heading[3]) }}
            </h3>
            <div class="footer__paragraph">
              <p>
                {{ $t(newsletter) }}
              </p>
            </div>
            <div>
              <newsletter-popup class="newsletter" />
              <div class="social">
                <a href="https://www.smartportofoon.nl" target="_blank" rel="noopener noreferrer">
                  <img src="../../../../assets/smartportofoon-logo_1.png" alt="Logo" width="auto" height="25px" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <span class="awesome__facebook">
                    <i class="fab fa-facebook-square" />
                  </span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <span class="awesome__twitter">
                    <i class="fab fa-twitter-square" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright copyright__background">
      <div class="container">
        <div class="col-xs-5 col-sm-3 cl-tertiary">
          <language-switcher v-if="multistoreEnabled" />
        </div>
        <div class="d-flex justify-content-center align-items-center copyright__text">
          <p>{{ $t(copyright) }}</p>
        </div>
      </div>
    </div>
    <back-to-top bottom="20px" right="20px" visibleoffset="200">
      <button
        type="button"
        class="btn-top button no-outline brdr-none cl-white bg-cl-mine-shaft :bg-cl-th-secondary py10 px10"
      >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" fill="white" />
        </svg>
      </button>
    </back-to-top>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import CurrentPage from 'theme/mixins/currentPage'
import LanguageSwitcher from '../../LanguageSwitcher.vue'
import Newsletter from 'theme/components/core/blocks/Footer/Newsletter'
import BackToTop from 'theme/components/core/BackToTop'
import { getPathForStaticPage } from 'theme/helpers'
import config from 'config'
import NewsletterPopup from 'theme/components/core/NewsletterPopup'
import routes from '../../../../router'
import linkData from 'theme/resource/links.json'

export default {
  mixins: [CurrentPage],
  name: 'MainFooter',
  data() {
    return {
      heading: ['CONTACTGEGEVENS', 'KLANTENSERVICE', 'ALGEMENE INFORMATIE', 'NIEUWSBRIEF'],
      address: ['PortofoonWEB', 'Zonnedauw 16', '9202 PA Drachten', 'K.v.K nr: 62061712', 'BTW nr: NL854624624B01'],
      contact: {
        phone: '0512 - 745 293',
        mail: 'info@portofoonweb.nl',
        phoneNumber: 'tel:0512745293',
        mailAddress: 'mailto:info@portofoonweb.nl'
      },
      serviceLinks: [],
      infoLinks: [],
      newsletter:
        'Wilt u op de hoogte gehouden worden van de nieuwste Technieken & Aanbiedingen op het gebied van Portofoons?',
      copyright: '©Portofoonweb.nl 2017 All rights reserved.'
    }
  },
  methods: {
    goToAccount() {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    getLinkFor(path) {
      return localizedRoute(getPathForStaticPage(path))
    },
    updateLinkData(data) {
      this.serviceLinks = data.serviceLinks
      this.infoLinks = data.infoLinks
    }
  },
  computed: {
    ...mapGetters({
      isLogged: 'user/isLoggedIn'
    }),
    multistoreEnabled() {
      return config.storeViews.multistore
    },
    getVersionInfo() {
      return `v${process.env.__APPVERSION__} ${process.env.__BUILDTIME__}`
    }
  },
  components: {
    Newsletter,
    LanguageSwitcher,
    BackToTop,
    NewsletterPopup
  },
  created() {
    this.updateLinkData(linkData)
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-secondary: color(secondary);

.icon {
  transition: 0.3s all;
}

.social-icon {
  width: 40px;
  height: 40px;
  &:hover,
  &:focus,
  &:active {
    .icon {
      fill: $color-secondary;
    }
  }
}
.links {
  list-style-type: none;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}

.bottom-links {
  @media (max-width: 767px) {
    padding: 0;
  }
}

.footer__version-info {
  display: flex;
  color: $color-secondary;
  font-size: 0.7rem;
  @media (min-width: 768px) {
    margin-right: 1rem;
    font-size: 0.8rem;
  }
}

.underline {
  &:hover {
    color: $color-secondary;
    &:after {
      background-color: $color-secondary;
    }
  }
}
.legal-entity-link {
  text-align: center;
  @media (min-width: 768px) {
    display: none;
  }
}

.privacy-policy-link {
  text-align: right;
  @media (min-width: 768px) {
    display: none;
  }
}

@media (max-width: 595px) {
  .no-mobile {
    display: none;
  }

  .social {
    margin-top: 0;
  }

  .footer-links {
    padding-bottom: 30px;
    @media (max-width: 575.98px) {
      padding-bottom: 10px;
    }
  }
}
</style>
