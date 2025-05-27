import { Locale } from "../../i18n";
import { getDictionary } from "../../lib/dictionary";
import { HeaderComponent } from "./components/HeaderChild";

const Header = async ({ lang }: { lang: Locale }) => {
	const { navigation } = await getDictionary(lang);

	return (
		<>
			<HeaderComponent lang={lang} navigation={navigation} />
		</>
	);
};

export default Header;
