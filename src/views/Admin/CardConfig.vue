<template>
    <div v-if="cards != null && cards != 'undefined'">
        <Header></Header>
        <v-container style="margin-top:50px; border: solid 1px lightgray; border-radius: 15px;">
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="seccion.titulo" placeholder="Titulo de la Sección"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="seccion.subtitulo" placeholder="Subtitulo de la Sección"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="salir()">Salir</v-btn>&nbsp;
                    <v-btn class="btn btn-primary" @click="updateSeccion()">Guardar</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container
            style="margin-top:50px; border: solid 1px lightgray; border-radius: 15px; margin-bottom: 50px; min-height: 350px;;">
            <v-row>
                <v-col cols="6">
                    <h3>Configuracion de Tarjetas</h3>
                </v-col>
                <v-col cols="6" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="agregarContenido()">Agregar Tarjeta</v-btn>
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
                        <Draggable :list="cards" tag="tbody" @end="saveorden()">
                            <tr v-for="(item, index) in cards" :key="index" :style="[
    item.activo
        ? { padding: '5px' }
        : {
            'background-color': '#d3d3d359',
            opacity: '0.5',
        },
]" style="border:solid 1px lightgrey;">
                                <td style="padding:10px;"><img style="height: 80px;"
                                        :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + item.id_page + '/' + item.imagen" />
                                </td>
                                <td style="padding:10px;">
                                    <div><strong v-html="item.titulo"></strong></div>
                                    <div><small v-html="item.bajada"></small></div>
                                </td>
                                <td>
                                    <v-menu top :close-on-content-click="closeOnContentClick">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text v-bind="attrs" v-on="on" style="float: right">
                                                <v-icon class="fa fa-bars"></v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                                <v-btn text
                                                    @click="editarContenido(item.id, item.imagen, item.titulo, item.subtitulo, item.bajada, item.callToActionTexto, item.callToActionlink, item.callToActionTarget, item.callToActionTipo)">
                                                    <v-icon small class="fa fa-edit"></v-icon>&nbsp; Editar
                                                </v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-btn text v-if="item.activo"
                                                    @click="activa_desactiva(item.id, false)">
                                                    <v-icon left class="fa fa-eye"></v-icon>
                                                    Desactivar
                                                </v-btn>
                                                <v-btn text v-else @click="activa_desactiva(item.id, true)">
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
                        </Draggable>
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

        <v-dialog transition="dialog-top-transition" max-width="70%" v-model="dialogContenido">
            <template v-slot:default="dialogContenido">
                <v-container style="background-color: white;">
                    <v-row>
                        <v-card v-if="id != 0">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="8">
                                                <v-file-input style="padding-top:5px;" v-model="files"
                                                    placeholder="Subir imagen" label="Subir imagen"
                                                    prepend-icon="fa fa-upload">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip small label color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                                <img style="height: 80px;"
                                                    :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + id_page + '/' + imagen" />

                                            </v-col>
                                            <v-col cols="4" style="padding-top: 35px; text-align:right;">
                                                <v-btn class="btn btn-promary" @click="subirImgFondo()"><span
                                                        class="fa fa-upload"></span> Subir

                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <!--<v-col cols="6">
                                        <v-row>
                                            <v-col cols="8">
                                                <v-file-input style="padding-top:25px;" v-model="files2" multiple
                                                    truncate-length="15" placeholder="Imagen Fondo" label="Imagen Fondo"
                                                    prepend-icon="fa fa-upload">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip small label color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                                <img  style="height: 80px;"
                                                    :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + id_page + '/' + imgDerecha" />
                                            </v-col>
                                            <v-col cols="4" style="padding-top: 35px; text-align:right;">
                                                <v-btn class="btn btn-promary"><span class="fa fa-upload"></span> Subir

                                                </v-btn>
                                            </v-col>
                                        </v-row>

                                    </v-col>-->
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-card>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="6" style="margin-top:25px;">
                                            <v-text-field v-model="titulo" label="Titulo de la tarjeta"
                                                placeholder="Titulo de la tarjeta">
                                            </v-text-field>
                                            <v-text-field v-model="subtitulo" label="Sub Titulo de la tarjeta"
                                                placeholder="Sub Titulo de la tarjeta">
                                            </v-text-field>
                                            <span>Texto de la tarjeta</span>
                                            <VueEditor v-model="bajada"></VueEditor>
                                            <div style="text-align:right; padding-top:50px;">
                                                <v-btn @click="dialogContenido.value = false" class="btn btn-primay">
                                                    Cancelar
                                                </v-btn>&nbsp;
                                                <v-btn @click="crearModificarSlide()" class="btn btn-primay">Guardar
                                                </v-btn>
                                            </div>                                            
                                        </v-col>
                                        <v-col cols="6" style="margin-top:18px;" v-if="seccion.tipo == 8">
                                            <v-text-field v-model="callToActionTexto" label="Texto Call to Action"
                                                placeholder="Texto Call to Action">
                                            </v-text-field>
                                            <v-select :items="itemsdestino" v-model="select"
                                                label="Destino de la acción">
                                            </v-select>
                                            <v-select :items="items" label="Target" v-model="selecttarget"></v-select>
                                            <v-text-field v-model="callToActionlink" label="URL Externa"
                                                v-if="select == 'Externa'"
                                                placeholder="URL Externa (https://misitio.com)">
                                            </v-text-field>

                                            <v-select :items="paginas" item-text="nombre" item-value="id" v-else
                                                v-model="input.id" label="Paginas del sitio"></v-select>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

            </template>
        </v-dialog>

        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogDelete">
            <template v-slot:default="dialogDelete">
                <v-card>
                    <v-toolbar style="background-color: red !important; border-color: red !important;" dark>
                        <v-card-title>Confirmar</v-card-title>
                    </v-toolbar>
                    <v-card-text>
                        <div style="margin-top: 20px;text-align: center; color: black; font-size: 20px; font-family: 'DM Sans';">
                            ¿Esta seguro de eliminar el contenido?
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
</template><style scoped>

</style>
<script>
import Draggable from "vuedraggable";
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
import { VueEditor } from 'vue2-editor'
export default {
    data: () => {
        return {
            input: {
                id: 0,
            },
            select: "Interna",
            itemsdestino: ['Interna', 'Externa'],
            items: ['_blank', '_self'],
            selecttarget: "_self",
            files: [],
            dialogArchivos: false,
            dialogDelete: false,
            dialogOk: false,
            dialogContenido: false,
            closeOnContentClick: false,
            cards: null,
            id_contenido: 0,
            titulo_contenido: "",
            contenido_contenido: "",
            id: "",
            imagen: "",
            titulo: "",
            subtitulo: "",
            bajada: "",
            callToActionTexto: "",
            callToActionlink: "",
            callToActionTarget: "",
            activo: "",
            orden: 0,
            id_page_destino: 0,
            id_page: 0,
            id_seccion: 0,
            callToActionTipo: "",
            paginas: null,
            seccion: null,
        };
    },
    components: {
        Header,
        Footer,
        Draggable,
        VueEditor,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.cards = (await this.$http.get("/Card/read?id_seccion=" + this.$route.params.id_seccion)).data;
            this.paginas = (await this.$http.get("/Paginas/read")).data;
            this.id_page = this.$route.params.id_page;
            this.seccion = (await this.$http.get("/Seccion/getByPk?pk=" + this.$route.params.id_seccion)).data;
        } catch (error) { }
    },
    methods: {
        subirImgFondo() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                InstFormData.append('file', this.files);
                InstFormData.append('idSeccion', this.$route.params.id_seccion);
                InstFormData.append('idCard', this.id);
                InstFormData.append('idPagina', this.$route.params.id_page);

                this.cards = (this.$http.post("/Card/UploadFile", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
                const resultado = this.cards.find(card => card.id === this.id);
                this.imagen = resultado.imagen;
            }
        },
        async crearModificarSlide() {
            if (this.select == "Interna") {
                this.callToActionlink = "/Page/" + this.input.id;
                this.id_page_destino = this.input.id;
            }

            let post = {
                id: this.id,
                titulo: this.titulo,
                subtitulo: this.subtitulo,
                bajada: this.bajada,
                callToActionTexto: this.callToActionTexto,
                callToActionTipo: this.select,
                callToActionTarget: this.selecttarget,
                callToActionlink: this.callToActionlink,
                id_page_destino: this.id_page_destino,
                id_seccion: this.$route.params.id_seccion
            };
            if (this.id == 0) {
                this.cards = (await this.$http.post("/Card/insert", post)).data;
                this.dialogOk = true;
                this.id = this.cards[this.cards.length - 1];
            }
            else {
                this.cards = (await this.$http.post("/Card/update", post)).data;
                this.dialogOk = true;
                this.dialogContenido = false;
            }

        },
        async activa_desactiva(id, estado) {
            let post = {
                id: id,
                activo: estado,
                id_seccion: this.$route.params.id_seccion,
            };
            this.cards = (await this.$http.post("/Card/updateActiva", post)).data;
            this.closeOnContentClick = false;
        },

        salir() {
            if (this.$route.params.id != 0)
                this.$router.push("/PageConfig/" + this.$route.params.id_page);
            else
                this.$router.push("/Home/");
        },
        agregarContenido() {
            this.id = 0;
            this.imagen = "";
            this.titulo = "";
            this.subtitulo = "";
            this.bajada = "";
            this.callToActionTexto = "";
            this.callToActionTipo = "";
            this.callToActionlink = "";
            this.callToActionTarget = ""
            this.activo = "";
            this.dialogContenido = true;
            this.id_page_destino = 0;
        },
        editarContenido(id, imagen, titulo, subtitulo, bajada, callToActionTexto, callToActionlink, callToActionTarget, callToActionTipo) {
            this.id = id;
            this.imagen = imagen;
            this.titulo = titulo;
            this.subtitulo = subtitulo;
            this.bajada = bajada;
            this.callToActionTexto = callToActionTexto;
            this.callToActionTipo = callToActionTipo;
            this.callToActionlink = callToActionlink;
            this.callToActionTarget = callToActionTarget
            this.dialogContenido = true;
            this.id_page_destino = id_page_destino;
            this.select = callToActionTipo;
            this.selecttarget = callToActionTarget;
            this.input.id = id_page_destino;

            alert(this.bajada);
        },
        async saveorden() {
            (await this.$http.post("/Card/updateOrden", this.cards));
        },
        logicDelete(id) {
            this.id = id;
            this.dialogDelete = true;
        },
        async confirmaDeleteSeccion() {
            try {
                let post = {
                    id: this.id,
                    id_page: this.$route.params.id_page,
                };
                this.slides = (await this.$http.post("/Card/delete", post)).data;
                this.dialogDelete = false;
            } catch (error) { }
        },
        async updateSeccion() {
            let post = {
                id: this.$route.params.id_seccion,
                titulo: this.seccion.titulo,
                subtitulo: this.seccion.subtitulo,
                _tipo: "",
            };
            this.seccion = (await this.$http.post("/Seccion/update", post)).data;
            this.dialogOk = true;
        },
    },

};
</script>