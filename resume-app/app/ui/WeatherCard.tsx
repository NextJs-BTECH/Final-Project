import { getWeather } from "@/app/lib/weather";

export default async function WeatherCard() {
	const data = await getWeather("Logan");

	return (
		<div className="card space-y-2">
			<p className="muted text-sm">Weather</p>

			<div className="flex justify-between items-end">
				<div>
					<p className="text-2xl font-semibold">{Math.round(data.main.temp)}°F</p>
					<p className="muted">{data.weather?.[0]?.main}</p>
				</div>

				<p className="muted text-sm">{data.name}</p>
			</div>
		</div>
	);
}
