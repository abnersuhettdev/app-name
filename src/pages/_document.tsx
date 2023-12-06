import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import { resetServerContext } from "react-beautiful-dnd";

interface MyDocumentProps {
	locale: string;
}
export default function MyDocument({ locale }: MyDocumentProps): JSX.Element {
	resetServerContext();
	return (
		<Html>
			<Head></Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
	const initialProps = await Document.getInitialProps(ctx);
	const locale = ctx.locale || "en";
	return { ...initialProps, locale };
};
