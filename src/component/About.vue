<script setup lang="ts">
import api from "@/lib/api";
import { Column, DataTable, IconField, InputIcon, InputText } from "primevue";
import { onMounted, ref } from "vue";
const loading = ref(false);

const users = ref([]);
const totalRecords = ref(0);
const search = ref("");
const lazyParams = ref({
  first: 0,
  rows: 10,
});

const loadUsers = async () => {
  loading.value = true;

  try {
    const response = await api.get("/employee-data", {
      params: {
        draw: 1,
        start: lazyParams.value.first,
        length: lazyParams.value.rows,
        search: search.value
      },
    });
    users.value = response.data.data;
    console.log(response);
    totalRecords.value = response.data.recordsFiltered;
  } finally {
    loading.value = false;
  }
};

const onPage = (event) => {
  console.log(event);

  lazyParams.value.first = event.first;
  lazyParams.value.rows = event.rows;

  loadUsers();
};

onMounted(() => {
  loadUsers();
  console.log(search.value)
});

</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-bold">Data Karyawan</h2>

    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText v-model="search" @keyup="loadUsers" placeholder="Cari..." />
    </IconField>
  </div>
  <DataTable
    :value="users"
    lazy
    paginator
    :rows="10"
    :first="lazyParams.first"
    :totalRecords="totalRecords"
    :loading="loading"
    stripedRows
    showGridlines
    removableSort
    size="small"
    tableStyle="min-width: 70rem"
    @page="onPage"
  >
    <Column field="name" header="Nama" />
    <Column field="email" header="Email" />
    <Column field="address" header="Alamat" />
    <Column field="phone_number" header="Telepon" />
  </DataTable>
</template>
