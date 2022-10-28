<template>
    <div>
        <header class="main-header-two clearfix" :style="[$vuetify.breakpoint.name != 'xs' &&
        				$vuetify.breakpoint.name != 'sm' &&
        				$vuetify.breakpoint.name != 'md' ? 
        {'margin-top' : '0px', 'height': '233px'} : {'margin-top' : '0px', 'height': '150px'}]">
            <div v-if="
            	$vuetify.breakpoint.name != 'xs' &&
            	$vuetify.breakpoint.name != 'sm' &&
            	$vuetify.breakpoint.name != 'md'
            " class="main-header-two__top" style="background-color: transparent; height: 40px;">
                <div class="container" style="padding-top: 0;">
                    <div class="main-header-two__top-inner">
                        <div class="main-header-two__top-left">
                            <p class="main-header-two__top-left-text">Seguinos en nuestras redes sociales</p>
                        </div>
                        <div class="main-header-two__top-right">
                            <div class="main-header-two__top-social">
                                <a :href="Institucional.facebook"><i class="fab fa-facebook-square"></i></a>
                                <a :href="Institucional.twitter"><i class="fab fa-twitter"></i></a>
                                <a :href="Institucional.youtube"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="
            	$vuetify.breakpoint.name != 'xs' &&
            	$vuetify.breakpoint.name != 'sm' &&
            	$vuetify.breakpoint.name != 'md'
            " class="main-header-two__middle" style="background-color: var(--roofsie-blanco); height: 103px;">
                <div class="container" style="padding-top:0; padding-bottom:0;">
                    <div class="main-header-two__middle-inner clearfix">
                        <div class="main-header-two__shape-1" style="border-top: 144px solid var(--roofsie-gray);">
                        </div>
                        <div class="main-header-two__shape-2" style="border-top: 96px solid var(--roofsie-white);">
                        </div>
                        <div class="main-header-two__shape-3"></div>
                        <div class="main-header-two__shape-4" style="background-color: var(--roofsie-base);"></div>
                        <div class="main-header-two__shape-5"></div>
                        <div class="main-header-two__shape-6" style="border-bottom: 93px solid var(--roofsie-white);">
                        </div>
                        <div class="main-header-two__shape-7"></div>
                        <div class="main-header-two__logo">
                            <a href="/"><img
                                    :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_0/' + Institucional.logo"
                                    alt=""></a>
                        </div>
                        <div class="main-header-two__address">
                            <ul class="list-unstyled main-header-two__address-list"  v-if="acciones != null && acciones != 'undefined'">
                                <li v-for="(item, index) in acciones" :key="index">
                                    <div class="icon">
                                        <span :class="item.icono" style="font-size: 36px; color: var(--roofsie-white);"></span>
                                    </div>
                                    <div class="content" style="top:0 !important;">
                                        <h5 style="margin-top: 15px;"><a :href="item.callToActionLink" :target="item.callToActionTarget">
                                        {{ item.titulo }}</a></h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else style="background-color: var(--roofsie-blanco); height: 103px;">
                <div class="container" style="padding-top:20px; padding-bottom:0; text-align: center; display: block;">
                    <a href="/"><img
                            :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_0/' + Institucional.logo"
                            alt=""></a>
                </div>
            </div>
            <nav class="main-menu main-menu-two clearfix" style="height: 90px;" v-if="
            	$vuetify.breakpoint.name != 'xs' &&
            	$vuetify.breakpoint.name != 'sm' &&
            	$vuetify.breakpoint.name != 'md'
            ">
                <div class="main-menu-two__wrapper clearfix" style="height:90px;">
                    <div class="container" style="padding-top: 0;">
                        <div class="main-menu-two__wrapper-inner clearfix"
                            style="min-height: 90px; max-height:90px;  background-color: var(--roofsie-base);">
                            <div class="main-menu-two__wrapper-inner-bg" style="background-color: var(--roofsie-base);">
                            </div>
                            <div class="main-menu-two__left">

                            </div>
                            <div class="main-menu-two__right" style="height:90px;">
                                <div class="main-menu-two__main-menu-box">
                                    <a href="#" @click.stop="drawer = !drawer" class="mobile-nav__toggler"><i
                                            class="fa fa-bars"></i></a>
                                    <ul class="main-menu__list one-page-scroll-menu">
                                        <li class="dropdown" v-for="(item, index) in this.menues" :key="index"
                                            v-if="item.tipo == 1">
                                            <a href="#">{{ item.texto }}</a>
                                            <ul class="border-top-2px">
                                                <li v-for="(item2, index2) in item.lstHijos" :key="index2">
                                                    <a :href="item2.url" :target="item._target">
                                                        {{ item2.texto }}</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="scrollToLink" v-for="(item, index2) in this.menues" :key="index2"
                                            v-if="item.tipo == 0">
                                            <a :href="item.url" :target="item._target">{{ item.texto }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav class="main-menu main-menu-two clearfix" style="margin-top: -130px;" v-else>
                <div class="main-menu-two__wrapper clearfix">
                    <div class="main-menu-two__right" style="margin-right: 20px;">
                        <div class="main-menu-two__main-menu-box">
                            <a href="#" @click.stop="drawer = !drawer" class="mobile-nav__toggler"><i
                                    class="fa fa-bars"></i></a>
                            <ul class="main-menu__list one-page-scroll-menu">
                                <li class="dropdown" v-for="(item, index) in this.menues" :key="index"
                                    v-if="item.tipo == 1">
                                    <a href="#">{{ item.texto }}</a>
                                    <ul class="border-top-2px">
                                        <li v-for="(item2, index2) in item.lstHijos" :key="index2">
                                            <a :href="item2.url" :target="item._target">
                                                {{ item2.texto }}</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="scrollToLink" v-for="(item, index2) in this.menues" :key="index2"
                                    v-if="item.tipo == 0">
                                    <a :href="item.url" :target="item._target">{{ item.texto }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <v-navigation-drawer v-model="drawer" absolute temporary style="height: 100vh;
                top: 0px;
                transform: translateX(0%);
                width: 286px;
                z-index: 2000;
                position: fixed;">
            <v-list>
                <v-list-group style="font-size: 16px !important;" prepend-icon="fa fa-chevron-down"
                    v-for="(item, index) in this.menues" :key="index" v-if="item.tipo == 1">
                    <template v-slot:activator>
                        <v-list-item-title>{{ item.texto }}</v-list-item-title>
                    </template>
                    <v-list-group no-action sub-group v-for="(item2, index2) in item.lstHijos" :key="index2">
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <a :target="item._target" :href="item2.url">{{ item2.texto }}</a>
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                    </v-list-group>
                </v-list-group>
                <v-divider></v-divider>
                <v-list-item v-for="(item, index2) in this.menues" :key="index2" v-if="item.tipo == 0">
                    <v-list-item-icon>
                        <v-icon class="fa fa-chevron-right"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title><a :target="item._target" :href="item.url">{{ item.texto }}</a>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<style>
.main-menu .main-menu__list>li>ul>li>a,
.main-menu .main-menu__list>li>ul>li>ul>li>a,
.stricky-header .main-menu__list>li>ul>li>a,
.stricky-header .main-menu__list>li>ul>li>ul>li>a {
    background-color: white !important;
}

.v-icon.v-icon {
    font-size: 14px !important;
}
</style>
<script>
export default {
    data: () => ({
        drawer2: false,
        drawer: false,
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
            acciones: null,
        },
    }),
    async mounted() {
        try {
            this.acciones = (await this.$http.get("/AccionesPrincipales/read")).data;            
            this.menues = (await this.$http.get("/Menu/readActivos?idPadre=" + 0)).data;
            this.Institucional = (await this.$http.get("/Institucional/read")).data;

        } catch (error) { }
    },
}
</script>
