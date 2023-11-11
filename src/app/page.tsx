import './styles/scss/globals.scss';
import styles from './page.module.scss';
import NavBar from './components/NavBar/NavBar';

export default function Home() {
  return (
    <main className={styles.main}>
      <section>
        <NavBar />
      </section>
    </main>
  );
}
