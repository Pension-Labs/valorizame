import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
	console.log('POST /api/questions');

	const body = await request.json();
	body.ID = uuidv4();
	const { INVERSION, INTERES, TIEMPO, RESULTADO } = body;

	const urlGoogleSheet =
		'https://script.google.com/macros/s/AKfycbxKmwylvbGbcpiaqCSRaM8NYQIuy9-8nabzzTAnhrwAD0ecv7HOswr6aihjcvhm_dc/exec';

	try {
		const response = await fetch(`${urlGoogleSheet}?endpoint=simulacion`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const sender = { name: 'Mauro', email: 'mauro@pensionfi.com' };
		const message = `<html><body><h1>Nueva simulacion</h1><p>Inversion: ${INVERSION}</p><p>Interes: ${INTERES}</p><p>Tiempo: ${TIEMPO}</p><p>Resultado: ${RESULTADO}</p></body></html>`;

		// await sendMail(sender, message, 'Nueva simulacion');
		const responseData = await response.json();
		console.log(responseData);

		return NextResponse.json({
			statusCode: 200,
			message: 'Correo registrado exitosamente',
		});
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({});
	}
}
