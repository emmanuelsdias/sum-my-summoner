class User {
  constructor(name, email, password, authByGoogle) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.authByGoogle = authByGoogle;
  }
}

export default User;