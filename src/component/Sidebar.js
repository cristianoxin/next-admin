'use client'
import { useRouter, usePathname } from 'next/navigation';
import { Menu } from 'antd';
import { DashboardOutlined, TableOutlined, SettingOutlined, ReconciliationOutlined, SolutionOutlined, TeamOutlined, DeploymentUnitOutlined, ApartmentOutlined, CommentOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const Sidebar = () => {
	const router = useRouter();
	const pathname = usePathname();

	const getUpperMenu = (menu) => {
		console.log(menu);

		switch (menu) {
			case "order" :
			case "doctor" :
			case "user" :
			case "hospital" :
			case "department" : {
				return [ "database" ];
			} 
			case "authority" : {
				return ["system"];
			}
			default : {
				return [""];
			}
		}
	}

	const items = [
		{
			label: "首页",
			key: "dashboard",
			icon: <DashboardOutlined />
		},
		{
			label: "数据管理",
			key: "database",
			icon: <TableOutlined />,
			children: [
				{
					label: "订单管理",
					key: "order",
					icon: <ReconciliationOutlined />
				},
				{
					label: "医生管理",
					key: "doctor",
					icon: <SolutionOutlined />
				},
				{
					label: "用户管理",
					key: "user",
					icon: <TeamOutlined />
				},
				{
					label: "医院管理",
					key: "hospital",
					icon: <DeploymentUnitOutlined />
				},
				{
					label: "科室管理",
					key: "department",
					icon: <ApartmentOutlined />
				},
				{
					label: "投诉管理",
					key: "complaint",
					icon: <CommentOutlined />
				}
			]
		},
		{
			label: "系统管理",
			key: "system",
			icon: <SettingOutlined />,
			children: [
				{
					label: "权限管理",
					key: "authority",
					icon: <UsergroupAddOutlined />
				}
			]
		},
	];

	const onMenuChange = (item) => {
		router.push(`/system/${item.key}`);
	}

	return (
			<Menu mode="inline"
				onClick={ onMenuChange }
	      	  	items={ items }
	      	  	defaultSelectedKeys={ [ pathname.replace(/\/system\//, "") ] }
	      	  	defaultOpenKeys={ getUpperMenu(pathname.replace(/\/system\//, "")) }
	      	  	className="height-full"
	    />
	)
}

export default Sidebar;