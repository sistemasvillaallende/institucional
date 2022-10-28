<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px;">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 style="position: relative;
                        font-size: 40px;
                        color: var(--roofsie-gray);
                        font-weight: 800;
                        line-height: 40px;
                        margin-bottom: 10px;">Agenda</h2>
                    <hr style="margin-bottom: 40px;" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" style="margin-bottom: 25px; text-align: center;margin-bottom: 25px;
    text-align: center;
    border: solid 2px lightgray;
    border-radius: 15px;">
                    <v-btn text style="min-height:54px; min-width: 54px; border-radius: 50%; margin-right: 20px;"
                    @click="btnMesAnterior()"><span
                            class="fa fa-chevron-left"></span></v-btn>
                    <div style="display: inline;
                            font-weight: 700;
                            font-size: 20px;
                            padding: 18px;">
                        {{ this.mes }} de {{ this.anioint }}
                    </div>
                    <v-btn @click="btnMesPosterior()" text style="min-height:54px; min-width: 54px; border-radius: 50%; margin-left: 20px;"><span
                            class="fa fa-chevron-right"></span></v-btn>
                </v-col>
            </v-row>
            <article v-for="(item, index) in eventos" :key="index">
                <Evento :event="item"></Evento>
            </article>
        </v-container>
    </v-container>

</template>
<script>
import Evento from "./Evento.vue";
export default {
    data: () => ({
        eventos: null,
        mes: "",
        anio: "",
        mesint: 0,
        anioint: 0,
    }),
    components: {
        Evento,
    },
    methods: {
    async btnMesAnterior() {
      try {

        this.eventos = null;
        this.mesint = this.mesint - 1;
        if (this.mesint < 1) {
          this.mesint = 12;
          this.anioint = this.anioint - 1;
        }
        
        this.eventos = (await this.$http.get("/Evento/readFront?idSeccion=" + this.id + '&mes=' + this.mesint + '&anio=' + this.anioint)).data;

        switch (this.mesint) {
          case 1:
            this.mes = "Enero";
            break;
          case 2:
            this.mes = "Febrero";
            break;
          case 3:
            this.mes = "Marzo";
            break;
          case 4:
            this.mes = "Abril";
            break;
          case 5:
            this.mes = "Mayo";
            break;
          case 6:
            this.mes = "Junio";
            break;
          case 7:
            this.mes = "Julio";
            break;
          case 8:
            this.mes = "Agosto";
            break;
          case 9:
            this.mes = "Septiembre";
            break;
          case 10:
            this.mes = "Octubre";
            break;
          case 11:
            this.mes = "Noviembre";
            break;
          case 12:
            this.mes = "Diciembre";
            break;
        }    
      } catch (error) {
        this.ordenes = null;
      }
    },
    async btnMesPosterior() {
      try {
        this.eventos = null;
        this.mesint = this.mesint + 1;
        if (this.mesint > 12) {
          this.mesint = 1;
          this.anioint = this.anioint + 1;
        }

        this.eventos = (await this.$http.get("/Evento/readFront?idSeccion=" + this.id + '&mes=' + this.mesint + '&anio=' + this.anioint)).data;

        switch (this.mesint) {
          case 1:
            this.mes = "Enero";
            break;
          case 2:
            this.mes = "Febrero";
            break;
          case 3:
            this.mes = "Marzo";
            break;
          case 4:
            this.mes = "Abril";
            break;
          case 5:
            this.mes = "Mayo";
            break;
          case 6:
            this.mes = "Junio";
            break;
          case 7:
            this.mes = "Julio";
            break;
          case 8:
            this.mes = "Agosto";
            break;
          case 9:
            this.mes = "Sptiembre";
            break;
          case 10:
            this.mes = "Octubre";
            break;
          case 11:
            this.mes = "Noviembre";
            break;
          case 12:
            this.mes = "Diciembre";
            break;
        }
      } catch (error) {
        this.ordenes = null;
      }
    },
  },
    async mounted() {
        try {
            let date = new Date();
            let mes = date.getMonth() + 1;
            let anio = date.getFullYear();
            this.mesint = mes;
            this.anioint = anio;
            this.eventos = (await this.$http.get("/Evento/readFront?idSeccion=" + this.id + '&mes=' + this.mesint + '&anio=' + this.anioint)).data;

            this.anio = anio;
            switch (mes) {
                case 1:
                    this.mes = "Enero";
                    break;
                case 2:
                    this.mes = "Febrero";
                    break;
                case 3:
                    this.mes = "Marzo";
                    break;
                case 4:
                    this.mes = "Abril";
                    break;
                case 5:
                    this.mes = "Mayo";
                    break;
                case 6:
                    this.mes = "Junio";
                    break;
                case 7:
                    this.mes = "Julio";
                    break;
                case 8:
                    this.mes = "Agosto";
                    break;
                case 9:
                    this.mes = "Septiembre";
                    break;
                case 10:
                    this.mes = "Octubre";
                    break;
                case 11:
                    this.mes = "Noviembre";
                    break;
                case 12:
                    this.mes = "Diciembre";
                    break;
            }
        } catch (error) { }
    },
    props: {
        id: {
            type: [Number, String],
            default: 0,
        },
        tipo: {
            type: [Number, String],
            default: "",
        },
    },
}
</script>