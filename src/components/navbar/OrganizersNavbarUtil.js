import ODashboardIcon from "../icons/ODashboardIcon";

// set side drawer width
export const drawerWidth = 250;

// set drawer background color
export const drawerBackground = "#757575";
export const drawerTextColor = "black";
export const drawerActiveListBackgroundColor = "rgba(255,255,255, 0.08)";

// function to know if menuoption has submenu

export function hasChildren(item) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

// set organizers dashboard menu options
// set organizers dasbhaord submenu options and their paths

export const sidemenuOptions = [
  {
    text: "Create Conference",
    // icon: <ODashboardIcon className="icon-size" />,
    path: "/dashboard/create-conference",
    items: [],
  },
  {
    text: "My Conferences",
    // icon: <ODashboardIcon className="icon-size" />,
    path: "/dashboard/my-conferences",
    items: [],
  },
  {
    text: "Tickets",
    // icon: <ODashboardIcon className="icon-size" />,
    path: "/dashboard/tickets",
    items: [],
  },

  {
    text: "Organization",
    // icon: <ODashboardIcon className="icon-size" />,
    items: [
      {
        text: "My Organizations",
        path: "/dashboard/my-organizations",
      },

      {
        text: "Create Organization",
        path: "/dashboard/create-organization",
      },

      {
        text: "Settings",
        path: "settings",
      },
    ],
  },
  {
    text: "Refunds",
    // icon: <ODashboardIcon className="icon-size" />,
    path: "/dashboard/refunds",
    items: [],
  },
  {
    text: "Earnings",
    // icon: <ODashboardIcon className="icon-size" />,
    path: "/dashboard/earnings",
    items: [],
  },
  {
    text: "Credit Requests",
    // icon: <ODashboardIcon className="icon-size" />,
    path: "/dashboard/credit-requests",
    items: [],
  },
];
