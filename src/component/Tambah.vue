<script setup>
import api from "@/lib/api";
import router from "@/router";
import { Button, InputText, Select } from "primevue";
import { ref } from "vue";

const form = ref({
  title: "",
  status: 0,
});

const statusOptions = [
  {
    label: "Pending",
    value: 0,
  },
  {
    label: "Done",
    value: 1,
  },
];

const saveTask = async () => {
  console.log(form.value);

  // Contoh kirim ke Laravel
  // await api.post('/employee', form.value)
  const response = await api.post("/task/store", form.value);
  console.log(response);
  router.push("/task");
  // console.log
};
</script>

<template>
  ini tambah
  <div class="space-y-4 w-80">
    <div>
      <label class="mb-2 font-medium"> Title </label>

      <InputText v-model="form.title" class="w-full" />
    </div>

    <div>
      <label class="mb-2 font-medium"> Status </label>

      <Select
        v-model="form.status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Pilih Status"
        class="w-full"
      />
    </div>

    <Button label="Simpan" icon="pi pi-check" @click="saveTask" />
  </div>
</template>
