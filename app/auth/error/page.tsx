// very simple login form
export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
