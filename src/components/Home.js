import React from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(30);
  function LoadMore() {
    setVisible(visible + 30);
  }
  const getData = async () => {
    const response = await axios.get(`https://api.coincap.io/v2/assets`);

    setData(response.data.data);
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple-table" stickyHeader>
          <TableHead>
            <TableRow align="center">
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>VWAP(24Hr)</TableCell>
              <TableCell>Supply</TableCell>
              <TableCell>Volume(24Hr)</TableCell>
              <TableCell>Change(24Hr)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, visible).map((ind) => (
              <TableRow key={ind.id} align="center">
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    {ind.rank}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    <img
                      src={`https://assets.coincap.io/assets/icons/${ind.symbol.toLowerCase()}@2x.png`}
                      alt=""
                    />

                    <div
                      style={{ display: "inline-block", verticalAlign: "top" }}
                    >
                      <p>{ind.name}</p>
                      <p style={{ fontSize: "0.8em", opacity: "0.7" }}>
                        {ind.symbol}
                      </p>
                    </div>
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    ${parseFloat(ind.priceUsd).toFixed(2)}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    ${parseFloat(ind.marketCapUsd / 1000000000).toFixed(2)}b
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    ${parseFloat(ind.vwap24Hr).toFixed(2)}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    {parseFloat(ind.supply / 1000000).toFixed(2)}m
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    ${(ind.volumeUsd24Hr / 1000000000).toFixed(2)}b
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={ind.explorer}
                  >
                    {parseFloat(ind.changePercent24Hr).toFixed(2)}%
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" style={{ width: "100%" }} onClick={LoadMore}>
        LOAD MORE...
      </Button>
    </>
  );
}
