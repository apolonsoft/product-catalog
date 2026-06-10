<script lang="ts" setup>
const counter = useState<number>("count", () => 0);
const { data, pending, error } = await useFetch("/api/hello", {
    method: 'GET',
    server: false
})

</script>
<template>
    <div>

        <h5>
            About
        </h5>
        <p v-if="pending">
            Loading...
        </p>
        <p v-if="error">
            There is an error. {{ error.data.message }}
        </p>
        <ul v-else class="list-disc list-inside p-4">
            <li v-for="(product, index) in data?.products" :key="index">
                {{ product.name }}
            </li>
        </ul>
        {{ counter }}
        <button @click="counter++">
            increase
        </button>
        <NuxtLink to="/">
            Home
        </NuxtLink>
    </div>
</template>