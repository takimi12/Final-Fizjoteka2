import React from "react";
import Newsletter from "../../../../components/AdminComponents/Components/Newsletter";
import { getContacts } from "../../../../helpers/api/getEmails";

export default async function Newsletters() {
	const contacts = await getContacts();

	return (
		<>
			<Newsletter contacts={contacts} />
		</>
	);
}
