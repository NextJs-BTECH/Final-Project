import { getWeather } from "@/app/lib/weather";

export default async function WeatherCard() {
	const data = await getWeather("Logan");

	return (
		<div className="card space-y-2">
			<p className="text-sm text-muted">Weather</p>

			<div className="flex justify-between items-end">
				<div>
					<p className="text-2xl font-semibold">{Math.round(data.main.temp)}°F</p>
					<p className="text-muted">{data.weather?.[0]?.main}</p>
				</div>

				<p className="text-muted text-sm">{data.name}</p>
			</div>
		</div>
	);
}
