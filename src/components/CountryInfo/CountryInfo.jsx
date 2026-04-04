import styles from "./CountryInfo.module.css";
import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Maps from "./Maps/Maps";
import MainInfo from "./MainInfo/MainInfo";
import MoreInfo from "./MoreInfo/MoreInfo";

function CountryInfo({ country }) {
  const [value, setValue] = useState("1");

  if (country.cca3 == "RUS") {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return "Not available";
  }

  const handleChange = (e, p) => {
    setValue(p);
  };

  return (
    <div className={styles.container_countryinfo}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "white", color: "white" }}>
          <TabList
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="gray"
          >
            <Tab label="Main Info" value="1" />
            <Tab label="More Info" value="2" />
            <Tab label="Maps" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MainInfo country={country} />
        </TabPanel>
        <TabPanel value="2">
          <MoreInfo country={country} />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{ width: "90%", justifyContent: "center", display: "flex" }}
        >
          <Maps country={country} />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default CountryInfo;
