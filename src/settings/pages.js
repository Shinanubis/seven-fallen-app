// Pages import
import LandingPage from "../pages/landingPage";
import LoginPage from "../pages/loginPage";
import DecksPage from "../pages/decksPage";
import DeckPage from '../pages/deckPage';
import DeckCreate from "../pages/deckCreate";
import CardsType from '../pages/cardsType';
import ProfilePage from "../pages/ProfilePage";
import GamersPage from "../pages/GamersPage";
import ErrorPage from "../pages/ErrorPage";


const pages = {
    authenticated: [
        {
            exact: true,
            path: "/",
            component: LandingPage,
        },
        {
            strict: true,
            exact: true,
            path: "/login",
            component: LoginPage,
        },
        {
            strict: true,
            exact: true,
            path: "/profile",
            component: ProfilePage,
        },
        {
            strict: true,
            exact: true,
            path: "/decks",
            component: DecksPage,
        },
        {
            exact: true,
            strict: true,
            path: "/decks/create",
            component: DeckCreate,
        },
        {
            exact: true,
            strict: true,
            path: "/decks/:id",
            component: DeckPage,
        },
        {
            exact: true,
            strict: true,
            path: "/cards/:id",
            component: CardsType,            
        },
        {
            exact: true,
            strict: true,
            path: "/gamers",
            component: GamersPage,
        },
        {
            component: ErrorPage,
        }
    ],
    unAuthenticated: [
        {
            exact: true,
            path: "/",
            component: LandingPage,
        },
        {
            exact: true,
            strict: true,
            path: "/login",
            component: LoginPage,
        },
        {
            component: ErrorPage,
        }
    ]
}

export default pages;