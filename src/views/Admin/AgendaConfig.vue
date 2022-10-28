<template>
    <div v-if="eventos != null && eventos != 'undefined'">
        <Header></Header>

        <v-container style="margin-top:50px; border: solid 1px lightgray; min-height: 400px;
                                        border-radius: 15px; margin-bottom: 50px;">
            <v-row>
                <v-col cols="6">
                    <h3>Agenda</h3>
                </v-col>
                <v-col cols="6" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="salir()">Salir</v-btn>&nbsp;
                    <v-btn class="btn btn-primary" @click="agregarContenido()">Agregar Evento</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <hr />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <table style="width: 100%">
                        <tr v-for="(item, index) in eventos" :key="index" :style="[
                            item.activo
                                ? { padding: '5px' }
                                : {
                                    'background-color': '#d3d3d359',
                                    opacity: '0.5',
                                },
                        ]">
                            <td style="width:15%; height: 80px;
                                    padding-bottom: 10px;"><img style="height:100%;"
                                    :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + item.id_page + '/' + item.imagen"
                                    aspect-ratio="1" class="grey lighten-2" /></td>
                            <td>{{ item._fecha }}</td>
                            <td>{{ item.hora_desde }}</td>
                            <td>{{ item.nombre }}</td>
                            <td>
                                <v-menu top :close-on-content-click="closeOnContentClick">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn text v-bind="attrs" v-on="on" style="float: right">
                                            <v-icon class="fa fa-bars"></v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-btn text @click="editarContenido(item.id)
                                            ">
                                                <v-icon small class="fa fa-edit"></v-icon>&nbsp; Editar
                                            </v-btn>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-btn text v-if="item.activo"
                                                @click="activa_desactiva(item.id, false, item.id_seccion)">
                                                <v-icon left class="fa fa-eye"></v-icon>
                                                Desactivar
                                            </v-btn>
                                            <v-btn text v-else
                                                @click="activa_desactiva(item.id, true, item.id_seccion)">
                                                <v-icon left class="fa fa-eye-slash"></v-icon>
                                                Activar
                                            </v-btn>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-btn text @click="logicDelete(item.id)">
                                                <v-icon small class="fa fa-remove"></v-icon>&nbsp; Eliminar
                                            </v-btn>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </td>
                        </tr>
                    </table>
                </v-col>
            </v-row>
        </v-container>
        <Footer></Footer>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogOk">
            <template v-slot:default="dialogOk">
                <v-card>
                    <v-toolbar style="
              background-color: green !important;
              border-color: green !important;
            " dark>Felicidades!</v-toolbar>
                    <v-card-text>
                        <div style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              ">
                            Los datos se actualizaron de forma correcta
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogOk.value = false">Salir</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogDelete">
            <template v-slot:default="dialogDelete">
                <v-card>
                    <v-toolbar style="
              background-color: red !important;
              border-color: red !important;
            " dark>
                        <v-card-title>Confirmar</v-card-title>
                    </v-toolbar>
                    <v-card-text>
                        <div style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              ">
                            ¿Esta seguro de eliminar el evento?
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogDelete.value = false">Cancelar</v-btn>
                        <v-btn text @click="confirmaDeleteSeccion()">Eliminar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>
<style scoped>

</style>
<script>
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
import SubirArchivos from "../../components/SubirArchivos.vue";
import { VueEditor } from 'vue2-editor'
export default {
    data: () => {
        return {
            dialogDelete: false,
            dialogOk: false,
            closeOnContentClick: false,
            eventos: null,
        };
    },
    components: {
        Header,
        Footer,
        SubirArchivos,
        VueEditor,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.eventos = (await this.$http.get("/Evento/read?idSeccion=" + this.$route.params.id)).data;
        } catch (error) { }
    },
    methods: {
        async activa_desactiva(id, estado, seccion) {
            let post = {
                id: id,
                activo: estado,
                id_seccion: seccion,
            };
            this.eventos = (await this.$http.post("/Evento/updateActiva", post)).data;
            this.closeOnContentClick = false;
        },
        salir() {
            this.$router.push("/PageConfig/" + this.$route.params.id_page);
        },

        agregarContenido() {
            this.$router.push("/EventoConfig/0/" + this.$route.params.id);
        },
        editarContenido(id) {
            this.$router.push("/EventoConfig/" + id + "/" + this.$route.params.id);
        },

        async saveorden() {
            (await this.$http.post("/News/reordenarContenido", this.news));
        },
        logicDelete(id) {
            this.id = id;
            this.dialogDelete = true;
        },
        async confirmaDeleteSeccion() {
            try {
                let post = {
                    id: this.id,
                    seccion: this.$route.params.id,
                    _fecha: "",
                };
                this.news = (await this.$http.post("/News/delete", post)).data;
                this.dialogDelete = false;
            } catch (error) { }
        },
    },
};
</script>