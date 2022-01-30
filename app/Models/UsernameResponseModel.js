export class UsernameSuccessResponse {
  constructor(data) {
    this.id       = data.id;
    this.name     = data.name;
    this.username = data.username;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getUserName() {
    return this.username;
  }
}

export class UsernameFailureResponse {
  constructor(errors) {
    this.errors = errors;
  }

  getErrorDetail() {
    let errorData = this.errors[0];
    return errorData.detail;
  }
}
