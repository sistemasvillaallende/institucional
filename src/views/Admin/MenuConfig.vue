<template>
    <div v-if="menues != null && menues != 'undefined'">
        <Header></Header>
        <v-container style="margin-top:110px; border: solid 1px lightgray;
            border-radius: 15px; margin-bottom: 50px; min-height: 350px;;">
            <v-row>
                <v-col cols="12" style="text-align:right;">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-if="id_padre == 0" class="btn btn-primary" @click="salir()"
                                style="margin-right: 10px;">Salir</v-btn>
                            <v-btn v-else class="btn btn-primary" @click="configurarMenu(0)"
                                style="margin-right: 10px;">Volver</v-btn>

                            &nbsp;
                            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                Agregar Menu
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <v-btn @click="agregarMenu(0)">Acción directa</v-btn>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item v-if="this.id_padre == 0">
                                <v-list-item-title>
                                    <v-btn @click="agregarMenu(1)">Contenedor de sub menu</v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <table style="width: 100%">
                        <Draggable :list="menues" tag="tbody" @end="saveorden()">
                            <tr v-for="(item, index) in menues" :key="index" :style="[
                                item.activo
                                    ? { padding: '5px' }
                                    : {
                                        'background-color': '#d3d3d359',
                                        opacity: '0.5',
                                    },
                            ]">
                                <td>{{ item.texto }}</td>
                                <td>{{ item._tipo }}</td>
                                <td>
                                    <v-menu top :close-on-content-click="closeOnContentClick" style="margin-top: 60px;">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text v-bind="attrs" v-on="on" style="float: right">
                                                <v-icon class="fa fa-bars"></v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                                <v-btn text v-if="item.tipo == 1" @click="configurarMenu(item.id)">
                                                    <v-icon small class="fa fa-cog"></v-icon>&nbsp; Configurar
                                                </v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-btn text
                                                    @click="editarMenu(item.id, item.texto, item.tipo, item.url, item._target, item.destino, item.id_page)">
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
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogAdd">
            <template v-slot:default="dialogAdd">
                <v-card>
                    <v-toolbar style="
              background-color: green !important;
              border-color: green !important;
            " dark>Agregar Menu</v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="texto" label="Texto" placeholder="Texto del menu">
                                    </v-text-field>
                                </v-col>

                            </v-row>
                            <div v-if="tipo == 0">
                                <v-row>
                                    <v-col cols="6">
                                        <v-select :items="itemsdestino" v-model="select" label="Destino de la acción">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select :items="items" label="Target" v-model="selecttarget"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" v-if="select == 'Externa'">
                                        <v-text-field v-model="url" label="URL Externa"
                                            placeholder="URL Externa (https://misitio.com)">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" v-else>
                                        <v-select :items="paginas" item-text="nombre" item-value="id" v-model="input.id"
                                            label="Paginas del sitio"></v-select>
                                    </v-col>
                                </v-row>
                            </div>
                            <div v-else>

                            </div>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogAdd.value = false">Cancelar</v-btn>
                        <v-btn text @click="SaveMenu()">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
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
                            ¿Esta seguro de eliminar el menu seleccionado?
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogDelete.value = false">Cancelar</v-btn>
                        <v-btn text @click="deleteMenu()">Eliminar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>
<style>
.check {
    transform: scale(1.8);
    box-shadow: none !important;
}

.v-tab--active {
    background-color: var(--roofsie-gray) !important;
    color: var(--roofsie-white) !important;
    font-weight: 800;
}
</style>
<script>
import Draggable from "vuedraggable";
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
import Editor from '@tinymce/tinymce-vue'
export default {
    data: () => {
        return {
            input: {
                id: 0,
            },
            select: "Interna",
            itemsdestino: ['Interna', 'Externa'],
            menues: null,
            paginas: null,
            items: ['_blank', '_self'],
            selecttarget: "_self",
            dialogAdd: false,
            checkedNames: [],
            tab: null,
            dialogDelete: false,
            dialogOk: false,
            files: [],
            dialogContenido: false,
            closeOnContentClick: false,
            id: 0,
            texto: "",
            tipo: 0,
            _target: "",
            url: "",
            id_padre: null,
            destino: 0,
            id_page: 0,
        };
    },
    components: {
        Header,
        Footer,
        Draggable,
        Editor,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.menues = (await this.$http.get("/Menu/read?idPadre=" + this.$route.params.id)).data;
            this.paginas = (await this.$http.get("/Paginas/read")).data;
            this.id_padre = this.$route.params.id;
        } catch (error) { }
    },

    methods: {
        salir() {
            this.$router.push("/Home/");
        },
        async configurarMenu(id) {
            this.$router.push("/MenuConfig/" + id);
            this.menues = (await this.$http.get("/Menu/read?idPadre=" + this.$route.params.id)).data;
            this.paginas = (await this.$http.get("/Paginas/read")).data;
            this.id_padre = this.$route.params.id;
        },
        async SaveMenu() {
            if (this.tipo == 1) {
                let post = {
                    id: this.id,
                    texto: this.texto,
                    _target: "",
                    url: "",
                    tipo: this.tipo,
                    id_padre: this.id_padre,
                    destino: "",
                };
                if (this.id == 0) {
                    this.menues = (await this.$http.post("/Menu/insert", post)).data;
                    this.dialogOk = true;
                    this.dialogAdd = false;
                }
                else {
                    this.menues = (await this.$http.post("/Menu/update", post)).data;
                    this.dialogOk = true;
                    this.dialogAdd = false;
                }
            }
            else {
                if (this.select == "Interna") {
                    this.url = "/Page/" + this.input.id;
                    this.id_page = this.input.id;
                }

                let post = {
                    id: this.id,
                    texto: this.texto,
                    _target: this.selecttarget,
                    url: this.url,
                    tipo: this.tipo,
                    id_padre: this.id_padre,
                    destino: this.select,
                    id_page: this.id_page,
                };
                if (this.id == 0) {
                    this.menues = (await this.$http.post("/Menu/insert", post)).data;
                    this.dialogOk = true;
                    this.dialogAdd = false;
                }
                else {
                    this.menues = (await this.$http.post("/Menu/update", post)).data;
                    this.dialogOk = true;
                    this.dialogAdd = false;
                }
            }
        },
        agregarMenu(tipo) {
            this.id = 0;
            this.texto = "";
            this.tipo = tipo;
            this.url = "";
            this.dialogAdd = true;
        },
        editarMenu(id, texto, tipo, url, _target, destino, id_page) {
            this.id = id;
            this.texto = texto;
            this.tipo = tipo;
            this.url = url;
            this._target = _target;
            this.dialogAdd = true;
            this.select = destino;
            this.selecttarget = _target;
            this.input.id = id_page;
        },

        async saveorden() {
            (await this.$http.post("/Menu/updateOrden", this.menues));
        },
        async deleteMenu() {
            let post = {
                id: this.id,
                id_padre: this.id_padre,
            };
            this.menues = (await this.$http.post("/Menu/delete", post)).data;
            this.dialogDelete = false;
        },
        logicDelete(id) {
            this.id = id;
            this.dialogDelete = true;
        },
        async activa_desactiva(id, activo) {
            let post = {
                id: id,
                activo: activo,
                id_padre: this.id_padre
            };
            this.menues = (await this.$http.post("/Menu/activaDesactiva", post)).data;
        }
    },
};
</script>