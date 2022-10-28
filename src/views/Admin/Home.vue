<template>
    <div>
        <Header></Header>
        <v-container style="min-height: 400px; margin-top:60px; margin-bottom:60px;">
            <v-row>
                <v-col cols="3">
                    <v-card class="mx-auto" max-width="344" style="background-color:#ffc10773; min-height: 196px;">
                        <v-card-text style="min-height: 112px;">
                            <p class="text-h5 text--primary" style="text-align:center;">
                                Datos de Contacto y Redes Sociales
                            </p>
                        </v-card-text>
                        <v-card-actions
                            style="text-align: center; display:block; padding-bottom: 20px; padding-top: 0;">
                            <v-btn href="/Contacto/1" class="ml-2 mt-5" outlined rounded
                                style="color: var(--roofsie-blanco) !important; background-color: var(--roofsie-gray);">
                                CONFIGURAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card class="mx-auto" max-width="344" style="background-color:#ffc10773; min-height: 196px;">
                        <v-card-text style="min-height: 112px;">
                            <p class="text-h5 text--primary" style="text-align:center;">
                                Menu Principal
                            </p>
                        </v-card-text>
                        <v-card-actions
                            style="text-align: center; display:block; padding-bottom: 20px; padding-top: 0;">
                            <v-btn href="/MenuConfig/0" class="ml-2 mt-5" outlined rounded
                                style="color: var(--roofsie-blanco) !important; background-color: var(--roofsie-gray);">
                                CONFIGURAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card class="mx-auto" max-width="344" style="background-color:#ffc10773; min-height: 196px;">
                        <v-card-text style="min-height: 112px;">
                            <p class="text-h5 text--primary" style="text-align:center;">
                                Carrusel
                            </p>
                        </v-card-text>
                        <v-card-actions
                            style="text-align: center; display:block; padding-bottom: 20px; padding-top: 0;">
                            <v-btn href="/CarruselConfig/0" class="ml-2 mt-5" outlined rounded
                                style="color: var(--roofsie-blanco) !important; background-color: var(--roofsie-gray);">
                                CONFIGURAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <!--<v-col cols="3">
                    <v-card class="mx-auto" max-width="max" style="background-color:#ffc10773; min-height: 196px;">
                        <v-card-text style="min-height: 112px;">
                            <p class="text-h5 text--primary" style="text-align:center;">
                                Links Principales
                            </p>
                        </v-card-text>
                        <v-card-actions
                            style="text-align: center; display:block; padding-bottom: 20px; padding-top: 0;">
                            <v-btn class="ml-2 mt-5" outlined rounded
                                style="color: var(--roofsie-blanco) !important; background-color: var(--roofsie-gray);">
                                CONFIGURAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>-->
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-card class="mx-auto" max-width="344" style="background-color:#ffc10773; min-height: 196px;">
                        <v-card-text style="min-height: 112px;">
                            <p class="text-h5 text--primary" style="text-align:center;">
                                Noticia Destacada
                            </p>
                        </v-card-text>
                        <v-card-actions
                            style="text-align: center; display:block; padding-bottom: 20px; padding-top: 0;">
                            <v-btn href="/NoticiaPrincipalConfig/0" class="ml-2 mt-5"
                                style="color: var(--roofsie-blanco) !important; background-color: var(--roofsie-gray);"
                                outlined rounded>
                                CONFIGURAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card class="mx-auto" max-width="344" style="background-color:#ffc10773; min-height: 196px;">
                        <v-card-text style="min-height: 112px;">
                            <p class="text-h5 text--primary" style="text-align:center;">
                                Noticias
                            </p>
                        </v-card-text>
                        <v-card-actions
                            style="text-align: center; display:block; padding-bottom: 20px; padding-top: 0;">
                            <v-btn href="/NoticiasConfig/0" class="ml-2 mt-5" outlined rounded
                                style="color: var(--roofsie-blanco) !important; background-color: var(--roofsie-gray);">
                                CONFIGURAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card class="mx-auto" max-width="344" style="background-color:#ffc10773; min-height: 196px;">
                        <v-card-text style="min-height: 112px;">
                            <p class="text-h5 text--primary" style="text-align:center;">
                                Paginas
                            </p>
                        </v-card-text>
                        <v-card-actions
                            style="text-align: center; display:block; padding-bottom: 20px; padding-top: 0;">
                            <v-btn href="/PageList/" class="ml-2 mt-5" outlined rounded
                                style="color: var(--roofsie-blanco) !important; background-color: var(--roofsie-gray);">
                                CONFIGURAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3">

                </v-col>
            </v-row>
        </v-container>
        <Footer></Footer>
    </div>
</template>
<style>
a:hover,
a:focus {
    box-shadow: 0 1px var(--roofsie-gray) !important;
}
</style>
<script>
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
export default {
    data: () => {
        return {

        };
    },
    components: {
        Header,
        Footer,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
        } catch (error) { }
    },
    methods: {

    },
};
</script>