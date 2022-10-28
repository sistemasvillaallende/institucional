<template>
    <div v-if="news != null && news != 'undefined'">
        <Header></Header>

        <v-container style="margin-top:50px; border: solid 1px lightgray; min-height: 400px;
                                        border-radius: 15px; margin-bottom: 50px;">
            <v-row>
                <v-col cols="6">
                    <h3>Noticias</h3>
                </v-col>
                <v-col cols="6" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="salir()">Salir</v-btn>&nbsp;
                    <v-btn class="btn btn-primary" @click="agregarContenido()">Agregar Noticias</v-btn>
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
                        <Draggable :list="news" tag="tbody" @end="saveorden()">
                            <tr v-for="(item, index) in news" :key="index" :style="[
                                item.activo
                                    ? { padding: '5px' }
                                    : {
                                        'background-color': '#d3d3d359',
                                        opacity: '0.5',
                                    },
                            ]">
                                <td style="width:15%; height: 80px;
    padding-bottom: 10px;"><img style="height:100%;"
                                        :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + item.id_page + '/' + item.img"
                                        aspect-ratio="1" class="grey lighten-2" /></td>
                                <td>{{ item.titulo }}</td>
                                <td>
                                    <v-menu top :close-on-content-click="closeOnContentClick">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text v-bind="attrs" v-on="on" style="float: right">
                                                <v-icon class="fa fa-bars"></v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                                <v-btn text @click="editarContenido(item.id, item.titulo, item.fecha, item.img, item.cuerpo, item.id_page)
                                                ">
                                                    <v-icon small class="fa fa-edit"></v-icon>&nbsp; Editar
                                                </v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-btn text :href="'/GaleriaNewsConfig/' + item.id">
                                                    <v-icon small class="fa fa-camera"></v-icon>&nbsp; Imagenes
                                                </v-btn>
                                            </v-list-item>                                            
                                            <v-list-item>
                                                <SubirArchivos :id_news="item.id"></SubirArchivos>
                                            </v-list-item>                                            
                                            <v-list-item>
                                                <v-btn text v-if="item.activo"
                                                    @click="activa_desactiva(item.id, false, item.seccion)">
                                                    <v-icon left class="fa fa-eye"></v-icon>
                                                    Desactivar
                                                </v-btn>
                                                <v-btn text v-else
                                                    @click="activa_desactiva(item.id, true, item.seccion)">
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
        <v-dialog transition="dialog-top-transition" max-width="80%" v-model="dialogContenido">
            <template v-slot:default="dialogContenido">
                <v-card>
                    <v-toolbar style="
                                background-color: green !important;
                                border-color: green !important;
                                " dark>Contenido</v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="3">
                                    <img style="width:80%;"
                                        :src="imagen"
                                        aspect-ratio="1" class="grey lighten-2" />
                                </v-col>
                                <v-col cols="9">
                                    <v-row>
                                        <v-col cols="8">
                                            <v-text-field v-model="titulo" style="margin-top:40px;"
                                                placeholder="Titulo de la noticia"></v-text-field>
                                        </v-col>
                                        <v-col cols="4" style="padding-top: 50px;">
                                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent
                                                width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="date" label="Fecha"
                                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="date" scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="modal = false">
                                                        Cancelar
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs.dialog.save(date)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-file-input style="padding-top:5px;" v-model="files" multiple
                                                truncate-length="15" placeholder="Subir imagenes" label="Subir imagenes"
                                                prepend-icon="fa fa-upload">
                                                <template v-slot:selection="{ text }">
                                                    <v-chip small label color="primary">
                                                        {{ text }}
                                                    </v-chip>
                                                </template>
                                            </v-file-input>
                                        </v-col>
                                    </v-row>
                                </v-col>

                            </v-row>

                            <v-row>
                                <v-col cols="12">
                                    <h4 style="font-size: 20px;  margin-bottom: 10px;">Contenido de la sección</h4>
                                    <VueEditor v-model="cuerpo"></VueEditor>

                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialogContenido.value = false">Cancelar</v-btn>
                                        <v-btn text @click="guardarContenido()">Guardar</v-btn>
                                    </v-card-actions>
                                </v-col>
                            </v-row>

                        </v-container>
                    </v-card-text>
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
                            ¿Esta seguro de eliminar la noticia?
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
import { VueEditor } from 'vue2-editor';
import SubirArchivos from "../../components/SubirArchivos.vue";
export default {
    data: () => {
        return {
            imagen: "",
            files: [],
            dialogDelete: false,
            dialogOk: false,
            dialogContenido: false,
            closeOnContentClick: false,
            news: null,
            id: 0,
            titulo: "",
            fecha: "",
            img: "",
            cuerpo: "",
            seccion: 0,
            pricipal: false,
            titulo: "",
            fecha: "",
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            _seccion: null,
        };
    },
    components: {
        Header,
        Footer,
        Draggable,
        VueEditor,
        SubirArchivos,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.news = (await this.$http.get("/News/getBySeccion?seccion=" + this.$route.params.id)).data;
            this._seccion = (await this.$http.get("/Seccion/getByPk?pk=" + this.$route.params.id)).data;
        } catch (error) { }
    },
    methods: {
        async activa_desactiva(id, estado, seccion) {
            let post = {
                id: id,
                activo: estado,
                seccion: seccion,
                _fecha: "",
            };
            this.news = (await this.$http.post("/News/activaDesactiva", post)).data;
            this.closeOnContentClick = false;
        },
        salir() {
            if(this.$route.params.id != 0)
                this.$router.push("/PageConfig/" + this._seccion.id_page);
            else
                this.$router.push("/Home/");
        },

        agregarContenido() {
            this.id = 0;
            this.titulo = "";
            this.fecha = "";
            this.img = "";
            this.cuerpo = "";
            this.seccion = this.$route.params.id;
            this.pricipal = false;
            this.dialogContenido = true;
        },
        editarContenido(id, titulo, fecha, img, cuerpo, id_page) {
            this.imagen = this.$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + id_page + '/' + img
            this.id = id;
            this.titulo = titulo;
            this.fecha = fecha;
            const opciones = { year: 'numeric', month: '', day: 'numeric' };
            this.date = new Date(Date.parse(fecha)).toISOString().substr(0, 10);
            this.img = img;
            this.cuerpo = cuerpo;
            this.seccion = this.$route.params.id;
            this.pricipal = false;
            this.dialogContenido = true;
        },
        async guardarContenido() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                for (var index = 0; index < this.files.length; index++) {
                    InstFormData.append('file[]', this.files[index]);
                }
                InstFormData.append('id', this.id);
                InstFormData.append('titulo', this.titulo);
                InstFormData.append('fecha', this.date);
                InstFormData.append('img', this.img);
                InstFormData.append('cuerpo', this.cuerpo);
                InstFormData.append('seccion', this.$route.params.id);
                InstFormData.append('pricipal', false);
                InstFormData.append('tipo', 'NOTICIAS');

                this.news = (await this.$http.post("/News/UploadFile", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
            }
            else {
                let post = {
                    id: this.id,
                    titulo: this.titulo,
                    fecha: this.date,
                    cuerpo: this.cuerpo,  
                    _fecha: this.date,   
                    seccion: this.seccion,              
                };
                this.news = (await this.$http.post("/News/insertUpdate", post)).data;
            }
            this.news = (await this.$http.get("/News/getBySeccion?seccion=" + this.$route.params.id)).data;
            this.dialogOk = true;
            this.dialogOk = true;
            this.dialogContenido = false;
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