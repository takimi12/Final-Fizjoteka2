import Image from "next/image";
import Chat from "../../../../public/assets/Kurs-Noszenia/chat.svg";
import styles from "./opinie.module.scss";
import Link from "next/link";

async function Opinion({ variableOpinion }: { variableOpinion: boolean }) {
    return (
        <>
            <section className={`${styles.Ebook} d-flex flex-center`}>
                <div className={`${styles.wraperOpinion}`}>
                    <div className={`${variableOpinion ? styles.grey : styles.opinion}`}>
                        <span>
                            Korzystałam z pomocy Pani Magdy, przyjechała do nas na wizytę domową. Obserwowała
                            synka podczas aktywności i zabawy w jego codziennym środowisku. Przekazała nam cenne
                            wskazówki i dobrała ćwiczenia, dzięki czemu widać postępy. Polecam!
                        </span>
                        <h6 className={` sign`}>Paula K.</h6>
                    </div>
                    <div className={`${variableOpinion ? styles.grey : styles.opinion}`}>
                        <span>
                            Pani Magdą to bardzo ciepła i miła osoba 😉 To szczególnie ważne przy małych
                            dzieciach. Wszystko dobrze tłumaczy i nie &apos;straszy&apos; niepotrzebnie. gorąco polecam do
                            kontaktu z Panią Magdaleną nawet profilaktycznie
                        </span>
                        <h6 className={` sign`}>Dorota B.</h6>
                    </div>
                    <div className={`${variableOpinion ? styles.grey : styles.opinion}`}>
                        <span>
                            Pani Magda profesjonalnie i z dużym zaangażowaniem podeszła do moich córek oraz
                            wykonywanych przez nią zabiegów fizjoterapeutycznych. Poleciła nam dodatkowe ćwiczenia
                            i skutecznie pomogła. Bardzo dziękuję i polecam Panią całym sercem!👍
                        </span>
                        <h6 className={` sign`}>Marta S.</h6>
                    </div>
                    <div className={`${variableOpinion ? styles.grey : styles.opinion}`}>
                        <span>
                            Profesjonalizm, punktualność i wiedza!!! Wizyty domowe są ułatwieniem dla mam i
                            maluszków. Ponadto dobry kontakt na fb, można o wszystko zapytać. Pani Magda ma
                            wspaniałe podejście do dzieci, edukuje rodziców zarówno w zakresie pielęgnacji
                            niemowląt, jak i ćwiczeń do samodzielnego wykonywania w domu. Polecam wszystkim.
                        </span>
                        <h6 className={` sign`}>Sylwia Sz.</h6>
                    </div>
                    <div className={`${variableOpinion ? styles.grey : styles.opinion}`}>
                        <span>
                            Mieszkam za granicą i napotkałam problemy z dostępem do fizjoterapii dziecięcej w
                            sprawie, która mnie niepokoiła. Mówiono mi, że niektóre dzieci &apos;takie są&apos;.
                            Zdecydowałam się na konsultacje online, których nie jestem fanką w normalnych
                            okolicznościach. Termin dostałam już na następny dzień. Jestem bardzo zadowolona z
                            konsultacji, rozwiały się moje wątpliwości. Pani Magda pokazała wszystkie techniki,
                            które były dla mnie ważne, jak i ćwiczenia usprawniające pewne niedociągnięcia nad
                            którymi musimy popracować. Serdecznie polecam, dużo informacji podanych w przystępny
                            sposób, a co najważniejsze, konkretów. Dodatkowo Pani Magda oferuje wsparcie w związku
                            z ćwiczeniami, które otrzymaliśmy w późniejszym czasie. 10/10!
                        </span>
                        <h6 className={` sign`}>Kasia Ś.</h6>
                    </div>
                </div>
                <div className={` mt-5 flex gap-4`}>
                    <Image className={` `} src={Chat} width={20} height={20} alt="chat" />
                    <Link
                        className={` ${styles.link}`}
                        href="https://www.facebook.com/efizjotekaMagdalenaAdas"
                    >
                        <b>Te i więcej recenzji przeczytasz na moim fanpage&apos;u</b>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Opinion;
