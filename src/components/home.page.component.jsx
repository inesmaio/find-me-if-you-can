import React, { useEffect, useState } from "react";
import { Box, Grid, Text, Spinner } from "grommet";
import { Link } from "react-router-dom";
import UserCard from "./user.card.component";
import Map from "./map.component";
import { fetchUsers } from "../services/api.service";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchUsers();
        setUsers(res);
      } catch {
        alert("Data Fetch Failed!");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const locations = users.map((user) => [
    user.address.city,
    parseFloat(`${user.address.geo.lat}`),
    parseFloat(`${user.address.geo.lng}`),
  ]);

  return (
    <Grid
      height="100vh"
      rows={["auto", "flex"]}
      columns={["auto", "flex"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "nav", start: [0, 1], end: [0, 1] },
        { name: "map", start: [1, 1], end: [1, 1] },
      ]}
    >
      {loading ? (
        <Spinner size="large" />
      ) : (
        <>
          <Box
            gridArea="header"
            background="neutral-3"
            direction="row"
            align="center"
            justify="between"
            pad="medium"
          >
            <Text width="100%" size="large" textAlign="center">
              Find Me If You Can
            </Text>
          </Box>
          <Box
            gridArea="nav"
            background="light-5"
            min-height="100vh"
            pad="medium"
            overflow={{ vertical: "scroll" }}
          >
            {users.map((user) => {
              return (
                <Link style={{ textDecoration: 'none' }} key={user.id} to={`/user/${user.id}`}>
                  <UserCard
                    key={user.id}
                    userName={user.name}
                    city={user.address.city}
                    phone={user.phone}
                    companyName={user.company.name}
                  />
                </Link>
              );
            })}
          </Box>
          <Box gridArea="map" background="light-2">
            <Map locations={locations} />
          </Box>
        </>
      )}
    </Grid>
  );
};

export default Home;
