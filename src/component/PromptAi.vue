<script setup>
import { ref } from 'vue'
import api from '../lib/api.js'
const prompt = ref('')
const loading = ref(false)
const error = ref('')
// const form = ref({
//   prompt: '',
// })
const result = ref('')
const submitPrompt = async () => {
  console.log(localStorage.getItem('token'))
    loading.value = true
    error.value = ''
    
    try {
      const response = await api.post('/prompt', { prompt: prompt.value })
    
      console.log('hasil'+JSON.stringify(response.data))
    
        result.value = response.data.messages[0].content
    
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.log({err})
    } finally {
      loading.value = false
    }
}
</script>

<template>
  <div>
    <h2>Prompt AI</h2>
    <form @submit.prevent="submitPrompt">
        <textarea v-model="prompt" placeholder="Enter your prompt here"></textarea>
        <p v-if="error">
        {{ error }}asxxx
      </p>

      <button :disabled="loading">
        {{ loading ? 'Loading...' : 'Submit' }}
      </button>
    </form>
    <h4>Hasilnya</h4>
    <p v-html="result"></p>
  </div>
</template>