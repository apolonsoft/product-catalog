<template>
    <div class="login-page p-4">
        <form class="flex gap-2 flex-col items-center" @submit.prevent="submitForm">
            <div class="flex gap-2 items-center justify-center">
                <label for="username">
                    Username :
                </label>
                <input id="username" v-model="form.username" autocomplete="username" type="text" name="username">
            </div>
            <div class="flex gap-2 items-center justify-center">
                <label for="password">
                    Password :
                </label>
                <input id="password" v-model="form.password" autocomplete="current-password" type="password" name="password">
            </div>
            <button type="submit" class="px-6!">
                Login
            </button>
            <div v-if="error">
                {{ error }}
            </div>
        </form>

    </div>
</template>

<script lang="ts" setup>
useHead({
    title: "Login"
});

const error = ref<string | null>(null);
const refreshKey =  useState<number>("navbarRefreshKey",() => 0);
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

    const result = await $fetch.raw("/api/auth/login", {
        method: 'POST',
        body: {
            username: form.username,
            password: form.password
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                error.value = (response._data).message;
                return;
            }
        }
    });
    if (!result.ok) {
        error.value = "Something went wrong during user login;";
        return;
    }
    //error.value = result._data?.token ?? "No token retrieved."

    if (!(result._data && result._data.token)) {
        error.value = "There was an issue in data body.";
        return;
    }
    useCookie('jwt_token').value = result._data.token;
    refreshKey.value++;
    await navigateTo('/');
}

const form = reactive({
    username: "",
    password: ""
});
</script>

<style scoped>
@import "tailwindcss";

input,
button {
    @apply bg-neutral-700 border border-neutral-500 p-2 rounded-full
}
</style>