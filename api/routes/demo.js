const express = require("express");
const router = express.Router();
var fetch = require("node-fetch");

//get data from Monday
router.post("/getMonday", async (req, res, next) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDI2ODE2OCwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMy0wMi0wM1QwMDozNjoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.oM37gRdrLf8UnnmuZIM-QWDRoT_GtgFLLyHpvnxGUtQ",
        "API-Version": "2025-07",
      },
      body: JSON.stringify({
        query: req.body.query,
      }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Monday API non-OK response:", response.status, data);
      return res.status(502).json({ error: "Upstream Monday API error", status: response.status, data });
    }
    return res.status(200).send(data);
  } catch (err) {
    console.error("Monday API request failed (getMonday):", err && err.message ? err.message : err);
    return res.status(504).json({ error: "Monday API timeout or network error" });
  } finally {
    clearTimeout(timeout);
  }
});

//upload data to Monday
router.post("/boardUpdate", async (req, res, next) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDI2ODE2OCwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMy0wMi0wM1QwMDozNjoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.oM37gRdrLf8UnnmuZIM-QWDRoT_GtgFLLyHpvnxGUtQ",
        "API-Version": "2025-07",
      },
      body: JSON.stringify({
        query: req.body.query,
        variables: req.body.vars,
      }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Monday API non-OK response:", response.status, data);
      return res.status(502).json({ error: "Upstream Monday API error", status: response.status, data });
    }
    return res.status(200).send(data);
  } catch (err) {
    console.error("Monday API request failed (boardUpdate):", err && err.message ? err.message : err);
    return res.status(504).json({ error: "Monday API timeout or network error" });
  } finally {
    clearTimeout(timeout);
  }
});

module.exports = router;
