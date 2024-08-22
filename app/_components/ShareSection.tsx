import { RiTwitterXFill } from 'react-icons/ri';
import { TwitterShareButton } from 'react-share';
type ShareOptions = {
	result: number;
	interes: number;
	tiempo: number;
	valorActual: number;
};
const ShareSection: React.FC<ShareOptions> = ({
	result,
	interes,
	tiempo,
	valorActual,
}) => {
	const DATA_SHARE = `Si invierto ${Number(valorActual).toLocaleString(
		'es-CL',
		{
			style: 'currency',
			currency: 'CLP',
		}
	)}, al ${interes} por ${tiempo} años obtengo ${Number(result).toLocaleString(
		'es-CL',
		{
			style: 'currency',
			currency: 'CLP',
		}
	)}  
	`;
	const URL_SITE = 'www.valorizame.com/';
	return (
		<div className="flex flex-col md:flex-row  justify-center items-center gap-4 text-lg">
			<span className="text-[#ffffffde]">Compartir en: </span>
			<TwitterShareButton url={URL_SITE} title={DATA_SHARE}>
				<RiTwitterXFill className="text-2xl text-[#ffffffde] hover:cursor-pointer" />
			</TwitterShareButton>
		</div>
	);
};

export default ShareSection;
