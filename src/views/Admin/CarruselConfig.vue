<template>
    <div v-if="slides != null && slides != 'undefined'">
        <Header></Header>
        <v-container style="margin-top:50px; border: solid 1px lightgray;
                                        border-radius: 15px; margin-bottom: 50px; min-height: 350px;;">
            <v-row>
                <v-col cols="6">
                    <h3>Configuracion de Carrusel</h3>
                </v-col>
                <v-col cols="6" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="salir()">Salir</v-btn>&nbsp;
                    <v-btn class="btn btn-primary" @click="agregarContenido()">Agregar Slide</v-btn>
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
                        <Draggable :list="slides" tag="tbody" @end="saveorden()">
                            <tr v-for="(item, index) in slides" :key="index" :style="[
                                item.activo
                                    ? { padding: '5px' }
                                    : {
                                        'background-color': '#d3d3d359',
                                        opacity: '0.5',
                                    },
                            ]" style="border:solid 1px lightgrey;">
                                <td><img style="height: 80px;"
                                        :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + item.id_page + '/' + item.img" />
                                </td>
                                <td>
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
                                                <v-btn text @click="editarContenido(item.id, item.img, item.titulo, item.bajada, item.callToAction, item.callToActionTipo, item.callToActionLink, item.imgDerecha, item.callToActionTarget, item.id_page_destino)
                                                ">
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
                                                    prepend-icon="mdi-paperclip">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip small label color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                                <img style="height: 80px;"
                                                    :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + id_page + '/' + img" />

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
                                            <v-text-field v-model="titulo" label="Titulo del Slide"
                                                placeholder="Titulo del Slide">
                                            </v-text-field>
                                            <span>SubTitulo del Slide</span>
                                            <VueEditor v-model="bajada"></VueEditor>
                                        </v-col>
                                        <v-col cols="6" style="margin-top:18px;">
                                            <v-text-field v-model="callToAction" label="Texto Call to Action"
                                                placeholder="Texto Call to Action">
                                            </v-text-field>
                                            <v-select :items="itemsdestino" v-model="select"
                                                label="Destino de la acción">
                                            </v-select>
                                            <v-select :items="items" label="Target" v-model="selecttarget"></v-select>
                                            <v-text-field v-model="callToActionLink" label="URL Externa"
                                                v-if="select == 'Externa'"
                                                placeholder="URL Externa (https://misitio.com)">
                                            </v-text-field>

                                            <v-select :items="paginas" item-text="nombre" item-value="id" v-else
                                                v-model="input.id" label="Paginas del sitio"></v-select>

                                            <div style="text-align:right; padding-top:50px;">
                                                <v-btn @click="dialogContenido.value = false" class="btn btn-primay">
                                                    Cancelar
                                                </v-btn>&nbsp;
                                                <v-btn @click="crearModificarSlide()" class="btn btn-primay">Guardar
                                                </v-btn>
                                            </div>
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
</template>
<style scoped>

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
            slides: null,
            id_contenido: 0,
            titulo_contenido: "",
            contenido_contenido: "",
            id: "",
            titulo: "",
            bajada: "",
            callToAction: "",
            callToActionTipo: "",
            callToActionLink: "",
            imgDerecha: "",
            img: "",
            id_page_destino: 0,
            id_page: 0,
            callToActionTarget: "",
            paginas: null,
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
            this.slides = (await this.$http.get("/Carrusel/read?id_page=" + this.$route.params.id)).data;
            this.paginas = (await this.$http.get("/Paginas/read")).data;
        } catch (error) { }
    },
    methods: {
        subirImgFondo() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                InstFormData.append('file', this.files);
                InstFormData.append('id', this.id);
                InstFormData.append('idPagina', this.$route.params.id);
                InstFormData.append('tipo', 'CARRUSEL');

                this.slides = (this.$http.post("/Paginas/UploadFile", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
                const resultado = this.slides.find(slide => slide.id === this.id);
                this.img = resultado.img;
            }
        },
        async crearModificarSlide() {
            if (this.select == "Interna") {
                this.callToActionLink = "/Page/" + this.input.id;
                this.id_page_destino = this.input.id;
            }

            let post = {
                id: this.id,
                titulo: this.titulo,
                bajada: this.bajada,
                callToAction: this.callToAction,
                callToActionTipo: this.select,
                callToActionTarget: this.selecttarget,
                callToActionLink: this.callToActionLink,
                id_page_destino: this.id_page_destino,
            };
            if (this.id == 0) {
                this.slides = (await this.$http.post("/Carrusel/insert", post)).data;
                this.dialogOk = true;
                this.id = this.slides[this.slides.length - 1];
            }
            else {
                this.slides = (await this.$http.post("/Carrusel/update", post)).data;
                this.dialogOk = true;
                this.dialogContenido = false;
            }

        },
        async activa_desactiva(id, estado) {
            let post = {
                id: id,
                activo: estado,
                id_page: this.$route.params.id,
            };
            this.slides = (await this.$http.post("/Carrusel/updateActiva", post)).data;
            this.closeOnContentClick = false;
        },

        salir() {
            if(this.$route.params.id != 0)
                this.$router.push("/PageConfig/" + this.$route.params.id);
            else
                this.$router.push("/Home/");
        },
        agregarContenido() {
            this.id = 0;
            this.img = "";
            this.titulo = "";
            this.bajada = "";
            this.callToAction = "";
            this.callToActionTipo = "";
            this.callToActionLink = "";
            this.callToActionTarget = ""
            this.imgDerecha = "";
            this.dialogContenido = true;
            this.id_page_destino = 0;
        },
        editarContenido(id, img, titulo, bajada, callToAction, callToActionTipo, callToActionLink, imgDerecha, callToActionTarget, id_page_destino) {
            this.id = id;
            this.img = img;
            this.titulo = titulo;
            this.bajada = bajada;
            this.callToAction = callToAction;
            this.callToActionTipo = callToActionTipo;
            this.callToActionLink = callToActionLink;
            this.callToActionTarget = callToActionTarget
            this.imgDerecha = imgDerecha;
            this.dialogContenido = true;
            this.id_page_destino = id_page_destino;

            this.select = callToActionTipo;
            this.selecttarget = callToActionTarget;
            this.input.id = id_page_destino;
        },
        async saveorden() {
            (await this.$http.post("/Carrusel/updateOrden", this.slides));
        },
        logicDelete(id) {
            this.id = id;
            this.dialogDelete = true;
        },
        async confirmaDeleteSeccion() {
            try {
                let post = {
                    id: this.id,
                    id_page: this.$route.params.id,
                };
                this.slides = (await this.$http.post("/Carrusel/delete", post)).data;
                this.dialogDelete = false;
            } catch (error) { }
        },
    },

};
</script>