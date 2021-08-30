import dotenv from 'dotenv';
dotenv.config();

const kingdomsDatas = {
    0 : {
            name:"NK",
            color: "transparent",
            icon_url: process.env.REACT_APP_BASE_URL +  "/logos/7-fallen-logo-2.png"
    },
    1 : {
            name: "MS",
            color: "#5f4e44",
            icon_url:process.env.REACT_APP_BASE_URL + "/logos/Ecusson-Metascience.png" 
        },
    2 : {
            name: "Eondra",
            color:"#5e0000",
            icon_url: process.env.REACT_APP_BASE_URL + "/logos/Ecusson-Eondra.png"
        },
    3 : {
            name: "NSF",
            color: "#000000",
            icon_url: process.env.REACT_APP_BASE_URL + "/logos/Ecusson-NSF.png" 
        },
    4 : {
            name: "TDLL",
            color: "#dabe5a",
            icon_url: process.env.REACT_APP_BASE_URL + "/logos/Ecusson-Temple.png"
        },
    5 : {
            name: "Poseidia",
            color: "#004080",
            icon_url: process.env.REACT_APP_BASE_URL + "/logos/Ecusson-Poseidia.png"
        },
    6 : {
            name: "PC",
            color: "#7F7D7E",
            icon_url: process.env.REACT_APP_BASE_URL + "/logos/Ecusson-Pure_Celeste.png"
        },
    7 : {   
            name: "La Voie",
            color: "#C65384",
            icon_url: process.env.REACT_APP_BASE_URL + "/logos/Ecusson-La_Voie.png"
        }
}

export default kingdomsDatas;