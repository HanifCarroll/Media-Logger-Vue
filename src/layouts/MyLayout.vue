<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn to="/table" size="20px" stretch flat label="Brahs Media" />
        </q-toolbar-title>

        <span v-if="$store.getters.isLoggedIn" style="display: flex">
          <q-separator dark vertical />
          <q-btn to="/table" stretch flat label="Table" />
          <q-separator dark vertical />
          <q-btn @click="onLogout" stretch flat label="Logout" />
        </span>

        <span v-else style="display: flex">
          <q-separator dark vertical />
          <q-btn to="/login" stretch flat label="Login" />
          <q-separator dark vertical />
          <q-btn to="/register" stretch flat label="Register" />
        </span>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data() {
    return {
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>
