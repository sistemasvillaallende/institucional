<template>
    <div v-if="evento != null && evento != 'undefined'">
        <Header></Header>

        <v-container style="margin-top:50px; border: solid 1px lightgray; min-height: 400px;
                                        border-radius: 15px; margin-bottom: 50px;">
            <v-row>
                <v-col cols="12">
                    <v-toolbar flat dark color="primary" style="max-height:64px;">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Agregar / Modificar Evento</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-col>
            </v-row>
            <v-row style="margin-top:40px;">
                <v-col cols="6">
                    <v-row>
                        <v-col cols="8">
                            <v-file-input style="padding-top:5px;" v-model="files" multiple truncate-length="1"
                                placeholder="Subir imagen" label="Subir imagen" v-if="evento.id != 0"
                                prepend-icon="fa fa-upload">
                                <template v-slot:selection="{ text }">
                                    <v-chip small label color="primary">
                                        {{ text }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                            <v-file-input style="padding-top:5px;" multiple truncate-length="1"
                                placeholder="Subir imagen" label="Subir imagen" disabled v-else
                                prepend-icon="fa fa-upload">
                                <template v-slot:selection="{ text }">
                                    <v-chip small label color="primary">
                                        {{ text }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                            <img v-if="evento.imagen != ''"
                                :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + evento.id_page + '/' + evento.imagen"
                                style="height:100px;" aspect-ratio="1" class="grey lighten-2" />
                            <img v-else :src="$urlBase + '/Assets/img/sinimagen.png'" style="height:100px;"
                                aspect-ratio="1" class="grey lighten-2" />
                        </v-col>
                        <v-col cols="4" style="text-align:right;">
                            <v-btn @click="subirImagen()" class="btn btn-primaty" v-if="evento.id != 0">Subir</v-btn>
                            <v-btn class="btn btn-primaty" v-else disabled>Subir</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nombre del evento" v-model="evento.nombre"
                                placeholder="Nombre del evento">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="9">
                            <v-text-field label="Lugar" v-model="evento.lugar" placeholder="Lugar">
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="Precio" v-model="evento.precio" placeholder="Precio">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <label>Descripcion corta</label>
                            <VueEditor v-model="evento.descripcion"></VueEditor>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12" style="text-align:right;">
                            <v-btn @click="salir()">Salir</v-btn>&nbsp;
                            <v-btn @click="guardarContenido()">Guardar</v-btn>
                        </v-col>
                    </v-row>
                    <v-row style="padding-top:125px;">
                        <v-col cols="6">
                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="Fecha" prepend-icon="fa fa-calendar" readonly
                                        v-bind="attrs" v-on="on">
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
                        <v-col cols="6">
                            <v-dialog ref="dialogh" v-model="modal2" :return-value.sync="time" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="time" label="Hora" prepend-icon="fa fa-clock" readonly
                                        v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-if="modal2" v-model="time" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal2 = false">
                                        Cancelar
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.dialogh.save(time)">
                                        OK
                                    </v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Codigo de inserción Google Maps" v-model="evento.mapa"
                                placeholder="Codigo de inserción Google Maps">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <label>Informacion completa</label>
                            <VueEditor v-model="evento.mas_informacion"></VueEditor>
                        </v-col>
                    </v-row>
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
                            font-family: 'DM Sans';">
                            {{ txtError }}
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogError.value = false">Aceptar</v-btn>
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
            txtError: "",
            dialogError: false,
            time: null,
            menu2: false,
            modal2: false,
            imagen: "",
            files: [],
            dialogDelete: false,
            dialogOk: false,
            dialogContenido: false,
            closeOnContentClick: false,
            evento: {
                id: 0,
                nombre: "",
                descripcion: "",
                callToAction: "",
                fecha_desde: "",
                hora_desde: null,
                lugar: "",
                direccion: "",
                mapa: "",
                precio: 0,
                mas_informacion: "",
                id_seccion: 0,
                id_page: 0,
                imagen: ""
            },
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
        SubirArchivos,
        VueEditor,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            if (this.$route.params.id != 0) {
                this.evento = (await this.$http.get("/Evento/getByPk?id=" +
                    this.$route.params.id)).data;
                this.time = this.evento.hora_desde;
                this.date = this.evento.fecha_desde.toLocaleDateString();
            }
            else {
                this.evento.id_seccion = this.$route.params.id_seccion;
            }
        } catch (error) { }
    },
    methods: {
        salir() {
            this.$router.push("/AgendaConfig/" + this.$route.params.id_seccion);
        },

        async subirImagen() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                for (var index = 0; index < this.files.length; index++) {
                    InstFormData.append('file[]', this.files[index]);
                }
                InstFormData.append('id', this.evento.id);
                InstFormData.append('id_seccion', this.$route.params.id_seccion);

                this.evento = (await this.$http.post("/Evento/setImg", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
            }
            this.dialogOk = true;
            this.dialogContenido = false;
        },
        async guardarContenido() {
            if (this.evento.nombre == "") {
                this.txtError = "Ingrese el nombre del evento";
                this.dialogError = true;
                return;
            }
            if (this.evento.descripcion == "") {
                this.txtError = "Ingrese la descripcion del evento";
                this.dialogError = true;
                return;
            }
            if (this.evento.date == "") {
                this.txtError = "Ingrese la fecha del evento";
                this.dialogError = true;
                return;
            }
            if (this.evento.time == "") {
                this.txtError = "Ingrese la hora del evento";
                this.dialogError = true;
                return;
            }
            if (this.evento.lugar == "") {
                this.txtError = "Ingrese el lugar del evento";
                this.dialogError = true;
                return;
            }
            if (this.evento.precio == "") {
                this.txtError = "Ingrese el precio del evento";
                this.dialogError = true;
                return;
            }
            let post = {
                id: this.evento.id,
                id_seccion: this.evento.id_seccion,
                nombre: this.evento.nombre,
                descripcion: this.evento.descripcion,
                fecha_desde: this.date,
                hora_desde: this.time,
                lugar: this.evento.lugar,
                mapa: this.evento.mapa,
                precio: this.evento.precio,
                mas_informacion: this.evento.mas_informacion,
                mes:"",
            };
            if (this.evento.id == 0) {
                this.evento = (await this.$http.post("/Evento/insert", post)).data;
                this.dialogOk = true;
                this.id = this.slides[this.slides.length - 1];
            }
            else {
                this.evento = (await this.$http.post("/Evento/update", post)).data;
                this.dialogOk = true;
                this.dialogContenido = false;
            }
        },
    },
};
</script>