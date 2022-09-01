<template>
    <div v-if="paginas != null && paginas != 'undefined'">
        <Header></Header>
        <template>
            <v-container>
                <v-row>
                    <v-col cols="12" style="text-align: right">
                        <v-btn @click="addPage()"
                            style="background-color: #1c3e89 !important; color: white !important;">NUEVA
                            SECRETARÍA
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card style="min-height: 300px;">
                            <v-card-title>
                                Secretarías
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                                    hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table :headers="headers" :items="paginas" :search="search">
                                <template v-slot:[`item.imagen`]="{ item }">
                                    <img :src="item.imagen" style="height: 50px; margin: 10px" />
                                </template>
                                <template v-slot:[`item.id`]="{ item }">
                                    <v-menu top :close-on-content-click="closeOnContentClick">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text v-bind="attrs" v-on="on" style="float: right">
                                                <v-icon class="fa fa-bars"></v-icon>
                                            </v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item>
                                                <v-btn :href="'/PageConfig/' + item.id" text>
                                                    <v-icon small> mdi-cogs </v-icon> Configurar
                                                </v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-btn text @click="logicDelete(item.id)">
                                                    <v-icon small> mdi-delete </v-icon> Eliminar
                                                </v-btn>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </template>
                            </v-data-table>
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
                                    ¿Esta seguro de eliminar la secretaria?
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
                                <v-card-title>Crear Secretaría</v-card-title>
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
            </v-container>
        </template>

        <Footer></Footer>
    </div>
</template>
<style scoped>
</style>
<script>
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
export default {
    data: () => {
        return {
            dialogCrear: false,
            dialogConfirma: false,
            search: '',
            id: 0,
            nombre: "",
            headers: [
                {
                    text: 'imagen',
                    align: 'start',
                    sortable: false,
                    value: 'Imagen',
                },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Acciones', value: 'id' },
            ],
            paginas: null,
            txtError: "",
            dialogError: false,
        };
    },
    components: {
        Header,
        Footer,
    },
    async mounted() {
        try {
            this.paginas = (await this.$http.get("/Paginas/read")).data;
        } catch (error) { }
    },
    methods: {
        addPage() {
            this.dialogCrear = true;
        },
        async crearPagina() {
            if (this.nombre == "") {
                this.txtError = "Por favor ingrese el nombre de la secretaría";
                this.dialogError = true;
                return;
            }

            let post = {
                nombre: this.nombre,
            };
            this.id = (await this.$http.post("/Paginas/insert", post)).data;
            this.dialogCrear = false;
            this.$router.push("/PageConfig/" + this.id);

        },
    },
};
</script>