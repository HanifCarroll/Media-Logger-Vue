<template>
  <q-page>
    <div class="q-pa-md">
      <h4>Register</h4>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          type="text"
          v-model="username"
          label="Username *"
          lazy-rules
          :rules="[ val => val && val.length >= 4 || 'Username must be 4 characters or more.']"
        />

        <q-input
          filled
          type="email"
          v-model="email"
          label="Email *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password *"
          lazy-rules
          :rules="[ val => val && val.length >= 4 || 'Password must be 4 characters or more.']"
        />

        <q-input
          filled
          type="password"
          v-model="passwordConfirm"
          label="Password Confirmation *"
          :rules="[
          val => val === this.password || 'Passwords must match.',
        ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import * as axios from 'axios';

export default {
  name: 'PageRegister',

  data() {
    return {
      username: null,
      email: null,
      password: null,
      passwordConfirm: null,
    };
  },
  methods: {
    onSubmit() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      axios.post('http://localhost:3000/auth/register', user)
        .then((res) => {
          console.log('res', res.data);

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'person_add',
            message: 'Account Created',
          });
        })
        .catch((err) => {
          console.log('err', err);

          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'person_add_disabled',
            message: 'User already exists.',
          });
        });
    },

    onReset() {
      this.username = null;
      this.email = null;
      this.password = null;
      this.passwordConfirm = null;
    },
  },
};
</script>
