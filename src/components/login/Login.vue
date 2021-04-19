<template>
  <div class="drawer-background " :class="{ show: show }">
    <div class="drawer " :class="{ show: show }">
      <div class="drawer-close" @click.prevent="closeLoginForm()">X</div>
      <p class="sign" align="center">Sign in</p>
      <form>
        <div class="row">
          <div class="col-25">
            <label for="username">username</label>
          </div>
          <div class="col-75">
            <input
              class="un"
              type="text"
              name="username"
              v-model="userCred.username"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="password">Passwords</label>
          </div>
          <div class="col-75">
            <input
              type="password"
              name="category"
              class="pass"
              v-model="userCred.password"
            />
          </div>
        </div>
        <button @click.prevent="login()">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('toggleShowLoginForm')
  },
  data() {
    return {
      userCred: {
        username: "username",
        password: "*****",
      },
    };
  },
  computed: {
    show() {
      return this.$store.state.showLoginForm;
    }
  },
  methods: {
    closeLoginForm() {
      this.$store.state.showLoginForm = false;
      window.location.replace('http://localhost:8080/');
      // window.location.reload();
    },
    login() {
      fetch("http://localhost/wordpress_prc/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.userCred),
      })
        .then((res) => res.json())
        .then((data) => {
          if(!('token' in data)) {
            window.alert('Login Failed. Please check credentials');
            this.closeLoginForm();
            return;
          }
          const authHeaderConfig = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          };
          this.$store.state.authToken = authHeaderConfig.Authorization;
          localStorage.setItem("authKey", authHeaderConfig.Authorization);
          window.alert('Successfully logged in');
          this.closeLoginForm();       
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.sign {
  padding-top: 40px;
  color: #8c55aa;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 23px;
}

.drawer-background {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(124, 124, 124, 0.541);
  z-index: 100;
  display: none;
  transition: display 0.5s;

  &.show {
    display: block;
  }
}

.drawer-background.show {
  display: block;
}

.drawer {
  width: 95vw;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: -105vw;
  padding: 15px;
  transition: left 0.5s;
  z-index: 101;
  overflow-y: scroll;

  &.show {
    left: 0;
  }
}

.drawer-close {
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  right: 10px;
  color: gray;
  width: 15px;
  float: right;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
}

.product-details {
  display: flex;
  justify-content: center;
  flex-direction: column;

  p.description {
    padding: 20px;
    line-height: 1.5rem;
  }

  .button-container {
    button {
      width: 150px;
      border: none;
      padding: 10px;
      border-radius: 5px;
      margin: 0 5px 50px 5px;
      cursor: pointer;
    }
  }
}

.un {
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: "Ubuntu", sans-serif;
}

.pass {
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: "Ubuntu", sans-serif;
}

.un:focus,
.pass:focus {
  border: 2px solid rgb(79, 160, 187) !important;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

.container {
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

@media (min-width: 500px) {
  .drawer {
    width: 450px;
  }

  .col-25,
  .col-75 {
    width: inherit;
    margin-top: 0;
  }
}
</style>