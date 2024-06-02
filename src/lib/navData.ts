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
            content: "Your Work",
            authOnly: true,
        }, {
            id: 1,
            type: NavTypes.ITEM,
            content: "Projects",
            authOnly: true,
        }, {
            id: 2,
            type: NavTypes.ITEM,
            content: "Filters",
            authOnly: true,
        }, {
            id: 3,
            type: NavTypes.CREATE,
            authOnly: true
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