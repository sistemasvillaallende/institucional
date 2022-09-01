<template>
    <div>
        <Header></Header>
        <v-container style="margin-top: 30px;">

            <v-row>
                <v-col cols="12">
                    <v-tabs v-model="tab">
                        <v-tab href="#tab-1">Principal</v-tab>
                        <v-tab href="#tab-2">Secciones</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1">
                            <v-card flat>
                                <v-container style="border: solid 1px lightgray;
                                        margin-top: 10px;
                                        border-radius: 15px;">
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
                                </v-container>
                                <v-container style="border: solid 1px lightgray;
                                        margin-top: 10px;
                                        border-radius: 15px;">
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
                                        border-radius: 15px;">
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
                                                            item.activa
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
                                                                            editaFicha(item.id, item.nombre, item.descripcion)
                                                                        ">
                                                                            <v-icon small> mdi-pencil </v-icon> Editar
                                                                        </v-btn>
                                                                    </v-list-item>
                                                                    <v-list-item>
                                                                        <v-btn text v-if="item.activa"
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
                                                                        <v-btn text
                                                                            @click="logicDelete(item.id, index)">
                                                                            <v-icon small> mdi-delete </v-icon> Eliminar
                                                                        </v-btn>
                                                                    </v-list-item>
                                                                    <v-list-item>
                                                                        <v-btn text @click="openPasos(item.id)">
                                                                            <v-icon small> mdi-folder </v-icon> Pasos
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
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogCrear">
            <template v-slot:default="dialogCrear">
                <v-card>
                    <v-toolbar style="
                                " dark>
                        <v-card-title>Crear Sección</v-card-title>
                    </v-toolbar>

                    <v-card-text style="margin-top:30px;">
                        <v-text-field v-model="nombre" placeholder="Ingrese el nombre de la secretaria">
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogCrear.value = false">Cancelar</v-btn>
                        <v-btn text @click="crearPagina()">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <Footer></Footer>
    </div>
</template>
<style scoped>
.v-tab--active {
    background-color: #6f6f6e !important;
    color: #ffd142 !important;
    font-weight: 800;
}
</style>
<script>
import Header from "../../components/Headers/Tramites_Paso.vue";
import { VueEditor } from 'vue2-editor'
export default {
    data: () => {
        return {
            dialogCrear: false,
            dialogOk: false,
            content: "",
            autoridades: null,
            tab: null,
            files: [],
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
            }
        };
    },
    components: {
        Header,
        VueEditor,
    },
    async mounted() {
        try {
            this.pagina = (await this.$http.get("/Paginas/getByPk?pk=" + this.$route.params.id)).data;
        } catch (error) { }
    },
    methods: {
        async subirArchivos() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                InstFormData.append('file', this.files);
                InstFormData.append('idPagina', this.$route.params.id);

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

        },
        crearSeccion(){

        },
    },
};
</script>