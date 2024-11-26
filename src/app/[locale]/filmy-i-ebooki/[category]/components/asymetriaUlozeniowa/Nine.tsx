import Link from "next/link";
import styles from "./Nine.module.scss";

async function Second() {
	return (
		<>
			<section  id="info">
  <div className={styles.set}>
    <h2>Już wiesz, że chcesz dołączyć do grona świadomych i spokojniejszych rodziców?</h2>
    <Link href="/filmy-i-ebooki/asymetria-ulozeniowa#products">
      <button className="">WRÓĆ DO OFERTY</button>
    </Link>
  </div>
			</section>
		</>
	);
}

export default Second;
