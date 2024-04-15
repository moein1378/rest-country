<script lang="ts" setup>
import { CountryRestService } from "@/services";
import { CountryInfo } from "@/services/models";
import { ref } from "vue";
import { useRouter } from "vue-router";

// SHARED
const countriesList = ref<CountryInfo[]>([]);
const loading = ref<boolean>(false);
const router = useRouter();

// GET SEARCHED RESULT
const searchedName = ref<string>("");

async function getCountryByName() {
  if (!!searchedName.value) {
    loading.value = true;
    const [err, resp] = await CountryRestService.getByName(searchedName.value);
    if (err) {
      setTimeout(() => (loading.value = false), 1500);
      return;
    }
    countriesList.value = resp.data;
    setTimeout(() => (loading.value = false), 1500);
  }
}

// GET FILTERED BY REGION RESULT
const currentRegion = ref<string>("");
const regions = ref<string[]>(["africa", "america", "asia", "europe", "oceania"]);

async function getCountriesByRegion() {
  if (!!currentRegion.value) {
    loading.value = true;
    const [err, resp] = await CountryRestService.getByRegion(currentRegion.value);
    if (err) {
      setTimeout(() => (loading.value = false), 1500);
      return;
    }
    countriesList.value = resp.data;
    setTimeout(() => (loading.value = false), 1500);
  }
}

// INIT ALL COUNTRIES
async function getAllCountries() {
  loading.value = true;
  const [err, resp] = await CountryRestService.getAll();
  if (err) {
    setTimeout(() => (loading.value = false), 1500);
    return;
  }
  countriesList.value = resp.data;
  setTimeout(() => (loading.value = false), 1500);
}
getAllCountries();

// ON CLICKING COUNTRY
function goToCountryInfo(country: CountryInfo) {
  router.push({ name: "country-info", params: { countryName: country.name.official } });
}
</script>
<template>
  <div class="container col q-gutter-lg">
    <div class="row items-center justify-between q-col-gutter-y-lg">
      <!--SEARCH BOX-->
      <div class="search-box col-xs-12 col-sm-12 col-md-3">
        <q-input
          filled
          dense
          v-model="searchedName"
          placeholder="search for a country..."
          clearable
          @clear="getAllCountries()"
        >
          <template v-slot:prepend>
            <q-icon name="search" class="cursor-pointer" @click="getCountryByName()" />
          </template>
        </q-input>
      </div>
      <!--FILTER BOX-->
      <div class="region-filter col-xs-12 col-sm-12 col-md-3">
        <q-select
          filled
          dense
          class="text-capitalize"
          v-model="currentRegion"
          :options="regions"
          label="filter by region"
          @update:model-value="getCountriesByRegion"
          clearable
          @clear="getAllCountries()"
        >
        </q-select>
      </div>
    </div>
    <div class="countries-list">
      <div class="row justify-center items-center q-col-gutter-md">
        <div v-if="loading" class="full-width row justify-center items-center">
          <q-spinner-cube size="5.5em" />
        </div>
        <template v-else>
          <div
            v-for="country in countriesList"
            :key="country.name.official"
            class="col-xs-12 col-sm-12 col-md-3"
          >
            <q-card class="cursor-pointer text-capitalize" @click="goToCountryInfo(country)">
              <q-img :src="country.flags.svg" :ratio="16 / 9" />
              <q-card-section>
                <div class="text-h6 text-weight-bold name text-capitalize">
                  {{ country.name.common }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="population">
                  <span class="text-subtitle2 text-weight-bold">population:&nbsp;</span>
                  <span class="text-grey-7">{{ country.population.toLocaleString() }}</span>
                </div>
                <div class="region">
                  <span class="text-subtitle2 text-weight-bold">region:&nbsp;</span>
                  <span class="text-grey-7">{{ country.region }}</span>
                </div>
                <div v-if="country.capital" class="capital">
                  <span class="text-subtitle2 text-weight-bold">capital:&nbsp;</span>
                  <span class="text-grey-7">{{ country.capital.join(",") }}</span>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
