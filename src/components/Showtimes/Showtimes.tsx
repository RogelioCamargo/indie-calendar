import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ScreeningFull } from "../../types";
import { FIND_SCREENINGS_BY_DAY } from "../../graphql/queries";

const Showtimes = () => {
	const params = useParams();
	const result = useQuery(FIND_SCREENINGS_BY_DAY, { variables: { day: Number(params.day) } });

	if (result.loading) 
		return <div>Loading...</div>;

	return (
		<div className="text-left mt-16">
			{result.data.findScreeningsByDate.map((screening: ScreeningFull) => (
				<div key={screening.id}>
					<div className="px-7 mb-7 md:mb-12 md:flex md:max-w-7xl md:mx-auto">
						<img className="block w-full h-full bg-gray-300 md:max-w-sm md:mr-5" src={screening.poster} alt={`Screening Poster for ${screening.title}`} />
						{/* Details */}
						<div className="text-sm md:text-base">
							{/* Title */}
							<h2 className="font-bold text-xl mt-3 md:mt-0">{screening.title.toUpperCase()}</h2>
							<div className="flex text-white text-center my-2">
								<a href={screening.links.trailer} target="_blank" rel="noopener noreferrer">
									<div className="bg-red-500 w-32 px-4 py-2 mr-3">
											View Trailer
									</div>
								</a>
								<a href={screening.links.info} target="_blank" rel="noopener noreferrer">
									<div className="bg-black w-32 px-4 py-2">
										Buy Tickets
									</div>
								</a>
							</div>
							{/* Description */}
							<p className="leading-6">{screening.description}</p>
							<div className="mt-3">
								<h3 className="font-bold">Time</h3>
								<p>{screening.time}</p>
								<h3 className="font-bold mt-2">Location</h3>
								<p>{screening.location.toUpperCase()}</p>
								{
									screening.director && 
									<>
										<h3 className="font-bold mt-2">Director</h3>
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