'use client';

import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import ShareSection from './_components/ShareSection';
import Footer from './_components/Footer';

export default function Home() {
	const [VA, setVA] = useState(0);
	const [interes, setInteres] = useState(0);
	const [tiempo, setTiempo] = useState(0);
	const [res, setres] = useState('');

	const handleInversion = (newValue: string | undefined) => {
		if (newValue === undefined) {
			setVA(0);
		} else {
			setVA(Number(newValue));
		}
	};

	const handleCalculate = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (VA > 0 && interes > 0 && tiempo > 0) {
			const r = VA * Math.pow(1 + interes / 100, tiempo); // Convertir interes a decimal
			setres(
				r.toLocaleString('es-CL', {
					style: 'currency',
					currency: 'CLP',
					minimumFractionDigits: 2,
				})
			);
		} else {
			setres('Por favor ingrese valores válidos');
		}
	};

	return (
		<main className="flex bg-fondo min-h-full flex-col items-center justify-center p-24">
			<div className="w-full max-w-3xl flex flex-col gap-y-4 items-center justify-center text-center font-mono">
				<span className="text-sm self-end">Contador de visitas</span>
				<h1 className="text-6xl underline">Valorizame</h1>
				<p className="subtitle">
					Descubre cuanto valdrá tu pensión en el futuro
				</p>
				<form className="flex flex-col justify-between items-center w-full gap-2">
					<div className="flex justify-between w-full max-w-md">
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
					<div className="flex justify-between w-full max-w-md">
						<label htmlFor="">Rentabilidad esperada</label>
						<input
							type="number"
							placeholder="%"
							className="px-2 text-fondo w-full max-w-52"
							onChange={e => setInteres(Number(e.target.value))}
						/>
					</div>
					<div className="flex justify-between w-full max-w-md">
						<label htmlFor="">Periodo de tiempo</label>
						<input
							type="number"
							placeholder="Años"
							className="px-2 text-fondo w-full max-w-52"
							onChange={e => setTiempo(Number(e.target.value))}
						/>
					</div>
					<button className="bg-[#55f5bb] px-4 py-x" onClick={handleCalculate}>
						Calcular
					</button>
				</form>
				<p className="mb-2 text-4xl">
					Obtendrás: <span className="font-bold">{res}</span>
				</p>
				<ShareSection />
				<Footer />
			</div>
		</main>
	);
}
