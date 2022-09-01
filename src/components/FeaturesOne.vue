<template>
        <div class="feature-one">
            <div class="container">
                <div class="feature-one__inner">
                    <div class="feature-one__dot">
                        <img src="img/feature-one-dot.png" alt="">
                    </div>
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 wow fadeInUp animated" data-wow-delay="200ms" 
                        style="visibility: visible; animation-delay: 200ms; animation-name: fadeInUp;"
                        v-for="(item, index) in acciones" :key="index">
                            <a :href="item.callToActionLink" :target="item.callToActionTarget">
							<div class="feature-one__single">
                                <div class="feature-one__top">
                                    <div class="feature-one__icon">
                                        <span :class="item.icono"></span>
                                    </div>
                                    <div class="feature-one__title-box">
                                        <h3 class="feature-one__title"><a :href="item.callToActionLink" :target="item.callToActionTarget">
                                        {{ item.titulo }}</a></h3>
                                    </div>
                                </div>
                                <div class="feature-one__single-inner">
                                    <p class="feature-one__text">{{ item.subtitulo }}</p>
                                    <div class="feature-one__read-more">
                                        <a :href="item.callToActionLink" :target="item.callToActionTarget">{{ item.callToAction }}<i class="fa fa-arrow-right"></i></a>
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