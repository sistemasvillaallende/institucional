<template>
    <!--Services One Start-->
    <v-container v-if="event != null && event != 'undefined'" style=" border-bottom: solid lightgray; margin-top:30px;">
        <v-row style="margin-bottom: 20px;">
            <v-col cols="12" md="12" sm="12" xs="12" lg="2" xl="2" style="background-color: transparent; padding: 0;">
                <img style="height: 100%; width: 100%; border-radius: 15px;"
                    :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + event.id_page + '/' + event.imagen" />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" lg="7" xl="7" style="padding-left:20px;  align-items: center; 
                 background-color: var(--roofsie-blanco);">
                <v-row>
                    <v-col cols="12">
                        <h4 style="font-weight: 800;">{{ event.nombre }}</h4>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" sm="12" xs="12" lg="3" xl="3" style="padding-top:0px;">
                        <v-card class="mx-auto" elevation="10">
                            <v-system-bar
                                style="padding: 15px; height:auto; text-align:center; background-color: var(--roofsie-gray);">
                                <h2 style="color:white; width: 100%; text-align: center; font-size: 16px;">{{ event.mes
                                }}
                                </h2>
                            </v-system-bar>

                            <div style="text-align:center;    height: 80px;">
                                <p style="width: 100%;
                            font-size: 30px;
                            font-weight: 800;
                            margin-top: 10px;    margin-bottom: 0px;">{{ event.dia }}
                                </p>
                                <p style="width:100%; font-size: 16px;">{{ event.hora_desde }}hs.</p>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="12" sm="12" xs="12" lg="9" xl="9"
                        style="align-items: center; background-color: white;">
                        <div v-html="event.descripcion"></div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" lg="3" xl="3" style="background-color: white;">
                <v-list>
                    <v-list-item-group color="primary">
                        <v-list-item>
                            <v-list-item-icon style="margin-right: 0px;">
                                <i class="fa fa-credit-card"
                                    style="color: var(--roofsie-white); margin-right: 20px;"></i>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title style="color: var(--roofsie-black); font-weight: 700;">${{
                                event.precio }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="dialog_ubicacion_vista = true">
                            <v-list-item-icon style="margin-right: 0px;">
                                <i class="fa fa-map-marker"
                                    style="color: var(--roofsie-white); margin-right: 20px;"></i>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title style="color: var(--roofsie-black); font-weight: 700;">{{ event.lugar
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="dialog_mas_info = true">
                            <v-list-item-icon style="margin-right: 0px;">
                                <i class="fa fa-info-circle"
                                    style="color: var(--roofsie-white); margin-right: 20px;"></i>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title style="color: var(--roofsie-black); font-weight: 700;">Mas
                                    Información...</v-list-item-title>
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
                    {{ this.event.lugar }}
                    <hr style="border: solid 1px lightgrey;
              margin-top: 10px;
              margin-bottom: 10px;" />
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" style="text-align:center;">
                            <div v-html="event.mapa" class="map-responsive"></div>
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
        <!--MODAL VER MAS INFORMACION-->
        <v-dialog v-model="dialog_mas_info" max-width="60%">
            <template v-slot:activator="{ on, attrs }">
            </template>
            <v-card>
                <v-card-title class="text-h5" style="text-align:center; display: block;">
                    Mas Información
                    <hr style="border: solid 1px lightgrey;
              margin-top: 10px;
              margin-bottom: 10px;" />
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" style="text-align:center;">
                            <div v-html="event.mas_informacion"></div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog_mas_info = false">
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
        dialog_mas_info: false,
        dialog_ubicacion_vista: false,
        modal_ubicacion_vista: {
            direccion: "",
            mapa: "",
        },
        event: null,
        items: [
            { text: 'Casa de la cultura', icon: 'fa fa-map-marker' },
            { text: 'Mas Informacion', icon: 'fa fa-info' },
        ],
    }),
    async mounted() {
        try {
            this.event = (await this.$http.get("/Evento/getByPk?id=" +
                this.$route.params.id)).data;
        } catch (error) { }
    },
    props: {
        event_prop: {
            type: Object,
        },
    }
}
</script>