import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState({
    temp: 0,
    max: 0,
    min: 0,
    icon: null,
    date: null,
    city: "القاهرة",
    description: "استعدادات الطقس",
    humidity: 0,
    wind: 0,
    pressure: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.04442&lon=31.23571&appid=f6ce42b1894c198c8c63f27620777f6c",
      )
      .then(function (response) {
        const data = response.data;
        const tempR = Math.round(data.main.temp - 273.15);
        const tempMaxR = Math.round(data.main.temp_max - 273.15);
        const tempMinR = Math.round(data.main.temp_min - 273.15);
        const icon = data.weather?.[0]?.icon;
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;

        setWeather({
          temp: tempR,
          max: tempMaxR,
          min: tempMinR,
          date: `${month}/${day}`,
          icon: icon
            ? `https://openweathermap.org/img/wn/${icon}@2x.png`
            : null,
          city: data.name || "القاهرة",
          description: data.weather?.[0]?.description || "طقس متوازن",
          humidity: data.main?.humidity ?? 0,
          wind: Math.round(data.wind?.speed ?? 0),
          pressure: data.main?.pressure ?? 0,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  const statBoxStyle = {
    flex: 1,
    background: "rgba(255,255,255,0.16)",
    borderRadius: 2,
    padding: "12px 14px",
    textAlign: "center",
    minHeight: 72,
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 560, mx: "auto" }}>
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 18px 45px rgba(15, 76, 129, 0.18)",
          background: "linear-gradient(135deg, #f7fbff 0%, #eef6ff 100%)",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #0f4c81 0%, #1e88e5 50%, #42a5f5 100%)",
            color: "white",
            p: { xs: 3, md: 4 },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ letterSpacing: 1.6, opacity: 0.88 }}
              >
                توقعات الطقس
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, lineHeight: 1.1, my: 1 }}
              >
                {loading ? "--" : `${weather.temp}°C`}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {weather.city}
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.92, textTransform: "capitalize" }}
              >
                {weather.description}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 140,
              }}
            >
              {weather.icon ? (
                <img
                  src={weather.icon}
                  alt="Weather icon"
                  style={{ width: 96, height: 96 }}
                />
              ) : (
                <CloudIcon sx={{ fontSize: 96, opacity: 0.95 }} />
              )}
              <Chip
                label={loading ? "جاري التحميل..." : weather.date}
                sx={{
                  mt: 1.2,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 3 }}
          >
            <Box sx={statBoxStyle}>
              <Typography variant="body2" sx={{ opacity: 0.82 }}>
                الصغرى
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {loading ? "--" : `${weather.min}°`}
              </Typography>
            </Box>
            <Box sx={statBoxStyle}>
              <Typography variant="body2" sx={{ opacity: 0.82 }}>
                العظمى
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {loading ? "--" : `${weather.max}°`}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box
              sx={{
                flex: 1,
                background: "#f5f9ff",
                borderRadius: 3,
                p: 2,
                textAlign: "center",
                border: "1px solid #dce9f9",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                الرطوبة
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {loading ? "--" : `${weather.humidity}%`}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                background: "#f5f9ff",
                borderRadius: 3,
                p: 2,
                textAlign: "center",
                border: "1px solid #dce9f9",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                الرياح
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {loading ? "--" : `${weather.wind} م/ث`}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                background: "#f5f9ff",
                borderRadius: 3,
                p: 2,
                textAlign: "center",
                border: "1px solid #dce9f9",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                الضغط
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                {loading ? "--" : `${weather.pressure} hPa`}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
