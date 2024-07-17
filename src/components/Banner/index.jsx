import styles from "./Banner.module.css";

function Banner() {
  return (
    <header className={styles.banner}>
      <img
        src="/assets/banner.png"
        alt="O banner principal da página."
      />
    </header>
  );
}

export default Banner;