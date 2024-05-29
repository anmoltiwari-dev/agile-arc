import { NavDataType, NavTypes } from "@/components/Nav/nav.type";

export const navData: NavDataType = [
    {
        id: 0,
        items: [{
            id: 0,
            type: NavTypes.LOGO,
            content: 'Logo'
        }],
    }, {
        id: 1,
        items: [{
            id: 0,
            type: NavTypes.ITEM,
            content: "Your Work"
        }, {
            id: 1,
            type: NavTypes.ITEM,
            content: "Projects"
        }, {
            id: 2,
            type: NavTypes.ITEM,
            content: "Filters"
        }
        ]
    }, {
        id: 2,
        items: [
            {
                id: 0,
                type: NavTypes.AVATAR,
            }, {
                id: 1,
                type: NavTypes.THEME_TOGGLE,
            },
        ]
    }
]