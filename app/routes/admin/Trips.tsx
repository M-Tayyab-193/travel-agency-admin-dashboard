import React from "react";
import { Header } from "../../../components";

const Trips = () => {
  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View, manage and organize AI-generated travel trips"
        ctaText="Create New Trip"
        ctaUrl="/trips/create"
      />
    </main>
  );
};

export default Trips;
