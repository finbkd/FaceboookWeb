import { useRef } from "react";
import { api } from "../http";
import styles from "../styles/RegisterForm.module.css";

const RegisterForm = ({ handler }) => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async () => {
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if ((!userName, !email, !password)) return;
    const response = await api.post("/api/auth/register", { userName, email, password });
    window.location.reload();
  };

  const formHandler = (e) => {
    handler(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <div className={styles.header}>
          <div className={styles.titleContent}>
            <div className={styles.title}>Sign Up</div>
            <div className={styles.subtext}>It's quick and easy</div>
          </div>
          <div onClick={formHandler} className={styles.iconContainer}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </div>
        </div>
        <div className={styles.content}>
          <input className={styles.inputText} placeholder="User Name" ref={userNameRef} />
          <input className={styles.inputText} placeholder="Email" type="email" ref={emailRef} />
          <input className={styles.inputText} type="password" placeholder="New Password" ref={passwordRef} />
          <div className={styles.policy}>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</div>
          <button onClick={submitHandler} className={styles.submit}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
