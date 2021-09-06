import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// * importing material UI components
import {
  Container,
  Grid,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

// * QR code package
import QrReader from "react-qr-reader";


export default function QRCodePage() {
  const [scanResult, setScanResult] = useState("");
  const history = useHistory();
  const classes = useStyles();

  const handleError = (error) => {
    console.log(error);
  };

  const handleScan = (result) => {
    if (result) {
        setScanResult(result)
        console.log(result);
        history.push(result)
    }
  };
  return (
    <Container>
      <Card>
        <Typography variant="h4" gutterBottom className={classes.title}>
          here you can scan QR code
        </Typography>
        <CardContent>
          <Grid item md={6} sm={12} xs={12}>
            <QrReader
              delay={300}
              style={{
                widh: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onError={handleError}
              onScan={handleScan}
            />
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: 10,
    },
    title: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      backgroundColor: "black",
      padding: "15px",
    },
  }));
