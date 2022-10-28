<template>
        <div class="about-one" id="about">
            <div class="about-one__shape float-bob-x">
                <img src="img/about-one-shape.png" alt="">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-6">
                        <div class="about-one__left">
                            <div class="about-one__img-box wow slideInLeft animated" data-wow-delay="100ms" data-wow-duration="2500ms" 
							style="visibility: visible; animation-duration: 2500ms; animation-delay: 100ms; animation-name: slideInLeft;">
                                <div class="about-one__img">
                                    <img :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_0/' + noticia_principal.img" alt="">
                                </div>
                                <div class="about-one__line">
                                    <img src="img/about-one-line.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="about-one__right">
                            <div class="section-title text-left">
                                <div class="section-sub-title-box">
                                    <p class="section-sub-title" style="color:#8f8f8f;">{{ noticia_principal.encabezado }}</p>
                                    <div class="section-title-shape-1">
                                        <img src="img/section-title-shape-1.png" alt="">
                                    </div>
                                </div>
                                <h2 class="section-title__title">{{ noticia_principal.titulo }}</h2>
                            </div>
                            <div v-html="noticia_principal.contenido"></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data: () => ({
        noticia_principal: null,
    }),
    async mounted() {
        try {
            this.noticia_principal = (await this.$http.get("/NoticiaPrincipal/getByPk")).data;
        } catch (error) { }
    },    
}
</script>