import {
  HomeOutlined,
  AppstoreOutlined,
  TableOutlined,
  UserOutlined,
  ContactsOutlined,
  RadarChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "首页", // 菜单标题名
    key: "/home", // 对应的path
    icon: <HomeOutlined />, // 图标名称
  },
  {
    title: "商品",
    key: "/products",
    icon: <AppstoreOutlined />,
    children: [
      {
        title: "品类管理",
        key: "/category",
        icon: <TableOutlined />,
      },
      {
        title: "商品管理",
        key: "/product",
        icon: <TableOutlined />,
      },
    ],
  },
  {
    title: "用户管理",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "角色管理",
    key: "/role",
    icon: <ContactsOutlined />,
  },
  {
    title: "图形图表",
    key: "/charts",
    icon: <RadarChartOutlined />,
    children: [
      {
        title: "柱状图",
        key: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "折线图",
        key: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "饼状图",
        key: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
];

export default menuList;
