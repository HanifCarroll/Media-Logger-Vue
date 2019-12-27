<template>
  <q-page>
    <div class="q-pa-md">
      <h4>Login</h4>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          type="text"
          v-model="username"
          label="Username *"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password *"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',

  data() {
    return {
      username: 'hanif',
      password: 'password',
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const user = {
        username: this.username,
        password: this.password,
      };

      this.$store.dispatch('auth/login', user)
        .then(() => {
          this.$router.push('/table');
        })
        .catch((err) => {
          console.warn('err', err);
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Something went wrong.',
            timeout: 2000,
          });
        });
    },
  },
};
</script>
