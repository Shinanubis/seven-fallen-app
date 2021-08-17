import dotenv from 'dotenv';
dotenv.config();

const kingdomsDatas = {
    1 : {
            name: "MS",
            color: "#5f4e44",
            icon_url:process.env.REACT_APP_BASE_URL + "/Ecusson-Metascience.svg" 
        },
    2 : {
            name: "Eondra",
            color:"#5e0000",
            icon_url: process.env.REACT_APP_BASE_URL + "/Ecusson-Eondra.svg"
        },
    3 : {
            name: "NSF",
            color: "#000000",
            icon_url: process.env.REACT_APP_BASE_URL + "/Ecusson-NSF.svg" 
        },
    4 : {
            name: "TDLL",
            color: "#e4d067",
            icon_url: process.env.REACT_APP_BASE_URL + "/Ecusson-Temple.svg"
        },
    5 : {
            name: "Poseidia",
            color: "#004080",
            icon_url: process.env.REACT_APP_BASE_URL + "/Ecusson-Poseidia.svg"
        },
    6 : {
            name: "PC",
            color: "#7F7D7E",
            icon_url: process.env.REACT_APP_BASE_URL + "/Ecusson-Pure_Celeste.svg"
        },
    7 : {   
            name: "La Voie",
            color: "#C65384",
            icon_url: process.env.REACT_APP_BASE_URL + "/Ecusson-La_Voie.svg"
        }
}

export default kingdomsDatas;