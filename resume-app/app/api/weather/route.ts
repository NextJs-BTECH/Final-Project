import { NextResponse } from "next/server";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const city = searchParams.get("city");

	if (!city) {
		return NextResponse.json({ error: "City is required" }, { status: 400 });
	}

	if (!WEATHER_API_KEY) {
		return NextResponse.json({ error: "Missing WEATHER_API_KEY" }, { status: 500 });
	}

	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
			city,
		)}&appid=${WEATHER_API_KEY}&units=imperial`,
	);

	if (!res.ok) {
		return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
	}

	const data = await res.json();

	return NextResponse.json({
		city: data.name,
		temp: data.main.temp,
		feelsLike: data.main.feels_like,
		description: data.weather?.[0]?.description,
	});
}
