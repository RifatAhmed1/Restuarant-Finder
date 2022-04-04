import styled from "@emotion/styled";

export default function Home() {
  const StyledContainer = styled("div")({
    padding: "60px 60px 0px 20px",
  });

  return (
    <StyledContainer>
      <h1>Welcome!</h1>
      <p>
        This is a restaurant finder app created on top of MongoDB's sample data.
        <br />
        <br />
        To browse details of all resturants click on "Browse".
        <br />
        <br /> To search a particular restuarant information click on "Search".
        <br /> (*Searching is case-sensitive for this demo.)
      </p>
    </StyledContainer>
  );
}
