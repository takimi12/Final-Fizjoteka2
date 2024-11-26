
import styles from "./Third.module.scss";
import video from "../../../../../../../public/assets/Filmy-i-ebooki/asymetria/Screenshot 2024-06-26 at 00.35.18.png"
import Image from "next/image";


async function Second() {
	return (
		<>
			<section className={`${styles.third} flex justify-center`} id="info">
			<div className="Container">
                <div className={styles.textWrapper}>
      <h2>Chcę, żeby każdy rodzic miał dostęp do rzetelnej wiedzy na temat asymetrii.</h2>
</div>
    <div className={styles.parent}>
      <div className={styles.left}>
        <h6 className="mb-10">Asymetria ułożeniowa to jedno z najczęstszych schorzeń u niemowląt.</h6>
        <p>Rodzicom trudno jednak dotrzeć do sprawdzonych informacji na ten temat. Niekiedy zawodzą nawet specjaliści! Nie jestem w stanie pomóc wszystkim osobiście. Gwarantuję jednak, że przygotowane przeze mnie materiały są prawdziwą pigułką wiedzy.</p>
      </div>
    <div className={styles.right}>
        <Image src={video } alt='video' />
    </div>
    </div>
    </div>

			</section>
		</>
	);
}

export default Second;
