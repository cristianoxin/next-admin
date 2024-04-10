"use client"
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";

import request from "@/server/request";


const DepartmentTable = ({ dataSource, loading, onAdd, onEdit }) => {
	const columns = [{
		title: "医院全称",
		dataIndex: "hospital_name"
	},{
		title: "科室全称",
		dataIndex: "name"
	},{
		title: "操作",
		dataIndex: "id",
		render: (text, record) => {
			return (
				<div>
					<Button type="primary" onClick={ () => { onEdit(record) }}>
						编辑
					</Button>
					<Button className="margin-left-smaller">
						删除
					</Button>
				</div>
			);
		}
	}];

	return (
		<>
			<div>
				<Button type="primary" onClick={ onAdd }>
					新增
				</Button>
			</div>
			<div className="margin-top-small">
				<Table dataSource={ dataSource } columns={ columns } loading={ loading } rowKey={ (record) => { return record.id }} size="small" />
			</div>
		</>
	);
}

const Department = () => {
	const [ dataSource, setDataSource ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ visible, setVisible ] = useState(false);
	const [ entity, setEntity ] = useState(null);

	const onAdd = () => {
		setEntity(null);
		openModal();
	}

	const onEdit = (record) => {
		setEntity(record);
		openModal();
	}

	return (
		<div>
			<div>
				<DepartmentTable dataSource={ dataSource } loading={ loading } onAdd={ onAdd } onEdit={ onEdit } />
			</div>
		</div>
	);
}

export default Department;