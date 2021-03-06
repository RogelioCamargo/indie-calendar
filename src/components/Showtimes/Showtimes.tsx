import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ScreeningFull } from "../../types";
import { FIND_SCREENINGS_BY_DAY } from "../../graphql/queries";
import Loading from "../Loading";
import ServerError from "../Error";
import { formatDate } from "../Calendar/utils";
import { sortScreeningsByTime } from "./utils";

const Showtimes = () => {
	const params = useParams();
	const result = useQuery(FIND_SCREENINGS_BY_DAY, {
		variables: { day: Number(params.day) },
	});

	useEffect(() => {
		document.title = "Showtimes";
	});

	if (result.loading) return <Loading />;
	if (result.error) return <ServerError />;

	const screenings = result.data.findScreeningsByDate;
	const screeningsSortedByTime = sortScreeningsByTime(screenings);

	return (
		<div className="text-left">
			<h2 className="sticky top-0 lg:text-2xl bg-white font-bold -mt-3 mb-5 py-3 text-center">
				{params.day && formatDate(params.day)}
			</h2>
			{screeningsSortedByTime.map((screening: ScreeningFull) => (
				<div key={screening.id} id={screening.id}>
					<div className="px-7 mb-20 md:max-w-3xl md:mx-auto lg:max-w-7xl">
						<div className="md:flex">
							<img
								className="block w-full h-full bg-gray-300 md:max-w-xs md:mr-5"
								src={screening.poster}
								alt={`Screening Poster for ${screening.title}`}
							/>
							{/* Details */}
							<div className="text-sm md:text-base">
								{/* Title */}
								<h3 className="font-bold text-xl mt-3 md:mt-0">
									{screening.title.toUpperCase()}
								</h3>
								{/* Buttons */}
								<div className="flex text-white text-center my-2">
									{screening.links.trailer && (
										<a
											href={screening.links.trailer}
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="bg-red-500 w-32 px-4 py-2 mr-3">
												View Trailer
											</div>
										</a>
									)}
									<a
										href={screening.links.info}
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="bg-black w-32 px-4 py-2">Buy Tickets</div>
									</a>
								</div>
								{/* Description */}
								<p className="leading-6">{screening.description}</p>
								<div className="mt-3">
									<h4 className="font-bold">Time</h4>
									<p>{screening.time}</p>
									<h4 className="font-bold mt-2">Location</h4>
									<p>{screening.location.toUpperCase()}</p>
									{screening.director && (
										<>
											<h4 className="font-bold mt-2">Director</h4>
											<p>{screening.director.toUpperCase()}</p>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Showtimes;
