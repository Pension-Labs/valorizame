import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
	console.log('POST /api/questions');

	const body = await request.json();
	body.ID = uuidv4();
	console.log(body);

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
