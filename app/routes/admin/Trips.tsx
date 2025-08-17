import React, { useState } from "react";
import { Header, TripCard } from "../../../components";
import { getAllTrips } from "~/appwrite/trips";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/Trips";
import { parseTripData } from "~/lib/utils";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};

const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData?.trips || [];

  const [searchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.location.search = `?page=${newPage}`;
  };

  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View, manage and organize AI-generated travel trips"
        ctaText="Create New Trip"
        ctaUrl="/trips/create"
      />
      <section>
        <h1 className="p-24-semibold text-gray-100">Manage Created Trips</h1>
        <div className="trip-grid mt-8 mb-4">
          {trips.map(
            ({
              id,
              name,
              imageUrls,
              itinerary,
              interests,
              travelStyle,
              estimatedPrice,
            }) => (
              <TripCard
                id={id}
                key={id}
                name={name}
                location={itinerary?.[0]?.location ?? ""}
                imageUrl={imageUrls?.[0] ?? ""}
                tags={[interests, travelStyle]}
                price={estimatedPrice}
              />
            )
          )}
        </div>
        <PagerComponent
          totalRecordsCount={loaderData?.total || 0}
          currentPage={currentPage}
          pageSize={8}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  );
};

export default Trips;
