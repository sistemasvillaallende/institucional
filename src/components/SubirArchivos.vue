<template>
    <div v-if="lstArchivos != null && lstArchivos != 'undefined'">
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on" style="margin-left: 10px;">
                        <v-icon small class="fa fa-upload"></v-icon>&nbsp; Archivos
                    </v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Archivos descargables</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="dialog = false">
                                Salir
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-container style="margin-top:50px">
                        <v-row>
                            <v-col cols="12" style="text-align:right;">
                                <v-btn class="btn btn-primary" @click="addPage()">Nuevo archivo</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" style="text-align:right;" v-if="checkedNames.length > 0">
                                <v-btn @click="logicDelete()" class="btn btn-danger">Eliminar Seleccionadas</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-card style="min-height: 300px; padding: 20px;">
                                    <table style="width: 100%" class="table table-striped">
                                        <Draggable :list="lstArchivos" tag="tbody" @end="saveorden()">
                                            <tr v-for="(item, index) in lstArchivos" :key="index" :style="[
                                                item.activo
                                                    ? { padding: '5px' }
                                                    : {
                                                        'background-color': '#d3d3d359',
                                                        opacity: '0.5',
                                                    },
                                            ]">
                                                <td style="width:80%; padding-top: 15px;">{{ item.nombre_archivo }}</td>
                                                <td style="text-align:right;">
                                                    <v-menu top :close-on-content-click="closeOnContentClick">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn text v-bind="attrs" v-on="on" style="float: right">
                                                                <v-icon class="fa fa-bars"></v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-list>
                                                            <v-list-item>
                                                                <v-btn text @click="editaArchivo(item.id, item.nombre_archivo)
                                                                ">
                                                                    <v-icon small class="fa fa-edit"></v-icon>&nbsp;
                                                                    Editar
                                                                </v-btn>
                                                            </v-list-item>
                                                            <v-list-item>
                                                                <v-btn text v-if="item.activo"
                                                                    @click="activa_desactiva(item.id, false, item.id_contenido)">
                                                                    <v-icon left class="fa fa-eye"></v-icon>
                                                                    Desactivar
                                                                </v-btn>
                                                                <v-btn text v-else
                                                                    @click="activa_desactiva(item.id, true, item.id_contenido)">
                                                                    <v-icon left class="fa fa-eye-slash"></v-icon>
                                                                    Activar
                                                                </v-btn>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-menu>
                                                </td>
                                                <td style="text-align:right; padding-top: 15px; padding-right: 15px;">
                                                    <input type="checkbox" class="check" :id="item.id" :value="item.id"
                                                        v-model="checkedNames">
                                                </td>
                                            </tr>
                                        </Draggable>
                                    </table>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogConfirma">
                            <template v-slot:default="dialogConfirma">
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
                                            ¿Esta seguro de eliminar los archivos selecionados?
                                        </div>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialogConfirma.value = false">Cancelar</v-btn>
                                        <v-btn text @click="confirmaLogicDelete()">Eliminar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogError">
                            <template v-slot:default="dialogError">
                                <v-card>
                                    <v-toolbar style="
                                background-color: red !important;
                                border-color: red !important;
                                " dark>
                                        <v-card-title>Error</v-card-title>
                                    </v-toolbar>

                                    <v-card-text>
                                        <div style="
                                    margin-top: 20px;
                                    text-align: center;
                                    color: black;
                                    font-size: 20px;
                                    font-family: 'DM Sans';
                                ">
                                            {{ txtError }}
                                        </div>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialogError.value = false">Salir</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogCrear">
                            <template v-slot:default="dialogCrear">
                                <v-card>
                                    <v-toolbar style="
                                " dark>
                                        <v-card-title>Subir Archivo</v-card-title>
                                    </v-toolbar>
                                    <v-card-text style="margin-top:30px;">
                                        <v-text-field v-model="nombre_archivo"
                                            placeholder="Ingrese el nombre del archivo">
                                        </v-text-field>
                                        <v-file-input v-if="!edita" style="padding-top:5px;" v-model="files" multiple
                                            truncate-length="1" placeholder="Subir archivos" label="Subir archivos"
                                            prepend-icon="fa fa-upload">
                                            <template v-slot:selection="{ text }">
                                                <v-chip small label color="primary">
                                                    {{ text }}
                                                </v-chip>
                                            </template>
                                        </v-file-input>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text @click="dialogCrear.value = false">Cancelar</v-btn>
                                        <v-btn text @click="subirArchivos()">Aceptar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<style scoped>
.check {
    transform: scale(1.8);
    box-shadow: none !important;
}
</style>
<script>
import Draggable from "vuedraggable";
export default {
    data: () => {
        return {
            closeOnContentClick: false,
            dialogCrear: false,
            dialogConfirma: false,
            id: 0,
            nombre_archivo: "",
            checkedNames: [],
            files: [],
            lstArchivos: null,
            txtError: "",
            dialogError: false,
            edita: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            id_archivo: 0,
        };
    },
    components: {
        Draggable,
    },
    props: {
        id_contenido: {
            type: [Number],
            default: 0,
        },
        id_news: {
            type: [Number],
            default: 0,
        },
    },
    async mounted() {
        try {
            if (this.id_contenido != 0)
                this.lstArchivos = (await this.$http.get("/Archivos_Contenido/read?id_contenido=" + this.id_contenido)).data;
            if (this.id_news != 0)
                this.lstArchivos = (await this.$http.get("/Archivos_Contenido/readNews?id_news=" + this.id_news)).data;
        } catch (error) { }
    },
    methods: {
        async saveorden() {
            (await this.$http.post("/Archivos_Contenido/reordenarContenido", this.lstArchivos));
        },
        logicDelete() {
            this.dialogConfirma = true;
        },
        async confirmaLogicDelete() {
            (await this.$http.post("/Archivos_Contenido/deleteArchivos", this.checkedNames));
            this.dialogConfirma = false;
            if (this.id_contenido != 0) {
                this.lstArchivos = (await this.$http.get("/Archivos_Contenido/read?id_contenido=" + this.id_contenido)).data;
            }
            if (this.id_news != 0) {
                this.lstArchivos = (await this.$http.get("/Archivos_Contenido/readNews?id_news=" + this.id_news)).data;
            }
            this.checkedNames = [];
        },
        addPage() {
            this.edita = false;
            this.nombre_archivo = "";
            this.dialogCrear = true;
        },
        editaArchivo(id_archivo, nombre) {
            this.edita = true;
            this.nombre_archivo = nombre;
            this.id_archivo = id_archivo;
            this.dialogCrear = true;
        },
        async activa_desactiva(id, activo, id_contenido) {
            let post = {
                id: id,
                activo: activo,
                id_contenido: id_contenido,
                id_news: this.id_news,
            };
            this.lstArchivos = (await this.$http.post("/Archivos_Contenido/activaDesactivaContenido", post)).data;
            this.closeOnContentClick = false;
        },
        async subirArchivos() {
            if (!this.edita) {
                let InstFormData = new FormData();
                if (this.files != null && this.files != 'undefined' && this.files != '') {
                    for (var index = 0; index < this.files.length; index++) {
                        InstFormData.append('file[]', this.files[index]);
                    }
                    InstFormData.append('nombre_archivo', this.nombre_archivo);
                    if (this.id_contenido != 0) {
                        InstFormData.append('id_contenido', this.id_contenido);
                        this.lstArchivos = (await this.$http.post("/Archivos_Contenido/UploadFile", InstFormData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })).data;
                    }
                    if (this.id_news != 0) {
                        InstFormData.append('id_news', this.id_news);
                        this.lstArchivos = (await this.$http.post("/Archivos_Contenido/UploadFileNews", InstFormData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })).data;
                    }
                    this.files = null;
                }
            }
            else {
                let post = {
                    id: this.id_archivo,
                    nombre_archivo: this.nombre_archivo,
                    id_contenido: this.id_contenido,
                };
                this.lstArchivos = (await this.$http.post("/Archivos_Contenido/update", post)).data;
            }
            this.dialogCrear = false;
        },
    },
};
</script>