import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ScreeningFull } from "../../types";
import { FIND_SCREENINGS_BY_DAY } from "../../graphql/queries";
import Loading from "../Loading";
import ServerError from "../Error";
import { formatDate } from "../Calendar/utils";

const Showtimes = () => {
	const params = useParams();
	const result = useQuery(FIND_SCREENINGS_BY_DAY, { variables: { day: Number(params.day) } });

	if (result.loading) 
		return <Loading />

	if (result.error)
		return <ServerError />

	let screenings = result.data.findScreeningsByDate;
	const morningScreenings = screenings.filter((screening: ScreeningFull) => screening.time.toUpperCase().includes("AM"));
	const eveningScreenings = screenings.filter((screening: ScreeningFull) => screening.time.toUpperCase().includes("PM"));
	eveningScreenings.sort((a: ScreeningFull, b: ScreeningFull) => Number(a.time.replace(/[^0-9]/g, "")) - Number(b.time.replace(/[^0-9]/g, "")));
	screenings = [...morningScreenings, ...eveningScreenings];

	return (
		<div className="text-left mt-5">
			<h2 className="sticky top-0 lg:text-2xl bg-white font-bold py-5 text-center md:mt-5">
				{params.day && formatDate(params.day)}
			</h2>
			{screenings.map((screening: ScreeningFull) => (
				<div key={screening.id} id={screening.id}>
					<div className="px-7 mb-7 md:mb-12 md:flex md:max-w-7xl md:mx-auto">
						<img className="block w-full h-full bg-gray-300 md:max-w-sm md:mr-5" src={screening.poster} alt={`Screening Poster for ${screening.title}`} />
						{/* Details */}
						<div className="text-sm md:text-base">
							{/* Title */}
							<h3 className="font-bold text-xl mt-3 md:mt-0">{screening.title.toUpperCase()}</h3>
							<div className="flex text-white text-center my-2">
								{
									screening.links.trailer && 
									<a href={screening.links.trailer} target="_blank" rel="noopener noreferrer">
										<div className="bg-red-500 w-32 px-4 py-2 mr-3">
												View Trailer
										</div>
									</a>
								}
								<a href={screening.links.info} target="_blank" rel="noopener noreferrer">
									<div className="bg-black w-32 px-4 py-2">
										Buy Tickets
									</div>
								</a>
							</div>
							{/* Description */}
							<p className="leading-6">{screening.description}</p>
							<div className="mt-3">
								<h4 className="font-bold">Time</h4>
								<p>{screening.time}</p>
								<h4 className="font-bold mt-2">Location</h4>
								<p>{screening.location.toUpperCase()}</p>
								{
									screening.director && 
									<>
										<h4 className="font-bold mt-2">Director</h4>
										<p>{screening.director.toUpperCase()}</p>	
									</>
								}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Showtimes;