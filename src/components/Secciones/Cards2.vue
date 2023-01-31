<template>
    <v-container style="margin-bottom:80px;">
        <v-row v-if="seccion != null && seccion != 'undefined'">
            <v-col cols="12">
                <h2 
                    style="position: relative; color: var(--roofsie-gray);
                        font-weight: 800;
                        line-height: 40px;
                        margin-bottom: 10px;">{{ seccion.titulo }}</h2>
                <p style="
                        font-size: 18px;
                        color: var(--roofsie-gray);
                        line-height: 18px;
                        margin-bottom: 10px;">{{ seccion.subtitulo }}</p>
            </v-col>
        </v-row>
        <v-row v-if="cards != null && cards != 'undefined'" v-for="i in Math.ceil(cards.length / 3)" :key="i">
            <v-col cols="12" lg="4" xl="4" v-if="i * 3 - 3 < cards.length">
                <div class="owl-item active">
                    <div class="item">
                        <div style="box-shadow: 0px 0px 30px 0px rgb(0 0 0 / 10%); height: 183px;
                            border: 1px solid transparent; border-left: solid 10px #ede8e4; position: relative;
                            display: block;
                            border: 1px solid #ede8e4;
                            border-radius: var(--roofsie-bdr-radius);
                            background-color: rgb(255, 255, 255);
                            padding: 20px 20px 15px;
                            -webkit-transition: all 500ms ease;
                            transition: all 500ms ease;">
                            <div class="testimonial-one__client-info" style="height:100px;">
                                <div class="testimonial-one__client-img-box" style="position: absolute; border-radius: 0; background: no-repeat;">
                                    <div class="testimonial-one__client-img" 
                                        style="padding-right: 5px; border-right: solid 6px #6f6f6e;">
                                        <img style="width: 95% !important; border-radius: 0;" :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + cards[i * 3 - 3].id_page + '/' + cards[i * 3 - 3].imagen" alt="">
                                    </div>
                                </div>
                                <div class="testimonial-one__client-details" style="margin-left: 100px;">
                                    <h4 class="testimonial-one__client-name" style="font-size:16px; font-size:16px; font-weight: 500; line-height: 20px;">{{ cards[i * 3 - 3].titulo }}</h4>
                                    <p class="testimonial-one__client-sub-title" style="font-size: 18px; font-weight: 800;">{{ cards[i * 3 - 3].subtitulo }}</p>
                                </div>
                            </div>
                            <hr style="margin-bottom: 7px; padding-top: 2px;"/>
                            <div style="padding-top: 5px; text-align: center;" class="testimonial-one__text" v-html="cards[i * 3 - 3].bajada"></div>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" lg="4" xl="4" v-if="i * 3 - 2 < cards.length">

                <div class="owl-item active">
                    <div class="item">
                        <div style="box-shadow: 0px 0px 30px 0px rgb(0 0 0 / 10%); border: 1px solid transparent; border-left: solid 10px #ede8e4; position: relative;
                            height: 183px;
                            display: block;
                            border: 1px solid #ede8e4;
                            border-radius: var(--roofsie-bdr-radius);
                            background-color: rgb(255, 255, 255);
                            padding: 20px 20px 15px;
                            -webkit-transition: all 500ms ease;
                            transition: all 500ms ease;">
                            <div class="testimonial-one__client-info" style="height:100px;">
                                <div class="testimonial-one__client-img-box" style="position: absolute; border-radius: 0; background: no-repeat;">
                                    <div class="testimonial-one__client-img" style="padding-right: 5px; border-right: solid 6px #6f6f6e;">
                                        <img style="width: 95% !important; border-radius: 0;" :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + cards[i * 3 - 2].id_page + '/' + cards[i * 3 - 2].imagen" alt="">
                                    </div>
                                </div>
                                <div class="testimonial-one__client-details" style="margin-left: 100px;">
                                    <h4 class="testimonial-one__client-name" style="font-size:16px; font-weight: 500; line-height: 20px;">{{ cards[i * 3 - 2].titulo }}</h4>
                                    <p class="testimonial-one__client-sub-title" style="font-size: 18px; font-weight: 800;">{{ cards[i * 3 - 2].subtitulo }}</p>
                                </div>
                            </div>
                            <hr style="margin-bottom: 7px; padding-top: 2px;"/>
                            <p style="text-align:center; padding-top: 5px;" class="testimonial-one__text" v-html="cards[i * 3 - 2].bajada"></p>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" lg="4" xl="4" v-if="i * 3 - 1 < cards.length">
                <div class="owl-item active">
                    <div class="item">
                        <div style="box-shadow: 0px 0px 30px 0px rgb(0 0 0 / 10%); height: 183px; border: 1px solid transparent; border-left: solid 10px #ede8e4; position: relative;
                            display: block;
                            border: 1px solid #ede8e4;
                            border-radius: var(--roofsie-bdr-radius);
                            background-color: rgb(255, 255, 255);
                            padding: 20px 20px 15px;
                            -webkit-transition: all 500ms ease;
                            transition: all 500ms ease;">
                            <div class="testimonial-one__client-info" style="height:100px;">
                                <div class="testimonial-one__client-img-box"  style="position: absolute; border-radius: 0; background: no-repeat;">
                                    <div class="testimonial-one__client-img" style="padding-right: 5px; border-right: solid 6px #6f6f6e;">
                                        <img style="width: 95% !important; border-radius: 0;" :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + cards[i * 3 - 1].id_page + '/' + cards[i * 3 - 1].imagen" alt="">
                                    </div>
                                </div>
                                <div class="testimonial-one__client-details" style="margin-left: 100px;">
                                    <h4 class="testimonial-one__client-name" style="font-size:16px; font-size:16px; font-weight: 500; line-height: 20px;">{{ cards[i * 3 - 1].titulo }}</h4>
                                    <p class="testimonial-one__client-sub-title" style="font-size: 18px; font-weight: 800;">{{ cards[i * 3 - 1].subtitulo }}</p>
                                </div>
                            </div>
                            <hr style="margin-bottom: 7px; padding-top: 2px;"/>
                            <div style="padding-top: 5px; text-align: center;" class="testimonial-one__text" v-html="cards[i * 3 - 1].bajada"></div>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
.elipsis {
    display: block;
    display: -webkit-box;
    max-width: 100%;
    margin: 0 auto;
    line-height: 1.5;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
<script>
export default {
    data: () => ({
        cards: null,
        filas: 0,
        seccion: null,
    }),
    props: {
        id: {
            type: [Number, String],
            default: 0,
        },
        tipo: {
            type: [Number, String],
            default: "",
        },
    },
    async mounted() {
        try {
            this.seccion = (await this.$http.get("/Seccion/getByPk?pk=" + this.id)).data;
            this.cards = (await this.$http.get("/Card/readActivas?id_seccion=" + this.id)).data;
            if (this.cards != null && this.cards != 'undefined') {
                var cant = this.cards.length;
                if (cant / 4 < 1) {
                    this.filas = 1;
                }
                else {
                    var mod = cant % 4;
                    if (mod > 0) {
                        this.filas = cant + 1;
                    }
                    else {
                        this.filas = cant;
                    }
                }
            }
        } catch (error) { }
    },
    components: {

    },
}
</script>