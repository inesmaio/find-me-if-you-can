import React, { useState, useEffect, useMemo } from "react";
import { Grid, Box, Spinner, Text, Heading, Paragraph } from "grommet";
import { fetchUser } from "../services/api.service";
import Map from "./map.component";
import { ButtonComponent } from "./button.component";

const UserPage = ({ match }) => {
  const { id } = match.params;

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const userPhone = !!user && user.phone;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchUser(id);
        setUser(res);
      } catch {
        alert("Data Fetch Failed!");
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  const normPhoneNumber = useMemo(() => {
    if (!userPhone) return null;
    const splitPhone = userPhone.split("x");
    var cleaned = ("" + splitPhone[0]).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }, [userPhone]);

  const location =
    !!user && user.address
      ? [
          user.address.city,
          parseFloat(`${user.address.geo.lat}`),
          parseFloat(`${user.address.geo.lng}`),
        ]
      : [];

  return (
    <Grid
      height="100vh"
      rows={["auto", "flex"]}
      columns={["auto", "flex"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "map", start: [0, 1], end: [1, 1] },
        { name: "nav", start: [1, 1], end: [1, 1] },
      ]}
    >
      {loading || !user ? (
        <Spinner size="large" />
      ) : (
        <>
          <Box
            gridArea="header"
            background="neutral-3"
            direction="row"
            align="center"
            justify="between"
            pad="small"
          >
            <Heading level={2} margin="small">
              {user.name}
            </Heading>
          </Box>
          <Box gridArea="nav" background="light-3" pad="medium">
            <Box gridArea="nav" background="light-3" pad="medium">
              <Heading level={3} margin="small">
                Personnal Info
              </Heading>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="center"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  User Name:
                </Heading>
                <Paragraph margin="none">{user.username}</Paragraph>
              </Box>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="center"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  Email:
                </Heading>
                <Paragraph margin="none">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </Paragraph>
              </Box>
              <Box
                gridArea="nav"
                background="light-3"
                direction="column"
                align="start"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  Address:
                </Heading>
                <Paragraph margin="5px">
                  {user.address.street} <br />
                  {user.address.suite} <br /> {user.address.city} <br />
                  {user.address.zipcode}
                </Paragraph>
              </Box>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="start"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  Location:
                </Heading>
                <Paragraph margin="5px">
                  {user.address.geo.lat + " /" + user.address.geo.lng}
                </Paragraph>
              </Box>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="start"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  Phone Number:
                </Heading>
                <Paragraph margin="5px">{normPhoneNumber}</Paragraph>
              </Box>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="start"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  Website:
                </Heading>
                <Paragraph margin="5px">
                  <a href={user.website}>{user.website}</a>
                </Paragraph>
              </Box>
            </Box>
            <Box gridArea="nav" background="light-3" pad="medium">
              <Heading level={3} margin="small">
                Company's Info:
              </Heading>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="start"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  Company:
                </Heading>
                <Paragraph margin="5px">
                  {user.company.name.replace("-", " ")}
                </Paragraph>
              </Box>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="start"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  Catch Phrase:
                </Heading>
                <Paragraph margin="5px">{user.company.catchPhrase}</Paragraph>
              </Box>
              <Box
                gridArea="nav"
                background="light-3"
                direction="row"
                align="start"
                pad={{ left: "small" }}
              >
                <Heading level={4} margin="5px">
                  BS:
                </Heading>
                <Paragraph margin="5px">
                  {user.company.bs.split(" ").map((word) => (
                    <Text key={word}>{word.replace("-", " ") + " "}</Text>
                  ))}
                </Paragraph>
              </Box>
            </Box>
            <Box gridArea="nav" pad="medium">
              <ButtonComponent label="Home" buttonAction={null} path={"/"} />
            </Box>
          </Box>
          <Box gridArea="map" height="100%" width="50vw" background="light-2">
            <Map locations={[location]} zoomProp={4} />
          </Box>
        </>
      )}
    </Grid>
  );
};

export default UserPage;
