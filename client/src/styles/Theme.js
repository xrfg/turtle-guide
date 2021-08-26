/**
 * @desc Main file for MatUI Styling
 *
 */
import { createTheme } from "@material-ui/core/styles";

export const colors = {
  arcBlue: "#0B72B9",
  arcOrange: "#FFBA60",
  primaryMain: "#EB5E28", // red/orange //dark blue "#324376"
  primaryLight: "#FCE3DA", // light blue   "#586BA4",
  secondaryMain: "#CCC5B9", // light grey
  errorMain: "#EA1E0B", // Red
  warningMain: "#F76C5E", // light red / orange
  infoMain: "#F5DD90", // light yellow
  successMain: "#918F0F", // olive
  btnOver: "#CCC5B9",
};

export const theme = createTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        lineHeight: "1.11",
      },
    },
  },
  palette: {
    common: {
      blue: `${colors.arcBlue}`,
      orange: `${colors.arcOrange}`,
    },
    primary: { main: `${colors.primaryMain}`, light: `${colors.primaryLight}` },
    secondary: {
      main: `${colors.secondaryMain}`,
    },
    error: { main: `${colors.errorMain}` },
    warning: { main: `${colors.warningMain}` },
    info: { main: `${colors.infoMain}` },
    success: { main: `${colors.successMain}` },
  },

  // typography: {
  //   tab: {
  //     fontFamily: "Raleway",
  //     fontWeight: 800,
  //     fontSize: "1.1rem",
  //     textTransform: "uppercase",
  //   },
  // },

  // // special CSS
  // css: {
  //   tab: {
  //     minWidth: 10,
  //     marginLeft: "50px",
  //     marginRight: "50px",
  //     textAlign: "center",
  //     justifyContent: "center",
  //     justifyItems: "center",
  //     "&:hover": {
  //       color: colors.primaryLight,
  //     },
  //   },
  // },

  // "& .MuiButton-root": {
  //   padding: "0px",
  // },

  // // BUTTONS
  // buttons: {
  //   btnAddDb: {
  //     fontSize: "0.9rem",
  //     textTransform: "uppercase",
  //     backgroundColor: colors.primaryMain,
  //     color: "white",
  //     borderRadius: "5px",
  //     padding: "5px",
  //     paddingRight: "8px",
  //     paddingLeft: "8px",
  //     marginLeft: "20px",
  //     "&:hover": {
  //       backgroundColor: colors.btnOver,
  //     },
  //   },
  //   btnUpdateItem: {
  //     fontSize: "0.9rem",
  //     textTransform: "uppercase",
  //     backgroundColor: colors.primaryMain,
  //     color: "white",
  //     borderRadius: "5px",
  //     marginBottom: "5px",
  //     marginTop: "5px",
  //     marginLeft: "20px",
  //     "&:hover": {
  //       backgroundColor: colors.btnOver,
  //     },
  //     "&:focus": {
  //       backgroundColor: "red",
  //     },
  //   },
  // },

  // // TABLES

  // // INSERT

  // // FORM
  // insert: {
  //   inputs: {
  //     display: "flex",
  //     flexDirection: "row",
  //     width: "100%",
  //     marginRight: 30,
  //     "& > *": {
  //       marginTop: 20,
  //     },
  //   },
  //   titleauthor: {
  //     width: "50%",
  //     display: "flex",
  //     flexDirection: "column",
  //     marginRight: "30px",
  //     "& > :first-child": {
  //       marginRight: 20,
  //     },
  //     "& > div": {
  //       width: "100%",
  //       paddingRight: 30,
  //       marginBottom: 20,
  //     },
  //     "& > :last-child": {
  //       marginRight: 0,
  //     },
  //   },
  //   isbn: {
  //     width: "50%",
  //     display: "flex",
  //     flexDirection: "column",
  //     marginLeft: "30px",
  //     "& > *": {
  //       width: "100%",
  //     },
  //     "& > :first-child": {},
  //   },

  //   // BUTTONS

  //   buttons: {
  //     display: "flex",
  //     flexDirection: "row",
  //     justifyContent: "center",
  //     marginTop: 20,
  //     "& > *": {
  //       width: 200,
  //       marginBottom: 20,
  //       marginRight: 50,
  //       marginLeft: 50,
  //     },
  //     "& > :last-child": {},
  //   },

  //   // Tables
  //   tableFound: {
  //     backgroundColor: colors.primaryMain,
  //     display: "grid", // Overrides default theme
  //   },
  // },

  // database: {
  //   blocks: {
  //     display: "flex",
  //     flexDirection: "row",
  //     width: "100%",
  //   },
  //   block1: {
  //     display: "flex",
  //     flexDirection: "column",
  //     width: 600,
  //     marginRight: 30,
  //     "& > *": {
  //       marginTop: 20,
  //     },
  //   },
  //   block2: {
  //     display: "flex",
  //     flexDirection: "column",
  //     width: 300,
  //     "& > *": {
  //       marginTop: 20,
  //     },
  //   },
  //   allfilters: {
  //     display: "flex",
  //     flexDirection: "row",
  //     color: "red",
  //     "&$checked": {
  //       color: "blue",
  //     },
  //   },
  //   clearbtn: {
  //     display: "flex",
  //     justifyContent: "center",
  //     height: 130,
  //     borderRadius: 10,
  //   },
  // },
});

// CARD INSERT STYLE

export const cardColors = {
  cardBackground: "white",
  cardText: colors.primaryMain,
  cardAddDbBackground: "white",
};

export const cardStyle = {
  marginTop: 5,
  marginRight: 5,
  marginLeft: 5,
  backgroundColor: cardColors.cardBackground,
  color: cardColors.cardText,
  border: "2px solid rgba(0, 0, 0, 0)",
  borderRadius: 3,
  boxShadow: "1px 2px 9px -2px rgba(0,0,0,0.24)",
};

export const cardStyleAddDb = {
  marginTop: -1,
  marginRight: 5,
  marginLeft: 5,
  marginBottom: 5,
  backgroundColor: cardColors.cardAddDbBackground,
  color: cardColors.cardText,
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "0px 0px 5px 5px",
  boxShadow: "0px 2px 5px -4px rgba(0,0,0,0.50)",
};
