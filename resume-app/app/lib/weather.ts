export async function getWeather(city = "Logan") {
	const apiKey = process.env.OPENWEATHER_KEY;
	const base = process.env.OPENWEATHER_BASE;

	// If env vars are missing, NEVER break rendering
	if (!apiKey || !base) {
		console.error("Missing OpenWeather environment variables");

		return {
			main: { temp: 0 },
			weather: [{ main: "Unavailable" }],
			name: city,
		};
	}

	try {
		const res = await fetch(`${base}weather?q=${city}&units=imperial&appid=${apiKey}`, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Weather API returned an error");
		}

		return await res.json();
	} catch (err) {
		console.error("Weather fetch failed:", err);

		// fallback so UI always renders
		return {
			main: { temp: 0 },
			weather: [{ main: "Unavailable" }],
			name: city,
		};
	}
}
