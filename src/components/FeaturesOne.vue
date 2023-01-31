<template>
        <div class="feature-one">
            <div class="container">
                <div class="feature-one__inner">
                    <div class="feature-one__dot">
                        <img src="img/feature-one-dot.png" alt="">
                    </div>
                    <div class="row" v-if="acciones != null && acciones != 'undefined'">
                        <div class="col-xl-4 col-lg-4 wow fadeInUp animated" data-wow-delay="200ms" 
                        style="visibility: visible; animation-delay: 200ms; animation-name: fadeInUp;"
                        v-for="i in 3">
                            <a :href="acciones[i-1].callToActionLink" :target="acciones[i-1].callToActionTarget">
							<div class="feature-one__single">
                                <div class="feature-one__top">
                                    <div class="feature-one__icon" style="height:72px;">
                                        <span :class="acciones[i-1].icono" style="font-size:45px; color: #3798c9;"></span>
                                    </div>
                                    <div class="feature-one__title-box">
                                        <h3 class="feature-one__title">
                                            <a :href="acciones[i-1].callToActionLink" :target="acciones[i-1].callToActionTarget"
                                           >
                                       <span v-html="acciones[i-1].titulo" style="word-break: normal !important;"></span> </a></h3>
                                    </div>
                                </div>
                                <div class="feature-one__single-inner">
                                    <p class="feature-one__text">{{ acciones[i-1].subtitulo }}</p>
                                    <div class="feature-one__read-more">
                                        <a :href="acciones[i-1].callToActionLink" :target="acciones[i-1].callToActionTarget">{{ acciones[i-1].callToAction }}<i class="fa fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
							</a>
                        </div>
                        <!--Feature One Single End-->
                    </div>
                    <div class="row" v-if="acciones != null && acciones != 'undefined'">
                        <div class="col-xl-4 col-lg-4 wow fadeInUp animated" data-wow-delay="200ms" 
                        style="visibility: visible; animation-delay: 200ms; animation-name: fadeInUp;"
                        v-for="i in 3">
                            <a :href="acciones[i+2].callToActionLink" :target="acciones[i+2].callToActionTarget">
							<div class="feature-one__single">
                                <div class="feature-one__top">
                                    <div class="feature-one__icon" style="height:72px;">
                                        <span :class="acciones[i+2].icono" style="font-size:45px; color: #3798c9;"></span>
                                    </div>
                                    <div class="feature-one__title-box">
                                        <h3 class="feature-one__title">
                                            <a :href="acciones[i+2].callToActionLink" :target="acciones[i+2].callToActionTarget"
                                           >
                                       <span v-html="acciones[i+2].titulo" style="word-break: normal !important;"></span> </a></h3>
                                    </div>
                                </div>
                                <div class="feature-one__single-inner">
                                    <p class="feature-one__text">{{ acciones[i+2].subtitulo }}</p>
                                    <div class="feature-one__read-more">
                                        <a :href="acciones[i+2].callToActionLink" :target="acciones[i+2].callToActionTarget">{{ acciones[i+2].callToAction }}<i class="fa fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
							</a>
                        </div>
                        <!--Feature One Single End-->
                    </div>                    
                </div>
            </div>
        </div>
</template>
<style>
.feature-one__single:hover{
    background-color: darkgrey;
    opacity: 1;
}
</style>
<script>
export default {
    data: () => ({
        acciones: null,
    }),
    async mounted() {
        try {
            this.acciones = (await this.$http.get("/AccionesPrincipales/read")).data;
        } catch (error) { }
    },    
}
</script>