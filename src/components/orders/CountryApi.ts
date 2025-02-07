import { useState, useEffect } from "react";

interface CountryAPIResponse {
  country_iso2: string;
  country_display: string;
}
interface StateAPIResponse {
  state_name: string;
}
interface Country {
  name: string;
  code: string;
}
interface State {
  name: string;
  code: string;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://api.fr.stg.shipglobal.in/api/v1/location/countries"
        );
        const result = await response.json();
        if (result.data?.countries) {
          const formattedCountries = result.data.countries.map(
            (country: CountryAPIResponse) => ({
              code: country.country_iso2,
              name: country.country_display,
            })
          );
          setCountries(formattedCountries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};

export const useStates = (countryCode: string) => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!countryCode) return;

    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://api.fr.stg.shipglobal.in/api/v1/location/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ state_country_code: countryCode }),
          }
        );

        const result = await response.json();

        if (result.data?.states) {
          const formattedStates = result.data.states.map(
            (state: StateAPIResponse) => ({
              code: state.state_name,
              name: state.state_name,
            })
          );
          setStates(formattedStates);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [countryCode]);

  return { states, loading };
};
