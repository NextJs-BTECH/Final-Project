export async function getWeather(city = "Logan") {
	const apiKey = process.env.OPENWEATHER_KEY;
	const base = process.env.OPENWEATHER_BASE;

	if (!apiKey || !base) {
		throw new Error("Missing OpenWeather environment variables");
	}

	const res = await fetch(`${base}weather?q=${city}&units=imperial&appid=${apiKey}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch weather");
	}

	return res.json();
}
