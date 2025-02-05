import { useState, useEffect } from "react";

interface CountryAPIResponse {
  name: { common: string };
  cca2: string;
}

interface StateAPIResponse {
  name: string;
  iso2: string;
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
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((data: CountryAPIResponse[]) => {
        const formattedCountries: Country[] = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(formattedCountries);
      })
      .catch((error) => console.error("Error fetching countries:", error))
      .finally(() => setLoading(false));
  }, []);

  return { countries, loading };
};

export const useStates = (countryCode: string) => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!countryCode) return;

    fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "c3lNZk9ZOU5RUzk2cUxOWDNvbTNzV0RCdm03SzVLaVNPa0FiRE1jeg==",
        },
      }
    )
      .then((response) => response.json())
      .then((data: StateAPIResponse[]) => {
        const formattedStates: State[] = data.map((state) => ({
          name: state.name,
          code: state.iso2,
        }));
        setStates(formattedStates);
      })
      .catch((error) => console.error("Error fetching states:", error))
      .finally(() => setLoading(false));
  }, [countryCode]);

  return { states, loading };
};
