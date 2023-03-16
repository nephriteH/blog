import homeStyle from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Index() {
  return (
    <div id="main">
      <div className={homeStyle.headBg}>
        <div className={homeStyle.homeInfo}>
          <span className={homeStyle.loop}></span>
          <span className={homeStyle.loop}></span>
          <span className={homeStyle.loop}></span>
          <span className={homeStyle.loop}></span>
          <span className={homeStyle.info}>
            <div className={homeStyle.wrap}>
              <Image
                priority
                src="/images/profile.png"
                className={homeStyle.borderCircle}
                height={144}
                width={144}
                alt=""
              />
              <h2>Nephrite</h2>
              <Link href="/home">
                <h5>Welcome To My Blog!</h5>
              </Link>
              <p>做个俗人，贪财好色</p>
              <p className={`w-full text-right text-gray-600 text-xs`}>一身正气</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
