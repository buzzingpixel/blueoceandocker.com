export type MenuSecondLevelItem = {
    name: string;
    href: string;
};

export type MenuSecondLevel = Array<MenuSecondLevelItem>;

export type MenuTopLevelItem = {
    name: string;
    href?: string;
    dropdown?: MenuSecondLevel;
};

export type MenuTopLevel = Array<MenuTopLevelItem>;
