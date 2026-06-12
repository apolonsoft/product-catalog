<template>
    <div class="register-page p-4">
        <form class="flex gap-2 flex-col items-center" @submit.prevent="submitForm">
            <div class="flex gap-2 items-center justify-center">
                <label for="username">
                    Username :
                </label>
                <input id="username" v-model="form.username" type="text" name="username">
            </div>
            <div class="flex gap-2 items-center justify-center">
                <label for="password">
                    Password :
                </label>
                <input id="password" v-model="form.password" type="password" name="password">
            </div>
            <button type="submit" class="px-6!">
                Register
            </button>
            <div v-if="error">
                {{ error }}
            </div>
        </form>

    </div>
</template>

<script lang="ts" setup>
useHead({
    title: "Register"
});

const error = ref<string | null>(null);

async function submitForm() {
    error.value = null;
    if (!form.username) {
        error.value = "You must specify a username."
        return;
    }
    if (!form.password) {
        error.value = "You must specify a password."
        return;
    }

    const result = await $fetch.raw("/api/auth/register", {
        method: 'POST',
        body: {
            username: form.username,
            password: form.password
        }
    });
    if(!result.ok){
        error.value = "Something went wrong during user registration.";
        return;
    }
    error.value =  "User registration was successful. you can login now."
}


const form = reactive({
    username: "",
    password: ""
})
</script>

<style scoped>
@import "tailwindcss";

input,
button {
    @apply bg-neutral-700 border border-neutral-500 p-2 rounded-full
}
</style>