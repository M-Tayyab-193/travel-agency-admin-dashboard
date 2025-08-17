import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../../components";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import type { Route } from "./+types/CreateTrip";
import { comboBoxItems, selectItems } from "~/constants";
import { formatKey, cn } from "~/lib/utils";
import {
  MapsComponent,
  LayersDirective,
  LayerDirective,
  load,
} from "@syncfusion/ej2-react-maps";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";
export const loader = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,latlng,maps"
  );

  const data = await response.json();

  return data.map((country: any) => ({
    name: country.flags.png,
    coordinates: country.latlng,
    value: country.name.common,
    openSreetMap: country.maps.openStreetMaps,
  }));
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const navigate = useNavigate();
  const countries = loaderData as Country[] | null;

  const [formData, setFormData] = useState<TripFormData>({
    country: countries ? countries[0]?.name || "" : "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const countryData = countries?.map((country) => ({
    flag: country.name, // PNG URL
    text: country.value, // Country name
    value: country.value,
  }));

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries?.find((c) => c.name === formData.country)?.coordinates || [],
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.country ||
      !formData.budget ||
      !formData.groupType ||
      !formData.interest ||
      !formData.travelStyle
    ) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10 days.");
      setLoading(false);
      return;
    }
    const user = await account.get();
    if (!user.$id) {
      console.log("User not found");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: formData.country,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          numberOfDays: formData.duration,
          groupType: formData.groupType,
          userId: user.$id,
        }),
      });
      const result: CreateTripResponse = await response.json();

      if (result?.id) {
        navigate(`/trips/${result.id}`);
      } else {
        console.error("Error generating a trip:", result?.message);
      }
    } catch (error) {
      console.error("Error generating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof TripFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  return (
    <main className="flex flex-col pb-20 wrapper">
      <Header
        title="Add a new Trip"
        description="View and edit AI-generated travel trips"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a country"
              className="combo-box"
              itemTemplate={(data: any) => (
                <div className="flex items-center">
                  <img
                    src={data.flag}
                    alt={data.text}
                    className="w-[14px] h-[14px] rounded-sm ml-4"
                  />
                  <span className="-ml-2">{data.text}</span>
                </div>
              )}
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();
                e.updateData(
                  countries
                    ?.filter((country) =>
                      country.value.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      flag: country.name, // PNG URL
                      text: country.value, // Country name
                      value: country.value,
                    }))
                );
              }}
            ></ComboBoxComponent>
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              type="number"
              id="duration"
              name="duration"
              placeholder="Enter a number of days (3, 7..., max:10)"
              className="form-input 
              placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>
          {selectItems.map((item) => (
            <div key={item}>
              <label htmlFor={item}>{formatKey(item)}</label>
              <ComboBoxComponent
                id={item}
                className="combo-box"
                dataSource={comboBoxItems[item].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(item)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(item, e.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();
                  e.updateData(
                    comboBoxItems[item]
                      ?.filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">Location on the world map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapeDataPath="country"
                  shapePropertyPath="name"
                  shapeSettings={{
                    colorValuePath: "color",
                    fill: "e5e5e5",
                  }}
                ></LayerDirective>
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className="bg-gray-200 h-px w-full" />
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${loading ? "loader" : "magic-star"}.svg`}
                alt=""
                className={cn("size-5", { "animate-spin": loading })}
              />
              <span className="text-white px-16-semifold">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
