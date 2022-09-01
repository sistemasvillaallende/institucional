<template>
    <div class="container" style="margin-top:70px; margin-bottom: 70px;">
        <div class="row">
            <div class="col-xl-8 col-lg-7" v-if="this.news != null && this.news != 'undefined'">
                <div class="blog-details__left">
                    <div class="blog-details__img">
                        <img :src="'/img/' + news.img" alt="">
                    </div>
                    <div class="blog-details__content">
                        <ul class="list-unstyled blog-details__meta" style="padding-left:0">
                            <li style="font-weight:700">
                                <i class="far fa-calendar"
                                    style="font-size:24px;color: #ffd142; margin-right: 15px; text-decoration:none !important; font-weight:700"></i>
                                {{ news._fecha }}
                            </li>
                            <!--<li><span>||</span></li>
                            <li><i class="far fa-user"></i> </li>-->
                        </ul>
                        <hr />
                        <h3 class="blog-details__title">{{ news.titulo }}</h3>
                        <div v-html="news.cuerpo">

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-5">
                <div class="sidebar">
                    <div class="sidebar__single sidebar__post">
                        <h3 class="sidebar__title">Ultimas Noticias</h3>
                        <ul class="sidebar__post-list list-unstyled"
                            v-if="this.listnews != null && this.listnews != 'undefined'">
                            <li v-for="(item, index) in listnews" :key="index">
                                <div class="sidebar__post-content">
                                    <h3>
                                        <a :href="'/News/' + item.id" target="_self">{{ item.titulo }}</a>
                                    </h3>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="work-page__bottom" v-if="this.listimages != null && this.listimages != 'undefined'"
            style="margin-top:30px;">
            <hr />
            <h3>Imagenes</h3>
            <div class="row filter-layout masonary-layout" style="position: relative; height: 620px; margin-top: 30px;">
                <!--Project One Single Start-->
                <div class="col-xl-4 col-lg-6 col-md-6 filter-item comm res"
                    style="left: 0px; top: 0px; margin-top: 20px;" v-for="(item, index) in listimages" :key="index">
                    <div class="project-one__single">
                        <div class="project-one__img-box">
                            <div class="project-one__img" style="text-align:center;">
                                <img :src="'https://vecino.villaallende.gov.ar/estilos/Assets/ImagesNews/' + item.img + '?v=1'"
                                    alt="" style="height: 300px; width: auto;">
                            </div>
                            <div class="project-one__content">
                                <h4 class="project-one__title"><a href="work-details.html">{{ item.nombre }}</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="work-page__bottom" v-if="this.listfiles != null && this.listfiles != 'undefined' && this.listfiles.length > 0"
            style="margin-top:50px;">
            <hr />
            <h3>Descargas</h3>
            <div class="row filter-layout masonary-layout" style="position: relative; height: 620px; margin-top: 30px;">
                <!--Project One Single Start-->
                <div class="col-12" v-for="(item, index) in listfiles" :key="index">
                <i class="fas fa-link" style="margin-right: 25px;"></i>
                    <a target="_blank" :href="'https://vecino.villaallende.gov.ar/estilos/Assets/FilesNews/' + item.path">{{item.nombre}}</a>
                </div>
            </div>
        </div>        
    </div>
</template>
<style>
a:hover,
a:focus {
    box-shadow: 0 1px #6F6F6E !important;
}
</style>
<script>
export default {
    data: () => ({
        news: null,
        listnews: null,
        listimages: null,
        listfiles: null,
    }),
    async mounted() {
        try {
            this.news = (await this.$http.get("/News/getByPk?pk=" + this.$route.params.id)).data;
            this.listnews = (await this.$http.get("/News/getBySeccion?seccion=" + this.news.seccion)).data;
            this.listimages = (await this.$http.get("/News/getImages?idNews=" + this.$route.params.id)).data;
            this.listfiles = (await this.$http.get("/News/getFiles?idNews=" + this.$route.params.id)).data;            
        } catch (error) { }
    },
}
</script>