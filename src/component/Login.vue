<script setup>
import { ref } from "vue";
import api from "../lib/api.js";
import { useRouter } from "vue-router";
const form = ref({
  email: "",
  password: "",
});

const router = useRouter();
const loading = ref(false);
const error = ref("");

const login = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await api.post("/login", form.value);

    console.log(response.data);

    // Simpan token
    localStorage.setItem("token", response.data.access_token);

    // Redirect
    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Login gagal";
    console.log({ err });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>

        <div
          class="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
        >
          <input
            id="username"
            type="email"
            v-model="form.email"
            name="username"
            placeholder="janesmith"
            class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Password</label>

        <div
          class="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
        >
          <input
            id="password"
            type="password"
            v-model="form.password"
            name="password"
            placeholder="••••••••"
            class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>

      <p v-if="error">
        {{ error }}
      </p>

      <button :disabled="loading" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        {{ loading ? "Loading..." : "Login" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  width: 350px;
  margin: 80px auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

input {
  padding: 10px;
}

button {
  padding: 10px;
  width: 100%;
}
</style>
