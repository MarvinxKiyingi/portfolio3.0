import './styles/scss/globals.scss';
import styles from './page.module.scss';
import NavBar from './components/NavBar/NavBar';
import ArrowDown from './components/Icons/ArrowDown';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <NavBar />

        <div>
          <section className={styles.textWrapper}>
            <h1 className={`heading-1 ${styles.title}`}>
              Lorem, ipsum dolor sit.
            </h1>

            <div className={styles.descriptionWrapper}>
              <p className={`sub-text ${styles.description}`}>
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Proin mollis laoreet gravida.
              </p>
            </div>

            <button className={styles.button}>
              <ArrowDown />
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
