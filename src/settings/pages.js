// Pages import
import LandingPage from "../pages/LandingPage";
import DecksPage from "../pages/DecksPage";
import CardsPage from "../pages/CardsPage";
import ProfilePage from "../pages/ProfilePage";
import GamersPage from "../pages/GamersPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import SettingsDeckPage from "../pages/SettingsDeckPage";
import AddingDeckPage from "../pages/AddingDeckPage";
import ChoicePage from "../pages/ChoicePage";
import StarterPage from "../pages/StarterPage";
import IndividualPage from "../pages/IndividualPage";
import DeckBuildOptions from "../pages/DeckBuildOptions";
import DeckImport from "../pages/DeckImport";
import EmptyDecksList from "../pages/EmptyDecksList";
import ModifyDeckPage from "../pages/ModifyDeckPage";

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
            component: AddingDeckPage,
        },
        {
            exact: true,
            strict: true,
            path: "/decks/empty",
            component: EmptyDecksList,
            props: { text: "No Decks " },
        },
        {
            exact: true,
            strict: true,
            path: "/decks/:id",
            component: ModifyDeckPage,
        },
        {
            exact: true,
            strict: true,
            path: "/decks/new-deck/build",
            component: DeckBuildOptions,
        },
        {
            exact: true,
            strict: true,
            path: "/decks/new-deck/import",
            component: DeckImport,
        },
        {
            exact: true,
            strict: true,
            path: "/cards",
            component: CardsPage,
        },
        {
            exact: true,
            strict: true,
            path: "/cards/from",
            component: ChoicePage,
        },
        {
            exact: true,
            strict: true,
            path: "/cards/from/starter",
            component: StarterPage,
        },
        {
            exact: true,
            strict: true,
            path: "/cards/from/individual",
            component: IndividualPage,
        },
        {
            exact: true,
            strict: true,
            path: "/deck/:name",
            component: SettingsDeckPage,
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