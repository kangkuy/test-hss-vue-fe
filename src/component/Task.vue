<script setup>
import api from "@/lib/api";
import { Button, Column, DataTable, Dialog, IconField, InputIcon, InputText } from "primevue";
import { onMounted, ref } from "vue";
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'

const confirm = useConfirm()


const loading = ref(false);
const data = ref([]);

const totalRecords = ref(0);
const search = ref("");
const lazyParams = ref({
  first: 0,
  rows: 10,
});

const formData = ref({
    title: '',
    status: 0
})

const loadData = async () => {
  loading.value = true;

  try {
    const response = await api.get("/task/data", {
      params: {
        draw: 1,
        start: lazyParams.value.first,
        length: lazyParams.value.rows,
        search: search.value,
      },
    });
    data.value = response.data.data;
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

  loadData();
};

const editEmployee = (data) => {
    console.log('Edit', data)
}

const deleteEmployee = (data) => {
    console.log('Delete', data)
    confirm.require({
        message: `Yakin ingin menghapus ${data.title}?`,
        header: 'Konfirmasi',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Batal',
        acceptLabel: 'Hapus',
        acceptClass: 'p-button-danger',

        accept: async () => {
            try {
                const response = await api.delete(`/task/delete/${data.id}`)

                loadData()
        console.log('data dihapus');
        console.log(response.data)

            } catch (error) {
                console.log(error)
            }
        }
    })
}

onMounted(() => {
  loadData();
  console.log(search.value);
});
</script>

<template>
  <div class="mx-2 my-1">
    <font-awesome-icon icon="user" />

  <font-awesome-icon icon="trash" class="text-red-500" />

  <font-awesome-icon icon="pen" class="text-blue-500" />
  <h1>TASK</h1>
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-2xl font-bold">
        Data Karyawan
    </h2>

    <RouterLink to="/tambah" class="bg-blue-500 px-2 py-1 rounded">Task</RouterLink>
</div>
  <DataTable
    :value="data"
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
    
    @page="onPage"
  >
    <Column field="title" header="Nama" />
    <Column field="status" header="Email" />
    <Column header="Aksi" style="width: 140px">
        <template #body="{ data }">
            <div class="flex items-center justify-center gap-2">

                <button
                    @click="editEmployee(data)"
                    class="w-9 h-9 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition"
                >
                    <font-awesome-icon icon="pen" />
                </button>

                <button
                    @click="deleteEmployee(data)"
                    class="w-9 h-9 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                    <font-awesome-icon icon="trash" />
                </button>

            </div>
        </template>
    </Column>
  </DataTable>

  <ConfirmDialog/>
  </div>
</template>
