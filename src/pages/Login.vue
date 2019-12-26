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
import * as axios from 'axios';

export default {
  name: 'PageLogin',

  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    onSubmit() {
      const user = {
        username: this.username,
        password: this.password,
      };

      axios.post('http://localhost:3000/auth/login', user)
        .then((res) => {
          console.log('res', res.data);

          this.$router.push({ path: '/table' });
        })
        .catch((err) => {
          console.log('err', err);

          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Incorrect credentials.',
          });
        });
    },
  },
};
</script>
