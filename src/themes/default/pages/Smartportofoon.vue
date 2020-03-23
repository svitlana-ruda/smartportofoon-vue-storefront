<template>
  <div>
    <section class="smartportofoon">
      <div class="container text-align">
        <h2>{{ $t(heading) }}</h2>
        <div class="row">
          <div class="col-sm-3 col-md-2">
            <img
              src="../assets/Vector Smart Object.png"
              alt="Portofoon"
              height="auto"
              width="125px"
              class="smartportofoon__img"
            />
          </div>
          <div class="col-sm-8">
            <div v-for="content in contents" :key="content.title">
              <h3>{{ $t(content.title) }}</h3>
              <p>{{ $t(content.description) }}</p>
            </div>
          </div>
        </div>
        <div class="smartportofoon__social">
          <a href="https://www.smartportofoon.nl" target="_blank" rel="noopener noreferrer">
            <img width="auto" height="40px" src="../assets/Smartportofoon_Logo.png" alt="Logo" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <span class="awesome__facebook--green">
              <i class="fab fa-facebook-square" />
            </span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <span class="awesome__twitter--green">
              <i class="fab fa-twitter-square" />
            </span>
          </a>
        </div>
      </div>
    </section>
    <section class="section__prefooter">
      <LogoSlider />
    </section>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import StaticExample from 'theme/components/theme/blocks/Static/Example'
import StaticShortExample from 'theme/components/theme/blocks/Static/Short'
import { getPathForStaticPage } from 'theme/helpers'
import { localizedRoute } from '@vue-storefront/core/lib/multistore'
import LogoSlider from 'theme/components/theme/LogoSlider'

export default {
  components: {
    Breadcrumbs,
    LogoSlider
  },
  metaInfo() {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  computed: {
    activeComponent() {
      const matchedNav = this.navigation.find(nav => nav.link.includes(this.$route.path))
      return matchedNav ? matchedNav.component : null
    }
  },
  data() {
    return {
      navigation: [
        { title: i18n.t('About us'), link: getPathForStaticPage('/about-us'), component: StaticExample },
        {
          title: i18n.t('Customer service'),
          link: getPathForStaticPage('/customer-service'),
          component: StaticShortExample
        },
        { title: i18n.t('Store locator'), link: localizedRoute('/store-locator'), component: StaticExample },
        { title: i18n.t('Delivery'), link: '/delivery', component: StaticShortExample },
        { title: i18n.t('Return policy'), link: '/returns', component: StaticExample },
        { title: i18n.t('Privacy policy'), link: '/privacy', component: StaticShortExample },
        { title: i18n.t('Size guide'), link: '/size-guide', component: StaticExample },
        { title: i18n.t('Contact us'), link: '/contact', component: StaticShortExample }
      ],
      contents: [
        {
          title: 'Goed om te weten',
          description:
            'Bent u tevreden over het bestelproces like dan onze Facebook pagina of laat een review achter, zo maakt u ook nog eens kans op een leuke cadeau bon ter waarde van € 100,- Wilt u graag op de hoogte blijven van het laatste nieuws en speciale aanbiedingen meld u zich dan aan op onze nieuwsbrief.'
        },
        {
          title: 'Wat gaat er nu gebeuren?',
          description:
            'Per email heeft u een bevestiging ontvangen van uw bestelling met Ordernummer [ordernummer]. Heeft u de bestelling op een werkdag voor 17:00 gedaan en betaald, dan gaan wij nu direct aan de slag om te zorgen dat u het morgen in huis heeft. Heeft u vragen over de bestelling neem dan contact met ons op 0512 – 745293 of stuur ons een email aan info@portofoonweb.nl.'
        },
        {
          title: 'Wist u dat?',
          description:
            'PortofoonWEB heeft sinds kort een fenomenaal nieuwe techniek genaamd Smart Portofoons. Een portofoon systeem met ongekende mogelijkheden en onbeperkt bereik! Klik op deze link voor meer informatie.'
        }
      ],
      heading: 'Bedankt voor uw bestelling bij PortofoonWEB!'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$border-primary: color(primary, $colors-border);

.static-menu {
  ul {
    list-style: none;
  }

  a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $border-primary;
  }

  a:hover::after,
  .router-link-active::after {
    opacity: 0;
  }
}

.static-content {
  *:first-of-type {
    margin-top: 0;
  }
}
</style>

<style lang="scss">
.static-content {
  h3 {
    margin-top: 40px;
    margin-bottom: 25px;
    @media (max-width: 767px) {
      margin-top: 35px;
      margin-bottom: 10px;
    }
  }
}
</style>
