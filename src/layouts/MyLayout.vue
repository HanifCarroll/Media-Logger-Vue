<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn to="/table" size="20px" stretch flat label="Brahs Media Logger" />
        </q-toolbar-title>

        <q-separator dark vertical />
        <q-btn to="/login" stretch flat label="Login" />
        <q-separator dark vertical />
        <q-btn to="/register" stretch flat label="Register" />
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
};
</script>
