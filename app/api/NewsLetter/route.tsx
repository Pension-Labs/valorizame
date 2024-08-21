import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
	console.log('POST /api/questions');

	const body = await request.json();
	body.ID = uuidv4();
	console.log(body);

	const urlGoogleSheet =
		'https://script.google.com/macros/s/AKfycbwPS7-oIxJLGC_557RW-gPGQJMakKFZQns3tNwHv3dgcREI_mhCS_HuWkuIqMz9EI5U/exec';

	try {
		const response = await fetch(`${urlGoogleSheet}?endpoint=NewsLetter`, {
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
