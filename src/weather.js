import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloudIcon from "@mui/icons-material/Cloud";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Weather() {
  const [temp, setTemp] = useState({
    normal: 0,
    max: 0,
    min: 0,
    icon: null,
    date: null,
  });

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.04442&lon=31.23571&appid=f6ce42b1894c198c8c63f27620777f6c",
      )
      .then(function (response) {
        const tempR = Math.round(response.data.main.temp - 272.15);
        const tempMaxR = Math.round(response.data.main.temp_max - 272.15);
        const tempMinR = Math.round(response.data.main.temp_min - 272.15);
        const icon = response.data.weather[0].icon;

        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;

        console.log(month);
        console.log(day);
        console.log(response);

        console.log(response.data.main);
        setTemp({
          normal: tempR,
          max: tempMaxR,
          min: tempMinR,
          date: month + "/" + day,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  return (
    <div style={{ width: "50%", height: "70%" }}>
      <Card
        style={{
          width: "100%",
          height: "100%",
          boxShadow: "0px 5px 1px rgba(0, 0, 0, 0.3)",
        }}
      >
        <CardContent>
          <div
            style={{
              background: "#0d47a1",
              width: "100%",
              height: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              boxShadow: "0px 5px 1px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                background: "#1976d2",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "50px",
                    color: "white",
                  }}
                >
                  <h1>{temp.normal}°C</h1>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <h1>القاهرة</h1>
                  <img
                    src={temp.icon}
                    alt="Weather Icon"
                    style={{ width: "70px" }}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <CloudIcon style={{ color: "white", fontSize: "200px" }} />
              </div>
            </div>
            <div style={{ display: "flex", width: "100%", height: "100%" }}>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "25px",
                    textAlign: "center",
                  }}
                >
                  الصغرى {temp.min}° - العظمى {temp.max}°
                </p>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "25px",
                    textAlign: "center",
                  }}
                >
                  {temp.date}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
