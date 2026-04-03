import Continents from "./Continents";

const ContinentsContainer = (props) => {
 const SortByRegion = (item) => {
   props.setCurrentRegion(item);

   const tmp = props.allCountry.filter(
     (obj) =>
       obj.continents?.[0] === props.currentContinent && obj.subregion === item,
   );

   props.setSortedCountry(tmp);
   props.setCurrentPage(1);
 };

 const SortByContinent = (item) => {
   if (props.currentContinent !== item) {
     props.setCurrentContinent(item);
     props.setCurrentRegion(null);

     const tmp = props.allCountry.filter((obj) => obj.continents?.[0] === item);

     props.setSortedCountry(tmp);
   } else {
     props.setCurrentContinent(null);
     props.setSortedCountry(props.allCountry);
   }

   props.setCurrentPage(1);
 };

  return (
    <Continents
      regions={props.regions}
      currentContinent={props.currentContinent}
      currentRegion={props.currentRegion}
      SortByContinent={SortByContinent}
      SortByRegion={SortByRegion}
    />
  );
};

export default ContinentsContainer;
