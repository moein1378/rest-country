<script lang="ts" setup>
import { CountryRestService } from "@/services";
import { CountryInfo } from "@/services/models";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { NeededCountryInfo } from "@/types";

// SHARED
const route = useRoute();
const router = useRouter();
const countryNameOnRouteParams = ref<string>("");

// FETCH COUNTRY
const loading = ref<boolean>(false);
let currentCountry = reactive<Partial<NeededCountryInfo>>({});

async function getCountryByName(countryName: string) {
  loading.value = true;
  const [err, resp] = await CountryRestService.getByName(countryName);
  if (err) {
    setTimeout(() => (loading.value = false), 1500);
    return;
  }
  const [foundCountry] = resp.data;
  getNeededCountryInfo(foundCountry);
  setTimeout(() => (loading.value = false), 1500);
}

// GET NEEDED COUNTRY INFO
function getNeededCountryInfo(country: CountryInfo) {
  const {
    name,
    region,
    subregion,
    population,
    capital,
    tld,
    currencies,
    languages,
    flags,
    borders,
  } = country;
  currentCountry = {
    borders,
    flags,
    name,
    region,
    subregion,
    population,
    capital,
    tld,
    currencies,
    languages,
  };
}

// ON UPDATE COUNTRY NAME
watch(
  () => route.params.countryName,
  (countryName: string) => {
    countryNameOnRouteParams.value = countryName;
    if (countryNameOnRouteParams.value) getCountryByName(countryNameOnRouteParams.value);
  },
  { immediate: true, deep: true }
);

// ON CLICKING BACK BUTTON
function goToPreviousPage() {
  router.push({ name: "home-page" });
}
</script>
<template>
  <div class="container q-gutter-lg">
    <div class="nav-bar q-gutter-md">
      <q-btn label="back" icon="o_arrow_back" @click="goToPreviousPage" />
    </div>
    <div v-if="loading" class="full-width row justify-center items-center">
      <q-spinner-cube size="5.5em" />
    </div>
    <template v-else>
      <div class="info-container row justify-center items-center q-col-gutter-md">
        <!--COUNTRY FLAG-->
        <div class="flag col-xs-12 col-sm-12 col-md-6">
          <q-img :src="currentCountry.flags.svg" />
        </div>
        <div class="detail text-capitalize column q-gutter-y-md col-xs-12 col-sm-12 col-md-6">
          <!--COUNTRY NAME-->
          <div class="text-h6 text-weight-bold name text-capitalize">
            {{ currentCountry.name.common }}
          </div>
          <div class="row items-start q-gutter-x-lg">
            <!--FIRST DETAIL COL-->
            <div class="detail-col">
              <div class="native-name">
                <span class="text-subtitle2 text-weight-bold">native name:&nbsp;</span>
                <template v-for="(_, value) in currentCountry.name.nativeName">
                  <span class="text-grey-7">{{
                    currentCountry.name.nativeName[value].official
                  }}</span>
                </template>
              </div>
              <div class="population">
                <span class="text-subtitle2 text-weight-bold">population:&nbsp;</span>
                <span class="text-grey-7">{{ currentCountry.population.toLocaleString() }}</span>
              </div>
              <div class="region">
                <span class="text-subtitle2 text-weight-bold">region:&nbsp;</span>
                <span class="text-grey-7">{{ currentCountry.region }}</span>
              </div>
              <div class="sub-region">
                <span class="text-subtitle2 text-weight-bold">sub region:&nbsp;</span>
                <span class="text-grey-7">{{ currentCountry.subregion }}</span>
              </div>
              <div v-if="currentCountry.capital" class="capital">
                <span class="text-subtitle2 text-weight-bold">capital:&nbsp;</span>
                <span class="text-grey-7">{{ currentCountry.capital.join(",") }}</span>
              </div>
            </div>
            <!--SECOND DETAIL COL-->
            <div class="detail-col">
              <div v-if="currentCountry.tld" class="top-level-domain">
                <span class="text-subtitle2 text-weight-bold">top level domain:&nbsp;</span>
                <span class="text-grey-7">{{ currentCountry.tld.join(",") }}</span>
              </div>
              <div class="currencies">
                <span class="text-subtitle2 text-weight-bold">currencies:&nbsp;</span>
                <template v-for="(_, value) in currentCountry.currencies">
                  <span class="text-grey-7">{{ value }}</span>
                </template>
              </div>
              <div class="languages">
                <span class="text-subtitle2 text-weight-bold">languages:&nbsp;</span>
                <template v-for="(_, value) in currentCountry.languages">
                  <span class="text-grey-7">{{ currentCountry.languages[value] }}</span>
                </template>
              </div>
            </div>
          </div>
          <!--BORDER COUNTRIES-->
          <div v-if="currentCountry.borders" class="border-countries row items-center">
            <span class="text-subtitle2 text-weight-bold">border countries:&nbsp;</span>
            <div class="q-gutter-x-xs">
              <template v-for="country in currentCountry.borders">
                <q-badge outline color="grey-6" :label="country" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.info-container {
  .flag,
  .detail,
  .detail-col {
    flex-grow: 1;
  }
}
</style>
