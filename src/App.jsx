import './App.css';
import Footer from './components/Footer';
import ShareSection from './components/ShareSection';

function App() {
	return (
		<div className="main-container">
			<span className="visits">Contador de visitas</span>
			<h1>Valorizame</h1>
			<p className="subtitle">Descubre cuanto valdrá tu pensión en el futuro</p>
			<form className="form">
				<div>
					<label htmlFor="">Ingresa tu inversión</label>
					<input type="number" placeholder="$2000.000" />
				</div>
				<div>
					<label htmlFor="">Rentabilidad esperada</label>
					<input type="text" placeholder="10% anual" />
				</div>
				<div>
					<label htmlFor="">Periodo de tiempo</label>
					<input type="text" placeholder="56 años" />
				</div>
			</form>
			<p className="result">Obtendras: $206.750.300</p>
			<ShareSection />
			<Footer />
		</div>
	);
}

export default App;
