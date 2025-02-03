import { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((data) => {
        const formattedCountries = data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(formattedCountries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  return { countries, loading };
};

export const useStates = (countryCode: string) => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (countryCode) {
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
        .then((data) => {
          const formattedStates = data.map((state: any) => ({
            name: state.name,
            code: state.iso2,
          }));
          setStates(formattedStates);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
          setLoading(false);
        });
    }
  }, [countryCode]);

  return { states, loading };
};
