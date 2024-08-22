'use client';

import { useState, useRef, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import ShareSection from './_components/ShareSection';
import Footer from './_components/Footer';

export default function Home() {
	const [VA, setVA] = useState(0);
	const [interes, setInteres] = useState(0);
	const [tiempo, setTiempo] = useState(0);
	const [res, setRes] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const refResult = useRef<HTMLParagraphElement | null>(null);
	const [count, setCount] = useState(0);
	const handleInversion = (newValue: string | undefined) => {
		if (newValue === undefined) {
			setVA(0);
		} else {
			setVA(Number(newValue));
		}
	};
	useEffect(() => {
		fetch(
			'https://script.google.com/macros/s/AKfycbx_-1g2sy0z_renj_iJaZN3EXUbLz-bpj1R_eQmi8szgU6uNlwzbytAeokkEVNWz9v1/exec'
		)
			.then(res => res.json())
			.then(r => {
				setCount(r.data);
			});
	}, []);

	const handleCalculate = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (refResult.current) {
			// Verifica si refResult.current no es null
			refResult.current.classList.add('hidden');
		}
		setIsLoading(true);
		// Obtener la fecha y hora actuales en milisegundos desde el epoch
		const now = Date.now();

		// Crear un objeto Date a partir del timestamp actual
		const date = new Date(now);

		// Especificar la región y opciones de formato para Chile
		const options = {
			year: 'numeric' as 'numeric',
			month: '2-digit' as '2-digit',
			day: '2-digit' as '2-digit',
			hour: '2-digit' as '2-digit',
			minute: '2-digit' as '2-digit',
			second: '2-digit' as '2-digit',
			timeZone: 'America/Santiago',
			hour12: false,
		};

		// Crear el formateador de fecha y hora para la región especificada
		const dateTimeFormat = new Intl.DateTimeFormat('es-CL', options);

		// Formatear la fecha
		const formattedDate = dateTimeFormat.format(date);

		if (VA > 0 && interes > 0 && tiempo > 0) {
			const r = VA * Math.pow(1 + interes / 100, tiempo); // Convertir interés a decimal
			const roundedResult = Math.round(r); // Redondear el resultado
			setRes(roundedResult);

			fetch('/api/Calcular', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					INVERSION: VA,
					INTERES: interes,
					TIEMPO: tiempo,
					RESULTADO: roundedResult,
					FECHA: formattedDate,
				}),
			})
				.then(res => res.json())
				.then(r => {
					setIsLoading(false);
					if (refResult.current) {
						// Verifica si refResult.current no es null
						refResult.current.classList.remove('hidden');
					}
				});
		} else {
			setRes(null);
		}
	};

	return (
		<main className="flex w-full bg-fondo min-h-full flex-col items-center justify-center p-10 md:p-24">
			<div className="w-full max-w-3xl flex flex-col gap-y-4 items-center justify-center text-center font-mono">
				<span className="text-sm self-end text-white">
					Contador de visitas: <strong>{count}</strong>
				</span>
				<h1 className="text-6xl underline">Valorizame</h1>
				<p className="subtitle">
					Descubre cuánto valdrá tu pensión en el futuro
				</p>
				<form className="flex flex-col justify-between items-center w-full gap-2">
					<div className="flex flex-col md:flex-row items-center justify-between w-full max-w-md">
						<label htmlFor="">Ingresa tu inversión</label>
						<CurrencyInput
							intlConfig={{ locale: 'es-CL', currency: 'CLP' }}
							allowDecimals
							decimalSeparator=","
							id="input-currency-field"
							name="input-currency-field-name"
							prefix="$"
							onValueChange={handleInversion}
							step={1}
							className="w-full max-w-52"
						/>
					</div>
					<div className="flex flex-col md:flex-row items-center justify-between w-full max-w-md">
						<label htmlFor="">Rentabilidad esperada</label>
						<input
							type="number"
							placeholder="%"
							className="px-2 text-fondo w-full max-w-52"
							onChange={e => setInteres(Number(parseInt(e.target.value)))}
						/>
					</div>
					<div className="flex flex-col md:flex-row items-center justify-between w-full max-w-md">
						<label htmlFor="">Periodo de tiempo</label>
						<input
							type="number"
							placeholder="Años"
							className="px-2 text-fondo w-full max-w-52"
							onChange={e => setTiempo(Number(e.target.value))}
						/>
					</div>
					<button className="bg-green-400 px-4 py-x" onClick={handleCalculate}>
						Calcular
					</button>
					{isLoading && (
						<div className="relative  flex flex-col justify-center mt-4">
							<p className="mb-3 text-center">Calculando...</p>
							<div className="loader mx-auto"></div>
						</div>
					)}
				</form>
				<p ref={refResult} className="mb-2 text-4xl hidden">
					Obtendrás:{' '}
					<span className="font-bold">
						{res !== null
							? res.toLocaleString('es-CL', {
									style: 'currency',
									currency: 'CLP',
									minimumFractionDigits: 0,
							  })
							: 'Por favor ingrese valores válidos'}
					</span>
				</p>
				<ShareSection
					result={res ?? 0} // Asegúrate de pasar un número válido
					tiempo={tiempo}
					interes={interes}
					valorActual={VA}
				/>
				<Footer />
			</div>
		</main>
	);
}
