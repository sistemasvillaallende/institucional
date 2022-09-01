<template>
    <!--Main Slider Start-->
    <div class="main-slider clearfix" id="home">
        <div class="swiper-container thm-swiper__slider swiper-container-fade swiper-container-initialized swiper-container-horizontal"
            data-swiper-options="{&quot;slidesPerView&quot;: 1, &quot;loop&quot;: true,
                &quot;effect&quot;: &quot;fade&quot;,
                &quot;pagination&quot;: {
                &quot;el&quot;: &quot;#main-slider-pagination&quot;,
                &quot;type&quot;: &quot;bullets&quot;,
                &quot;clickable&quot;: true
                },
                &quot;navigation&quot;: {
                &quot;nextEl&quot;: &quot;#main-slider__swiper-button-next&quot;,
                &quot;prevEl&quot;: &quot;#main-slider__swiper-button-prev&quot;
                },
                &quot;autoplay&quot;: {
                &quot;delay&quot;: 5000
                }}">
            <div class="swiper-wrapper" style="transition-duration: 0ms;">
                <div class="swiper-slide swiper-slide-prev" data-swiper-slide-index="1"
                    v-for="(item, index) in carrusel" :key="index"
                    style="width: 1583px; transition-duration: 0ms; opacity: 1; transform: translate3d(-1583px, 0px, 0px);">
                    <div class="image-layer"
                    :style="{ 'background-image': 'url(img/' + item.img + ')' }"></div>
                    <!-- /.image-layer -->

                    <div class="container">
                        <div class="row">
                            <div class="col-xl-7 col-lg-8">
                                <div class="main-slider__content">
                                    <p class="main-slider__sub-title">{{ item.resenia }}</p>
                                    <h2 class="main-slider__title">{{ item.titulo }}</h2>
                                    <p class="main-slider__text" v-html="item.bajada"></p>
                                    <div class="main-slider__btn-box">
                                        <a :href="item.callToActionLink" class="btn btn-outline-warning" :target="item.callToActionTipo"
                                            style="padding:15px; font-weight:700"> {{ item.callToAction }} </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- If we need navigation buttons -->
                <div class="main-slider__nav">
                    <div class="swiper-button-prev" id="main-slider__swiper-button-next" tabindex="0" role="button"
                        aria-label="Next slide">
                        <i class="fa fa-chevron-left"></i>
                    </div>
                    <div class="swiper-button-next" id="main-slider__swiper-button-prev" tabindex="0" role="button"
                        aria-label="Previous slide">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </div>

                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </div>
        </div>
    </div>
    <!--Main Slider End-->
</template>

<script>

export default {
    data: () => ({
        carrusel: null,
    }),
    name: 'Home',
    async mounted() {
        try {
            this.carrusel = (await this.$http.get("/Carrusel/read")).data;
        } catch (error) { }
    },
    components: {

    },
}
</script>
