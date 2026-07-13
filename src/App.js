import Box from "@mui/material/Box";
import Weather from "./weather";

function App() {
  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
        background:
          "radial-gradient(circle at top, #eaf5ff 0%, #b8dfff 30%, #0f4c81 100%)",
      }}
    >
      <Weather />
    </Box>
  );
}

export default App;
