const Login = () => {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
