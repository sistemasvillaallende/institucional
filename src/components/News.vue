<template>
    <!--Services One Start-->
    <div class="services-one" id="services">
        <div class="services-one-shape-1 float-bob-x">
            <img src="img/services-one-shape-1.png" alt="">
        </div>
        <div class="services-one-shape-2">
            <img src="img/services-one-shape-2.png" alt="">
        </div>
        <div class="container">
            <div class="services-one__top">
                <div class="row">
                    <div class="col-xl-7 col-lg-6">
                        <div class="services-one__top-left">
                            <div class="section-title text-left">
                                <div class="section-sub-title-box">
                                    <p class="section-sub-title">NOTICIAS</p>
                                    <div class="section-title-shape-1">
                                        <img src="img/section-title-shape-1.png" alt="">
                                    </div>
                                </div>
                                <h2 class="section-title__title">Novedades de nuestra ciudad</h2>
                            </div>
                        </div>
                    </div>
                    <!--<div class="col-xl-5 col-lg-6">
                            <div class="services-one__top-right">
                                <p class="services-one__top-right-text">Nulla commodo dolor massa, vel pellentesque nulla congue quis. Fusce ut convallis diam. Nam id tortor et nunc tempor faucibus. Sed eu leo egestas.</p>
                            </div>
                        </div>-->
                </div>
            </div>
            <div class="services-one__bottom">
                <div class="row">
                    <!--Services One Single Start-->
                    <div class="col-xl-4 col-lg-4 " v-for="(item, index) in news" :key="index">
                        <div class="wow fadeInUp animated" data-wow-delay="100ms"
                            style="visibility: visible; animation-delay: 100ms; animation-name: fadeInUp;">
                            <div class="services-one__single">
                                <div class="services-one__img">
                                    <img :src="'img/' + item.img" alt="" style="height: 245px"
                                        v-if="$router.currentRoute.name != 'Page'">
                                    <img :src="'../img/' + item.img" alt="" style="height: 245px"
                                        v-else/>
                                </div>
                                <div class="services-one__content">
                                    <div class="services-one__icon">
                                        <span class="icon-joist"></span>
                                    </div>
                                    <p class="services-one__text"><span class="fa fa-calendar"></span>&nbsp;{{
                                            item._fecha
                                    }}</p>
                                    <h3 class="services-one__title"><a :href="'/News/' + item.id" target="_blank">{{
                                            item.titulo
                                    }}</a></h3>
                                    <div>
                                        <a :href="'/News/' + item.id" target="_blank">Leer mas... <i
                                                class="fa fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Services One Single End-->
                </div>
            </div>
        </div>
    </div>
    <!--Services One End-->

</template>

<script>
export default {
    data: () => ({
        news: null,
    }),
    async mounted() {
        try {
            this.news = (await this.$http.get("/News/readHome")).data;
        } catch (error) { }
    },
}
</script>