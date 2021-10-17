import { Card, Text } from "grommet";


const UserCard = ({
  userName,
  city,
  phone,
  companyName,
}) => (

  <Card
    margin="small"
    direction="column"
    border={{ color: "neutral-1", size: "small" }}
    background="light-1"
    pad="small"
    overflow="unset"
    height={{min:"auto"}}
  >
    <Text size="medium"><strong>Name:</strong> {userName}</Text>
    <Text size="medium"><strong>City:</strong> {city}</Text>
    <Text size="medium"><strong>Phone Number:</strong> {phone}</Text>
    <Text size="medium"><strong>Company:</strong> {companyName}</Text>
  </Card>
);

export default UserCard;
