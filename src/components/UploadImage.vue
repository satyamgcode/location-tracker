<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-900 text-green-400 relative">
    <div class="text-2xl sm:text-4xl font-bold border px-9 border-green-400 pb-2 mt-4 rounded-md">
      Location Tracker
    </div>
    <h2 class="text-2xl font-bold mb-6 border-green-400 pb-2 tracking-wider animate-pulse pt-32">
      Upload an Image
    </h2>
    <div class="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg border border-green-400">
      <input 
        type="file" 
        @change="uploadImage" 
        class="w-full mb-4 bg-gray-700 text-green-400 p-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
      />
      
      <div v-if="loading" class="flex justify-center mt-4">
        <!-- Loader -->
        <svg class="animate-spin h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </div>

      <div v-if="imageUrl && !loading" class="flex flex-col md:flex-row items-center mt-4 space-x-2">
        <p class="break-all">Image URL:</p>
        <div class="flex items-center gap-3">
          <a 
          :href="imageUrl" 
          target="_blank" 
          class="text-green-300 hover:text-green-500 transition-colors duration-300 underline break-all">
          {{ imageUrl }}
        </a>
        <!-- Copy to clipboard icon -->
        <button @click="copyToClipboard" class="text-green-400 hover:text-green-500 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h8m-4 4h4m2 0V7a2 2 0 00-2-2h-4m-4 0H6a2 2 0 00-2 2v12a2 2 0 002 2h4m0 0h4m-4 0a2 2 0 01-2-2V5m2-3h4v4H8V2z" />
          </svg>
        </button>
        </div>
      </div>

      <p v-else-if="!loading" class="mt-4 text-gray-500">
        No image uploaded yet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const imageUrl = ref(''); // Store the image URL
const loading = ref(false); // State for loading spinner

// Function to upload image
const uploadImage = async (event) => {
  const file = event.target.files[0]; // Get the selected file
  const formData = new FormData();
  formData.append('image', file);
  
  loading.value = true; // Show loader

  try {
    // Post the image to the backend server
    const response = await axios.post('https://location-track-back-end-django.onrender.com/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Store the returned image URL
    imageUrl.value = response.data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
  } finally {
    loading.value = false; // Hide loader
  }
};

// Function to copy the image URL to the clipboard
const copyToClipboard = () => {
  if (imageUrl.value) {
    navigator.clipboard.writeText(imageUrl.value)
      .then(() => {
        alert('Image URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Error copying to clipboard:', err);
      });
  }
};
</script>

<style scoped>
/* Optional: Additional styles if needed */
</style>
