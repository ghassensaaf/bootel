<template>
  <v-row class="mt-5" justify="center">
    <v-col cols="10">
      <v-card>
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tab v-for="item in items" :key="item">
            <v-icon v-if="item == 'Flights'"> mdi-airplane-takeoff </v-icon>
            <v-icon v-else>mdi-hospital-building</v-icon> {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card color="transparent" flat>
              <v-card-text class="mt-5" v-if="item == 'Hotels'">
                <v-container>
                  <v-form>
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          rounded
                          outlined
                          clearable
                          label="City / Hotels"
                          append-icon="mdi-city"
                          :items="cities"
                          item-text="name"
                          item-value="id"
                          v-model="searchQuery.city"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              class="aligne"
                              rounded
                              outlined
                              v-model="dateRangeText"
                              label="Check in / Check out"
                              append-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="dates"
                            no-title
                            scrollable
                            range
                          >
                            <v-spacer></v-spacer>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              class="aligne"
                              rounded
                              outlined
                              v-model="roomsText"
                              label="Travelers"
                              append-icon="mdi-account"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-card width="400px">
                            <v-card-title
                              >Travelers <v-spacer></v-spacer>
                              <v-btn
                                dark
                                plain
                                color="primary"
                                @click="addRoom"
                              >
                                Add room</v-btn
                              >
                            </v-card-title>
                            <v-card-text>
                              <div
                                v-for="room in searchQuery.rooms"
                                :key="room.id"
                              >
                                <h3>Room {{ room.id }}  <v-btn v-if="room.id!=1" x-small plain color="red" @click="deleteRoom(room.id)"> <v-icon>mdi-delete</v-icon></v-btn> </h3>
                                <div class="ma-3">
                                  <v-row justify="center">
                                    <v-col cols="6"
                                      ><h5 class="py-1">Adults</h5></v-col
                                    >
                                    <v-col cols="6">
                                      <v-row>
                                        <v-col cols="4"
                                          ><v-btn
                                            outlined
                                            fab
                                            dark
                                            x-small
                                            color="primary"
                                            @click="
                                              room.adults > 1
                                                ? (room.adults -= 1)
                                                : (room.adults = room.adults)
                                            "
                                          >
                                            <v-icon dark> mdi-minus </v-icon>
                                          </v-btn></v-col
                                        >
                                        <v-col cols="4">
                                          <v-chip color="transparent">
                                            {{ room.adults }}
                                          </v-chip>
                                        </v-col>
                                        <v-col cols="4"
                                          ><v-btn
                                            outlined
                                            fab
                                            dark
                                            x-small
                                            color="primary"
                                            @click="
                                              room.adults < 6
                                                ? (room.adults += 1)
                                                : (room.adults = room.adults)
                                            "
                                          >
                                            <v-icon dark> mdi-plus </v-icon>
                                          </v-btn></v-col
                                        >
                                      </v-row>
                                    </v-col>
                                  </v-row>
                                </div>
                                <div class="ma-3">
                                  <v-row justify="center">
                                    <v-col cols="6"
                                      ><h5 class="py-1">
                                        Children ( 2-12 years)
                                      </h5></v-col
                                    >
                                    <v-col cols="6">
                                      <v-row>
                                        <v-col cols="4"
                                          ><v-btn
                                            outlined
                                            fab
                                            dark
                                            x-small
                                            color="primary"
                                            @click="
                                              room.children > 0
                                                ? (room.children -= 1) &
                                                  room.childrenAges.pop()
                                                : (room.children =
                                                    room.children)
                                            "
                                          >
                                            <v-icon dark> mdi-minus </v-icon>
                                          </v-btn></v-col
                                        >
                                        <v-col cols="4">
                                          <v-chip color="transparent">
                                            {{ room.children }}
                                          </v-chip>
                                        </v-col>
                                        <v-col cols="4"
                                          ><v-btn
                                            outlined
                                            fab
                                            dark
                                            x-small
                                            color="primary"
                                            @click="
                                              room.children < 3
                                                ? (room.children += 1)
                                                : (room.children =
                                                    room.children)
                                            "
                                          >
                                            <v-icon dark> mdi-plus </v-icon>
                                          </v-btn></v-col
                                        >
                                      </v-row>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col
                                      v-for="n in room.children"
                                      :key="n"
                                      cols="4"
                                    >
                                      <v-text-field
                                        dense
                                        rounded
                                        outlined
                                        type="number"
                                        max="12"
                                        :label="'child' + n"
                                        v-model="room.childrenAges[n - 1]"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </div>
                              </div>
                            </v-card-text>
                          </v-card>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="2">
                        <v-btn
                          rounded
                          x-large
                          outlined
                          color="primary"
                          width="100%"
                          @click="search"
                        >
                          search</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import router from '@/router';
export default {
  name: "searchEngine",
  data() {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return {
      tab: null,
      items: ["Hotels", "Flights"],
      dates: [
        today.toISOString().split("T")[0],
        tomorrow.toISOString().split("T")[0],
      ],

      cities: [
        { id: 3, type: "D", name: "Hammamet" },
        { id: 7, type: "D", name: "Nabeul" },
        { id: 8, type: "D", name: "Tunis" },
        { id: 9, type: "D", name: "Carthage" },
        { id: 11, type: "D", name: "Monastir" },
        { id: 12, type: "D", name: "Sousse" },
        { id: 13, type: "D", name: "Djerba" },
        { id: 14, type: "D", name: "Mahdia" },
        { id: 15, type: "D", name: "Gammarth" },
        { id: 16, type: "D", name: "Zarzis" },
        { id: 17, type: "D", name: "Port El Kantaoui" },
        { id: 18, type: "D", name: "Nefta" },
        { id: 19, type: "D", name: "Tozeur" },
        { id: 20, type: "D", name: "Tabarka" },
        { id: 30, type: "D", name: "Sidi Bou Said" },
        { id: 31, type: "D", name: "Kairouan" },
        { id: 32, type: "D", name: "Douz" },
        { id: 33, type: "D", name: "Kebilli" },
        { id: 34, type: "D", name: "Ksar Ghilane" },
        { id: 35, type: "D", name: "Matmata" },
        { id: 36, type: "D", name: "Tataouine" },
        { id: 37, type: "D", name: "Sfax" },
        { id: 38, type: "D", name: "Tamerza" },
        { id: 39, type: "D", name: "Skanes" },
        { id: 40, type: "D", name: "Skanes-Monastir" },
        { id: 41, type: "D", name: "Kelibia" },
        { id: 42, type: "D", name: "Ain Draham" },
        { id: 43, type: "D", name: "Korba" },
        { id: 44, type: "D", name: "Gafsa" },
        { id: 45, type: "D", name: "Metlaoui" },
        { id: 46, type: "D", name: "Bizerte" },
        { id: 102, type: "D", name: "Gabes" },
        { id: 103, type: "D", name: "Le Kef" },
        { id: 104, type: "D", name: "Zaghouan" },
        { id: 105, type: "D", name: "Douga" },
        { id: 106, type: "D", name: "Sbeitla" },
        { id: 124, type: "D", name: "Makthar" },
        { id: 125, type: "D", name: "Siliana" },
        { id: 126, type: "D", name: "Jendouba" },
        { id: 128, type: "D", name: "téboursouk" },
        { id: 129, type: "D", name: "Bèja" },
        { id: 130, type: "D", name: "El Fahes" },
        { id: 131, type: "D", name: "Kasserine" },
        { id: 177, type: "D", name: "Enfidha" },
        { id: 237, type: "D", name: "Medjez-el-Bab" },
        { id: 245, type: "D", name: "Medenine" },
        { id: 356, type: "D", name: "Hammam Bourguiba" },
        { id: 357, type: "D", name: "Korbous" },
        { id: 360, type: "D", name: "Kerkennah" },
        { id: 537, type: "D", name: "Gabes" },
        { id: 609, type: "D", name: "Sidi Bouzid" },
        { id: 621, type: "D", name: "El jem" },
        { id: 538, type: "D", name: "Borj Cédria" },
        { id: 638, type: "D", name: "Soliman" },
        { id: 639, type: "D", name: "Nefza" },
      ],
      searchQuery: {
        city: "",
        checkin: "",
        checkout: "",
        rooms: [
          {
            id: 1,
            adults: 2,
            children: 0,
            childrenAges: [],
          },
        ],
      },
      menu: false,
      menu2: false,
    };
  },
  computed: {
    dateRangeText() {
      return "from " + this.dates.join(" to ");
    },
    roomsText() {
      let roomstxt = this.searchQuery.rooms.length + " rooms, ";
      let adults = 0;
      let children = 0;
      this.searchQuery.rooms.forEach((room) => {
        adults += room.adults;
        children += room.children;
      });
      roomstxt += adults + " adults and " + children + " children";
      return roomstxt;
    },
  },
  methods: {
    search() {
      this.searchQuery.checkin = this.dates[0];
      this.searchQuery.checkout = this.dates[1];
      let query = this.searchQuery;
      let paxString = this.paxString();
      console.log(query);
      router.push(
        "/availability?cityId=" +
          query.city +
          "&checkin=" +
          query.checkin +
          "&checkout=" +
          query.checkout + 
          "&pax=" +
          paxString
      );
    },
    addRoom() {
      if (this.searchQuery.rooms.length < 4) {
        let id = this.searchQuery.rooms.length + 1;
        let room = {
          id: id,
          adults: 2,
          children: 0,
          childrenAges: [],
        };

        this.searchQuery.rooms.push(room);
      }
    },
    deleteRoom(id){
      this.searchQuery.rooms.splice(id-1,1)
      let i= 1;
      this.searchQuery.rooms.forEach(room => {
        room.id= i
        i+=1;
      });
    },
    paxString(){
      let rooms =  this.searchQuery.rooms;
      let paxString = ""
      rooms.forEach(room => {
        paxString+=room.adults
        for (let i=0; i<room.children;i++){
          paxString+=','+room.childrenAges[i]
        }
        paxString+=";"
      });
      return paxString;
    }
  },
};
</script>
