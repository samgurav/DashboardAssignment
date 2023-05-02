import React from "react";
import styles from "./Home.module.css";
import { IMAGES } from "../../config/string";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate=useNavigate()
  return (
    <>
      <div className={styles.pageContainer} >
        <section className={styles.hero}>
          <h1>Best Placement Training Platform</h1>
          <div className={styles.paragraph}>
            We at Campus Credential (CC) affirm that every student is capable of
            realizing his/her dreams. We coach, mentor, teach and hand-hold
            graduating students to ace the complete Campus Recruitment Process
            right from Aptitude training to mastering GDPI.
          </div>
          <div className={styles.imgContainer} >
            <img src={IMAGES.LOGO} width={'300px'} height={'400px'} />
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div>Copyright Ⓒ 2023 Campus Credentials.</div>
      </footer>
    </>
  );
}

export default Home;
