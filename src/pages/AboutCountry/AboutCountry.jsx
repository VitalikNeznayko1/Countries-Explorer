import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import HeaderAbout from "../../components/Headers/HeaderAbout/HeaderAbout";
import countryApi from "../../api/countryApi";

function AboutCountry() {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await countryApi.getByCode(cca3);
        
        const tmp = result.data.find((item) => item.cca3 === cca3);
        setCountry(tmp);
      } catch (error) {
        console.error(error);
        setCountry("Error");
      }
    };

    fetchData();
  }, [cca3]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderAbout />
      <CountryInfo country={country} />
    </>
  );
}

export default AboutCountry;
