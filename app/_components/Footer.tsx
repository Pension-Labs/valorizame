const Footer = () => {
	return (
		<footer>
			<p>
				<a href="mailto:nico@pensionfi.com">
					Publicita con nosotros:{' '}
					<span className="text-[#55f5bb] hover:text-[#0fd38b]">
						nico@pensionfi.com
					</span>
				</a>
			</p>
			<p>
				<a href="mailto:nico@pensionfi.com">
					Compra este dominio:{' '}
					<span className="text-[#55f5bb] hover:text-[#0fd38b]">
						nico@pensionfi.com
					</span>
				</a>
			</p>
			<p>
				Página creada con ❤️ por: &nbsp;
				<a
					href="https://www.pensionfi.com/"
					target="_blank"
					className="text-[#55f5bb] hover:text-[#0fd38b]"
				>
					Pensionfi
				</a>
			</p>
		</footer>
	);
};

export default Footer;
