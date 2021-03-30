<template>
  <v-app>
    <v-main v-if="user">
      <div class="chat pa-4">
        <div class="messages">
          <div v-for="(m, i) in messages" :key="i" class="d-flex mb-3">
            <div
              class="py-3 px-6 message rounded-xl"
              :class="[
                m.isAuthor ? 'ml-auto teal lighten-4' : 'grey lighten-4',
              ]"
            >
              <div v-if="!m.isAuthor" class="light-blue--text accent-1">
                {{ m.email }}
              </div>
              <div>{{ m.message }}</div>
            </div>
          </div>
        </div>

        <div class="message-area">
          <v-text-field
            v-model="message"
            :fullWidth="true"
            outlined
            label="Enter the message"
            @keyup.enter="sendMessage"
          />
        </div>
      </div>
    </v-main>

    <v-dialog :value="isPopupVisible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Login Form</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="6"
              label="Password"
              required
            />
            <v-btn class="mr-4" color="primary" @click="login">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'App',

  components: {

  },

  created() {
    firebase.auth().onAuthStateChanged((u) => {
      this.isPopupVisible = !u;
      this.$nextTick(() => {
        this.user = u;
      });

      if (u) {
        this.wss = new WebSocket('ws://localhost:3000');

        // Соединение открыто
        this.wss.addEventListener('open', () => {
          //
        });

        // Наблюдает за сообщениями
        this.wss.addEventListener('message', (event) => {
          const data = JSON.parse(event.data);
          const { message } = data;
          this.messages.push(message);
        });
      }
    });
  },

  data: () => ({
    user: null,
    isPopupVisible: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
    wss: null,
    messages: [],
    message: '',
  }),

  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // Signed in
        })
        .catch(() => {
          //
        });
    },

    sendMessage() {
      if (this.message) {
        this.messages.push({ message: this.message, email: this.user.email, isAuthor: true });
        this.wss.send(JSON.stringify({ email: this.user.email, message: this.message }));
        this.message = '';
      }
    },
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.messages {
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow: auto;
}
.message {
  display: inline-block;
  border: 1px solid;
}
.message-area {
  margin-top: auto;
  display: flex;
}
</style>
