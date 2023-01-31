<template>
        <footer class="site-footer" style="position:absolute; left:0; width: 100%; ">
            <div class="site-footer-img-1">
                <img src="/img/site-footer-img-1.png" style="height: 300px;">
            </div>
            <!--<div class="site-footer-shape-1">
                <img src="img/site-footer-shape-1.png" alt="">
            </div>-->
            <div class="container">
                <div class="site-footer__top" style="padding: 18px 0 12px;">
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-6 wow fadeInUp animated" data-wow-delay="100ms" style="visibility: visible; animation-delay: 100ms; animation-name: fadeInUp;">
                            <div class="footer-widget__column footer-widget__about" style="text-align: center; margin-top: 10%;">
                                <div class="footer-widget__about-text-box">
                                    <img src="https://vecino.villaallende.gov.ar/estilos/img/logoVertical.png" alt="logo" style="height: 100px;"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 wow fadeInUp animated" data-wow-delay="200ms" style="visibility: visible; animation-delay: 200ms; animation-name: fadeInUp;">
                            <div class="footer-widget__column footer-widget__explore clearfix" style="padding-top: 30px;">      
                                <h3 class="footer-widget__title">Info Util</h3>                          
                                <ul class="footer-widget__explore-list list-unstyled clearfix">
                                    <li><a href="#">Municipalidad: 03543 - 439280</a></li>
                                    <li><a href="#">Hospital: 03543 - 439290</a></li>
                                    <li><a href="#">Policia: 03543 - 438140</a></li>
                                    <li><a href="#">Bomberos: 03543 - 438145</a></li>
                                    <li><a href="#">​Correo Argentino: 03543 - 436438</a></li>
                                </ul>
                            </div>
                        </div>                        
                        <div class="col-xl-3 col-lg-3 col-md-6 wow fadeInUp animated" data-wow-delay="200ms" style="visibility: visible; animation-delay: 200ms; animation-name: fadeInUp;">
                            <div class="footer-widget__column footer-widget__explore clearfix" style="padding-top: 30px;">  
                                <h3 class="footer-widget__title">Contacto</h3>                               
                                <ul class="footer-widget__explore-list list-unstyled clearfix">
                                    <li><a href="#">Sitio web oficial de la Municipalidad de Villa Allende</a></li>
                                    <li><a href="#">{{ Institucional.direccion }}  {{ Institucional.codigo_postal  }} {{ Institucional.ciudad }} {{ Institucional.provincia }}</a></li>
                                    <li><a href="#">República Argentina</a></li>
                                    <li><a href="#">Teléfono: {{ Institucional.telefono }}</a></li>
                                    <li><a :href="'mailto:'+Institucional.mail">{{ Institucional.mail }}​</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 wow fadeInUp animated" data-wow-delay="300ms" style="visibility: visible; animation-delay: 300ms; animation-name: fadeInUp;">
                            <div class="footer-widget__column footer-widget__newsletter clearfix" style="padding-top: 30px;">
                                <h3 class="footer-widget__title">Redes Sociales</h3>
				                <div class="site-footer__social">
                                    <a :href="Institucional.facebook" target="_blank" v-if="Institucional.facebook !=''"><i class="fab fa-facebook"></i></a>
                                    <a :href="Institucional.twitter" target="_blank" v-if="Institucional.twitter !=''"><i class="fab fa-twitter"></i></a>                                   
                                    <a :href="Institucional.instagram" target="_blank" v-if="Institucional.instagram !=''"><i class="fab fa-instagram"></i></a>
                                    <a :href="Institucional.youtube" target="_blank" v-if="Institucional.youtube !=''"><i class="fab fa-youtube"></i></a>
                                </div>				
                            </div>
                        </div>
                    </div>
                </div>
                <div class="site-footer__bottom">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="site-footer__bottom-inner" style="padding: 10px 0 0 0;">
                                <p class="site-footer__bottom-text">© All Copyright 2022 by Departamento de Sistemas de la Municipálidad de Villa Allende</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
</template>

<script>
export default {
    data: () => ({
        menues: null,
        Institucional: {
            id: 0,
            nombre_sitio: "",
            direccion: "",
            codigo_postal: "",
            ciudad: "",
            provincia: "",
            pais: "",
            telefono: "",
            mail: "",
            logo: "",
            facebook: "",
            instagram: "",
            twitter: "",
            youtube: "",
        },
    }),
    async mounted() {
        try {
            this.Institucional = (await this.$http.get("/Institucional/read")).data;
        } catch (error) { }
    },
}
</script>