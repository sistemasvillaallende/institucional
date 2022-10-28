<template>
    <div>
        <Header></Header>
        <v-container style="margin-top: 30px;">
            <v-row>
                <v-col cols="12">
                    <v-tabs v-model="tab">
                        <v-tab href="#tab-1">Principal</v-tab>
                        <v-tab href="#tab-2">Secciones</v-tab>
                        <v-tab href="/Home/" style="float:right;">Salir</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1">
                            <v-card>
                                <v-container style="border: solid 1px lightgray;
                                        margin-top: 10px;
                                        border-radius: 15px;">
                                    <v-row>
                                        <v-col cols="8">
                                            <h4>Activar / Desactivar contenido Principal</h4>
                                        </v-col>
                                        <v-col cols="4" style="text-align: right;">
                                            <v-btn v-if="pagina.seccion_pricipal"
                                                @click="activaDesactiva(false)">
                                                <span class="fa fa-eye"></span>
                                            </v-btn>
                                            <v-btn v-else
                                                @click="activaDesactiva(true)">
                                                <span class="fa fa-eye-slash"></span>
                                            </v-btn>                                            
                                        </v-col>
                                    </v-row>
                                    <div v-if="pagina.seccion_pricipal">
                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field v-model="pagina.nombre" placeholder="Nombre Secretaria">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-file-input style="padding-top:5px;" v-model="files"
                                                    placeholder="Subir imagen" label="Banner Principal"
                                                    prepend-icon="mdi-paperclip">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip small label color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" v-if="pagina.imagen != '' && pagina.imagen != 'undefined'">
                                                <img :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + pagina.id + '/' + pagina.imagen"
                                                    alt="banner" style="width:100%;" />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" style="text-align:right;">
                                                <v-btn @click="subirArchivos()" class="btn btn-primary">Guardar</v-btn>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-container>
                                <v-container style="border: solid 1px lightgray;
                                        margin-top: 10px;
                                        border-radius: 15px;" v-if="pagina.seccion_pricipal">
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Contenido Principal</h4>
                                            <hr />
                                            <VueEditor v-model="pagina.contenido_principal"></VueEditor>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" style="text-align:right; margin-top:20px;"
                                            @click="updateContenidoPrincipal()">
                                            <v-btn class="btn btn-primary">Guardar</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <v-container style="border: solid 1px lightgray;
                                        margin-top: 10px;
                                        border-radius: 15px;" v-if="pagina.seccion_pricipal">
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Información adicional</h4>
                                            <hr />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field placeholder="Nombre Secretario/a"
                                                v-model="pagina.nombre_secretario"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field placeholder="Horario de atención"
                                                v-model="pagina.horario_atension"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field placeholder="Dirección Secretaría" v-model="pagina.direccion">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field placeholder="Mail" v-model="pagina.mail"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field placeholder="Telefono" v-model="pagina.telefono">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field placeholder="Interno" v-model="pagina.interno"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field placeholder="Codigo inserción de google maps"
                                                v-model="pagina.maps"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" style="text-align:right; margin-top:20px;">
                                            <v-btn @click="updateDatosGenerales()" class="btn btn-primary">Guardar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item value="tab-2">
                            <v-card flat>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" style="text-align: right">
                                            <v-btn @click="addSeccion()"
                                                style="background-color: #1c3e89 !important; color: white !important;">
                                                NUEVA SECCIÓN
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <table style="width: 100%">
                                                <Draggable :list="pagina.lstSecciones" tag="tbody" @end="saveorden()">
                                                    <tr v-for="(item, index) in pagina.lstSecciones" :key="index"
                                                        :style="[
                                                            item.activo
                                                                ? { padding: '5px' }
                                                                : {
                                                                    'background-color': '#d3d3d359',
                                                                    opacity: '0.5',
                                                                },
                                                        ]">
                                                        <td>{{ item._tipo }}</td>
                                                        <td>{{ item.titulo }}</td>
                                                        <td>
                                                            <v-menu top :close-on-content-click="closeOnContentClick">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn text v-bind="attrs" v-on="on"
                                                                        style="float: right">
                                                                        <v-icon class="fa fa-bars"></v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-list>
                                                                    <v-list-item>
                                                                        <v-btn text @click="
                                                                            editaSeccion(item.id, item.tipo)
                                                                        ">
                                                                            <v-icon small class="fa fa-edit"></v-icon>
                                                                            &nbsp; Editar
                                                                        </v-btn>
                                                                    </v-list-item>
                                                                    <v-list-item>
                                                                        <v-btn text
                                                                            @click="abrirCambiarColor(item.id, item.background_color)">
                                                                            <v-icon small class="fa fa-adjust"></v-icon>
                                                                            &nbsp; Color de Fondo
                                                                        </v-btn>
                                                                    </v-list-item>
                                                                    <v-list-item>
                                                                        <v-btn text v-if="item.activo"
                                                                            @click="activa_desactiva(item.id, false)">
                                                                            <v-icon left class="fa fa-eye"></v-icon>
                                                                            Desactivar
                                                                        </v-btn>
                                                                        <v-btn text v-else
                                                                            @click="activa_desactiva(item.id, true)">
                                                                            <v-icon left class="fa fa-eye-slash">
                                                                            </v-icon>
                                                                            Activar
                                                                        </v-btn>
                                                                    </v-list-item>
                                                                    <v-list-item>
                                                                        <v-btn text @click="logicDelete(item.id)">
                                                                            <v-icon small class="fa fa-remove"></v-icon>
                                                                            &nbsp; Eliminar
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
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog transition="dialog-top-transition" max-width="600" style="height:350px;" v-model="dialogBackGround">
            <template v-slot:default="dialogBackGround">
                <v-card style="height:350px; ">
                    <v-toolbar style="
              background-color: green !important;
              border-color: green !important; margin-bottom:50px;
            " dark>Seleccione el color de fondo de la sección</v-toolbar>
                    <v-card-text>
                        <label class="content-input">
                            <input type="radio" id="#A7A6A6" value="#A7A6A6" v-model="picked">
                            <i style="background-color: #A7A6A6"></i>
                        </label>
                        <label class="content-input">
                            <input type="radio" id="#C6C6C5" value="#C6C6C5" v-model="picked">

                            <i style="background-color: #C6C6C5; margin-left: 50px;"></i>
                        </label>
                        <label class="content-input">
                            <input type="radio" id="#F3F0ED" value="#F3F0ED" v-model="picked">

                            <i style="background-color: #F3F0ED; margin-left: 100px;"></i>
                        </label>
                        <label class="content-input">
                            <input type="radio" id="#FFFFFF" value="#FFFFFF" v-model="picked">

                            <i style="background-color: #FFFFFF; margin-left: 150px;"></i>
                        </label>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn class="btn btn-primary" @click="setBackGround()" style="margin-top:120px;">Guardar
                        </v-btn>
                        <v-btn @click="dialogBackGround.value = false" style="margin-top:120px;">Salir</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-dialog transition="dialog-top-transition" max-width="80%" v-model="dialogCrear">
            <template v-slot:default="dialogCrear">
                <v-container style="background-color: white !important;">
                    <v-row>
                        <v-col cols="12">
                            <h3>Seleccione el tipo de saccion a agregar</h3>
                            <hr />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/acordion.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(1)">Paneles <br>
                                                Expansibles
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/TabHorizontal.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(2)">Pestañas <br>
                                                Horizontales
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/TabVertical.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(3)">Pestañas <br>
                                                Verticales
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/galeria.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(4)">Galería de <br>
                                                Imagenes
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/Agenda.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(5)">Agenda de <br>
                                                Eventos
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/noticias.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(6)">Noticias
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/HTML.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(7)">HTML <br /> Libre
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <div class="project-one__single">
                                <div class="project-one__img-box">
                                    <div class="project-one__img">
                                        <img :src="$urlBase + '/Assets/img/HTML.png'" alt="">
                                    </div>
                                    <div class="project-one__content">
                                        <h4 class="project-one__title"><a @click="crearSeccion(8)">Tarjeta <br /> con
                                                imagen
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
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
                            ¿Esta seguro de eliminar la sección?
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogDelete.value = false">Cancelar</v-btn>
                        <v-btn text @click="confirmaDeleteSeccion()">Eliminar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <Footer></Footer>
    </div>
</template>
<style scoped>
.content-input input,
.content-select select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.content-input input {
    visibility: hidden;
    position: absolute;
    right: 0;
}

.content-input {
    position: relative;
    margin-bottom: 30px;
    padding: 5px 0 5px 60px;
    /* Damos un padding de 60px para posicionar el elemento <i> en este espacio*/
    display: inline;
}

/* Estas reglas se aplicarán a todos las elementos i después de cualquier input*/
.content-input input+i {
    background: #f0f0f0;
    border: 2px solid rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    top: 0;
}

/* Estas reglas se aplicarán a todos los i despues de un input de tipo radio*/
.content-input input[type=radio]+i {
    height: 90px;
    width: 90px;
    border-radius: 100%;
    left: 15px;
}

.content-input input[type=radio]+i:before {
    content: '';
    display: block;
    height: 48px;
    width: 48px;
    /*background: red;*/
    border-radius: 100%;
    position: absolute;
    z-index: 1;
    top: 19px;
    left: 19px;
    border: 3px solid rgba(20, 20, 20, 0.712);
    /*background: #2AC176;*/
    transition: all 0.25s ease;
    /* Todas las propiedades | tiempo | tipo movimiento */
    transform: scale(0)
        /* Lo reducimos a 0*/
    ;
    opacity: 0;
    /* Lo ocultamos*/
}

.content-input input[type=radio]:checked+i:before {
    transform: scale(2);
    opacity: 1;
}

.content-input:hover input[type=radio]:not(:checked)+i {
    background: rgb(255, 237, 157);
}

.v-tab--active {
    background-color: var(--roofsie-gray) !important;
    color: var(--roofsie-white) !important;
    font-weight: 800;
}

a:hover,
a:focus {
    box-shadow: 0 1px var(--roofsie-white)
}
</style>
<script>
import Draggable from "vuedraggable";
import Header from "../../components/Headers/Tramites_Paso.vue";
import { VueEditor } from 'vue2-editor'
export default {
    data: () => {
        return {
            picked: null,
            row: null,
            dialogBackGround: false,
            closeOnContentClick: false,
            dialogDelete: false,
            idSeccion: 0,
            dialogCrear: false,
            dialogOk: false,
            content: "",
            autoridades: null,
            tab: null,
            files: [],
            id: 0,
            pagina: {
                id: 0,
                nombre: "",
                imagen: "",
                nombre_secretario: "",
                foto_secretario: "",
                direccion: "",
                maps: "",
                mail: "",
                telefono: "",
                interno: "",
                contenido_principal: "",
                lstSecciones: null,
                horario_atension: "",
                _tipo: "",
                background_color: "",
            }
        };
    },
    components: {
        Header,
        VueEditor,
        Draggable,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.pagina = (await this.$http.get("/Paginas/getByPk?pk=" + this.$route.params.id)).data;
        } catch (error) { }
    },
    methods: {
        async activaDesactiva(activa){
            let post = {
                id: this.$route.params.id,
                seccion_pricipal: activa,
                _tipo: "",
            };
            this.pagina = (await this.$http.post("/Paginas/updateActivaContenidoPrincipal", post)).data;
        },
        async setBackGround() {
            let post = {
                id: this.id,
                background_color: this.picked,
                _tipo: "",
            };
            this.pagina = (await this.$http.post("/Seccion/setBackGroundColor", post)).data;
            this.dialogBackGround = false;
            this.dialogOk = true;
            this.pagina = (await this.$http.get("/Paginas/getByPk?pk=" + this.$route.params.id)).data;
        },
        abrirCambiarColor(id, bacground) {
            this.id = id;
            this.background_color = bacground;
            this.picked = bacground;
            this.dialogBackGround = true;
        },
        async subirArchivos() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                InstFormData.append('file', this.files);
                InstFormData.append('idPagina', this.$route.params.id);
                InstFormData.append('tipo', 'PAGINA');
                this.pagina = (await this.$http.post("/Paginas/UploadFile", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
            }
            else {
                let post = {
                    nombre: this.pagina.nombre,
                    id: this.pagina.id,
                    imagen: this.pagina.imagen,
                };
                this.pagina = (await this.$http.post("/Paginas/updateNombre", post)).data;
            }
            this.dialogOk = true;
        },
        async updateContenidoPrincipal() {
            let post = {
                id: this.pagina.id,
                contenido_principal: this.pagina.contenido_principal,
            };
            this.pagina = (await this.$http.post("/Paginas/updateContenidoPrincipal", post)).data;
            this.dialogOk = true;
        },
        async updateDatosGenerales() {
            let post = {
                id: this.pagina.id,
                nombre_secretario: this.pagina.nombre_secretario,
                direccion: this.pagina.direccion,
                maps: this.pagina.maps,
                mail: this.pagina.mail,
                telefono: this.pagina.telefono,
                interno: this.pagina.interno,
                horario_atension: this.pagina.horario_atension,
            };
            this.pagina = (await this.$http.post("/Paginas/updateDatosGenerales", post)).data;
            this.dialogOk = true;
        },
        addSeccion() {
            this.dialogCrear = true;
        },
        async crearSeccion(tipo) {
            let post = {
                id_page: this.pagina.id,
                tipo: tipo,
                _tipo: "",
            };
            if (tipo <= 3) {

                this.idSeccion = (await this.$http.post("/Seccion/insert", post)).data;
                this.$router.push("/ExtensionPanelsConfig/" + this.idSeccion);
            }
            if (tipo == 4) {

                this.idSeccion = (await this.$http.post("/Seccion/insert", post)).data;
                this.$router.push("/GaleriaConfig/" + this.idSeccion);
            }
            if (tipo == 5) {

                this.idSeccion = (await this.$http.post("/Seccion/insert", post)).data;
                this.$router.push("/AgendaConfig/" + this.idSeccion);
            }
            if (tipo == 6) {

                this.idSeccion = (await this.$http.post("/Seccion/insert", post)).data;
                this.$router.push("/NoticiasConfig/" + this.idSeccion);
            }
            if (tipo == 7) {

                this.idSeccion = (await this.$http.post("/Seccion/insert", post)).data;
                this.$router.push("/HTMLConfig/" + this.idSeccion);
            }
            if (tipo == 8) {

                this.idSeccion = (await this.$http.post("/Seccion/insert", post)).data;
                this.$router.push("/CardConfig/" + this.pagina.id + "/" + this.idSeccion);
            }
        },
        editaSeccion(id, tipo) {
            if (tipo <= 3) {
                this.$router.push("/ExtensionPanelsConfig/" + id);
            }
            if (tipo == 4) {
                this.$router.push("/GaleriaConfig/" + id);
            }
            if (tipo == 5) {
                this.$router.push("/AgendaConfig/" + id + '/' + this.pagina.id);
            }
            if (tipo == 6) {
                this.$router.push("/NoticiasConfig/" + id);
            }
            if (tipo == 7) {
                this.$router.push("/HTMLConfig/" + id);
            }
            if (tipo == 8) {
                this.$router.push("/CardConfig/" + this.pagina.id + '/' + id);
            }
        },
        logicDelete(id) {
            this.id = id;
            this.dialogDelete = true;
        },
        async confirmaDeleteSeccion() {
            try {
                let post = {
                    id: this.id,
                    _tipo: "",
                };
                (await this.$http.post("/Seccion/delete", post));
                this.pagina = (await this.$http.get("/Paginas/getByPk?pk=" + this.$route.params.id)).data;
                this.dialogDelete = false;
            } catch (error) { }
        },
        async saveorden() {
            (await this.$http.post("/Seccion/reordenar", this.pagina));
        },
        async activa_desactiva(id, estado) {
            let post = {
                id: id,
                activo: estado,
                _tipo: "",
            };
            (await this.$http.post("/Seccion/activaDesactiva", post)).data;
            this.pagina = (await this.$http.get("/Paginas/getByPk?pk=" + this.$route.params.id)).data;
            this.closeOnContentClick = false;
        },
    },
};
</script>