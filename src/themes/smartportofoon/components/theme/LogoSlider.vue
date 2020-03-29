<template>
  <div class="container">
    <div>
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="logo in logos" :key="logo.title">
          <img :src="logo.image" :alt="logo.title" class="slider__image" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'LogoSlider',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      logos: [
        {
          title: 'Motorola',
          image: '../../assets/logos/motorola.png'
        },
        // {
        //   title: 'Baofeng',
        //   image: '../../assets/logos/baofeng.png'
        // },
        {
          title: 'Icom',
          image: '../../assets/logos/icom.png'
        },
        {
          title: 'Kenwood',
          image: '../../assets/logos/kenwood.png'
        },
        {
          title: 'Hytera',
          image: '../../assets/logos/hytera.png'
        },
        {
          title: 'Puxing',
          image: '../../assets/logos/puxing.png'
        }
      ],
      swiperOption: {
        passiveListeners: false,
        slideToClickedSlide: true,
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        breakpoints: {
          1200: {
            passiveListeners: false,
            slideToClickedSlide: true,
            loop: true,
            slidesPerView: 5,
            spaceBetween: 10
          },
          992: {
            passiveListeners: false,
            slideToClickedSlide: true,
            loop: true,
            slidesPerView: 5,
            spaceBetween: 10
          },
          768: {
            passiveListeners: false,
            slideToClickedSlide: true,
            loop: true,
            slidesPerView: 4,
            spaceBetween: 10
          },
          576: {
            passiveListeners: false,
            slideToClickedSlide: true,
            loop: true,
            slidesPerView: 3,
            spaceBetween: 10
          },
          320: {
            passiveListeners: false,
            slideToClickedSlide: true,
            loop: true,
            slidesPerView: 2,
            spaceBetween: 10
          },
          1: {
            passiveListeners: false,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  directives: {
    swiper: directive
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  }
}
</script>

<style lang="scss" scoped>
.slider__image {
  max-width: auto;
  max-height: 35px;
  object-fit: contain;
}
.swiper-slide {
  text-align: center;
  cursor: grab;
  & img {
    pointer-events: none;
  }
  &:active {
    cursor: grabbing;
  }
}
</style>
