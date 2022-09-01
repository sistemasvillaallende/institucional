<template>
    <!--Services One Start-->
    <v-container>
        <v-row style="margin-bottom: 20px; box-shadow: 10px 10px 5px -6px rgb(0 0 0 / 75%);
    -webkit-box-shadow: 10px 10px 5px -6px rgb(0 0 0 / 75%);
    -moz-box-shadow: 10px 10px 5px -6px rgba(0,0,0,0.75);">
            <v-col cols="12" md="12" sm="12" xs="12" lg="3" xl="3" style="border: solid 1px lightgray; padding: 0;">
                <img style="width: 100%;"
                    src="https://www.neuquencapital.gov.ar/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-25-at-12.47.53-PM-300x300.jpeg" />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" lg="6" xl="6"
                style="padding:20px; display: grid; align-items: center; border: solid 1px lightgray; background-color: white;">

                <div>
                    <h3>Desfile Aniversario de la Ciudad</h3>
                    Bajada de Linea Bajada de Linea Bajada de Linea Bajada de Linea Bajada de Linea Bajada de Linea
                    Bajada de Linea
                    <br/>
                    <a href="#" class="btn btn-outline-warning" target="_blank"
                                            style="padding:10px; font-weight:700; margin-top:30px"> MAS INFORMACIÓN </a>
                </div>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" lg="3" xl="3" style="border: solid 1px lightgray; display: grid; align-items: center; background-color: white;">
                <v-list disabled>
                    <v-list-item-group color="primary">
                        <v-list-item v-for="(item, i) in items" :key="i">
                            <v-list-item-icon style="margin-right: 0px;"> 
                                <i :class="item.icon" style="color: #ffd142; margin-right: 20px;"></i>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text" style="color: #1c1b1f; font-weight: 700;"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>


        <!--MODAL VER UBICACIONES-->
        <v-dialog v-model="dialog_ubicacion_vista" max-width="60%">
            <template v-slot:activator="{ on, attrs }">
            </template>
            <v-card>
                <v-card-title class="text-h5" style="text-align:center; display: block;">
                    {{ this.modal_ubicacion_vista.nombre_general }}
                    <hr style="border: solid 1px lightgrey;
              margin-top: 10px;
              margin-bottom: 10px;" />
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" style="text-align:center;">
                            <p>{{ modal_ubicacion_vista.direccion }}</p>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col cols="12" style="text-align:center;">
                            <div v-html="modal_ubicacion_vista.mapa" class="map-responsive"></div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog_ubicacion_vista = false">
                        Salir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
    <!--Services One End-->

</template>
<style scoped>
.mec-event-list-standard .mec-event-article {
    position: relative;
    display: block;
    margin-bottom: 25px;
    border: 1px solid #e9e9e9;
    box-shadow: 0 2px 0 0 rgb(0 0 0 / 2%);
}

.mec-event-list-standard .mec-topsec {
    display: table;
    width: 100%;
}

.mec-event-list-standard .mec-col-table-c.mec-event-image-wrap {
    vertical-align: top;
}

.mec-event-list-standard .col-md-3.mec-event-image-wrap {
    padding-left: 0;
}

.mec-topsec .mec-event-image {
    line-height: 1px;
}

.mec-topsec .mec-event-image a {
    display: block;
}

.elementor img {
    height: auto;
    max-width: 100%;
    border: none;
    -webkit-border-radius: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.mec-event-list-standard .mec-event-content {
    padding-top: 15px;
    padding-right: 30px;
}

.mec-event-list-standard .mec-event-title {
    font-size: 29px;
    font-weight: 700;
    letter-spacing: -1px;
    margin: 0 0 10px;
}

.mec-wrap .mec-event-article .mec-color-hover {
    box-shadow: none;
    border: none;
}

.mec-event-list-standard .mec-event-title a {
    color: #292929;
    transition: color .3s ease;
}

.mec-event-list-standard .mec-col-table-c.mec-event-meta-wrap {
    padding-top: 15px;
}

.mec-event-list-standard .mec-date-details,
.mec-event-list-standard .mec-local-time-details,
.mec-event-list-standard .mec-time-details,
.mec-event-list-standard .mec-venue-details {
    position: relative;
    padding-left: 28px;
    margin-bottom: 10px;
}

.mec-event-list-standard .mec-event-meta span.mec-event-d,
.mec-event-list-standard .mec-event-meta span.mec-event-m {
    font-size: 17px;
    font-weight: 700;
    padding-right: 6px;
    color: #444;
    text-transform: uppercase;
}

.mec-event-list-standard .mec-date-details,
.mec-event-list-standard .mec-local-time-details,
.mec-event-list-standard .mec-time-details,
.mec-event-list-standard .mec-venue-details {
    position: relative;
    padding-left: 28px;
    margin-bottom: 10px;
}

.mec-event-list-standard .mec-time-details {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 300;
    padding-top: 0;
    text-align: left;
    padding-left: 30px;
}

.mec-event-footer {
    position: relative;
    border-top: 1px solid #efefef;
    padding: 20px;
    min-height: 80px;
    margin: 0;
    background: #fafafa;
}

.mec-event-sharing-wrap {
    left: 15px;
    position: absolute;
    list-style: none;
    margin: 0;
    padding-left: 0;
}

.mec-event-sharing-wrap>li:first-of-type {
    border: 1px solid #d9d9d9;
}

.mec-event-sharing-wrap li.mec-event-share {
    height: 38px;
}

.mec-event-sharing-wrap li {
    text-align: center;
    border: 0;
    display: block;
    margin-right: 2px;
    overflow: hidden;
    margin: 0 auto 6px;
    width: 38px;
}

.mec-event-sharing-wrap li a,
.mec-event-sharing-wrap:hover li ul li a {
    border: none;
    color: #767676;
    display: block;
}

body ul>li:last-child,
body ol>li:last-child {
    padding-bottom: 0;
}

.mec-event-sharing-wrap li {
    text-align: center;
    border: 0;
    display: block;
    margin-right: 2px;
    overflow: hidden;
    margin: 0 auto 6px;
    width: 38px;
}

.mec-event-sharing-wrap .mec-event-sharing {
    position: absolute;
    padding: 8px 0 2px;
    left: -6px;
    bottom: 54px;
    margin: 0;
    margin-top: 6px;
    border-radius: 5px;
    min-width: 50px;
    visibility: hidden;
    opacity: 0;
    border: 1px solid #e2e2e2;
    background: #fff;
    box-shadow: 0 0 9px 0 rgb(0 0 0 / 6%);
    z-index: 99;
    -webkit-transition: all .18s ease;
    transition: all .18s ease;
}

.mec-event-sharing-wrap li {
    text-align: center;
    border: 0;
    display: block;
    margin-right: 2px;
    overflow: hidden;
    margin: 0 auto 6px;
    width: 38px;
}

.mec-event-footer .mec-booking-button {
    box-shadow: none;
    transition: all .21s ease;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: #fff;
    color: #767676;
    border: 1px solid #e8e8e8;
    position: absolute;
    top: 20px;
    right: 15px;
    padding: 0 16px;
    line-height: 37px;
    height: 38px;
}
</style>
<script>
export default {
    data: () => ({
        dialog_ubicacion_vista: false,
        modal_ubicacion_vista: {
                direccion:"",
                mapa: "",
            },
        news: null,
        items: [
            { text: '01 - 31 AGO', icon: 'fa fa-calendar' },
            { text: 'Evento todo el dia', icon: 'fa fa-clock' },
            { text: 'Evento Gratuito', icon: 'fa fa-credit-card' },
            { text: 'Polideportivo Villa Allende', icon: 'fa fa-map-marker' },            
        ],
    }),
    async mounted() {
        try {
            this.news = (await this.$http.get("/News/readHome")).data;
        } catch (error) { }
    },
}
</script>