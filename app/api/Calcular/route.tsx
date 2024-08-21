import { NextResponse } from 'next/server';

export async function GET() {
	const urlGoogleSheet =
		'https://script.google.com/macros/s/AKfycbxKmwylvbGbcpiaqCSRaM8NYQIuy9-8nabzzTAnhrwAD0ecv7HOswr6aihjcvhm_dc/exec';

	const response = await fetch(`${urlGoogleSheet}`, {
		method: 'GET',
		headers: {
			'Cache-Control': 'no-cache',
		},
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const responseData = await response.json();

	return NextResponse.json({
		count: responseData.data,
	});
}
