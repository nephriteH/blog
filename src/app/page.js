"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/posts";
    }, 8000);
  }, []);

  return (
    <div id="main">
      <video
        className={styles.mainVideo}
        loop
        autoPlay
        muted>
        <source
          src="/res/outerSpace.mp4"
          type="video/mp4"></source>
      </video>
      <div className={styles.headBg}>
        <div className={styles.homeInfo}>
          <span className={styles.loop}></span>
          <span className={styles.loop}></span>
          <span className={styles.loop}></span>
          <span className={styles.loop}></span>
          <span className={styles.info}>
            <div className={styles.wrap}>
              <Image
                priority
                src="/images/profile.png"
                className={styles.borderCircle}
                height={144}
                width={144}
                alt=""
              />
              <h2>Nephrite</h2>
              <Link href="/posts">
                <h5 className={styles.enterButton}>Welcome To My Blog!</h5>
              </Link>
              <p>做个俗人，贪财好色</p>
              <p className={styles.miniText}>一身正气</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
