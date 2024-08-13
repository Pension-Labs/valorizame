import { RiTwitterXFill } from 'react-icons/ri';
const ShareSection = () => {
	return (
		<div className="flex justify-center items-center gap-4 text-lg">
			<span className="text-[#ffffffde]">Compartir en: </span>
			<RiTwitterXFill className="text-[#ffffffde] hover:cursor-pointer" />
		</div>
	);
};

export default ShareSection;
