import { Drawer } from "react-native-paper";
import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import ThemeSwitch from "./ThemeSwitch";

const CustomDrawerContent = (props) => {
    const { state, navigation, theme, setTheme } = props;
    const activeRouteName = state.routeNames[state.index];

    const [iconNames, setIconNames] = useState("ticket-account");
    const [iconNumbers, setIconNumbers] = useState("dice-multiple-outline");
    const [iconMixs, setIconMixs] = useState("slot-machine-outline");

    // Función para actualizar el icono según la ruta activa
    function handleIconSelect(routeName) {
        switch (routeName) {
            case "Names":
                setIconNames("ticket-account");
                setIconNumbers("dice-multiple-outline");
                setIconMixs("slot-machine-outline");
                break;
            case "Numbers":
                setIconNames("ticket-outline");
                setIconNumbers("dice-multiple");
                setIconMixs("slot-machine-outline");
                break;
            case "Mixs":
                setIconNames("ticket-outline");
                setIconNumbers("dice-multiple-outline");
                setIconMixs("slot-machine");
                break;
            default:
                break;
        }
    }

    return (
        <DrawerContentScrollView {...props}>
                        <Drawer.Section
                            titleMaxFontSizeMultiplier={2.5}
                            style={{ fontSize: 20, marginBottom: 10, width: "100%" }}
                        >
                            <Drawer.Item
                                style={{
                                    backgroundColor: theme.colors.background,
                                    marginBottom: 10,
                                    width: "90%",
                                }}
                                label="Modo"
                                icon="theme-light-dark"
                                right={() => <ThemeSwitch theme={theme} setTheme={setTheme} />}
                            />
                        </Drawer.Section>
            <Drawer.Section
                title="Sortear por:"
                titleMaxFontSizeMultiplier={2.5}
                style={{ fontSize: 20, marginBottom: 10, width: "100%" }}
            >
                <Drawer.Item
                    style={{
                        backgroundColor: theme.colors.background,
                        marginBottom: 10,
                        width: "90%",
                    }}
                    label="Nombres"
                    icon={iconNames}
                    onPress={() => {
                        handleIconSelect("Names");
                        navigation.navigate("Names");
                    }}
                    active={activeRouteName === "Names"}
                />
                <Drawer.Item
                    style={{
                        backgroundColor: theme.colors.background,
                        marginBottom: 10,
                        width: "90%",
                    }}
                    label="Números"
                    icon={iconNumbers}
                    onPress={() => {
                        handleIconSelect("Numbers");
                        navigation.navigate("Numbers");
                    }}
                    active={activeRouteName === "Numbers"}
                />
                <Drawer.Item
                    style={{
                        backgroundColor: theme.colors.background,
                        marginBottom: 10,
                        width: "90%",
                    }}
                    label="Letras y Números"
                    icon={iconMixs}
                    onPress={() => {
                        handleIconSelect("Mixs");
                        navigation.navigate("Mixs");
                    }}
                    active={activeRouteName === "Mixs"}
                />
            </Drawer.Section>
            {/* <Drawer.Section
                            title="SorteApp"
                            titleMaxFontSizeMultiplier={2.5}
                            style={{ fontSize: 20, marginBottom: 10, width: "100%" }}
                        >
                            <Drawer.Item
                                style={{
                                    backgroundColor: theme.colors.background,
                                    marginBottom: 10,
                                    width: "90%",
                                }}
                                label="Acerca de:"
                                icon="information-outline"
                                onPress={() => navigation.navigate("About")}
                                active={activeRouteName === "About"}
                            />
                        </Drawer.Section> */}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
