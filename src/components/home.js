export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "10px 10px",
        justifyItems: "flex-start",
        padding: 10,
      }}
    >
      <div
        style={{
          minWidth: 480,
          height: "50%",
          minHeight: 360,
          backgroundColor: "wheat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        total restaurants
      </div>
      <div
        style={{
          height: "50%",
          minWidth: 480,
          minHeight: 360,
          backgroundColor: "wheat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        places with most restaurants
      </div>
    </div>
  );
}
