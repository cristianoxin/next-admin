"use client"
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";

import request from "@/server/request";

const UserTable = ({ dataSource, loading, onAdd, onEdit }) => {
	const columns = [{
		title: "名称",
		dataIndex: "name"
	},{
		title: "性别",
		dataIndex: "gender"
	},{
		title: "年纪",
		dataIndex: "age"
	},{
		title: "操作",
		dataIndex: "id",
		render: (text, record) => {
			return (
				<div>
					<Button type="primary" onClick={ () => { onEdit(record) } }>
						查看
					</Button>
				</div>
			);
		}
	}];

	return (
		<>
			<div className="margin-top-small">
				<Table dataSource={ dataSource } columns={ columns } loading={ loading } rowKey={ (record) => { return record.id }} size="small" />
			</div>
		</>
	);
}

const User = () => {
	const [ dataSource, setDataSource ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ entity, setEntity ] = useState(null);

	return (
		<div>
			<div>
				<UserTable dataSource={ dataSource } loading={ loading } onAdd={ onAdd } onEdit={ onEdit } />
			</div>
		</div>
	)
}

export default User;