import { NextResponse } from 'next/server';

export async function GEPOSTT() {
	const urlGoogleSheet =
		'https://script.google.com/macros/s/AKfycbx_-1g2sy0z_renj_iJaZN3EXUbLz-bpj1R_eQmi8szgU6uNlwzbytAeokkEVNWz9v1/exec';

	try {
		const response = await fetch(urlGoogleSheet);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const responseData = await response.json();
		return NextResponse.json({
			count: responseData.data,
		});
	} catch (error) {
		return NextResponse.json({
			error: 'Failed to fetch data from Google Apps Script',
		});
	}
}
